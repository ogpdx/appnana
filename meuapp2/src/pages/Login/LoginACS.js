import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

export default function LoginACS({ navigation }) {
  const fade = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(40)).current;
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fade, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideUp, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const formatCPF = v =>
    v.replace(/\D/g, '')
     .replace(/(\d{3})(\d)/, '$1.$2')
     .replace(/(\d{3})(\d)/, '$1.$2')
     .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  const handleLogin = async () => {
    const cleanCpf = cpf.replace(/\D/g, '');
    if (!cleanCpf || !senha) {
      Alert.alert(t('erro'), t('preencha_cpf_senha'));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('https://voxforge.com.br/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `cpf=${cleanCpf}&senha=${senha}&perfil=acs`,
      });
      const json = await res.json();
      if (json.status === 'ok') {
        await AsyncStorage.multiSet([
          ['nomeUsuario', json.nome],
          ['cpf', cleanCpf],
          ['senha', senha],
          ['perfil', 'acs'],
          ['id_usuario', String(json.id_usuario)],
        ]);
        navigation.reset({ index: 0, routes: [{ name: 'SplashSucesso', params: { nome: json.nome } }] });
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
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={100}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.botaoVoltar}>
            <Text style={{ fontSize: 16, color: '#2BB3A3' }}>◀ {t('voltar')}</Text>
          </TouchableOpacity>

          <Animated.View style={[styles.header, { opacity: fade }]}>
            <Image source={require('../../img/pecapa.png')} style={styles.logo} />
            <Text style={styles.title}>{t('login_titulo')}</Text>
          </Animated.View>

          <Animated.View style={[styles.form, { opacity: fade, transform: [{ translateY: slideUp }] }]}>
            <TextInput
              style={styles.input}
              placeholder={t('cpf_placeholder')}
              keyboardType="numeric"
              placeholderTextColor="black"
              value={cpf}
              onChangeText={t => setCpf(formatCPF(t))}
            />
            <TextInput
              style={styles.input}
              placeholder={t('senha_placeholder')}
              secureTextEntry
              placeholderTextColor="black"
              value={senha}
              onChangeText={setSenha}
            />

            <TouchableOpacity onPress={() => navigation.navigate('RecuperarSenhaACS')}>
              <Text style={styles.link}>{t('esqueci_senha')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{t('entrar')}</Text>}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text>{t('nao_tem_conta')} </Text>
              <TouchableOpacity onPress={() => navigation.navigate('CadastroACS')}>
                <Text style={styles.link}>{t('criar_conta')}</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#E6F4F1' },
  flex: { flex: 1 },
  container: { flexGrow: 1, padding: 24 },
  header: { alignItems: 'center', marginBottom: 30, paddingTop: 20 },
  logo: { width: 100, height: 100, marginBottom: 16, resizeMode: 'contain' },
  title: { fontSize: 22, fontWeight: '700', color: '#2BB3A3' },
  form: {},
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: 'black',
  },
  link: { color: '#2BB3A3', fontSize: 14, alignSelf: 'flex-end', marginBottom: 24 },
  button: {
    backgroundColor: '#2BB3A3',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center' },
  botaoVoltar: { marginBottom: 20 },
});
