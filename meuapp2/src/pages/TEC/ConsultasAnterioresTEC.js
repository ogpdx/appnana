import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TextInput
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const coresCategoria = ['#29B6F6', '#66BB6A', '#FFD54F', '#EF5350'];
const nomesCategoria = ['Muito baixo', 'Baixo', 'Moderado', 'Alto'];

export default function ConsultasAnteriores({ navigation }) {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState(null);
  const [buscaNome, setBuscaNome] = useState('');
  const [ordenacao, setOrdenacao] = useState('desc');
  const [avaliacaoSelecionada, setAvaliacaoSelecionada] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarAvaliacoes = async () => {
      const cpf = await AsyncStorage.getItem('cpf');
      if (!cpf) return setLoading(false);

      try {
        const response = await fetch(`https://voxforge.com.br/api/get_avaliacoes.php?cpf=${cpf}`);
        const texto = await response.text();
        const json = JSON.parse(texto);

        if (json.status === 'ok') {
          setAvaliacoes(json.avaliacoes);
        }
      } catch (error) {
        console.error('Erro ao buscar avaliações:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarAvaliacoes();
  }, []);

  const filtrarAvaliacoes = () => {
    let filtradas = [...avaliacoes];

    if (filtroCategoria !== null) {
      filtradas = filtradas.filter(av => av.categoria == filtroCategoria);
    }

    if (buscaNome.trim() !== '') {
      filtradas = filtradas.filter(av => av.nome.toLowerCase().includes(buscaNome.toLowerCase()));
    }

    filtradas.sort((a, b) => {
      if (ordenacao === 'asc') return a.data.localeCompare(b.data);
      else return b.data.localeCompare(a.data);
    });

    return filtradas;
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#2BB3A3" style={{ marginTop: 100 }} />;
  }
  const formatarDataBR = (dataISO) => {
  if (!dataISO) return '';
  const [data, hora] = dataISO.split(' ');
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano} ${hora}`;
};

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Minhas Avaliações</Text>

      {/* Filtros */}
      <View style={styles.filtrosContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {coresCategoria.map((cor, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.botaoFiltroCor,
                {
                  backgroundColor: cor,
                  borderWidth: filtroCategoria === i ? 2 : 0,
                  borderColor: '#000'
                }
              ]}
              onPress={() => setFiltroCategoria(filtroCategoria === i ? null : i)}
            />
          ))}
        </ScrollView>

        <TextInput
          placeholder="Buscar por nome"
          style={styles.input}
          value={buscaNome}
          onChangeText={setBuscaNome}
        />

        <View style={styles.ordenacaoContainer}>
          <TouchableOpacity
            style={[
              styles.botaoOrdenar,
              ordenacao === 'desc' && styles.botaoOrdenarSelecionado
            ]}
            onPress={() => setOrdenacao('desc')}
          >
            <Text style={styles.botaoOrdenarTexto}>Mais recentes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.botaoOrdenar,
              ordenacao === 'asc' && styles.botaoOrdenarSelecionado
            ]}
            onPress={() => setOrdenacao('asc')}
          >
            <Text style={styles.botaoOrdenarTexto}>Mais antigas</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista */}
      {filtrarAvaliacoes().length === 0 && (
        <Text style={styles.semDados}>Nenhuma avaliação encontrada.</Text>
      )}

      {filtrarAvaliacoes().map((item, index) => {
        const corCategoria = coresCategoria[item.categoria] || '#ccc';

        return (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: corCategoria }]}
            onPress={() => {
              setAvaliacaoSelecionada(item);
              setModalVisible(true);
            }}
          >
            <Text style={styles.nome}>{item.nome} ({item.idade} anos)</Text>
            <Text style={styles.data}>Data: {formatarDataBR(item.data)}</Text>
            <Text style={styles.categoriaTexto}>
              Categoria {item.categoria} - {nomesCategoria[item.categoria] || '-'}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* Modal resumo */}
      <Modal visible={modalVisible} animationType="slide">
  <ScrollView contentContainerStyle={styles.modalContent}>
    <Text style={styles.modalTitulo}>Resumo da Avaliação</Text>

    {avaliacaoSelecionada && (
      <>
        {/* DADOS DO PACIENTE */}
        <View style={styles.cardResumo}>
          <Text style={styles.subtitulo}>Dados do Paciente</Text>
          <Text style={styles.linha}><Text style={styles.chave}>Nome:</Text> {avaliacaoSelecionada.nome}</Text>
          <Text style={styles.linha}><Text style={styles.chave}>Idade:</Text> {avaliacaoSelecionada.idade}</Text>
          <Text style={styles.linha}><Text style={styles.chave}>UBS:</Text> {avaliacaoSelecionada.ubs}</Text>
          <Text style={styles.linha}><Text style={styles.chave}>Data:</Text> {formatarDataBR(avaliacaoSelecionada.data)}</Text>
          <Text style={styles.linha}><Text style={styles.chave}>Instrumento:</Text> {avaliacaoSelecionada.instrumento}</Text>
        </View>

        {/* CONDIÇÕES CLÍNICAS */}
        <View style={styles.cardResumo}>
          <Text style={styles.subtitulo}>Condições Clínicas</Text>
          {['tempo_diabetes', 'doenca_renal_terminal', 'problema_visao', 'hiperglicemia', 'ferida_no_pe', 'manca_dor'].map((chave, i) => (
            <Text key={i} style={styles.linha}>
              <Text style={styles.chave}>{chave.replaceAll('_', ' ').toUpperCase()}:</Text> {avaliacaoSelecionada[chave]}
            </Text>
          ))}
        </View>

        {/* SINAIS NOS PÉS */}
        <View style={styles.cardResumo}>
          <Text style={styles.subtitulo}>Sinais nos Pés</Text>
          {[
            'higiene_pes', 'unhas_engrossadas', 'frieiras', 'temperatura_pes',
            'coloracao_pes', 'falta_pulso', 'perda_pelos', 'pulso_pedioso',
            'pulso_tibial', 'dedos_garra', 'dedos_sobrepostos', 'deformidade_pes',
            'pe_charcot', 'resposta_monofilamento', 'presenca_frieiras'
          ].map((chave, i) => (
            <Text key={i} style={styles.linha}>
              <Text style={styles.chave}>{chave.replaceAll('_', ' ').toUpperCase()}:</Text> {avaliacaoSelecionada[chave]}
            </Text>
          ))}
        </View>

        {/* Botão de voltar */}
        <TouchableOpacity style={styles.botaoFechar} onPress={() => setModalVisible(false)}>
          <Text style={styles.botaoTexto}>Fechar</Text>
        </TouchableOpacity>
      </>
    )}
  </ScrollView>
</Modal>



      {/* Botão voltar */}
      <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.navigate('HubTEC')}>
        <Text style={styles.botaoVoltarTexto}>Voltar ao Início</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2FBF9',
    padding: 16
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  filtrosContainer: {
    marginBottom: 16
  },
  botaoFiltroCor: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#009688'
  },
  ordenacaoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  botaoOrdenar: {
    flex: 1,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 6,
    marginRight: 10
  },
  botaoOrdenarSelecionado: {
    backgroundColor: '#009688'
  },
  botaoOrdenarTexto: {
    color: '#000',
    textAlign: 'center'
  },
  semDados: {
    textAlign: 'center',
    color: '#000',
    fontSize: 16,
    marginTop: 30
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  nome: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000'
  },
  data: {
    fontSize: 14,
    color: '#000',
    marginTop: 4
  },
  categoriaTexto: {
    marginTop: 6,
    fontWeight: 'bold',
    color: '#000',
    fontSize: 14
  },
  modalContent: {
    padding: 20,
    backgroundColor: '#F2FBF9'
  },
  modalTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  resumoItem: {
    fontSize: 15,
    marginBottom: 8
  },
  chave: {
    fontWeight: 'bold'
  },
  botaoFechar: {
    backgroundColor: '#009688',
    padding: 12,
    borderRadius: 6,
    marginTop: 20
  },
  botaoTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  botaoVoltar: {
    backgroundColor: '#009688',
    marginTop: 20,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 50
  },
  botaoVoltarTexto: {
    color: '#fff',
    fontWeight: 'bold'
  },
  cardResumo: {
  backgroundColor: '#d1f1f1',
  borderRadius: 10,
  padding: 15,
  marginBottom: 20,
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
},
subtitulo: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
  color: '#00796B',
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
  paddingBottom: 5
},
linha: {
  fontSize: 15,
  marginBottom: 6,
  color: '#333'
},
chave: {
  fontWeight: 'bold',
  color: '#000'
}


});
