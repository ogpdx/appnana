import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function TelaSupervisao({ navigation }) {
  const [supervisionado, setSupervisionado] = useState('');

  const continuar = () => {
    if (!supervisionado) {
      Alert.alert('Atenção', 'Selecione se está sob supervisão.');
      return;
    }
    navigation.navigate('TelaAvaliacaoTEC', { supervisionado });
  };

  return (
    <View style={styles.container}>
      {/* Conteúdo centralizado */}
      <View style={styles.centerContent}>
        {/* PERGUNTA */}
        <View style={styles.questionBox}>
          <Text style={styles.title}>Triagem sob supervisão</Text>
          <Text style={styles.subtitle}>
            Você está fazendo essa triagem com supervisão?
          </Text>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={supervisionado}
              onValueChange={(v) => setSupervisionado(v)}
              style={styles.picker}
              dropdownIconColor="#2BB3A3"
            >
              <Picker.Item label="Selecione" value="" />
              <Picker.Item label="Sim" value="Sim" />
              <Picker.Item label="Não" value="Não" />
            </Picker>
          </View>
        </View>

      
      </View>

      {/* BOTÕES FIXOS NO RODAPÉ */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={[styles.btn, styles.btnOutline]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.btnText, styles.btnOutlineText]}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnPrimary} onPress={continuar}>
          <Text style={styles.btnPrimaryText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4F1',
    justifyContent: 'space-between',
    padding: 20,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center',
  },

  /* Pergunta */
  questionBox: {
    backgroundColor: '#d1f1f1',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1B8B7F',
    padding: 16,
    alignItems: 'center',
    marginBottom: 70,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2BB3A3',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: 'black',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#2BB3A3',
    borderRadius: 13,
    backgroundColor: '#fff',
    overflow: 'hidden',
    alignSelf: 'stretch',
  },
  picker: {
    color: '#000',
    height: 55,
    width: '100%',
  },

 
  /* Card explicação */
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1B8B7F',
  },

  card: {
    flex: 1,
    backgroundColor: '#d1f1f1',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1B8B7F',
    padding: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#2BB3A3',
    marginBottom: 6,
  },
  cardText: {
    color: 'black',
    fontSize: 13,
  },

  /* Botões */
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#2BB3A3',
  },
  btnOutlineText: {
    color: '#2BB3A3',
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnPrimary: {
    backgroundColor: '#2BB3A3',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 22,
  },
  btnPrimaryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
