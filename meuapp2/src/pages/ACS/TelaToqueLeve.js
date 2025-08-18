// src/pages/ACS/TelaToqueLeve.js
import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, ScrollView,
  Alert, ActivityIndicator, Linking, Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function TelaToqueLeve({ navigation, route }) {
  const { idAvaliacao, supervisionado: supervisionadoParam } = route.params || {};
  const [supervisionado, setSupervisionado] = useState(supervisionadoParam ?? '');
  const [respostaToqueLeve, setRespostaToqueLeve] = useState('');
  const [loading, setLoading] = useState(false);

  // Fallback: se a tela chegar sem o flag de supervisão, busca no backend.
  useEffect(() => {
    if (!idAvaliacao) {
      Alert.alert('Erro', 'ID da avaliação ausente.');
      navigation.goBack();
      return;
    }
    if (supervisionado === '' || supervisionado == null) {
      (async () => {
        try {
          const r = await fetch(`https://voxforge.com.br/api/obter_supervisionado.php?id_avaliacao=${idAvaliacao}`);
          const j = await r.json();
          if (j.status === 'ok') setSupervisionado(j.supervisionado);
        } catch (e) {
          console.warn('Falha ao obter supervisão:', e?.message || e);
        }
      })();
    }
  }, [idAvaliacao, supervisionado, navigation]);

  const handleContinuar = async () => {
    if (supervisionado === 'Sim' && !respostaToqueLeve) {
      Alert.alert('Atenção', 'Responda a pergunta antes de continuar.');
      return;
    }

    setLoading(true);
    try {
      const bodyData = new URLSearchParams({
        id_avaliacao: String(idAvaliacao),
        // quando não supervisionado, envia vazio — backend deve tolerar
        resposta_toque_leve: supervisionado === 'Sim' ? respostaToqueLeve : '',
      }).toString();

      const response = await fetch('https://voxforge.com.br/api/salvar_toque_leve.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: bodyData,
      });

      // Robustez contra respostas não-JSON
      const text = await response.text();
      let json;
      try { json = JSON.parse(text); }
      catch { throw new Error('Resposta inválida do servidor: ' + text); }

      if (json.status === 'ok') {
        // Encerramento único do fluxo
        navigation.navigate('TelaEncerramento', { idAvaliacao, supervisionado });
      } else {
        Alert.alert('Erro', json.mensagem || 'Erro ao salvar os dados.');
      }
    } catch (error) {
      console.log('Erro de conexão:', error);
      Alert.alert('Erro', error?.message || 'Erro ao conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardText}>
          Se você não tiver um monofilamento e nem um diapasão, não se preocupe! Realize o Teste do Toque Leve!
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>Como realizar o Teste do Toque Leve?</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image source={require('../../img/toqueleve.png')} style={styles.image} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          Instrua a fechar os olhos e responder ‘sim’ ao toque. Toque levemente os dedos do pé por 1–2s, sem empurrar,
          bater ou cutucar. PSP é provável se o toque não for detectado em ≥ 2 locais.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.videoButton}
        onPress={() => Linking.openURL('https://www.youtube.com')}
      >
        <Text style={styles.videoButtonText}>Assista um vídeo instrucional clicando aqui</Text>
      </TouchableOpacity>

      <Text style={styles.aviso}>
        Os técnicos de enfermagem podem realizar o exame, desde que sejam treinados e supervisionados por um enfermeiro.
      </Text>

      {supervisionado === 'Sim' && (
        <View style={styles.cardPergunta}>
          <Text style={styles.pergunta}>
            25 — O paciente respondeu errado o toque de 2 ou mais locais?
          </Text>
          <Picker
            selectedValue={respostaToqueLeve}
            onValueChange={setRespostaToqueLeve}
            style={[
              { backgroundColor: '#fff', borderRadius: 10 },
              Platform.OS === 'android' ? {} : styles.picker
            ]}
            dropdownIconColor="#2BB3A3"
          >
            <Picker.Item label="Selecione" value="" color="black" />
            <Picker.Item label="Sim" value="Sim" color="black" />
            <Picker.Item label="Não" value="Não" color="black" />
          </Picker>
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
  container: { padding: 20, backgroundColor: '#E6F4F1', flexGrow: 1 },
  card: {
    backgroundColor: '#ccf2f0', borderRadius: 10, padding: 16, marginBottom: 16,
    borderColor: '#2BB3A3', borderWidth: 1,
  },
  cardText: { fontWeight: 'bold', textAlign: 'justify', fontSize: 15 },
  imageContainer: { marginBottom: 16, alignItems: 'center' },
  image: { width: '100%', height: 220, resizeMode: 'contain' },
  videoButton: { backgroundColor: '#2BB3A3', padding: 12, borderRadius: 8, marginBottom: 20 },
  videoButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  cardPergunta: {
    backgroundColor: '#ccf2f0', padding: 16, borderRadius: 10,
    borderColor: '#2BB3A3', borderWidth: 2, marginBottom: 20,
  },
  pergunta: { fontWeight: 'bold', marginBottom: 10, fontSize: 15 },
  picker: { height: 50 },
  botoesContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  botaoPrimario: { backgroundColor: '#2BB3A3', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 10, elevation: 3 },
  botaoTexto: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  botaoOutline: {
    borderColor: '#2BB3A3', borderWidth: 2, paddingVertical: 14, paddingHorizontal: 28,
    borderRadius: 10, backgroundColor: '#fff', elevation: 2,
  },
  botaoTextoOutline: { color: '#2BB3A3', fontWeight: 'bold', fontSize: 16 },
  aviso: { marginTop: 5, marginBottom: 10, color: 'red', fontWeight: 'bold', fontSize: 14, textAlign: 'center' },
});
