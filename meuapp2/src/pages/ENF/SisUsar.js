// src/pages/ENF/SisUsar.js

import React, { useState } from 'react'
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Modal,
} from 'react-native'

export default function SisUsar({ navigation }) {

    const [modalSINDAB, setModalSINDAB] = useState(false)
    const [modalWIFI, setModalWIFI] = useState(false)
    const [modalIDSA, setModalIDSA] = useState(false)

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>

                {/* Duas enfermeiras com balão */}
                <Image source={require('../../img/duasenf.jpg')} style={styles.headerImage} />
                <Text style={styles.title}>Escolha o sistema que você deseja usar nesse momento</Text>

                {/* Texto principal */}
                <View style={styles.classificacoes}>
                    <Text style={styles.bubbleText}>
                        SINDAB - Indicado para profissionais da Atenção Básica que não possuem equipamentos e nem experiência {"\n\n"}
                        WIFI - Indicado para profissionais treinados e que possuam equipamentos, o método avalia isquemia, DAP e infecção, estimando o risco de amputação em 1 ano e a necessidade de revascularização para cicatrização e preservação do membro. {"\n\n"}
                        IDSA/IWGDF - Primeira opção para caracterizar uma pessoa com úlcera infectada quando não há equipamentos e nem experiência. Auxilia na identificação dos pacientes com necessidade de internação hospitalar para antibioticoterapia.
                    </Text>
                </View>

                {/* Botões que abrem modais */}
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.button} onPress={() => setModalSINDAB(true)}>
                        <Text style={styles.buttonText}>SINDAB</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => setModalWIFI(true)}>
                        <Text style={styles.buttonText}>WIFI</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => setModalIDSA(true)}>
                        <Text style={styles.buttonText}>IDSA/IWGDF</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {/* Modal SINDAB */}
            <Modal visible={modalSINDAB} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>SINDAB</Text>
                    <Image source={require('../../img/sindab.jpg')}></Image>
                    <TouchableOpacity style={styles.modalButton} onPress={() => setModalSINDAB(false)}>
                        <Text style={styles.modalButtonText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Modal WIFI */}
            <Modal visible={modalWIFI} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Conteúdo do WIFI</Text>
                    <TouchableOpacity style={styles.modalButton} onPress={() => setModalWIFI(false)}>
                        <Text style={styles.modalButtonText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Modal IDSA */}
            <Modal visible={modalIDSA} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Conteúdo do IDSA/IWGDF</Text>
                    <TouchableOpacity style={styles.modalButton} onPress={() => setModalIDSA(false)}>
                        <Text style={styles.modalButtonText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scroll: {
        padding: 20,
    },
    headerImage: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    title: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    classificacoes: {
        marginBottom: 20,
    },
    bubbleText: {
        fontSize: 14,
        textAlign: 'justify',
    },
    buttonGroup: {
        marginTop: 20,
        gap: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalButton: {
        marginTop: 20,
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 8,
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
})
