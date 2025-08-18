// src/pages/ACS/TelaHistorico.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
  Pressable
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function TelaHistorico({ navigation, route }) {
  const { idAvaliacao } = route.params;
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUlcerasVisible, setModalUlcerasVisible] = useState(false);

  const [respostas, setRespostas] = useState({
    manca_dor: '',
    perda_pelos: '',
    unhas_engrossadas: '',
    coloracao_pes: '',
    temperatura_pes: '',
    higiene_pes: '',
  });

  const handleChange = (campo, valor) => {
    setRespostas({ ...respostas, [campo]: valor });
  };

  const handleContinuar = async () => {
    const camposObrigatorios = Object.values(respostas);
    if (camposObrigatorios.includes('')) {
      Alert.alert('Atenção', 'Responda todas as questões antes de continuar.');
      return;
    }

    setLoading(true);

    const bodyData = new URLSearchParams({
      id_avaliacao: idAvaliacao,
      ...respostas
    }).toString();

    try {
      const response = await fetch('https://voxforge.com.br/api/salvar_historico.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: bodyData,
      });

      const json = await response.json();

      if (json.status === 'ok') {
        navigation.navigate('TelaEstadoVascular', { idAvaliacao });
      } else {
        Alert.alert('Erro', json.mensagem || 'Erro ao salvar os dados.');
      }
    } catch (error) {
      console.error('Erro:', error);
      Alert.alert('Erro de conexão', 'Não foi possível salvar os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.boxPergunta}>
          <Image source={require('../../img/enfdir.png')} style={styles.nurse} />
          <View style={styles.bubble}>
            <Text style={styles.textTitle}>Estado Vascular:</Text>
            <Text style={styles.textSubtitle}>Faça as seguintes perguntas ao seu paciente:</Text>
          </View>
        </View>

        <Pergunta texto="7 - Ele (a) manca ou sente dor ao andar?" campo="manca_dor" valor={respostas.manca_dor} onChange={handleChange} opcoes={["Sim", "Não"]} />
        <Pergunta texto="8 - Perda de pêlos abaixo do joelho:" campo="perda_pelos" valor={respostas.perda_pelos} onChange={handleChange} opcoes={["Sim", "Não"]} />
        <Pergunta texto="9 - Tem as unhas dos pés engrossadas?" campo="unhas_engrossadas" valor={respostas.unhas_engrossadas} onChange={handleChange} opcoes={["Sim", "Não"]} />
        <Pergunta texto="10 - Coloração dos pés:" campo="coloracao_pes" valor={respostas.coloracao_pes} onChange={handleChange} opcoes={["Sem Alteração" ,"Vermelho", "Cianótico (roxo)", "Cianótico quando elevado", "Preto"]} />
        <Pergunta texto="11 - Temperatura dos pés:" campo="temperatura_pes" valor={respostas.temperatura_pes} onChange={handleChange} opcoes={["Sem Alteração", "Diferença de 2 graus ou mais", "Gelado", "Quente"]} />
        <Pergunta texto="12 - Edema presente no(s) pé(s)?" campo="higiene_pes" valor={respostas.higiene_pes} onChange={handleChange} opcoes={["Sim", "Não"]} />
        
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Clique aqui para ver as imagens das Complicações</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalUlcerasVisible(true)}
          style={[styles.button, { marginTop: 10 }]}
        >
          <Text style={styles.buttonText}>Como diferenciar úlcera do pé?</Text>
        </TouchableOpacity>
        
      </View>
      <View style={styles.botoesContainer}>
          <TouchableOpacity style={styles.botaoOutline} onPress={() => navigation.goBack()}>
            <Text style={styles.botaoTextoOutline}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoPrimario} onPress={handleContinuar} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.botaoTexto}>Continuar</Text>
            )}
          </TouchableOpacity>
        </View>
      {/* Modal de imagens */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <Text style={styles.modalTitle}>Exemplos de Complicações:</Text>
              <View style={styles.imageBox}>
                {[
                  { imagem: require('../../img/deformacaoossea.jpeg'), texto: 'Deformação óssea' },
                  { imagem: require('../../img/micoseinterdigital.jpeg'), texto: 'Micose interdigital' },
                  { imagem: require('../../img/calos.png'), texto: 'Calos' },
                  { imagem: require('../../img/calos2.jpeg'), texto: 'Úlcera do pé diabético' },
                  { imagem: require('../../img/unhasgrossas.png'), texto: 'Unhas engrossadas' },
                  { imagem: require('../../img/edema.png'), texto: 'Edema (inchaço)' },
                  { imagem: require('../../img/pevermelho.png'), texto: 'Pé vermelho' },
                  { imagem: require('../../img/pedireito.png'), texto: 'Pé direito com cianose' },
                  { imagem: require('../../img/bolhas.png'), texto: 'Bolha' },
                ].map(({ imagem, texto }, index) => (
                  <View key={index} style={{ marginBottom: 12 }}>
                    <Image source={imagem} style={styles.image} />
                    <Text style={styles.modalTexto}>{texto}</Text>
                  </View>
                ))}
              </View>
              <Pressable style={styles.modalBotao} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalBotaoTexto}>Fechar</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <Modal visible={modalUlcerasVisible} animationType="slide" transparent={true}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.boxPergunta}>
          <Image source={require('../../img/pecapa.png')} style={styles.nurse2} />
          <View style={styles.bubble}>
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
              Como diferenciar uma úlcera vascular de uma úlcera do pé relacionada ao diabetes?
            </Text>
          </View>
        </View>

        <View style={[styles.bubble, { marginTop: 10 }]}>
          <Text style={{ fontWeight: 'bold', textAlign: 'center'  }}>
            Comece por eliminação, se a ferida está acima do tornozelo, então não se caracteriza como úlcera do pé relacionada ao diabetes. Instruir o paciente a agendar uma consulta com o enfermeiro ou médico da UBS.
          </Text>
        </View>

        <Image source={require('../../img/ulcera.png')} style={[styles.image, { marginTop: 20 }]} />

        <Pressable style={styles.modalBotao} onPress={() => setModalUlcerasVisible(false)}>
          <Text style={styles.modalBotaoTexto}>Fechar</Text>
        </Pressable>
      </ScrollView>
    </View>
  </View>
</Modal>

    </ScrollView>
  );
}

const Pergunta = ({ texto, campo, valor, onChange, opcoes }) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={styles.label}>{texto}</Text>
    <View style={styles.input}>
      <Picker
        selectedValue={valor}
        onValueChange={(itemValue) => onChange(campo, itemValue)}
        style={{ color: 'black' }}
      >
        <Picker.Item label="Selecione" value="" />
        {opcoes.map((opcao) => (
          <Picker.Item key={opcao} label={opcao} value={opcao} />
        ))}
      </Picker>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#E6F4F1',
    flexGrow: 1,
    
  },
  card: {
    backgroundColor: '#d1f1f1',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderColor: '#1B8B7F',
    borderWidth: 2,
    
  },
  boxPergunta: {
    flexDirection: 'row',
    marginBottom: 20,
    
  },
  nurse: {
    width: 120,
    height: 120,
    marginRight: 10,
    
  },
  nurse2: {
    width: 60,
    height: 60,
    marginRight: 10,
    
  },
  bubble: {
    flex: 1,
    backgroundColor: '#d1f1f1',
    borderRadius: 10,
    padding: 10,
    
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2BB3A3',
    
  },
  textSubtitle: {
    fontSize: 14,
    color: 'black',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#1B8B7F',
    borderWidth: 1,
    marginBottom: 12,
    color: 'black',

  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    
  },
  botaoPrimario: {
    backgroundColor: '#2BB3A3',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    elevation: 3,
    
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botaoOutline: {
    borderColor: '#2BB3A3',
    borderWidth: 2,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  botaoTextoOutline: {
    color: '#2BB3A3',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2BB3A3',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '85%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: '#E77E30',
  },
  modalTexto: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    textAlign: 'center'
  },
  modalBotao: {
    backgroundColor: '#2BB3A3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  modalBotaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  imageBox: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 140,
    resizeMode: 'contain',
  },
});