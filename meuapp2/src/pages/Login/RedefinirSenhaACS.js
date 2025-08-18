import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function RedefinirSenhaACS({ route, navigation }) {
  const { token } = route.params;
  const [senhaNova, setSenhaNova] = useState('');
  const [senhaConfirma, setSenhaConfirma] = useState('');
  const [loading, setLoading] = useState(false);
  const fade = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fade, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideUp, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleReset = async () => {
    if (!senhaNova || !senhaConfirma) {
      Alert.alert('Erro', 'Preencha ambos os campos de senha.');
      return;
    }
    if (senhaNova !== senhaConfirma) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    setLoading(true);
    try {
      const response = fetch('https://voxforge.com.br/api/reset_senha.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `token=${encodeURIComponent(token)}&nova_senha=${encodeURIComponent(senhaNova)}`
        });
      const json = await response.json();
      setLoading(false);
      if (json.status === 'ok') {
        Alert.alert('Sucesso', 'Senha redefinida com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate('LoginACS') }
        ]);
      } else {
        Alert.alert('Erro', json.mensagem || 'Não foi possível redefinir a senha.');
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
        behavior={Platform.OS==='ios'?'padding':undefined}
        keyboardVerticalOffset={80}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>

          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#2BB3A3" />
          </TouchableOpacity>

          <Animated.View style={[styles.inner, { opacity: fade, transform:[{translateY:slideUp}] }]}>  
            <Text style={styles.title}>Redefinir Senha</Text>
            <Text style={styles.subtitle}>Digite sua nova senha abaixo</Text>

            <TextInput
              style={styles.input}
              placeholder="Nova senha"
              placeholderTextColor="#999"
              secureTextEntry
              value={senhaNova}
              onChangeText={setSenhaNova}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirme a senha"
              placeholderTextColor="#999"
              secureTextEntry
              value={senhaConfirma}
              onChangeText={setSenhaConfirma}
            />

            <TouchableOpacity style={styles.button} onPress={handleReset} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Redefinir</Text>
              )}
            </TouchableOpacity>
          </Animated.View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex:1, backgroundColor:'#E6F4F1' },
  flex:{ flex:1 },
  container:{ flexGrow:1, justifyContent:'center', padding:24 },
  back:{ position:'absolute', top:20, left:20, zIndex:10 },
  inner:{ backgroundColor:'#fff', borderRadius:10, padding:20, elevation:2 },
  title:{ fontSize:24, fontWeight:'700', color:'#2BB3A3', textAlign:'center', marginBottom:10 },
  subtitle:{ fontSize:16, color:'#555', textAlign:'center', marginBottom:20 },
  input:{ backgroundColor:'#f9f9f9', borderRadius:8, padding:14, marginBottom:16, borderWidth:1, borderColor:'#ddd' },
  button:{ backgroundColor:'#2BB3A3', paddingVertical:16, borderRadius:8, alignItems:'center' },
  buttonText:{ color:'#fff', fontSize:16, fontWeight:'600' },
});
