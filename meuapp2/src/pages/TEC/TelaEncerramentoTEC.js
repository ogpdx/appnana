// src/pages/ACS/TelaEncerramento.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image
} from 'react-native';
import LottieView from 'lottie-react-native';

export default function TelaEncerramento({ route, navigation }) {
  const { idAvaliacao } = route.params;
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOrientacaoVisible, setModalOrientacaoVisible] = useState(false);

  const categoriaCores = ['#29B6F6', '#66BB6A', '#FFD54F', '#EF5350'];
  const descricaoCategoria = ['Muito baixo', 'Baixo', 'Moderado', 'Alto'];

  const textosOrientacao = {
    0: [
      'Orientar o paciente e familiares sobre a importância do autocuidado. Pessoas com deficiência visual ou com incapacidade física de visualizar os pés não conseguem fazer a inspeção adequadamente.',
  '• Inspeção diária dos pés (olhar entre os dedos);',
  '• Não andar descalço;',
  '• Realizar boa higiene dos pés;',
  '• Não lavar os pés com água quente;',
  '• Secar entre os dedos;',
  '• Não usar bolsa de água quente nos pés ou outro tipo de aquecedor;',
  '• Usar hidratante nos pés, mas evitar passar entre os dedos;',
  '• Usar meias sem costura ou do avesso;',
  '• Cortar as unhas corretamente;',
  '• Não usar produtos químicos para retirar calos;',
  '• Não usar calçados apertados;',
  '• Inspecionar dentro e fora dos calçados antes de usá-los;',
  '• Procurar a UBS se aparecer bolha, aumento de temperatura, corte ou ferida;',
  '• Controlar a glicemia.'
    ],
    1: [
      'Orientar o paciente e familiares sobre a importância do autocuidado. Pessoas com deficiência visual ou com incapacidade física de visualizar os pés não conseguem fazer a inspeção adequadamente.',
  '• Inspeção diária dos pés (olhar entre os dedos);',
  '• Não andar descalço;',
  '• Realizar boa higiene dos pés;',
  '• Não lavar os pés com água quente;',
  '• Secar entre os dedos;',
  '• Não usar bolsa de água quente nos pés ou outro tipo de aquecedor;',
  '• Usar hidratante nos pés, mas evitar passar entre os dedos;',
  '• Usar meias sem costura ou do avesso;',
  '• Cortar as unhas corretamente;',
  '• Não usar produtos químicos para retirar calos;',
  '• Não usar calçados apertados;',
  '• Inspecionar dentro e fora dos calçados antes de usá-los;',
  '• Procurar a UBS se aparecer bolha, aumento de temperatura, corte ou ferida;',
  '• Controlar a glicemia.'
    ],
    2: [
      'Orientar o paciente e familiares sobre a importância do autocuidado. Pessoas com deficiência visual ou com incapacidade física de visualizar os pés não conseguem fazer a inspeção adequadamente.',
  '• Inspeção diária dos pés (olhar entre os dedos);',
  '• Não andar descalço;',
  '• Realizar boa higiene dos pés;',
  '• Não lavar os pés com água quente;',
  '• Secar entre os dedos;',
  '• Não usar bolsa de água quente nos pés ou outro tipo de aquecedor;',
  '• Usar hidratante nos pés, mas evitar passar entre os dedos;',
  '• Usar meias sem costura ou do avesso;',
  '• Cortar as unhas corretamente;',
  '• Não usar produtos químicos para retirar calos;',
  '• Não usar calçados apertados;',
  '• Inspecionar dentro e fora dos calçados antes de usá-los;',
  '• Procurar a UBS se aparecer bolha, aumento de temperatura, corte ou ferida;',
  '• Controlar a glicemia.'
    ],
    3: [
      'Orientar o paciente e familiares sobre a importância do autocuidado. Pessoas com deficiência visual ou com incapacidade física de visualizar os pés não conseguem fazer a inspeção adequadamente.',
  '• Inspeção diária dos pés (olhar entre os dedos);',
  '• Não andar descalço;',
  '• Realizar boa higiene dos pés;',
  '• Não lavar os pés com água quente;',
  '• Secar entre os dedos;',
  '• Não usar bolsa de água quente nos pés ou outro tipo de aquecedor;',
  '• Usar hidratante nos pés, mas evitar passar entre os dedos;',
  '• Usar meias sem costura ou do avesso;',
  '• Cortar as unhas corretamente;',
  '• Não usar produtos químicos para retirar calos;',
  '• Não usar calçados apertados;',
  '• Inspecionar dentro e fora dos calçados antes de usá-los;',
  '• Procurar a UBS se aparecer bolha, aumento de temperatura, corte ou ferida;',
  '• Controlar a glicemia.'
    ]
  };

  const imagensPorCategoria = {
    0: [
      require('../../img/cortecorreto.png'),
      require('../../img/sapatoadequado.png'),
      
    ],
    1: [
      require('../../img/cortecorreto.png'),
      require('../../img/sapatoadequado.png'),
      
    ],
    2: [
      require('../../img/cortecorreto.png'),
      require('../../img/sapatoadequado.png'),
      require('../../img/chinelo.png'),
      require('../../img/meias.png'),
      require('../../img/reforce.png'),
      require('../../img/unhas.png'),
    ],
    
    3: [
      require('../../img/cortecorreto.png'),
      require('../../img/sapatoadequado.png'),
      require('../../img/chinelo.png'),
      require('../../img/meias.png'),
      require('../../img/reforce.png'),
      require('../../img/unhas.png'),
    ]
  };

 useEffect(() => {
  const verificarSupervisionado = async () => {
    try {
      const resp = await fetch(`https://voxforge.com.br/api/obter_supervisionado.php?id_avaliacao=${idAvaliacao}`);
      const json = await resp.json();

      if (json?.supervisionado?.toLowerCase() === 'não' || json?.supervisionado?.toLowerCase() === 'nao') {
        navigation.replace('TelaEncerramentoSimples', { idAvaliacao });
        return;
      }

      // Se for "Sim", continua
      carregarDados();

    } catch (error) {
      console.error('Erro ao verificar supervisão:', error);
      carregarDados(); // fallback
    }
  };

  const carregarDados = async () => {
    try {
      const resposta = await fetch(`https://voxforge.com.br/api/obter_classificacao.php?id_avaliacao=${idAvaliacao}`);
      const json = await resposta.json();
      setDados(json);

      if (json?.categoria !== undefined) {
        await fetch('https://voxforge.com.br/api/salvar_categoria.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `id_avaliacao=${idAvaliacao}&categoria=${json.categoria}`
        });
      }

    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  // CHAME AQUI:
  verificarSupervisionado();

}, [idAvaliacao]);


  if (loading) {
    return <ActivityIndicator size="large" color="#2BB3A3" style={{ marginTop: 100 }} />;
  }

  if (!dados) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Erro ao carregar resultado da avaliação.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Avaliação concluída com sucesso!</Text>
      <LottieView
        source={require('../../animations/success.json')}
        autoPlay
        loop={false}
        style={styles.lottie}
      />

      <View style={[styles.card, { borderLeftColor: categoriaCores[dados.categoria] }]}>
        <Text style={styles.dado}>Nome: <Text style={styles.valor}>{dados.nome}</Text></Text>
        <Text style={styles.dado}>Idade: <Text style={styles.valor}>{dados.idade}</Text></Text>
        <Text style={[styles.classificacao, { backgroundColor: categoriaCores[dados.categoria] }]}>
          Categoria {dados.categoria} - {descricaoCategoria[dados.categoria]}
        </Text>
        <TouchableOpacity onPress={() => setModalOrientacaoVisible(true)}>
          <Text style={[styles.classificacao, { backgroundColor: categoriaCores[dados.categoria] }]}>
            Ver Orientações
          </Text>
        </TouchableOpacity>

        <Text style={styles.caracteristicas}>{dados.caracteristicas}</Text>
        <Text style={styles.frequencia}>Recomenda-se avaliação {dados.frequencia}</Text>
        <Text style={styles.observacao}>Continue acompanhando o paciente regularmente.</Text>
      </View>

      <TouchableOpacity style={styles.botaoClassificacoes} onPress={() => setModalVisible(true)}>
        <Text style={styles.botaoTexto}>Ver todas as classificações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoSecundario} onPress={() => navigation.navigate('HubTEC')}>
        <Text style={styles.botaoSecundarioTexto}>Voltar ao Início</Text>
      </TouchableOpacity>

      <Text style={styles.rodape}>Powered by VoxForge</Text>

      {/* Modal Classifica?�??es */}
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={styles.modalTitulo}>Classificaçõess de Risco</Text>
          {[0, 1, 2, 3].map((categoria) => (
            <View key={categoria} style={[styles.modalBox, { borderLeftColor: categoriaCores[categoria] }]}>
              <Text style={[styles.classificacao, { backgroundColor: categoriaCores[categoria] }]}>
                Categoria {categoria} - {descricaoCategoria[categoria]}
              </Text>
              <Text style={styles.caracteristicas}>
                {[
                  'Sem PSP e sem DAP.',
                  'PSP ou DAP.',
                  'PSP + DAP, ou PSP + deformidade do pé ou DAP + deformidade do pé.',
                  'PSP ou DAP e um ou mais dos seguintes: história de Úlcera no pé, amputação ou doença renal terminal.'
                ][categoria]}
              </Text>
              <Text style={styles.frequencia}>
                Frequência: {['1x ano', '1x 6-12 meses', '1x 3-6 meses', '1x 1-3 meses'][categoria]}
              </Text>
            </View>
          ))}
          <TouchableOpacity style={styles.botaoFechar} onPress={() => setModalVisible(false)}>
            <Text style={styles.botaoTexto}>Fechar</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      {/* Modal Orienta?�??es */}
      <Modal visible={modalOrientacaoVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={styles.modalTitulo}>Orientações - Categoria {dados.categoria}</Text>

          {textosOrientacao[dados.categoria] && textosOrientacao[dados.categoria].map((texto, idx) => (
            <Text key={idx} style={styles.textoOrientacao}>{texto}</Text>
          ))}
          {imagensPorCategoria[dados.categoria] && imagensPorCategoria[dados.categoria].map((img, index) => (
            <Image key={index} source={img} style={styles.image} resizeMode="contain" />
          ))}

          <View style={styles.botoesModal}>
            <TouchableOpacity style={styles.botaoFechar} onPress={() => setModalOrientacaoVisible(false)}>
              <Text style={styles.botaoTexto}>Fechar</Text>
            </TouchableOpacity>
            {(Number(dados.categoria) === 2 || Number(dados.categoria) === 3) && (
              <TouchableOpacity style={styles.botaoFechar} onPress={() => navigation.navigate('TelaOrientacoesCategoria3')}>
                <Text style={styles.botaoTexto}>Mais Orientações</Text>
              </TouchableOpacity>
            )}
            
          </View>
          <View style={styles.botoesModal}>
            {Number(dados.categoria) === 1 && (
              <>
                <TouchableOpacity style={styles.botaoFechar} onPress={() => navigation.navigate('TelaOrientacoesCategoria1')}>
                  <Text style={styles.botaoTexto}>Mais Orientações</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoFechar} onPress={() => setModalOrientacaoVisible(false)}>
                  <Text style={styles.botaoTexto}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6F4F1',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000'
  },
  lottie: {
    width: 120,
    height: 120
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    marginVertical: 10,
    borderLeftWidth: 6,
    elevation: 4
  },
  dado: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5
  },
  valor: {
    fontWeight: 'normal'
  },
  classificacao: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    padding: 8,
    borderRadius: 5,
    color: 'white',
    textAlign: 'center'
  },
  caracteristicas: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 10,
    textAlign: 'center'
  },
  frequencia: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center'
  },
  observacao: {
    fontSize: 13,
    marginTop: 10,
    textAlign: 'center',
    color: '#666'
  },
  botaoClassificacoes: {
    backgroundColor: '#009688',
    padding: 12,
    borderRadius: 6,
    marginTop: 15
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center'
  },
  botaoSecundario: {
    backgroundColor: '#fff',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#009688',
    padding: 10,
    borderRadius: 6
  },
  botaoSecundarioTexto: {
    color: '#009688',
    fontWeight: 'bold'
  },
  rodape: {
    marginTop: 100,
    fontSize: 12,
    color: '#333'
  },
  modalContent: {
    padding: 20,
    backgroundColor: '#E6F4F1'
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    borderLeftWidth: 6
  },
  botaoFechar: {
   backgroundColor: '#009688',
    padding: 10,
    borderRadius: 6,
    marginTop: 15
  },
  image: {
    width: '100%',
    height: 300,
    marginVertical: 10,
    borderRadius: 10
  },
  textoOrientacao: {
    fontSize: 14,
    marginBottom: 10,
    color: '#000',
    fontWeight: 'bold'
  }
});
