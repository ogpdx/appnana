import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

export default function TelaEscolhaOpcao({ navigation }) {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState('avaliar');

  const handleContinuar = () => {
    switch (opcaoSelecionada) {
      case 'avaliar':
        navigation.navigate('TelaAvaliacao');
        break;
      case 'videos':
        navigation.navigate('VideosInstrucionais');
        break;
      case 'diretrizes':
        navigation.navigate('DiretrizesIWGDF');
        break;
      default:
        Alert.alert('Atenção', 'Por favor, selecione uma opção.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../img/iwgdf_logo.png')} style={styles.logo} />

      <View style={styles.topContainer}>
        <Image source={require('../../img/enfermeira1.png')} style={styles.nurse} />
        <View style={styles.bubble}>
          <Text style={styles.bubbleText}>O que você deseja fazer nesse momento?</Text>
        </View>
        <Image source={require('../../img/enfermeira2.png')} style={styles.nurse} />
      </View>

      <View style={styles.opcoesContainer}>
        <TouchableOpacity onPress={() => setOpcaoSelecionada('avaliar')} style={styles.opcaoTouchable}>
          <View style={[styles.checkbox, opcaoSelecionada === 'avaliar' && styles.checkboxSelected]} />
          <Text style={styles.opcaoTexto}>Avaliar o pé de um  paciente</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setOpcaoSelecionada('videos')} style={styles.opcaoTouchable}>
          <View style={[styles.checkbox, opcaoSelecionada === 'videos' && styles.checkboxSelected]} />
          <Text style={styles.opcaoTexto}>Assistir vídeos instrucionais</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setOpcaoSelecionada('diretrizes')} style={styles.opcaoTouchable}>
          <View style={[styles.checkbox, opcaoSelecionada === 'diretrizes' && styles.checkboxSelected]} />
          <Text style={styles.opcaoTexto}>Acessar as diretrizes IWGDF 2023</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.botoesContainer}>
        <TouchableOpacity style={styles.botaoOutline} onPress={() => navigation.goBack()}>
          <Text style={styles.botaoTextoOutline}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoPrimario} onPress={handleContinuar}>
          <Text style={styles.botaoTexto}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E6F4F1',
  },
  logo: {
    width: 140,
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  nurse: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  bubble: {
    flex: 1,
    backgroundColor: '#d1f1f1',
    borderRadius: 10,
    padding: 10,
    marginLeft: 15,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 12,
    borderWidth: 2,
    borderColor: '#1B8B7F',
  },
  bubbleText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  opcoesContainer: {
    marginTop: 30,
  },
  opcaoTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#2BB3A3',
    marginRight: 10,
  },
  checkboxSelected: {
    backgroundColor: '#2BB3A3',
  },
  opcaoTexto: {
    fontSize: 16,
    color: '#222',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  botaoPrimario: {
    backgroundColor: '#2BB3A3',
    paddingVertical: 12,
    paddingHorizontal: 24,
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
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  botaoTextoOutline: {
    color: '#2BB3A3',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
