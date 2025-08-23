import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert
} from 'react-native';

export default function LoginEnfermeiro({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const handleCpfChange = (text) => {
    setCpf(formatCPF(text));
  };

  const handleLogin = async () => {
    const cpfLimpo = cpf.replace(/\D/g, '');
    if (!cpfLimpo || !senha) {
      Alert.alert('Erro', 'Preencha CPF e senha.');
      return;
    }

    try {
      const response = await fetch('https://voxforge.com.br/api/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `cpf=${cpfLimpo}&senha=${senha}&perfil=enfermeiro`,
      });

      const json = await response.json();
      if (json.status === 'ok') {
        Alert.alert('Bem-vindo', `Olá, ${json.nome}!`);
        navigation.reset({ index: 0, routes: [{ name: 'SplashSucessoENF', params: { nome: json.nome } }] });
              } else {
                Alert.alert(t('erro'), json.mensagem || t('cpf_senha_invalidos'));
              }
            } catch (e) {
              Alert.alert(t('erro'), t('erro_conexao'));
            } finally {
              setLoading(false);
            }
          };

  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(241, 241, 241)' }}>
      {/* Botão voltar fixo */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.botaoVoltar}>
        <Text style={styles.setaVoltar}>←</Text>
      </TouchableOpacity>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View style={styles.outerContainer}>
            <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
              <Image source={require('../../img/saudefamilia.png')} style={styles.logo} />
              <Text style={styles.title}>Login - Enfermeiro</Text>

              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="Digite seu CPF"
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                  value={cpf}
                  onChangeText={handleCpfChange}
                  maxLength={14}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
                  secureTextEntry
                  placeholderTextColor="#999"
                  value={senha}
                  onChangeText={setSenha}
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                  <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgb(241, 241, 241)',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2BB3A3',
    marginBottom: 30,
  },
  form: {
    width: '100%',
    gap: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    elevation: 2,
  },
  button: {
    backgroundColor: '#2BB3A3',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  botaoVoltar: {
    position: 'absolute',
    top: 30,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    borderColor: '#2BB3A3',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  setaVoltar: {
    fontSize: 26,
    color: '#2BB3A3',
    fontWeight: 'bold',
    marginTop: -2,
  },
});