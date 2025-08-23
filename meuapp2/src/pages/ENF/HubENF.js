import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

export default function HubENF({ navigation }) {
  const { t, i18n } = useTranslation();
  const [nome, setNome] = useState('');
  const [avatar, setAvatar] = useState(null); 
  const [saindo, setSaindo] = useState(false);
  const [idiomaModal, setIdiomaModal] = useState(false);

  const idiomas = {
    pt: { label: 'Português', bandeira: require('../../img/brasil.png') },
    en: { label: 'English', bandeira: require('../../img/ingles.png') },
    es: { label: 'Español', bandeira: require('../../img/espanha.png') },
  };

  const idiomaAtual = i18n.language.split('-')[0] || 'pt';

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        const nomeSalvo = await AsyncStorage.getItem('nomeUsuario');
        const avatarUri = await AsyncStorage.getItem('avatarUri');
        setNome(nomeSalvo || 'Usuário');
        if (avatarUri) setAvatar({ uri: avatarUri });
      } catch {
        setNome('Usuário');
      }
    });
    return unsubscribe;
  }, [navigation]);

  const trocarIdioma = (lang) => {
    i18n.changeLanguage(lang);
    setIdiomaModal(false);
  };

  const confirmarSaida = () => {
    setTimeout(() => {
      Alert.alert(
        t('sair'),
        t('confirmar_sair'),
        [
          { text: t('cancelar'), style: 'cancel' },
          { text: t('sair'), onPress: sair, style: 'destructive' },
        ],
        { cancelable: true }
      );
    }, 100);
  };

  const sair = async () => {
    setSaindo(true);
    await AsyncStorage.multiRemove(['nomeUsuario', 'cpf', 'senha', 'perfil']);
    setTimeout(() => {
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    }, 800);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.idiomaBtn} onPress={() => setIdiomaModal(true)}>
            <Image source={idiomas[idiomaAtual].bandeira} style={styles.bandeira} />
          </TouchableOpacity>

          <Image
            source={avatar ? avatar : require('../../img/default_avatar.png')}
            style={styles.avatar}
          />
          <Text style={styles.boasVindas}>{t('ola')},</Text>
          <Text style={styles.nome}>{nome} 👋</Text>
          <Text style={styles.subtitulo}>{t('o_que_deseja_fazer')}</Text>
        </View>

        <View style={styles.menu}>
          <TouchableOpacity style={styles.botaoMenu} onPress={() => navigation.navigate('TelaSupervisaoENF')}>
            <Text style={styles.emoji}>📝</Text>
            <Text style={styles.botaoTexto}>{t('nova_avaliacao')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoMenu} onPress={() => navigation.navigate('ConsultasAnterioresENF')}>
            <Text style={styles.emoji}>📋</Text>
            <Text style={styles.botaoTexto}>{t('minhas_avaliacoes')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoMenu} onPress={() => navigation.navigate('PerfilENF')}>
            <Text style={styles.emoji}>👤</Text>
            <Text style={styles.botaoTexto}>{t('meu_perfil')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoMenu} onPress={() => navigation.navigate('')}>
            <Text style={styles.emoji}>🎥</Text>
            <Text style={styles.botaoTexto}>{t('videos_instrucionais')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoMenu} onPress={() => navigation.navigate('')}>
            <Text style={styles.emoji}>📚</Text>
            <Text style={styles.botaoTexto}>{t('diretrizes_iwgdf')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoMenu} onPress={() => navigation.navigate('')}>
            <Text style={styles.emoji}>📖</Text>
            <Text style={styles.botaoTexto}>{t('cartilha_autocuidado')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.botaoSaida, { backgroundColor: '#fff' }]} onPress={confirmarSaida} disabled={saindo}>
            {saindo ? (
              <ActivityIndicator size="small" color="#2BB3A3" />
            ) : (
              <Text style={styles.saidaTexto}>{t('sair')}</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal isVisible={idiomaModal} onBackdropPress={() => setIdiomaModal(false)}>
        <View style={styles.modalContainer}>
          {Object.entries(idiomas).map(([key, { label, bandeira }]) => (
            <TouchableOpacity key={key} style={styles.idiomaOpcao} onPress={() => trocarIdioma(key)}>
              <Image source={bandeira} style={styles.bandeiraOpcao} />
              <Text style={styles.idiomaTexto}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E6F4F1',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#F7F7F7',
    marginBottom: 25,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  idiomaBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  bandeira: {
    width: 32,
    height: 22,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#2BB3A3',
    marginBottom: 12,
  },
  boasVindas: {
    fontSize: 18,
    color: '#2BB3A3',
  },
  nome: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2BB3A3',
  },
  subtitulo: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
  },
  menu: {
    flex: 1,
    paddingHorizontal: 20,
  },
  botaoMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2BB3A3',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  emoji: {
    fontSize: 22,
  },
  botaoSaida: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#2BB3A3',
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 16,
  },
  saidaTexto: {
    color: '#2BB3A3',
    fontSize: 18,
    fontWeight: '600',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  idiomaOpcao: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bandeiraOpcao: {
    width: 32,
    height: 22,
    marginRight: 12,
    borderRadius: 4,
  },
  idiomaTexto: {
    fontSize: 16,
  },
});
