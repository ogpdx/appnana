// src/pages/Home/Sobre.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Sobre({ route }) {
  const { profissao } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avaliação dos Pés</Text>
      {profissao && (
        <Text style={styles.profissaoText}>Profissão selecionada: {profissao}</Text>
      )}
      {/* Aqui virão os campos de avaliação */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#2BB3A3',
  },
  profissaoText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
  },
});
