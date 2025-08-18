// src/flows/questionFlow.js
export const INSTR = {
  AMBOS: 'ambos',
  DIAPASAO: 'diapasão',
  MONO: 'monofilamento',
  NENHUM: 'nenhum'
};

const ROUTES = {
  16: 'TelaSensoriais',
  17: 'TelaSensoriais',
  18: 'TelaSensoriais',
  19: 'TelaSensoriais',
  20: 'TelaSensoriais',
  21: 'TelaSensoriais',
  22: 'TelaSensoriais',
  23: 'TelaSensoriais',
  24: 'TelaDiapasao',
  25: 'TelaToqueLeve',
};

function buildFlow(instrumentoCode, supervisionadoValue) {
  const sup = String(supervisionadoValue || '').toLowerCase() === 'sim';
  switch (instrumentoCode) {
    case 'ambos':         return sup ? [16,17,18,19,20,21,22,23,24,25] : [16,17,18,19,20,21,22,23];
    case 'diapasao':      return sup ? [24,25] : [];
    case 'monofilamento': return [16,17,18,19,20,21,22,23];
    case 'nenhum':        return sup ? [25] : [];
    default:              return [];
  }
}

async function handleContinuar() {
  if (!instrumentoCode) return Alert.alert('Atenção', 'Selecione uma opção.');

  setLoading(true);
  try {
    const bodyData = new URLSearchParams({
      id: String(idAvaliacao),                 // PK da tabela
      instrumento: instrumentoCode,            // 'ambos'|'diapasao'|'monofilamento'|'nenhum'
      supervisionado: String(supervisionado),  // 'Sim'|'Não'
    }).toString();

    const resp = await fetch('https://voxforge.com.br/api/salvar_instrumento.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: bodyData,
    });
    const json = await resp.json();
    if (json.ok !== true) throw new Error(json.erro || 'Falha ao salvar');

    const queue = buildFlow(instrumentoCode, supervisionado);
    if (!queue.length) {
      // nada a perguntar → encerra
      navigation.replace('TelaEncerramentoSimples', { idAvaliacao });
      return;
    }
    const first = ROUTES[queue[0]];
    if (!first) {
      console.warn('Rota não mapeada p/ passo', queue[0]);
      navigation.replace('TelaEncerramentoSimples', { idAvaliacao });
      return;
    }
    navigation.replace(first, {
      idAvaliacao,
      supervisionado,
      instrumento: instrumentoCode,
      flow: queue,
      flowIndex: 0,
    });
  } catch (e) {
    console.error(e);
    Alert.alert('Erro', 'Não foi possível salvar os dados.');
  } finally {
    setLoading(false);
  }
}

