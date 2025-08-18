import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function RecuperarSenhaTEC({ navigation }) {
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideUp, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  function formatCPF(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  const solicitarRecuperacao = async () => {
    const cpfLimpo = cpf.replace(/\D/g, '');
    if (!cpfLimpo) {
      Alert.alert('Erro', 'Digite um CPF válido.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://voxforge.com.br/api/recuperar_senha.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `cpf=${cpfLimpo}`,
      });
      const json = await response.json();
      setLoading(false);
      if (json.status === 'ok') {
        Alert.alert(
          'Enviado',
          'Se o CPF estiver cadastrado, você receberá um e‑mail com instruções.',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } else {
        Alert.alert('Erro', json.mensagem || 'Não foi possível processar.');
      }
    } catch (err) {
      setLoading(false);
      Alert.alert('Erro', 'Falha na conexão. Tente novamente.');
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideUp }] }]}>    
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>◀ Voltar</Text>
          </TouchableOpacity>


          <Text style={styles.title}>Recuperar Senha</Text>
          <Text style={styles.subtitle}>
            Informe o CPF cadastrado. Enviaremos um e‑mail com instruções.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu CPF"
            keyboardType="numeric"
            placeholderTextColor="#999"
            value={cpf}
            onChangeText={t => setCpf(formatCPF(t))}
            maxLength={14}
          />

          <TouchableOpacity style={styles.button} onPress={solicitarRecuperacao} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Enviar e‑mail</Text>
            )}
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#E6F4F1' },
  flex: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  backButton: {
  position: 'absolute',
  top: Platform.OS === 'ios' ? 50 : 30,
  left: 20,
  zIndex: 10,
},
backText: {
  fontSize: 16,
  color: '#2BB3A3',
  fontWeight: '600',
},

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2BB3A3',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2BB3A3',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  botaoTextoSecundario: {
    color: '#2BB3A3',
    fontSize: 16,
    fontWeight: '600',
  },
});
