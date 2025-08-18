import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // IMPORTANTE

export default function TelaOrientacoesCategoria3() {
  const navigation = useNavigation(); // NECESSÁRIO para navegação funcionar

  return (
    <ScrollView style={styles.container}>
      {/* Bloco 1 - Exercício */}
      <View style={styles.card}>
        <Text style={styles.textoCard}>
          • Buscar profissional de saúde para programa de exercícios individualizado e supervisionado{'\n\n'}
          • Atividades seguras incluem: caminhar, subir escadas e exercícios leves de fortalecimento (que envolvem suportar o próprio peso){'\n\n'}
          • Meta: aumentar gradualmente para 1000 passos diários
        </Text>
      </View>
      <Image source={require('../../img/corrida.png')} style={styles.imagem} />
      
      {/* Bloco 2 - Temperatura e deformidades */}  
      <View style={styles.card}>
        <Text style={styles.textoCard}>
          Oriente o paciente a monitorar diariamente a temperatura dos pés para identificar sinais precoces de inflamação e prevenir úlceras. 
          Caso a diferença de temperatura entre os pés ultrapasse 2,2 °C, deve-se procurar um profissional de saúde imediatamente. 
          Ele pode utilizar um termômetro infravermelho.
        </Text>
      </View>
      <Image source={require('../../img/termometro.png')} style={styles.imagemPequena} />

      <View style={styles.card}>
        <Text style={styles.textoCard}>
          Instrua os pacientes com deformidades nos pés ou lesões pré-ulcerativas a procurar o enfermeiro ou o médico para orientação sobre:{'\n'}
          • sapatos extra-profundos{'\n'}
          • calçados personalizados{'\n'}
          • palmilhas sob medida{'\n'}
          • órteses para os dedos
        </Text>
      </View>
      <Image source={require('../../img/ortese.png')} style={styles.imagem2} />

      {/* Bloco 3 - Técnicas e ACS */}
      <Image source={require('../../img/palmilha.png')} style={styles.imagem} />
      <Image source={require('../../img/atencao.png')} style={styles.imagem3} />
      <Text style={styles.tituloSecao}>Técnica de Enfermagem</Text>
      <View style={styles.card}>
        <Text style={styles.textoCard}>
          Realizar cuidados como remover calos e drenar bolhas, além de encaminhar o paciente ao enfermeiro ou médico da UBS para tratar:{'\n'}
          • fissuras{'\n'}
          • unhas encravadas{'\n'}
          • dedo em martelo{'\n'}
          • infecções fúngicas.
        </Text>
      </View>

      <Text style={[styles.tituloSecao, { color: '#388E3C' }]}>ACS</Text>
      <View style={styles.card}>
        <Text style={styles.textoCard}>
          Agendar consulta de enfermagem e/ou médica caso o paciente precise remover calos ou drenar bolhas, tratar:{'\n'}
          • fissuras{'\n'}
          • dedo em martelo{'\n'}
          • unhas encravadas{'\n'}
          • infecções fúngicas.
        </Text>
      </View>
      <Image source={require('../../img/dedomartelo.png')} style={styles.imagemPequena} />

      {/* Bloco 4 - Ulcera plantar */}
      <View style={styles.card}>
        <Text style={styles.textoCard}>
          Após a cura de uma úlcera plantar, encaminhe o paciente ao médico e/ou enfermeiro para prescrição de calçados terapêuticos que aliviem a pressão plantar.{'\n\n'}
          Oriente o uso consistente desses calçados dentro e fora de casa para prevenir recorrências.
        </Text>
      </View>

      {/* Botão de voltar */}
      <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2FBF9',
    padding: 16
  },
  card: {
    backgroundColor: '#E1F3F0',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10
  },
  textoCard: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000'
  },
  tituloSecao: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 6,
    color: '#D32F2F'
  },
  imagem: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
    marginBottom: 10
  },
  imagem2: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10
  },
  imagem3: {
    width: '100%',
    height: 50,
    resizeMode: 'contain',
    marginBottom: 10
  },
  imagemPequena: {
    width: '100%',
    height: 140,
    resizeMode: 'contain',
    marginBottom: 10
  },
  botaoVoltar: {
    backgroundColor: '#009688',
    padding: 10,
    borderRadius: 6,
    marginBottom: 80
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
