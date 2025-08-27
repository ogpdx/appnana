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
    Dimensions,
} from 'react-native'

export default function SisUsar({ navigation }) {

    const [modalSINDAB, setModalSINDAB] = useState(false)
    const [modalWIFI, setModalWIFI] = useState(false)
    const [modalIDSA, setModalIDSA] = useState(false)
    const [expandido, setExpandido] = useState(false)
    const screenWidth = Dimensions.get('window').width;
    const [imgFullScreen, setImgFullScreen] = useState(false)

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>

                {/* Duas enfermeiras com balão */}
                <Image source={require('../../img/duasenf.png')} style={styles.headerImage} />
                <Text style={styles.title}>Escolha o{'\n'}
                    sistema que{'\n'}
                    você deseja usar{'\n'}nesse momento</Text>

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
                    <ScrollView style={{ width: '100%' }}>
                    <Image source={require('../../img/sindab.jpg')} style={{ 
                        width: screenWidth * 0.9,
                        height: undefined,
                        aspectRatio: 1.5,
                        resizeMode: 'contain',
                        margimBottom: 10, 
                        }}></Image>
                    <View style={styles.info1}>
                        <TouchableOpacity onPress={() => setExpandido(!expandido)}>
                        <Text style={styles.titulo}>
                         {expandido ? "▼ Interpretação da Pontuação" : "► Interpretação da Pontuação"}
                        </Text>
                        </TouchableOpacity>

                        {expandido && (
                            <Text style={styles.texto}>
                            Pontuação menor que 3: Associada com taxa de cicatrização de 60% em 12 semanas e risco de amputação maior em 6 meses de 0,7% Pontuação maior ou igual a 3: Taxa de cicatrização de 35% em 12 semanas e risco de amputação maior de 2,7%
                            Condutas Segundo as Pontuações
                            Embora o IWGDF não estabeleça protocolos rígidos de conduta baseados apenas no SINBAD, a literatura sugere as seguintes abordagens:
                            SINBAD 0-2 (Baixo Risco)
                            Prognóstico: Melhor taxa de cicatrização
                            Condutas sugeridas:
                            Acompanhamento ambulatorial regular
                            Desbridamento quando necessário
                            Curativos apropriados
                            Descarga adequada (offloading)
                            Controle glicêmico otimizado
                            Educação do paciente
                            SINBAD 3-4 (Risco Moderado)
                            Prognóstico: Taxa de cicatrização intermediária
                            Condutas intensificadas:
                            Avaliação multidisciplinar urgente
                            Considerar antibioticoterapia se infecção presente
                            Avaliação vascular detalhada se isquemia presente
                            Possível necessidade de hospitalização
                            Monitoramento mais frequente
                            Avaliar necessidade de intervenções especializadas
                            SINBAD 5-6 (Alto Risco)
                            Prognóstico: Maior risco de eventos adversos maiores no pé 
                            Condutas prioritárias:
                            Encaminhamento imediato para centro especializado
                            Hospitalização frequentemente necessária
                            Avaliação vascular urgente com possível revascularização
                            Antibioticoterapia agressiva se infecção
                            Considerar terapias avançadas
                            Preparar paciente/família para possibilidade de amputação
                            Acompanhamento multidisciplinar intensivo
                            Uso do SINBAD na Prática Clínica
                            Triagem e Comunicação: O IWGDF recomenda o uso do sistema SINBAD para comunicação entre profissionais de saúde sobre as características da úlcera
                            Documentação: É fundamental registrar tanto o escore total quanto os componentes individuais, pois cada elemento direciona intervenções específicas:
                            Isquemia (I=1): Necessita avaliação vascular
                            Infecção (B=1): Requer antibioticoterapia
                            Profundidade (D=1): Pode indicar osteomielite
                            </Text>
                        )}
                    </View>
                </ScrollView>
                    <TouchableOpacity style={styles.modalButton} onPress={() => setModalSINDAB(false)}>
                        <Text style={styles.modalButtonText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Modal WIFI */}
            <Modal visible={modalWIFI} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Wlfl</Text>
                    <ScrollView style={{ width: '100%' }}>
                    <Image source={require('../../img/wifi2.jpg')} style={{
                        width: screenWidth * 0.9,
                        height: undefined,
                        aspectRatio: 1.5,
                        resizeMode: 'contain',
                        margimBottom: 10,
                    }}></Image>
                    <Image source={require('../../img/wifi.jpg')} style={{
                        width: screenWidth * 0.9,
                        height: undefined,
                        aspectRatio: 1.5,
                        resizeMode: 'contain',
                        margimBottom: 10,
                    }}></Image>
                    <TouchableOpacity onPress={() => setExpandido(!expandido)}>
                        <Text style={styles.titulo}>
                         {expandido ? "▼ Condutas Segundo o Estadiamento Wlfl" : "► Condutas Segundo o Estadiamento Wlfl"}
                        </Text>
                        </TouchableOpacity>
                        {expandido && (
                            <Text style={styles.texto}>
                            Estágio 1 - Risco Muito Baixo
                            Características: Geralmente W0-1, I0-1, fI0-1
                            Condutas:
                            Tratamento conservador ambulatorial
                            Cuidados locais da ferida
                            Controle de infecção se presente
                            Otimização do controle glicêmico
                            Descarga adequada
                            Baixa probabilidade de necessitar revascularização
                            Estágio 2 - Risco Baixo
                            Características: Combinações moderadas dos componentes
                            Condutas:
                            Avaliação multidisciplinar
                            Considerar estudo vascular não invasivo
                            Possível benefício de revascularização se isquemia significativa
                            Antibioticoterapia se infecção presente
                            Monitoramento mais frequente
                            Estágio 3 - Risco Moderado
                            Características: Pelo menos um componente grave
                            Condutas:
                            Avaliação vascular urgente com provável benefício de revascularização
                            Hospitalização frequentemente necessária
                            Antibioticoterapia agressiva se infecção
                            Desbridamento cirúrgico se necessário
                            Considerar terapias adjuvantes
                            Acompanhamento multidisciplinar intensivo
                            Estágio 4 - Risco Alto
                            Características: Múltiplos componentes graves (W3, I3, fI3)
                            Condutas:
                            Alto risco de amputação maior, requerendo intervenção urgente
                            Revascularização urgente se tecnicamente viável
                            Hospitalização mandatória
                            Antibioticoterapia parenteral de amplo espectro
                            Considerar amputação primária se revascularização não viável
                            Discussão sobre prognóstico com paciente/família
                            Cuidados paliativos se apropriado
                            </Text>
                        )}
                    </ScrollView>
                    <TouchableOpacity style={styles.modalButton} onPress={() => setModalWIFI(false)}>
                        <Text style={styles.modalButtonText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Modal IDSA */}
            <Modal visible={modalIDSA} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>IDSA/IWGDF</Text>
                    <ScrollView style={{ width: '100%' }}>
                    <Image source={require('../../img/ulcerain.jpg')}  style={{ 
                        width: screenWidth * 0.9,
                        height: undefined,
                        aspectRatio: 1.5,
                        resizeMode: 'contain',
                        margimBottom: 10, 
                        }}></Image>
                    <TouchableOpacity onPress={() => setExpandido(!expandido)}>
                        <Text style={styles.titulo}>
                         {expandido ? "▼ Condutas Segundo as Classificações" : "► Condutas Segundo as Classificações"}
                        </Text>
                        </TouchableOpacity>
                        {expandido && (
                            <Text style={styles.texto}>
                            Grau 1 - Não Infectada
                            Local de tratamento: Ambulatorial
                            Condutas:
                            Não requer antibióticos
                            Desbridamento do tecido necrótico
                            Curativos apropriados
                            Descarga adequada
                            Controle glicêmico
                            Reavaliação regular
                            Grau 2 - Infecção Leve
                            Local de tratamento: Geralmente ambulatorial
                            Antibioticoterapia:
                            Via oral na maioria dos casos
                            Cobertura para cocos Gram-positivos (S. aureus, Streptococcus)
                            Duração: 1-2 semanas
                            Opções: cefalexina, amoxicilina-clavulanato, clindamicina
                            Outras condutas:
                            Desbridamento local
                            Curativos diários
                            Repouso e elevação do membro
                            Monitoramento próximo da resposta
                            Grau 3 - Infecção Moderada
                            Local de tratamento: É RECOMENDADA a internação hospitalar para todas as pessoas com infecções graves e moderadas, ou associadas a comorbidades relevantes
                            Antibioticoterapia:
                            Inicialmente parenteral, pode transicionar para oral
                            Cobertura ampla (Gram-positivos, Gram-negativos, anaeróbios)
                            Duração: 2-4 semanas
                            Considerar MRSA se prevalência local alta
                            Condutas adicionais:
                            Desbridamento cirúrgico pode ser necessário
                            Avaliação vascular
                            Investigar osteomielite
                            Controle glicêmico rigoroso
                            Suporte nutricional
                            Grau 4 - Infecção Grave
                            Local de tratamento: Hospitalização obrigatória, possivelmente UTI
                            Antibioticoterapia:
                            Via parenteral de amplo espectro
                            Cobertura para patógenos multirresistentes
                            Ajustar conforme cultura e antibiograma
                            Duração prolongada (3-6 semanas ou mais)
                            Condutas emergenciais:
                            Estabilização hemodinâmica
                            Desbridamento cirúrgico urgente
                            Considerar amputação de urgência se necessário
                            Suporte intensivo
                            Consulta com infectologia
                            Avaliação vascular urgente    
                            </Text>
                        )}
                    </ScrollView>
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
        height: 170,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    title: {
        position: 'absolute',
        top: 50,
        right: 50,
        width: 185,
        fontSize: 13,
        textAlign: 'justify',
        fontWeight: '600',
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
        backgroundColor: '#5bb5b0',
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
        backgroundColor: '#5bb5b0',
        padding: 12,
        borderRadius: 8,
    },
    info1: {
        padding: 16,
    },
    titulo: {
        fontsize: 18,
        fontWeight: "bold",
        color: "#5bb5b0",
    },
    texto: {
        marginTop: 8,
        fontSize: 16,
        color: "#333",
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
})
