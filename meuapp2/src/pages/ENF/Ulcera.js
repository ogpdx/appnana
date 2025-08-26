// src/pages/ENF/Ulcera.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function Ulcera({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Título */}
        <Text style={styles.title}>Como classificar uma úlcera?</Text>

        {/* Primeira parte */}
        <View style={styles.section}>
          <Image source={require('../../img/enfdedopcima.jpg')} style={styles.nurseTop} />
        </View>

        {/* Balão 1 */}
        <View style={styles.row}>
          <Image source={require('../../img/esfdirt.jpg')} style={styles.nurseRight} />
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>
              O primeiro passo na abordagem da úlcera do pé é classificá-la com base nos seis
              critérios do sistema SINBAD. Esses itens orientam o tratamento e padronizam a
              comunicação entre profissionais de saúde sobre as características da lesão.
            </Text>
          </View>
        </View>

        {/* Balão 2 */}
        <View style={styles.row}>
          <Image source={require('../../img/enfesqrd.jpg')} style={styles.nurseLeft} />
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>
              Para avaliar a gravidade da infecção siga os critérios do IWGDF/IDSA, enquanto a
              isquemia é analisada pelo sistema WIfI.
            </Text>
          </View>
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
          onPress={() => navigation.navigate('SisUsarENF')}
        >
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  section: { alignItems: 'center', marginBottom: 10 },
  nurseTop: { width: 100, height: 100, resizeMode: 'contain' },
  row: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20 },
  nurseRight: { width: 80, height: 120, resizeMode: 'contain', marginRight: 10 },
  nurseLeft: { width: 80, height: 120, resizeMode: 'contain', marginRight: 10 },
  bubble: {
    flex: 1,
    backgroundColor: '#e6f7f7',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#5bb5b0',
  },
  bubbleText: { fontSize: 14, textAlign: 'justify' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
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
