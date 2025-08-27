// src/pages/ENF/AvaVascular.js

import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Modal,
    Dimensions,
} from 'react-native'

export default function AvaVascular({ navigation }) {

    const [expandido, setExpandido] = useState(false)
    const screenWidth = Dimensions.get('window').width;

    return (
        <View style={StyleSheet.container}>
            <ScrollView contentContainerStyle={styles.scroll}>

                <View style={styles.header}>
                <Image source={require('../../img/enfdedopcima.jpg')} style={styles.nurseTop} />
                <Text style={styles.title}>Como realizar avaliação vascular em uma pessoa com diabetes e uma úlcera no pé?</Text>
                </View>

                <View style={styles.rowRight}>
                <Text style={styles.infotextvasc}>
                    1 - Verifique a palpação dos pulsos dos pés;{'\n'}
                    (Lembre-se a presença dos pulsos
                    dos pés não exclui DAP);{'\n'}
                    ▪Formato de ondas do doppler arterial dos pés;{'\n'}
                    ▪ Pressão sistólica do tornozelo e índice
                    tornozelo-braço;{'\n'}
                    ▪ Pressão sistólica do dedo e índice dedo-braço;
                </Text>
                </View>

                <View style={styles.rowLeft}>
                <Image source={require('../../img/enfesqrd.jpg')} style={styles.nurseRight} />
                <Text style={styles.bubbleTextOne}>
                    DAP é menos provável se:{'\n'}
                    ▪ Formato de ondas trifásicas OU bifásicas;{'\n'}
                    ▪ Índice tornozelo-braço (ITB){'\n'}
                    0.9 – 1.3;{'\n'}
                    ▪ Índice dedo-braço (IDB) ≥ 0.75;
                </Text>
                </View>

                <Image source={require('../../img/esfdirt.jpg')} style={styles.nurseLeft} />
                <Text style={styles.bubbleTextTwo}>
                    Se os valores estiverem anormais, mas não houver isquemia grave, verifique se
                    existe infecção ou úlcera profunda?
                </Text>
            </ScrollView>

                 <View style={styles.footer}>
                        <TouchableOpacity
                          style={[styles.button, styles.backButton]}
                          onPress={() => navigation.navigate('HubENF')}
                        >
                          <Text style={styles.buttonText}>Voltar</Text>
                        </TouchableOpacity>
                
                        <TouchableOpacity
                          style={[styles.button, styles.nextButton]}
                          onPress={() => navigation.navigate('VascularDois')}
                        >
                          <Text style={styles.buttonText}>Avançar</Text>
                        </TouchableOpacity>
                      </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex:1, backgroundColor: '#fff'},
    scroll: { padding: 25, },

    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, },
    nurseTop: { width: 70, height: 80, resizeMode: 'contain', marginRight: 0 },
    title: { fontSize: 19, fontWeight: 'bold' },

    rowRight: { alignItems: 'flex-end', marginBottom: 15, },
    nurseRight: { width: 360, height: 230, marginLeft: 10, resizeMode: 'contain' },
    bubbleTextOne: {
    position: 'absolute',
    top: 22,
    right: 150,
    width: 185,
    fontSize: 12,
    textAlign: 'justify',
    fontWeight: '600',
  },

    rowLeft: { alignItems: 'flex-start', marginBottom: 40 },
    nurseLeft: { width: 340, height: 280, resizeMode: 'contain' },
    bubbleTextTwo: {
    position: 'absolute',
    top: 50,
    left: 130,
    width: 170,
    fontSize: 13,
    textAlign: 'justify',
    fontWeight: '600',
  },
  
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 80,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButton: { backgroundColor: '#aaa' },
  nextButton: { backgroundColor: '#5bb5b0' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});