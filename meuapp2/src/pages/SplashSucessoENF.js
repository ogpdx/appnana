import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, Animated, Easing,
  ActivityIndicator, StatusBar, SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import { useTranslation } from 'react-i18next';

const COLORS = {
  primary: '#2BB3A3',
  primaryDark: '#1E8E83',
  bg: '#0F2A2D',
  card: 'rgba(255,255,255,0.08)',
  text: '#E6FAF7',
  muted: '#B8DAD5',
  footer: '#92C9C2',
};

export default function SplashSucesso({ navigation }) {
  const { t } = useTranslation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(16)).current;
  const [nome, setNome] = useState(t('common.userFallback', { defaultValue: 'Usuário' }));

  useEffect(() => {
    (async () => {
      try {
        const nomeSalvo = await AsyncStorage.getItem('nomeUsuario');
        if (nomeSalvo && nomeSalvo.trim()) setNome(nomeSalvo);
      } catch {}
    })();

    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 520, useNativeDriver: true }),
      Animated.timing(slideUp, { toValue: 0, duration: 520, easing: Easing.out(Easing.quad), useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('HubENF');
    }, 3200);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      <View style={styles.container}>
        {/* Selo de confirmação via Lottie */}
        <View style={styles.lottieWrap}>
          <LottieView
            source={require('../animations/success.json')}
            autoPlay
            loop={false}
            style={styles.lottie}
          />
        </View>

        {/* Card de mensagem */}
        <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideUp }] }]}>
          <Text style={styles.title}>{t('splash.accessAuthorized')}</Text>
          <Text style={styles.name}>{nome}</Text>
          <Text style={styles.subtitle}>{t('splash.preparingPanel')}</Text>
          <ActivityIndicator size="small" color={COLORS.text} style={{ marginTop: 14 }} />
        </Animated.View>

        {/* Rodapé */}
        <Text style={styles.footer}>{t('common.footerRight')}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: {
    flex: 1, backgroundColor: COLORS.bg, paddingHorizontal: 24,
    justifyContent: 'center', alignItems: 'center',
  },
  lottieWrap: {
    width: 96, height: 96, borderRadius: 96, backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center', elevation: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.32, shadowRadius: 8, marginBottom: 28, overflow: 'hidden',
  },
  lottie: { width: 80, height: 80 },
  card: {
    alignItems: 'center', backgroundColor: COLORS.card, paddingVertical: 20,
    paddingHorizontal: 22, borderRadius: 16, width: '88%', maxWidth: 360,
  },
  title: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  name: { fontSize: 20, fontWeight: '800', color: '#FFF', marginTop: 4 },
  subtitle: { fontSize: 14, color: COLORS.muted, marginTop: 6, textAlign: 'center' },
  footer: { position: 'absolute', bottom: 18, fontSize: 12, color: COLORS.footer },
});
