import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Alert, ActivityIndicator, Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function TelaSensoriais({ navigation, route }) {
  const { idAvaliacao, instrumentoSelecionado, supervisionado: supervisionadoParam } = route.params || {};

  const [supervisionado, setSupervisionado] = useState(supervisionadoParam ?? '');
  const [respostaMonofilamento, setRespostaMonofilamento] = useState('');
  const [higienePes, setHigienePes] = useState('');
  const [presencaFrieiras, setPresencaFrieiras] = useState('');
  const [pesRessecados, setPesRessecados] = useState('');
  const [loading, setLoading] = useState(false);

  // Fallback: busca o flag de supervisão na tabela avaliacoes
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

  const handleContinuar = async () => {
    // Validação condicional: Q20 obrigatória só se supervisionado = Sim
    if (isSuperv && !respostaMonofilamento) {
      Alert.alert('Atenção', 'Responda a questão 20 antes de continuar.');
      return;
    }
    if (!higienePes || !presencaFrieiras || !pesRessecados) {
      Alert.alert('Atenção', 'Responda todas as perguntas antes de continuar.');
      return;
    }

    setLoading(true);
    const bodyData = new URLSearchParams({
      id_avaliacao: String(idAvaliacao),
      resposta_monofilamento: isSuperv ? respostaMonofilamento : '', // zera quando não supervisionado
      higiene_pes: higienePes,
      presenca_frieiras: presencaFrieiras,
      pes_ressecados: pesRessecados,
    }).toString();

    try {
      const response = await fetch('https://voxforge.com.br/api/salvar_sensorial_completo.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: bodyData,
      });

      const text = await response.text();
      let json;
      try { json = JSON.parse(text); }
      catch { throw new Error('Resposta inválida do servidor: ' + text); }

      if (json.status === 'ok') {
        if (instrumentoSelecionado === 'Tenho só o monofilamento') {
          navigation.navigate('TelaEncerramento', { idAvaliacao, supervisionado });
        } else {
          navigation.navigate('TelaDiapasao', { idAvaliacao, instrumentoSelecionado, supervisionado });
        }
      } else {
        Alert.alert('Erro', json.mensagem || 'Erro ao salvar os dados.');
      }
    } catch (error) {
      Alert.alert('Erro', error?.message || 'Erro de conexão ao salvar.');
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
          <Picker.Item label="Selecione" value="" color="black" />
          <Picker.Item label="Sim" value="Sim" color="black" />
          <Picker.Item label="Não" value="Não" color="black" />
        </Picker>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cardTexto}>
        <Text style={styles.balaoTexto}>
          Primeiro, aplique o monofilamento nas mãos (ou cotovelo ou testa) do paciente para demonstrar qual é a sensação.
        </Text>
        <Text style={styles.balaoTexto}>
          Teste três locais diferentes em ambos os pés sem que o paciente veja. Aplique o monofilamento perpendicularmente à pele,
          com força suficiente para entortá-lo e mantenha por 2 segundos. Pergunte ao paciente se ele sente a pressão (sim/não) e onde sente.
        </Text>
        <Text style={styles.balaoTexto}>
          Repita a aplicação 2 vezes no mesmo local, alternando com 1 aplicação 'simulada' (3 perguntas por local).
          A sensação protetora está presente se o paciente responder corretamente 2 das 3 aplicações.
        </Text>
      </View>

      <View style={styles.card}>
        {/* Q20 só aparece quando supervisionado = Sim */}
        {isSuperv && renderPicker(
          '20 - O paciente respondeu errado 2 das 3 aplicações do monofilamento:',
          respostaMonofilamento,
          setRespostaMonofilamento
        )}
        {renderPicker('21 - Apresenta higiene adequada dos pés?', higienePes, setHigienePes)}
        {renderPicker('22 - Presença de frieiras?', presencaFrieiras, setPresencaFrieiras)}
        {renderPicker('23 - Apresenta pés muito ressecados?', pesRessecados, setPesRessecados)}
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
  container: { padding: 20, backgroundColor: '#E6F4F1', flexGrow: 1 },
  card: {
    backgroundColor: '#d1f1f1', borderRadius: 10, padding: 20, marginBottom: 20,
    borderColor: '#1B8B7F', borderWidth: 2,
  },
  cardTexto: { marginBottom: 20 },
  balaoTexto: {
    backgroundColor: '#ccf2f0', padding: 16, marginBottom: 10, borderRadius: 16,
    fontWeight: 'bold', textAlign: 'justify',
  },
  pergunta: { fontWeight: 'bold', marginBottom: 4 },
  pickerContainer: { marginBottom: 12 },
  pickerWrapper: { backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#2BB3A3' },
  picker: { height: 50 },
  botoesContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 },
  botaoPrimario: { backgroundColor: '#2BB3A3', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 10, elevation: 3 },
  botaoOutline: {
    borderColor: '#2BB3A3', borderWidth: 2, paddingVertical: 14, paddingHorizontal: 28,
    borderRadius: 10, backgroundColor: '#fff', elevation: 2,
  },
  botaoTexto: { color: '#fff', fontWeight: 'bold', fontSize: 16, textAlign: 'center' },
  botaoTextoOutline: { color: '#2BB3A3', fontWeight: 'bold', fontSize: 16, textAlign: 'center' },
});
