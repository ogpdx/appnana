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
} from 'react-native';

export default function TelaInstrumento({ navigation, route }) {
  const { idAvaliacao, supervisionado } = route.params;
  const [instrumento, setInstrumento] = useState('');
  const [loading, setLoading] = useState(false);

  const opcoes = [
    'Tenho os dois',
    'Tenho só o diapasão',
    'Tenho só o monofilamento',
    'Não tenho nenhum dos dois',
  ];

  const handleContinuar = async () => {
    if (!instrumento) {
      Alert.alert('Atenção', 'Selecione uma das opções antes de continuar.');
      return;
    }

    setLoading(true);

    const bodyData = new URLSearchParams({
      id_avaliacao: idAvaliacao,
      instrumento,
      supervisionado
    }).toString();

    try {
      const response = await fetch('https://voxforge.com.br/api/salvar_instrumento.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: bodyData,
      });

      const json = await response.json();

      if (json.status === 'ok') {
        switch (instrumento) {
          case 'Tenho os dois':
            navigation.navigate('TelaSensoriais', { idAvaliacao, instrumentoSelecionado: instrumento });
            break;
          case 'Tenho só o diapasão':
            navigation.navigate('TelaDiapasao', { idAvaliacao, instrumentoSelecionado: instrumento });
            break;
          case 'Tenho só o monofilamento':
            navigation.navigate('TelaSensoriais', { idAvaliacao, instrumentoSelecionado: instrumento });
            break;
          case 'Não tenho nenhum dos dois':
            navigation.navigate('TelaToqueLeve', { idAvaliacao, instrumentoSelecionado: instrumento });
            break;
          default:
            navigation.navigate('TelaFallback', { idAvaliacao, instrumentoSelecionado: instrumento });
        }
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
        
        <Image source={require('../../img/enfdir.png')} style={styles.avatar} />
        <Image source={require('../../img/enfesq.png')} style={styles.avatar2} />
        <Text style={styles.title}>Vamos lá!</Text>
        <Text style={styles.subtitle}>Preciso saber se possui monofilamento e diapasão à sua disposição.</Text>
        <Text style={styles.aviso}>
              O TE pode realizar testes sensoriais (como uso do monofilamento) e participar do exame dos pés, desde que sob supervisão e conforme protocolo institucional.
        </Text>
        <Text style={styles.instructions}>Escolha uma das opções abaixo:</Text>
        {opcoes.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.opcao, instrumento === item && styles.selecionado]}
            onPress={() => setInstrumento(item)}
          >
            <Text style={instrumento === item ? styles.opcaoSelecionadaTexto : styles.opcaoTexto}>
              {item}
            </Text>
            
          </TouchableOpacity>
          
        ))}
      </View>
        
      <View style={styles.botoesContainer}>
        <TouchableOpacity style={styles.botaoOutline} onPress={() => navigation.goBack()}>
          <Text style={styles.botaoTextoOutline}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoPrimario}
          onPress={handleContinuar}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.botaoTexto}>Continuar</Text>
          )}
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
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#d1f1f1',
    borderRadius: 16,
    padding: 24,
    borderColor: '#1B8B7F',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
    position: 'relative',
    paddingTop: 130,
  },
  avatar: {
    width: 120,
    height: 170,
    position: 'absolute',
    top: -5,
    left: '50%',
    marginLeft: -130,
  },
  avatar2: {
    width: 120,
    height: 170,
    position: 'absolute',
    top: -5,
    right: '50%',
    marginRight: -130,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#2BB3A3',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  instructions: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  opcao: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  selecionado: {
    backgroundColor: '#2BB3A3',
    borderColor: '#2BB3A3',
  },
  opcaoTexto: {
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  opcaoSelecionadaTexto: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
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
  },
  botaoTextoOutline: {
    color: '#2BB3A3',
    fontWeight: 'bold',
    fontSize: 16,
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
