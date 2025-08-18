// src/pages/ACS/TelaEstadoVascular.js
import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, ScrollView,
  Alert, ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function TelaEstadoVascular({ navigation, route }) {
  const { idAvaliacao, supervisionado: supParam } = route.params || {};
  const [supervisionado, setSupervisionado] = useState(supParam ?? '');
  const [loading, setLoading] = useState(false);

  const [respostas, setRespostas] = useState({
    pulso_pedioso: '',
    pulso_tibial: '',
    doenca_arterial_periferica: '',
  });

  // Fallback: busca o flag em /avaliacoes.supervisionado se não vier por params
  useEffect(() => {
    if (!idAvaliacao) return;
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
  }, [idAvaliacao, supervisionado]);

  const isSuperv = String(supervisionado).toLowerCase() === 'sim';

  const handleChange = (campo, valor) => {
    setRespostas((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleContinuar = async () => {
    const { pulso_pedioso, pulso_tibial, doenca_arterial_periferica } = respostas;

    // Validação condicional: se não supervisionado, só Q15 é obrigatória
    if (isSuperv) {
      if (!pulso_pedioso || !pulso_tibial || !doenca_arterial_periferica) {
        Alert.alert('Atenção', 'Responda todas as questões antes de continuar.');
        return;
      }
    } else {
      if (!doenca_arterial_periferica) {
        Alert.alert('Atenção', 'Responda a questão 15 antes de continuar.');
        return;
      }
    }

    setLoading(true);

    // Quando não supervisionado, zera Q13/Q14 para não poluir o banco
    const payload = new URLSearchParams({
      id_avaliacao: String(idAvaliacao),
      pulso_pedioso: isSuperv ? respostas.pulso_pedioso : '',
      pulso_tibial: isSuperv ? respostas.pulso_tibial : '',
      doenca_arterial_periferica: respostas.doenca_arterial_periferica,
    }).toString();

    try {
      const response = await fetch('https://voxforge.com.br/api/salvar_estado_vascular.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload,
      });
      const json = await response.json();
      if (json.status === 'ok') {
        navigation.navigate('TelaSensoriais', { idAvaliacao, supervisionado: supervisionado || supParam });
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
        <View className="header" style={styles.boxPergunta}>
          <Image source={require('../../img/enfdir.png')} style={styles.nurse} />
          <View style={styles.bubble}>
            <Text style={styles.textTitle}>Estado Vascular:</Text>
            <Text style={styles.textSubtitle}>
              Realize a palpação dos pulsos pedioso e tibial.{'\n'}Abaixo alguns exemplos:
            </Text>
          </View>
        </View>

        <View style={styles.imageRow}>
          <Image source={require('../../img/pedioso.png')} style={styles.image} />
          <Image source={require('../../img/tibial.png')} style={styles.image} />
        </View>

        <Image source={require('../../img/riscoulceracao.png')} style={styles.footImage} />

        {/* Q13/Q14 aparecem somente quando supervisionado = Sim */}
        {isSuperv && (
          <>
            <Pergunta
              texto="13 - Pulso pedioso presente:"
              campo="pulso_pedioso"
              valor={respostas.pulso_pedioso}
              onChange={handleChange}
            />
            <Pergunta
              texto="14 - Pulso tibial presente:"
              campo="pulso_tibial"
              valor={respostas.pulso_tibial}
              onChange={handleChange}
            />
          </>
        )}

        {/* Q15 sempre visível */}
        <Pergunta
          texto="15 - Tem doença arterial periférica (DAP)?"
          campo="doenca_arterial_periferica"
          valor={respostas.doenca_arterial_periferica}
          onChange={handleChange}
        />

        <Text style={styles.aviso}>
          Atenção: Somente profissional de nível superior ou técnico supervisionado pode avaliar pulso!
        </Text>
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

const Pergunta = ({ texto, campo, valor, onChange }) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={styles.label}>{texto}</Text>
    <View style={styles.input}>
      <Picker
        selectedValue={valor}
        onValueChange={(itemValue) => onChange(campo, itemValue)}
        style={{ color: 'black' }}
      >
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Sim" value="Sim" />
        {/* Se o back armazena "Nao", mantenha assim */}
        <Picker.Item label="Não" value="Nao" />
      </Picker>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#E6F4F1', flexGrow: 1 },
  card: {
    backgroundColor: '#d1f1f1', borderRadius: 10, padding: 20, marginBottom: 20,
    borderColor: '#1B8B7F', borderWidth: 2,
  },
  boxPergunta: { flexDirection: 'row', marginBottom: 20 },
  nurse: { width: 120, height: 120, marginRight: 10 },
  bubble: { flex: 1, backgroundColor: '#d1f1f1', borderRadius: 10, padding: 10 },
  textTitle: { fontSize: 18, fontWeight: 'bold', color: '#2BB3A3' },
  textSubtitle: { fontSize: 14, color: '#333' },
  imageRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  image: { width: 120, height: 100, resizeMode: 'contain' },
  footImage: { width: 220, height: 160, resizeMode: 'contain', alignSelf: 'center', marginVertical: 12 },
  label: { fontWeight: 'bold', marginBottom: 4 },
  input: { backgroundColor: '#fff', borderRadius: 8, borderColor: '#1B8B7F', borderWidth: 1, marginBottom: 12 },
  botoesContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 },
  botaoPrimario: { backgroundColor: '#2BB3A3', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 10, elevation: 3 },
  botaoTexto: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  botaoOutline: { borderColor: '#2BB3A3', borderWidth: 2, paddingVertical: 14, paddingHorizontal: 28, borderRadius: 10, backgroundColor: '#fff', elevation: 2 },
  botaoTextoOutline: { color: '#2BB3A3', fontWeight: 'bold', fontSize: 16 },
  aviso: { marginTop: 10, color: 'red', fontWeight: 'bold', fontSize: 14, textAlign: 'center' },
});
