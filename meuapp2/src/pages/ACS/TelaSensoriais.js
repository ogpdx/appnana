import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function TelaSensoriais({ navigation, route }) {
  const { idAvaliacao, instrumentoSelecionado } = route.params;

  const [dedosGarra, setDedosGarra] = useState('');
  const [dedosSobrepostos, setDedosSobrepostos] = useState('');
  const [deformidadePes, setDeformidadePes] = useState('');
  const [charcot, setCharcot] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinuar = async () => {
    if (!dedosGarra || !dedosSobrepostos || !deformidadePes || !charcot) {
      Alert.alert('Atenção', 'Responda todas as perguntas antes de continuar.');
      return;
    }

    setLoading(true);
    const bodyData = new URLSearchParams({
      id_avaliacao: idAvaliacao,
      dedos_garra: dedosGarra,
      dedos_sobrepostos: dedosSobrepostos,
      deformidade_pes: deformidadePes,
      pe_charcot: charcot,
    }).toString();

    try {
      const response = await fetch('https://voxforge.com.br/api/salvar_sensorial_completo.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: bodyData,
      });
      const json = await response.json();
      if (json.status === 'ok') {
        if (instrumentoSelecionado === 'Tenho só o monofilamento') {
          navigation.navigate('TelaSensoriais2', { idAvaliacao, instrumentoSelecionado });
        } else {
          navigation.navigate('TelaSensoriais2', { idAvaliacao, instrumentoSelecionado });
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
          <Picker.Item label="Selecione" value="" color='black'/>
          <Picker.Item label="Sim" value="Sim" color='black'/>
          <Picker.Item label="Não" value="Não" color='black'/>
        </Picker>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>EXAME SENSORIAL DOS PÉS</Text>
        <Text style={styles.texto}>
          Locais que devem ser testados para perda de sensibilidade protetora com o monofilamento de Semmes-Weinstein de 10g:
        </Text>
        <Image source={require('../../img/perdasensibilidade.png')} style={styles.imagem} />
        <Text style={styles.texto}>
          Método adequado de utilização do monofilamento Semmes-Weinstein de 10g
        </Text>
        <Image source={require('../../img/metodoadequado.png')} style={styles.imagem} />
        <Text style={styles.texto}>
          Áreas de risco de Úlceração
        </Text>
        <Image source={require('../../img/areasulceracao.png')} style={styles.imagem} />

        {renderPicker('16 - Possui dedos em garra:', dedosGarra, setDedosGarra)}
        {renderPicker('17 - Possui dedos sobrepostos:', dedosSobrepostos, setDedosSobrepostos)}
        {renderPicker('18 - Deformação nos pés:', deformidadePes, setDeformidadePes)}
        {renderPicker('19 - Apresenta Pé de Charcot:', charcot, setCharcot)}
      </View>

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
  titulo: {
    fontWeight: 'bold',
    color: '#2BB3A3',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    fontStyle: 'normal',
  },
  imagem: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  texto: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
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
    textAlign: 'center'
  },
  botaoTextoOutline: {
    color: '#2BB3A3',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
});