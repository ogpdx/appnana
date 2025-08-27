// src/pages/ENF/Ulcera.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function Ulcera({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        
        {/* Topo: Enfermeira + título */}
        <View style={styles.header}>
          <Image source={require('../../img/enfdedopcima.jpg')} style={styles.nurseTop} />
          <Text style={styles.title}>Como classificar uma úlcera?</Text>
        </View>

        {/* Enfermeira direita com balão */}
        <View style={styles.rowRight}>
          <Image source={require('../../img/esfdirt.jpg')} style={styles.nurseRight} />
          <Text style={styles.bubbleTextRight}>
            O primeiro passo na abordagem da úlcera do pé é classificá-la com base nos seis critérios do sistema SINBAD. Esses itens orientam o tratamento e padronizam a comunicação entre profissionais de saúde sobre as características da lesão.
          </Text>
        </View>

        {/* Enfermeira esquerda com balão */}
        <View style={styles.rowLeft}>
          <Image source={require('../../img/enfesqrd.jpg')} style={styles.nurseLeft} />
          <Text style={styles.bubbleTextLeft}>
            Para avaliar a gravidade da infecção siga os critérios do IWGDF/IDSA, enquanto a isquemia é analisada pelo sistema WIfI.
          </Text>
        </View>

      </ScrollView>

      {/* Rodapé com botões */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.navigate('HubENF')}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.nextButton]}
          onPress={() => navigation.navigate('SisUsar')}
        >
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 25 },
  
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  nurseTop: { width: 70, height: 80, resizeMode: 'contain', marginRight: 0 },
  title: { fontSize: 19, fontWeight: 'bold' },

  rowRight: { alignItems: 'flex-end', marginBottom: 15 },
  nurseRight: { width: 360, height: 230, marginLeft: 10, resizeMode: 'contain' },
  bubbleTextRight: {
    position: 'absolute',
    top: 22,
    right: 150,
    width: 185,
    fontSize: 12,
    textAlign: 'justify',
    fontWeight: '600',
  },

  rowLeft: { alignItems: 'flex-start', marginBottom: 40 },
  nurseLeft: { width: 340, height: 280, resizeMode: 'contain' },
  bubbleTextLeft: {
    position: 'absolute',
    top: 50,
    left: 130,
    width: 170,
    fontSize: 13,
    textAlign: 'justify',
    fontWeight: '600',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 80,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButton: { backgroundColor: '#aaa' },
  nextButton: { backgroundColor: '#5bb5b0' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
