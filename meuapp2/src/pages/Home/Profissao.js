import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';

export default function Profissao({ navigation }) {
  const { t } = useTranslation();
  const [selecionado, setSelecionado] = useState('ACS');

  const opcoes = [
    { id: 'ACS', label: t('acs') },
    { id: 'Tecnico', label: t('tecnico') },
    { id: 'Enfermeiro', label: t('enfermeiro') },
    { id: 'Medico', label: t('medico') },
    { id: 'Unidade', label: t('unidade') },
  ];

  const continuar = () => {
    if (!selecionado) {
      Alert.alert(t('atencao'), t('selecioneProfissao'));
      return;
    }

    const rotas = {
      ACS: 'LoginACS',
      Tecnico: 'LoginTecnico',
      Enfermeiro: 'LoginEnfermeiro',
      Medico: 'LoginMedico',
      Unidade : 'LoginUnidade',
    };

    navigation.navigate(rotas[selecionado]);
  };

  return (
    <ScrollView style={styles.scroll}>
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.botaoVoltar}>
        <Text style={styles.voltarTexto}>◀ {t('voltar')}</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <Image source={require('../../img/enfdir.png')} style={styles.avatar2} />
        <View style={styles.card}>
          <Text style={styles.cardText}>{t('mensagemProfissional')}</Text>
        </View>
      </View>

      <View style={styles.rowReverse}>
        <Image source={require('../../img/enfesq.png')} style={styles.avatar} />
        <View style={styles.card}>
          <Text style={styles.cardText}>{t('selecioneProfissao')}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Image source={require('../../img/enfdir.png')} style={styles.avatar2} />
        <View style={styles.card}>
          <Text style={styles.cardText}>{t('mensagemProfissional2')}</Text>   
        </View>
      </View>
      <View style={styles.opcoes}>
        {opcoes.map((opcao) => (
          <TouchableOpacity
            key={opcao.id}
            style={[
              styles.opcao,
              selecionado === opcao.id && styles.opcaoSelecionada,
            ]}
            onPress={() => setSelecionado(opcao.id)}
          >
            <Text style={styles.opcaoTexto}>{opcao.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
        
      <TouchableOpacity style={styles.button} onPress={continuar}>
        <Text style={styles.buttonText}>{t('continuar')}</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
}

const largura = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4F1',
    padding: 20,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#E6F4F1',
    padding: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B8B7F',
    textAlign: 'center',
    marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  rowReverse: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  avatar: {
    width: 120,
    height: 150,
    marginTop: 10,
    marginHorizontal: -20,
    zIndex: 1,
  },
  avatar2: {
    position: 'flex',
    width: 120,
    height: 150,
    marginTop: 10,
    marginHorizontal: -20,
    zIndex: 1,
  },
  card: {
    backgroundColor: '#d1f1f1',
    borderRadius: 15,
    padding: 15,
    flex: 1,
    marginLeft: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#1B8B7F',
  },
  cardText: {
    fontSize: 15,
    color: '#333',
  },
  opcoes: {
    marginTop: 15,
    gap: 10,
  },
  opcao: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2BB3A3',
  },
  opcaoSelecionada: {
    backgroundColor: '#2BB3A3',
  },
  opcaoTexto: {
    color: '#1B1B1B',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2BB3A3',
    paddingVertical: 14,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 30,
    width: largura * 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
    marginBottom: 60,
    
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  botaoVoltar: {
  marginTop: 10,
  marginBottom: 5,
},

voltarTexto: {
  fontSize: 16,
  color: '#2BB3A3',
  fontWeight: '600',
},

});
