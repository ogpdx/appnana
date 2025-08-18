import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, Modal,
  Alert, ActivityIndicator, Pressable, StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function TelaAvaliacao({ navigation, route }) {
  const supervisionado = route?.params?.supervisionado ?? null;
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [unidade, setUnidade] = useState('');
  const [tempoDiabetes, setTempoDiabetes] = useState('');
  const [amputacao, setAmputacao] = useState('');
  const [feridaNoPe, setFeridaNoPe] = useState('');
  const [doencaRenal, setDoencaRenal] = useState('');
  const [problemaVisao, setProblemaVisao] = useState('');
  const [hiperglicemia, setHiperglicemia] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [cpfAutor, setCpfAutor] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('cpf').then(cpf => {
      setCpfAutor(cpf?.replace(/\D/g, '') || '');
    });
    
  }, []);

  const handleContinuar = async () => {
    if (!nome || !idade || !unidade || !tempoDiabetes || !amputacao || !feridaNoPe || !doencaRenal || !problemaVisao || !hiperglicemia) {
      Alert.alert('Atenção', 'Preencha todos os campos antes de continuar.');
      return;
    }

    setLoading(true);
    try {
      const bodyData = `nome=${encodeURIComponent(nome)}&idade=${encodeURIComponent(idade)}&ubs=${encodeURIComponent(unidade)}&tempo_diabetes=${encodeURIComponent(tempoDiabetes)}&amputacao_membro=${encodeURIComponent(amputacao)}&ferida_no_pe=${encodeURIComponent(feridaNoPe)}&doenca_renal_terminal=${encodeURIComponent(doencaRenal)}&problema_visao=${encodeURIComponent(problemaVisao)}&hiperglicemia=${encodeURIComponent(hiperglicemia)}&cpf_autor=${encodeURIComponent(cpfAutor)}`;

      const response = await fetch('https://voxforge.com.br/api/salvar_avaliacao.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: bodyData,
      });

      const text = await response.text();
      const json = JSON.parse(text);

      if (json.status === 'ok' && json.id_avaliacao) {
        navigation.navigate('TelaHistoricoTEC', { 
          idAvaliacao: json.id_avaliacao,
          supervisionado 
        });
      }
      else {
        Alert.alert('Erro', json.mensagem || 'Erro ao salvar os dados.');
      }
    } catch (e) {
      Alert.alert('Erro', 'Erro ao conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Nome do paciente:</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Digite o nome completo" />

        <Text style={styles.label}>Idade:</Text>
        <TextInput style={styles.input} value={idade} onChangeText={setIdade} keyboardType="numeric" maxLength={2} placeholder="Ex: 60" />

        <Text style={styles.label}>Unidade Básica de Saúde (UBS):</Text>
        <TextInput style={styles.input} value={unidade} onChangeText={setUnidade} placeholder="Digite a UBS" />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>1 - Há quantos anos tem diabetes?</Text>
        <Picker selectedValue={tempoDiabetes} onValueChange={setTempoDiabetes} style={styles.picker}>
          <Picker.Item label="Selecione" value="" />
          <Picker.Item label="Menos de 1 ano" value="<1" />
          <Picker.Item label="Entre 1 e 5" value="1-5" />
          <Picker.Item label="Entre 5 e 10" value="5-10" />
          <Picker.Item label="Entre 10 e 15" value="10-15" />
          <Picker.Item label="Entre 15 e 20" value="15-20" />
          <Picker.Item label="Mais de 20" value=">20" />
        </Picker>

        <Text style={styles.label}>2 - Tem histórico de amputação de membro inferior?</Text>
        <Picker selectedValue={amputacao} onValueChange={setAmputacao} style={styles.picker}>
          <Picker.Item label="Selecione" value="" />
          <Picker.Item label="Sim" value="Sim" />
          <Picker.Item label="Não" value="Não" />
        </Picker>

        <Text style={styles.label}>3 - Tem ou já teve ferida abaixo do tornozelo?</Text>
        <Picker selectedValue={feridaNoPe} onValueChange={setFeridaNoPe} style={styles.picker}>
          <Picker.Item label="Selecione" value="" />
          <Picker.Item label="Sim, tem uma ferida agora" value="tem agora" />
          <Picker.Item label="Sim, já teve mas não tem mais" value="teve antes" />
          <Picker.Item label="Não" value="nao" />
        </Picker>

        <Text style={styles.label}>
          4 - Tem doença renal em <Text style={styles.cliqueTexto} onPress={() => setModalVisible(true)}>fase terminal</Text>?
        </Text>
        <Picker selectedValue={doencaRenal} onValueChange={setDoencaRenal} style={styles.picker}>
          <Picker.Item label="Selecione" value="" />
          <Picker.Item label="Sim" value="Sim" />
          <Picker.Item label="Não" value="Não" />
        </Picker>

        <Text style={styles.label}>5 - Tem algum problema de visão que surgiu após ter diabetes?</Text>
        <Picker selectedValue={problemaVisao} onValueChange={setProblemaVisao} style={styles.picker}>
          <Picker.Item label="Selecione" value="" />
          <Picker.Item label="Sim" value="Sim" />
          <Picker.Item label="Não" value="Não" />
        </Picker>

        <Text style={styles.label}>6 - Tem apresentado hiperglicemia?</Text>
        <Picker selectedValue={hiperglicemia} onValueChange={setHiperglicemia} style={styles.picker}>
          <Picker.Item label="Selecione" value="" />
          <Picker.Item label="Sim" value="Sim" />
          <Picker.Item label="Não" value="Não" />
        </Picker>
      </View>

      <View style={styles.botoesContainer}>
        <TouchableOpacity style={styles.botaoOutline} onPress={() => navigation.goBack()}>
          <Text style={styles.botaoTextoOutline}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoPrimario} onPress={handleContinuar} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.botaoTexto}>Continuar</Text>}
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitulo}>O que é doença renal em fase terminal?</Text>
              <Text style={styles.modalTexto}>O que é doença renal em fase terminal?</Text>
              <Text style={styles.modalTexto}>A doença renal em fase terminal é o estágio mais avançado da doença renal crônica, quando os rins perderam quase toda sua capacidade de funcionamento.</Text>
              <Text style={styles.modalTexto}>Nesse estágio da doença o paciente precisa:</Text>
              <Text style={styles.modalTexto}>• Hemodiálise - filtragem do sangue através de uma máquina</Text>
              <Text style={styles.modalTexto}>• Diálise peritoneal - filtragem através do revestimento do abdômen</Text>
              <Text style={styles.modalTexto}>• Transplante renal - substituição por um rim saudável de um doador</Text>
              <Pressable style={styles.modalBotao} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalBotaoTexto}>Fechar</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#E6F4F1', flexGrow: 1 },
  card: {
    backgroundColor: '#d1f1f1',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderColor: '#1B8B7F',
    borderWidth: 2,
  },
  label: { fontSize: 14, fontWeight: '600', color: 'black', marginBottom: 6 },
  input: {
    backgroundColor: '#ffffff', borderRadius: 12, padding: 14, fontSize: 16,
    borderColor: '#2BB3A3', borderWidth: 1, marginBottom: 16, color: 'black',
  },
  picker: {
    backgroundColor: '#FFF', borderRadius: 12, borderColor: 'black',
    borderWidth: 1, marginBottom: 12, color: 'black',
  },
  cliqueTexto: { textDecorationLine: 'underline', color: '#B63E3E' },
  botoesContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
  botaoPrimario: {
    backgroundColor: '#2BB3A3', paddingVertical: 14, paddingHorizontal: 28,
    borderRadius: 10, elevation: 3,
  },
  botaoTexto: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  botaoOutline: {
    borderColor: '#2BB3A3', borderWidth: 2, paddingVertical: 14, paddingHorizontal: 28,
    borderRadius: 10, backgroundColor: '#fff', elevation: 2,
  },
  botaoTextoOutline: { color: '#2BB3A3', fontWeight: 'bold', fontSize: 16 },
  modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 12, width: '85%', maxHeight: '80%' },
  modalTitulo: { fontWeight: 'bold', fontSize: 16, marginBottom: 10, color: '#E77E30' },
  modalTexto: { fontSize: 14, color: '#333', marginBottom: 12 },
  modalBotao: { backgroundColor: '#2BB3A3', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  modalBotaoTexto: { color: '#fff', fontWeight: 'bold' },
});
