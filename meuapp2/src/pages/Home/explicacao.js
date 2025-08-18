import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';

export default function Explicacao({ navigation }) {
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1, backgroundColor: '#E6F4F1' }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Seç?o 1 */}
        <View style={styles.block}>
          <Image source={require('../../img/enfdir.png')} style={styles.avatarOverlayRight} />
          <View style={styles.card}>
            <Text style={styles.text}>{t('explicacao_1')}</Text>
          </View>
        </View>

        {/* Seç?o 2 */}
        <View style={[styles.block, styles.blockReverse]}>
          <Image source={require('../../img/enfesq.png')} style={styles.avatarOverlayLeft} />
          <View style={styles.card}>
            <Text style={styles.text}>{t('explicacao_2')}</Text>
          </View>
        </View>

        {/* Seç?o 3 */}
        <View style={styles.block}>
          <Image source={require('../../img/enfdir.png')} style={styles.avatarOverlayRight} />
          <View style={[styles.card, { backgroundColor: '#d1f1f1' }]}>
            <Text style={[styles.text, styles.alertText]}>
              {t('explicacao_3')}
            </Text>
            <Image source={require('../../img/amputacao.png')} style={styles.image} resizeMode="contain" />
          </View>
        </View>

        {/* Bot?o */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profissao')}>
          <Text style={styles.buttonText}>{t('continuar')}</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  block: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  blockReverse: {
    flexDirection: 'row-reverse',
  },
  card: {
    flex: 1,
    backgroundColor: '#e0f8f5',
    borderRadius: 14,
    padding: 16,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#1B8B7F',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  text: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  alertText: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 12,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999',
  },
  avatarOverlayRight: {
    width: 90,
    height: 150,
    marginTop: 10,
    marginRight: -25,
    zIndex: 1,
  },
  avatarOverlayLeft: {
    width: 90,
    height: 150,
    marginTop: 10,
    marginLeft: -30,
    zIndex: 1,
  },
  button: {
    backgroundColor: '#2BB3A3',
    padding: 14,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
    width: '60%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  backButton: {
    padding: 15,
    paddingLeft: 20,
  },
  backText: {
    fontSize: 16,
    color: '#2BB3A3',
    fontWeight: 'bold',
  },
});
