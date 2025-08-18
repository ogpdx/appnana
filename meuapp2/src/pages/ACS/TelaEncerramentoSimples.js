// src/pages/ACS/TelaEncerramentoSimples.js
import React, { useEffect, useMemo, useState } from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity, ScrollView,
  ActivityIndicator, Modal
} from 'react-native';
import LottieView from 'lottie-react-native';

/* ================== HELPERS ================== */
const isYes = (v) =>
  v === true || v === 1 || v === '1' ||
  (typeof v === 'string' && v.trim().toLowerCase() === 'sim');

const anyComboTrue = (r, combos) =>
  combos.some((combo) => combo.every((q) => isYes(r['q' + q])));

const q11Alterada = (q11) => {
  if (!q11) return false;
  const s = String(q11).toLowerCase();
  return !s.includes('sem alteração') && !s.includes('sem alteracao');
};
const q10Val = (q10) => (q10 ? String(q10).toLowerCase() : '');

const computeRisk = (r) => {
  const q10 = q10Val(r.q10);
  const q11Alt = q11Alterada(r.q11);

  const altoSingles = ['2','3','4','5'].some((q) => isYes(r['q'+q]));
  const altoCombos  = anyComboTrue(r, [['13','3'],['13','2'],['13','4'],['13','5']]);
  const altoQ10     = q10.includes('cianótico') || q10.includes('cianotico') || q10.includes('preto')
                   || (q10.includes('vermelho') && q11Alt);
  if (altoSingles || altoCombos || altoQ10) return 'alto';

  const moderadoSingles = ['13','17'].some((q)=>isYes(r['q'+q]));
  const moderadoCombos  = anyComboTrue(r, [
    ['13','14'], ['13','15'], ['13','16'], ['13','17'], ['13','19'],
    ['13','14','15','16','17'],
    ['13','14','19'], ['13','15','19'], ['13','16','19'], ['13','17','19'],
  ]);
  if (moderadoSingles || moderadoCombos) return 'moderado';

  const baixoSingles = ['13','14','15','16','19'].some((q)=>isYes(r['q'+q]));
  const baixoCombos  = anyComboTrue(r, [['13','19'], ['14','15','16'], ['14','15'], ['14','16'], ['15','16']]);
  if (baixoSingles || baixoCombos) return 'baixo';

  return 'baixo';
};

/* ============ MAPA DE IMAGENS POR RISCO  ============ */
const ORIENTACOES_IMG = {
  baixo: [
    require('../../img/pecapa.png'),
    require('../../img/pecapa.png'),
    require('../../img/pecapa.png'),
  ],
  moderado: [
  ],
  alto: [
  ],
};

/* ================== TELA ================== */
export default function TelaEncerramentoSimples({ route, navigation }) {
  const { idAvaliacao } = route.params;
  const [loading, setLoading] = useState(true);
  const [respostas, setRespostas] = useState(null);
  const [erro, setErro] = useState(null);

  // Modal de orientações
  const [modalVisivel, setModalVisivel] = useState(false);
  const [imgList, setImgList] = useState([]);

  useEffect(() => {
    let ativo = true;
    (async () => {
      try {
        const url = `https://voxforge.com.br/api/avaliacoes_get.php?id=${encodeURIComponent(idAvaliacao)}`;
        const resp = await fetch(url);
        const json = await resp.json();

        const payload = json.avaliacao || json || {};
        const r = {
          q1: payload.q1,  q2: payload.q2,  q3: payload.q3,  q4: payload.q4,  q5: payload.q5,
          q6: payload.q6,  q7: payload.q7,  q8: payload.q8,  q9: payload.q9,
          q10: payload.q10, q11: payload.q11, q12: payload.q12,
          q13: payload.q13, q14: payload.q14, q15: payload.q15, q16: payload.q16, q17: payload.q17,
          q18: payload.q18, q19: payload.q19, q20: payload.q20,
        };
        if (!ativo) return;
        setRespostas({ r, riscoServer: json.risco });
      } catch (e) {
        if (!ativo) return;
        setErro('Falha ao carregar dados da avaliação.');
      } finally {
        if (ativo) setLoading(false);
      }
    })();
    return () => { ativo = false; };
  }, [idAvaliacao]);

  const risco = useMemo(() => {
    if (!respostas) return null;
    return respostas.riscoServer || computeRisk(respostas.r);
  }, [respostas]);

  const abrirOrientacoes = () => {
    const list = ORIENTACOES_IMG[risco] || [];
    if (!list.length) return; // sem imagens → não abre
    setImgList(list);
    setModalVisivel(true);
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (erro || !respostas) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Text style={styles.erro}>{erro || 'Dados indisponíveis.'}</Text>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.goBack()}>
          <Text style={styles.botaoTexto}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header com selo de risco */}
      <BadgeRisco risco={risco} />

      {/* Intro */}
      <FalaComImagem
        img={require('../../img/enfdir.png')}
        texto="Com base em suas respostas, segue abaixo o resultado obtido e a recomendação."
      />

      {/* Blocos por risco */}
      {risco === 'baixo'     && <BlocoBaixo />}
      {risco === 'moderado'  && <BlocoModerado />}
      {risco === 'alto'      && <BlocoAlto />}

      {/* CTA: Ver orientações + Voltar */}
      {(ORIENTACOES_IMG[risco] || []).length > 0 && (
        <TouchableOpacity
          style={[styles.botaoOutline, { marginTop: 10, marginBottom: 8 }]}
          onPress={abrirOrientacoes}
        >
          <Text style={[styles.botaoTexto, { color: '#2BB3A3' }]}>Ver orientações</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={[styles.botao, { marginTop: 6 }]} onPress={() => navigation.navigate('HubTEC')}>
        <Text style={styles.botaoTexto}>Voltar ao Início</Text>
      </TouchableOpacity>

      {/* Modal de orientações */}
      <Modal visible={modalVisivel} animationType="slide" onRequestClose={() => setModalVisivel(false)}>
        <ScrollView contentContainerStyle={styles.modalWrap}>
          {imgList.map((src, idx) => (
            <Image key={idx} source={src} style={styles.modalImg} resizeMode="contain" />
          ))}
          <TouchableOpacity style={[styles.botao, { marginTop: 12, marginBottom: 20 }]} onPress={() => setModalVisivel(false)}>
            <Text style={styles.botaoTexto}>Fechar</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
}

/* ================== BLOCOS ================== */
function BlocoBaixo() {
  return (
    <>
      <LottieBox file={require('../../animations/success.json')} />
      <Fala
        img={require('../../img/enfesq.png')}
        texto={'Sem sinais de atenção identificados\n- Manter acompanhamento'}
        lado="esquerda"
      />
      <CardOrientacoes items={[
        'Inspeção diária dos pés (olhar entre os dedos);',
        'Não andar descalço;',
        'Realizar boa higiene dos pés;',
        'Não lavar os pés com água quente;',
        'Secar entre os dedos;',
        'Não usar bolsa de água quente nos pés ou outro tipo de aquecedor;',
        'Usar hidratante nos pés, mas evitar passar entre os dedos;',
        'Usar meias sem costura ou do avesso;',
        'Cortar as unhas corretamente;',
        'Não usar produtos químicos para retirar calos;',
        'Não usar calçados apertados;',
        'Inspecionar dentro e fora dos calçados antes de usá-los;',
        'Procurar a UBS se aparecer uma bolha no pé, se a temperatura do pé aumentar, se tiver um corte ou arranhão;',
        'Controlar a glicemia.',
      ]}/>
    </>
  );
}

function BlocoModerado() {
  return (
    <>
      {/* <LottieBox file={require('../../animations/warning.json')} /> */}
      <FalaComImagem
        img={require('../../img/enfdir.png')}
        texto={'Orientar o paciente e familiares sobre a importância do autocuidado.\nPessoas com deficiência visual ou incapacidade física de visualizar os pés não conseguem fazer a inspeção adequadamente.'}
      />
      <CardOrientacoes items={[
        'Inspeção diária dos pés (olhar entre os dedos);',
        'Não andar descalço;',
        'Realizar boa higiene dos pés;',
        'Não lavar os pés com água quente;',
        'Secar entre os dedos;',
        'Não usar bolsa de água quente nos pés ou outro tipo de aquecedor;',
        'Usar hidratante nos pés, mas evitar passar entre os dedos;',
        'Usar meias sem costura ou do avesso;',
        'Cortar as unhas corretamente;',
        'Não usar produtos químicos para retirar calos;',
        'Não usar calçados apertados;',
        'Inspecionar dentro e fora dos calçados antes de usá-los;',
        'Procurar a UBS se aparecer uma bolha no pé, se a temperatura do pé aumentar, se tiver um corte ou arranhão;',
        'Controlar a glicemia.',
      ]}/>
    </>
  );
}

function BlocoAlto() {
  return (
    <>
      {/* <LottieBox file={require('../../animations/alert.json')} /> */}
      <Fala
        img={require('../../img/enfesq.png')}
        texto={'Sinais críticos identificados\n- Encaminhar com urgência'}
        lado="esquerda"
      />
      <View style={styles.checkboxWrap}>
        <Text style={styles.checkbox}>☐</Text>
        <Text style={styles.checkboxLabel}>Gerar um relatório de encaminhamento para UBS</Text>
      </View>
      <View style={styles.checkboxWrap}>
        <Text style={styles.checkbox}>☐</Text>
        <Text style={styles.checkboxLabel}>Gerar relatório de encaminhamento para o paciente</Text>
      </View>
    </>
  );
}

function Fala({ texto, img, lado = 'direita' }) {
  const esquerda = lado === 'esquerda';
  return (
    <View style={styles.falaBox}>
      {esquerda && <Image source={img} style={styles.enfermeiraImg} />}
      <View style={styles.balao}><Text style={styles.textoFala}>{texto}</Text></View>
      {!esquerda && <Image source={img} style={styles.enfermeiraImg} />}
    </View>
  );
}
function FalaComImagem({ texto, img, lado = 'direita' }) {
  return <Fala texto={texto} img={img} lado={lado} />;
}
function LottieBox({ file }) {
  return (
    <View style={styles.lottieWrap}>
      <LottieView source={file} autoPlay loop={false} style={styles.lottie} />
    </View>
  );
}

function CardOrientacoes({ titulo, items = [] }) {
  return (
    <View style={styles.cardOrientacoes}>
      {titulo ? <Text style={[styles.textoFala, { marginBottom: 8 }]}>{titulo}</Text> : null}
      {items.map((t, i) => (
        <Text key={i} style={styles.listaItem}>• {t}</Text>
      ))}
    </View>
  );
}

function BadgeRisco({ risco }) {
  const map = {
    baixo: { label: 'Risco Baixo', color: '#1db954' },
    moderado: { label: 'Risco Moderado', color: '#f5a623' },
    alto: { label: 'Risco Alto', color: '#e53935' },
  };
  const cfg = map[risco] || map.baixo;
  return (
    <View style={[styles.badge, { borderColor: cfg.color, backgroundColor: '#fff' }]}>
      <View style={[styles.dot, { backgroundColor: cfg.color }]} />
      <Text style={[styles.badgeText, { color: '#0f2a2d' }]}>{cfg.label}</Text>
    </View>
  );
}

/* ================== STYLES ================== */
const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#E6F4F1', flexGrow: 1, alignItems: 'center' },

  badge: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 999, borderWidth: 2, marginBottom: 8 },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  badgeText: { fontWeight: '700' },

  falaBox: { flexDirection: 'row', alignItems: 'center', marginBottom: 18, justifyContent: 'center', flexWrap: 'wrap' },
  enfermeiraImg: { width: 90, height: 130, resizeMode: 'contain' },
  balao: { backgroundColor: '#ffffff', borderColor: '#5CBEB0', borderWidth: 2, borderRadius: 12, padding: 12, maxWidth: '72%', marginHorizontal: 10 },
  textoFala: { fontSize: 14, fontWeight: 'bold', color: '#333' },

  cardOrientacoes: { backgroundColor: '#fff', borderRadius: 12, padding: 16, borderColor: '#2BB3A3', borderWidth: 2, marginBottom: 14, width: '100%' },
  listaItem: { fontSize: 14, marginBottom: 6, color: '#333', textAlign: 'justify' },

  botao: { backgroundColor: '#2BB3A3', paddingVertical: 14, paddingHorizontal: 30, borderRadius: 10 },
  botaoOutline: { backgroundColor: '#fff', paddingVertical: 14, paddingHorizontal: 30, borderRadius: 10, borderWidth: 2, borderColor: '#2BB3A3' },
  botaoTexto: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  lottieWrap: { width: 80, height: 80, justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
  lottie: { width: 80, height: 80 },

  erro: { color: '#b00020', fontWeight: 'bold', marginBottom: 12 },
  checkboxWrap: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, width: '100%' },
  checkbox: { fontSize: 20, marginRight: 8 },
  checkboxLabel: { fontSize: 14, color: '#333' },

  modalWrap: { padding: 16, backgroundColor: '#000', alignItems: 'center' },
  modalImg: { width: '100%', height: 520, marginBottom: 12 },
});
