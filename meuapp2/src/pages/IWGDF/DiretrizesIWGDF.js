import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native';

export default function DiretrizesIWGDF({ navigation }) {
  const handleLogout = () => {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Splash' }], // substitua pelo nome correto da sua tela inicial
          });
        },
      },
    ]);
  };

  const handleContinuar = () => {
    navigation.navigate('EscolhaAcaoACS');
  };

  return (
    <SafeAreaView style={{ flex: 1,     backgroundColor: '#E6F4F1' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../../img/iwgdf_logo.png')} style={styles.logo} />

        <View style={styles.box}>
          <Image source={require('../../img/enfermeira1.png')} style={styles.nurse} />
          <View style={styles.bubble}>
            <Text style={styles.text}>
              Aqui todas as informações são baseadas nas diretrizes da IWGDF (International Working Group on Diabetic Foot), 2023.
            </Text>
          </View>
        </View>

        <View style={styles.box}>
          <View style={styles.bubble}>
            <Text style={styles.text}>
              A IWGDF é um grupo de estudos internacional cuja missão é desenvolver orientações para a prevenção e gestão
              de complicações nos pés de pessoas com diabetes.
            </Text>
          </View>
          <Image source={require('../../img/enfermeira2.png')} style={styles.nurse} />
        </View>

        <View style={styles.box}>
          <Image source={require('../../img/enfermeira1.png')} style={styles.nurse} />
          <View style={styles.bubble}>
            <Text style={[styles.text, { color: 'red', fontWeight: 'bold' }]}>
              O objetivo é diminuir o número de amputações!
            </Text>
            <Image source={require('../../img/enfermeira1.png')} style={styles.imageSmall} />
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttonOutline} onPress={handleLogout}>
            <Text style={styles.buttonTextOutline}>Sair</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonPrimary} onPress={handleContinuar}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  logo: {
    width: 140,
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
  box: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
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
  text: {
    fontSize: 14,
    color: '#333',
  },
  imageSmall: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 10,
  },
  buttonPrimary: {
    backgroundColor: '#2BB3A3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonOutline: {
    borderColor: '#2BB3A3',
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  buttonTextOutline: {
    color: '#2BB3A3',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
