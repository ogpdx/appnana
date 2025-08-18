import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
  Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function TelaDiapasao({ navigation, route }) {
  const { idAvaliacao, instrumentoSelecionado } = route.params;
  const [respostaDiapasao, setRespostaDiapasao] = useState('');
  const [supervisionado, setSupervisionado] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinuar = async () => {
    if (supervisionado === 'Sim' && !respostaDiapasao) {
      Alert.alert('Atenção', 'Responda a pergunta antes de continuar.');
      return;
    }

    setLoading(true);

    try {
      let bodyData;
      if (supervisionado === 'Sim') {
        bodyData = new URLSearchParams({
          id_avaliacao: idAvaliacao,
          resposta_diapasao: respostaDiapasao,
        }).toString();
      } else {
        bodyData = new URLSearchParams({
          id_avaliacao: idAvaliacao,
        }).toString();
      }

      const response = await fetch('https://voxforge.com.br/api/salvar_diapasao.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: bodyData,
      });

      const json = await response.json();
      if (json.status === 'ok') {
        if (instrumentoSelecionado === 'Tenho só o diapasão') {
          navigation.navigate('TelaToqueLeve', { idAvaliacao, instrumentoSelecionado, supervisionado });
        } else {
          navigation.navigate('TelaEncerramento', { idAvaliacao, instrumentoSelecionado, supervisionado });
        }
      } else {
        Alert.alert('Erro', json.mensagem || 'Erro ao salvar os dados.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão ao salvar.');
    } finally {
      setLoading(false);
    }
  };

  const renderPicker = (label, selectedValue, onValueChange) => (
    <View style={styles.pickerContainer}>
      <Text style={styles.pergunta}>{label}</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={Platform.OS === 'android' ? {} : styles.picker}
          dropdownIconColor="#2BB3A3"
        >
          <Picker.Item label="Selecione" value="" color="black" />
          <Picker.Item label="Sim" value="Sim" color="black" />
          <Picker.Item label="Não" value="Não" color="black" />
        </Picker>
      </View>
    </View>
  );

  useEffect(() => {
    const buscarSupervisao = async () => {
      try {
        const response = await fetch(`https://voxforge.com.br/api/obter_supervisionado.php?id_avaliacao=${idAvaliacao}`);
        const json = await response.json();
        if (json.status === 'ok') {
          setSupervisionado(json.supervisionado);
        } else {
          console.warn('Erro ao obter supervisão:', json.mensagem);
        }
      } catch (error) {
        console.error('Erro ao buscar supervisão:', error);
      }
    };
    buscarSupervisao();
  }, [idAvaliacao]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cardTexto}>
        <Text style={styles.titulo}>Locais que devem ser testados para perda da sensação vibratória com o Diapasão de 128 Hz</Text>
        <Image source={require('../../img/fotodiapasao.png')} style={styles.imagem} />
        <Text style={styles.balaoTexto}>1- Aplique o diapasão na clavícula do paciente para demonstrar a sensação.</Text>
        <Text style={styles.balaoTexto}>2- Peça para ele fechar os olhos.</Text>
        <Text style={styles.balaoTexto}>3- Aplique o diapasão no dedão do pé.</Text>
        <Text style={styles.balaoTexto}>
          4- Repita a aplicação 2 vezes, alternando com 1 aplicação 'simulada' sem vibração. O teste é positivo se o paciente responder corretamente a pelo menos 2 das 3 perguntas. Caso não sinta as vibrações no dedão do pé, repita o teste no maléolo ou tuberosidade da tíbia.
        </Text>
      </View>

      <Text style={styles.aviso}>
        Os técnicos de enfermagem podem realizar o exame, desde que sejam treinados e supervisionados por um enfermeiro.
      </Text>

      {supervisionado === 'Sim' && (
        <View style={styles.card}>
          {renderPicker(
            '24 - O paciente respondeu errado 2 das 3 aplicações do diapasão:',
            respostaDiapasao,
            setRespostaDiapasao
          )}
        </View>
      )}

      <View style={styles.botoesContainer}>
        <TouchableOpacity style={styles.botaoOutline} onPress={() => navigation.goBack()}>
          <Text style={styles.botaoTextoOutline}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoPrimario} onPress={handleContinuar} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.botaoTexto}>Continuar</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

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
  cardTexto: {
    marginBottom: 20,
  },
  titulo: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
  },
  imagem: {
    width: '100%',
    height: 220,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  balaoTexto: {
    backgroundColor: '#ccf2f0',
    padding: 16,
    marginBottom: 10,
    borderRadius: 16,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  pergunta: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  pickerContainer: {
    marginBottom: 12,
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2BB3A3',
  },
  picker: {
    height: 50,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  botaoPrimario: {
    backgroundColor: '#2BB3A3',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    elevation: 3,
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
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  botaoTextoOutline: {
    color: '#2BB3A3',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  aviso: {
    marginTop: 5,
    marginBottom: 10,
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});
