import React, { useReducer, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useTranslation } from 'react-i18next';

export default function Home({ navigation }) { 
  const { t, i18n } = useTranslation();
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Botão de idioma */}
      <TouchableOpacity style={styles.languageButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.title2}>{t('AlterarIdioma')}</Text>
      </TouchableOpacity>

      {/* Topo com logo */}
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Image source={require('../../img/saudefamilia.png')} style={{ width: 100, height: 100 }} />
      </View>

      {/* Título */}
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', bottom: 80 }}>
        <Text style={styles.title}>PéSaúde</Text>
      </View>

      {/* Imagem principal */}
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', bottom: 120 }}>
        <Image source={require('../../img/pecapa.png')} style={{ width: 200, height: 200 }} />
      </View>

      {/* Subtítulo */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', bottom: 70 }}>
        <Text style={styles.subtitle}>{t('subtitle')}</Text>
      </View>

      {/* Botão de avaliação */}
      <View style={{ justifyContent: 'center', alignItems: 'center', bottom: 50 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('index2')}
        >
          <Text style={styles.buttonText}>{t('startEvaluation')}</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de idiomas */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Selecione o idioma</Text>
            <TouchableOpacity onPress={() => { i18n.changeLanguage('pt'); setModalVisible(false); forceUpdate(); }}>
              <Text style={styles.modalOption}>🇧🇷 Português</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { i18n.changeLanguage('es'); setModalVisible(false); forceUpdate(); }}>
              <Text style={styles.modalOption}>🇪🇸 Español</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { i18n.changeLanguage('en'); setModalVisible(false); forceUpdate(); }}>
              <Text style={styles.modalOption}>🇺🇸 English</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Image source={require('../../img/logofacisbnova.png')} style={styles.logo} />
        <Image source={require('../../img/logoha.png')} style={styles.logo} />
        <Image source={require('../../img/prefeiturabarretos.png')} style={styles.logo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4F1',
  },
  title: {
    fontFamily: 'Pacifico-Regular',
    fontSize: 35,
    color: '#333333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title2: {
    fontFamily: 'Pacifico-Regular',
    fontSize: 12,
    color: '#333333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Pacifico-Regular',
    fontSize: 25,
    color: '#333333',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#2BB3A3',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: 'Pacifico-Regular',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
    padding: 8,
  },
  logo: {
    width: 110,
    height: 123,
    resizeMode: 'contain',
  },
  languageButton: {
    position: 'absolute',
    top: 20,
    left: 15,
    zIndex: 10,
  },
  languageIcon: {
    width: 30,
    height: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: 250,
    elevation: 5,
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15,
  },
  modalOption: {
    fontSize: 16,
    paddingVertical: 10,
  },
});
