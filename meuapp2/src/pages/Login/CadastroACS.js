import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';

export default function CadastroACS({ navigation }) {
  const { t } = useTranslation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [cpfInvalido, setCpfInvalido] = useState(false);
  const [emailInvalido, setEmailInvalido] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  function formatCPF(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  function validarCPF(cpf) {
    cpf = cpf.replace(/\D+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = 11 - (soma % 11);
    if (resto >= 10) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = 11 - (soma % 11);
    if (resto >= 10) resto = 0;
    return resto === parseInt(cpf.charAt(10));
  }

  function validarEmail(mail) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(mail).toLowerCase());
  }

  const handleCadastro = async () => {
    const cpfLimpo = cpf.replace(/\D/g, '');
    const emailValido = validarEmail(email.trim());

    if (!nome || !cpfLimpo || !email.trim() || !senha || !confirmarSenha) {
      Alert.alert(t('erro'), t('preencha_todos_campos'));
      return;
    }
    if (!validarCPF(cpf)) {
      Alert.alert(t('erro'), t('cpf_invalido'));
      return;
    }
    if (!emailValido) {
      Alert.alert(t('erro'), t('email_invalido'));
      return;
    }
    if (senha.length < 6) {
      Alert.alert(t('erro'), t('senha_minima'));
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert(t('erro'), t('senhas_diferentes'));
      return;
    }

    setLoading(true);
    try {
      const body = `nome=${encodeURIComponent(nome)}` +
                   `&cpf=${cpfLimpo}` +
                   `&email=${encodeURIComponent(email.trim())}` +
                   `&senha=${senha}` +
                   `&perfil=acs`;
      const response = await fetch('https://voxforge.com.br/api/cadastro.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      const json = await response.json();
      if (json.status === 'ok') {
        Alert.alert(t('sucesso'), t('cadastro_ok'), [
          { text: 'OK', onPress: () => navigation.navigate('LoginACS') }
        ]);
      } else {
        Alert.alert(t('erro'), json.mensagem || 'Erro ao cadastrar.');
      }
    } catch (error) {
      Alert.alert(t('erro'), t('erro_conexao'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
        <View style={styles.outerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.botaoVoltar}>
            <Text style={{ fontSize: 16, color: '#2BB3A3' }}>◀ {t('voltar')}</Text>
          </TouchableOpacity>

          <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Image source={require('../../img/pecapa.png')} style={styles.logo} />
            <Text style={styles.title}>{t('cadastro_titulo')}</Text>
            <Text style={styles.subtitle}>{t('cadastro_subtitulo')}</Text>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder={t('nome_placeholder')}
                value={nome}
                onChangeText={setNome}
                placeholderTextColor='#999'
              />
              <TextInput
                style={[styles.input, cpfInvalido && styles.inputErro]}
                placeholder={t('cpf_placeholder')}
                keyboardType='numeric'
                value={cpf}
                onChangeText={text => {
                  const f = formatCPF(text);
                  setCpf(f);
                  if (f.length === 14) setCpfInvalido(!validarCPF(f));
                  else setCpfInvalido(false);
                }}
                maxLength={14}
                placeholderTextColor='#999'
              />
              {cpfInvalido && <Text style={styles.textoErro}>{t('cpf_invalido')}</Text>}

              <TextInput
                style={[styles.input, emailInvalido && styles.inputErro]}
                placeholder={t('email_placeholder')}
                keyboardType='email-address'
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  setEmailInvalido(text.length > 0 && !validarEmail(text));
                }}
                placeholderTextColor='#999'
              />
              {emailInvalido && <Text style={styles.textoErro}>{t('email_invalido')}</Text>}

              <TextInput
                style={styles.input}
                placeholder={t('senha_placeholder')}
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
                placeholderTextColor='#999'
              />
              <TextInput
                style={styles.input}
                placeholder={t('confirmar_senha_placeholder')}
                secureTextEntry
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                placeholderTextColor='#999'
              />

              <TouchableOpacity style={styles.button} onPress={handleCadastro} disabled={loading}>
                {loading ? (
                  <ActivityIndicator color='#fff' />
                ) : (
                  <Text style={styles.buttonText}>{t('botao_cadastrar')}</Text>
                )}
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E6F4F1',
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginBottom: 20,
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
    top: 50,
    left: 20,
    zIndex: 10,
  },
  inputErro: {
    borderColor: 'red',
  },
  textoErro: {
    color: 'red',
    fontSize: 13,
    marginTop: -10,
    marginBottom: 8,
    marginLeft: 4,
  },
});
