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

export default function TextoExpandivel() {
    const [expandido, setExpandido] = useState(false)
}

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
                    <Text style={styles.modalTitle}>IDSA/IWGDF</Text>
                    <Image source={require('../../img/ulcerain.jpg')}></Image>
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
    info1: {
        padding: 16,
    },
    titulo: {
        fontsize: 18,
        fontWeight: "bold",
        color: "#007AFF",
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
