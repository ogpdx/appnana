// src/pages/ENF/VascularDois.js

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

export default function VascularDois({ navigation }) {

    const [expandido, setExpandido] = useState(false)
    const screenWidth = Dimensions.get('window').width;
    const [imgFullScreen, setImgFullScreen] = useState(false)

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>

                <View style={styles.rowLeft}>
                    <Image source={require('../../img/enfesqrd.jpg')} style={styles.nurseRight} />
                    <Text style={styles.bubbleTextOne}>
                        Se a úlcera não cicatrizar dentro de 4 a 6 semanas, o paciente deve ser encaminhado para avaliação vascular, independentemente dos testes realizados.
                    </Text>
                </View>

                <View style={styles.rowRight}>
                    <Image source={require('../../img/esfdirt.jpg')} style={styles.nurseRight} />
                    <Text style={styles.bubbleTextTwo}>
                        Isquemia grave ocorre quando a pressão sistólica do tornozelo é inferior a 50mmHg, o índice tornozelo-braço é menor que 0,5 ou a pressão sistólica do dedo está abaixo de 30mmHg.
                    </Text>
                </View>

                <View style={styles.rowLeftTwo}>
                    <Image source={require('../../img/enfesqrd.jpg')} />
                    <Text style={styles.bubbleTextThree}>
                        Atenção! Se o paciente apresenta isquemia grave, encaminhe para o vascular! 
                    </Text>
                </View>

                <Image source={require('../../img/pressaodedo.jpg')} />
            </ScrollView>

             <View style={styles.footer}>
                <TouchableOpacity
                style={[styles.button, styles.backButton]}
                onPress={() => navigation.navigate('HubENF')}
                >
                <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
                </View> 

        </View>
    )
}