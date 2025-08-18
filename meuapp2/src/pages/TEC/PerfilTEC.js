import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';

export default function PerfilTEC({ navigation }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [senhaSalva, setSenhaSalva] = useState('');
  const [novoNome, setNovoNome] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [editarNome, setEditarNome] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarChanged, setAvatarChanged] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      const nomeSalvo = await AsyncStorage.getItem('nomeUsuario');
      const cpfSalvo = await AsyncStorage.getItem('cpf');
      const senhaSalvaStorage = await AsyncStorage.getItem('senha');
      const avatarUri = await AsyncStorage.getItem('avatarUri');

      if (nomeSalvo) {
        setNome(nomeSalvo);
        setNovoNome(nomeSalvo);
      }
      if (cpfSalvo) setCpf(cpfSalvo);
      if (senhaSalvaStorage) setSenhaSalva(senhaSalvaStorage);
      if (avatarUri) setAvatar({ uri: avatarUri });
    }
    carregarDados();
  }, []);

  const selecionarAvatar = () => {
    Alert.alert('Selecionar imagem', 'Escolha uma opção', [
      {
        text: 'Câmera',
        onPress: () => {
          ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true,
            cropperCircleOverlay: true,
          })
            .then(image => {
              setAvatar({ uri: image.path });
              setAvatarChanged(true);
            })
            .catch(() => {});
        },
      },
      {
        text: 'Galeria',
        onPress: () => {
          ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            cropperCircleOverlay: true,
          })
            .then(image => {
              setAvatar({ uri: image.path });
              setAvatarChanged(true);
            })
            .catch(() => {});
        },
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const salvarAlteracoes = async () => {
    const perfil = await AsyncStorage.getItem('perfil');
    const cpfStorage = await AsyncStorage.getItem('cpf');

    if (!editarNome && !senhaAtual && !novaSenha && !avatarChanged) {
      Alert.alert('Nada alterado', 'Você não modificou nenhum dado.');
      return;
    }
    if (editarNome && !novoNome.trim()) {
      Alert.alert('Erro', 'O nome não pode estar vazio.');
      return;
    }
    if ((senhaAtual && !novaSenha) || (!senhaAtual && novaSenha)) {
      Alert.alert('Erro', 'Preencha ambos os campos de senha para alterar a senha.');
      return;
    }

    setLoading(true);

    try {
      const form = new FormData();
      form.append('cpf', cpfStorage);
      form.append('perfil', perfil.toLowerCase().trim());
      if (editarNome) form.append('nome', novoNome);
      if (senhaAtual && novaSenha) {
        form.append('senha_atual', senhaAtual);
        form.append('nova_senha', novaSenha);
      }
      if (avatarChanged && avatar?.uri) {
        form.append('avatar', {
          uri: avatar.uri,
          type: 'image/jpeg',
          name: 'avatar.jpg',
        });
      }

      const response = await fetch('https://voxforge.com.br/api/alterar_dados.php', {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: form,
      });
      const json = await response.json();

      if (json.status === 'ok') {
        if (editarNome) await AsyncStorage.setItem('nomeUsuario', novoNome);
        if (novaSenha) await AsyncStorage.setItem('senha', novaSenha);
        if (avatarChanged) {
          await AsyncStorage.setItem('avatarUri', avatar.uri);
        }
        Alert.alert('Sucesso', json.mensagem || 'Dados atualizados com sucesso!');
        navigation.goBack();
      } else {
        Alert.alert('Erro', json.mensagem || 'Erro ao atualizar dados.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro na conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  }; 

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <TouchableOpacity onPress={selecionarAvatar} style={styles.avatarContainer}>
          <Image
            source={avatar ? avatar : require('../../img/default_avatar.png')}
            style={styles.avatar}
          />
          <Text style={styles.changeAvatarText}>Alterar foto</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Olá, <Text style={styles.nome}>{nome}</Text></Text>
        <Text style={styles.subtitulo}>Gerencie seus dados abaixo</Text>

        <Text style={styles.label}>CPF</Text>
        <TextInput
          style={[styles.input, { backgroundColor: '#f0f0f0', color: '#333' }]}
          value={cpf}
          editable={false}
        />


        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={[styles.input, { backgroundColor: editarNome ? '#fff' : '#eee' }]}
          editable={editarNome}
          value={novoNome}
          onChangeText={setNovoNome}
        />
        <TouchableOpacity
          onPress={() => setEditarNome(!editarNome)}
          style={styles.checkboxContainer}
        >
          <View style={[styles.checkbox, editarNome && styles.checkboxChecked]} />
          <Text style={styles.checkboxText}>Desejo alterar meu nome</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Senha Atual</Text>
        <TextInput
          style={styles.input}
          placeholder="Senha Atual"
          secureTextEntry
          value={senhaAtual}
          onChangeText={setSenhaAtual}
        />

        <Text style={styles.label}>Nova Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Nova Senha"
          secureTextEntry
          value={novaSenha}
          onChangeText={setNovaSenha}
        />

        <TouchableOpacity style={styles.botao} onPress={salvarAlteracoes} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.botaoTexto}>Salvar Alterações</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoSecundario} onPress={() => navigation.goBack()}>
          <Text style={styles.botaoTextoSecundario}>◀ Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E6F4F1',
    padding: 24,
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#2BB3A3',
  },
  changeAvatarText: {
    color: '#2BB3A3',
    marginTop: 6,
    fontSize: 14,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2BB3A3',
    textAlign: 'center',
  },
  nome: {
    color: '#1a8c7e',
  },
  subtitulo: {
    textAlign: 'center',
    fontSize: 15,
    color: '#666',
    marginBottom: 25,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 15,
    marginBottom: 6,
    marginTop: 10,
    color: '#333',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#2BB3A3',
    marginRight: 8,
    borderRadius: 4,
  },
  checkboxChecked: {
    backgroundColor: '#2BB3A3',
  },
  checkboxText: {
    color: '#2BB3A3',
    fontSize: 15,
  },
  botao: {
    backgroundColor: '#2BB3A3',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  botaoSecundario: {
    marginTop: 15,
    alignItems: 'center',
  },
  botaoTextoSecundario: {
    color: '#2BB3A3',
    fontSize: 16,
    fontWeight: '600',
  },
});
