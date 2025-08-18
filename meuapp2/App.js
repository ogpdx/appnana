import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiretrizesIWGDF from './src/pages/IWGDF/DiretrizesIWGDF';
import SplashScreen from './src/pages/SplashScreen';
import LoginACS from './src/pages/Login/LoginACS';
import LoginTecnico from './src/pages/Login/LoginTecnico';
import LoginEnfermeiro from './src/pages/Login/LoginEnfermeiro';
import LoginMedico from './src/pages/Login/LoginMedico';
import Profissao from './src/pages/Home/Profissao';
import Home from './src/pages/Home';
import EscolhaAcaoACS from './src/pages/ACS/EscolhaAcaoACS';
import SplashSucesso from './src/pages/SplashSucesso';
import TelaAvaliacao from './src/pages/ACS/TelaAvaliacao';
import TelaHistorico from './src/pages/ACS/TelaHistorico';
import CadastroACS from './src/pages/Login/CadastroACS';
import HubACS from './src/pages/ACS/HubACS';
import Icon from 'react-native-vector-icons/Feather';
import PerfilACS from './src/pages/ACS/PerfilACS';
import RecuperarSenhaACS from './src/pages/Login/RecuperarSenhaACS';
import RedefinirSenhaACS from './src/pages/Login/RedefinirSenhaACS';
import ResetSenha from './src/pages/Login/ResetSenha';
import TelaEstadoVascular from './src/pages/ACS/TelaEstadoVascular';
import TelaInstrumento from './src/pages/ACS/TelaInstrumento';
import TelaSensoriais from './src/pages/ACS/TelaSensoriais';
import TelaSensoriais2 from './src/pages/ACS/TelaSensoriais2';
import TelaDiapasao from './src/pages/ACS/TelaDiapasao';
import TelaEncerramento from './src/pages/ACS/TelaEncerramento';
import TelaOrientacoesCategoria3 from './src/pages/ACS/TelaOrientacoesCategoria3';
import TelaOrientacoesCategoria1 from './src/pages/ACS/TelaOrientacoesCategoria1';
import ConsultasAnteriores from './src/pages/Login/ConsultasAnteriores';
import TelaToqueLeve from './src/pages/ACS/TelaToqueLeve';
import Explicacao from './src/pages/Home/explicacao';
import CadastroTEC from './src/pages/Login/CadastroTEC';
import RecuperarSenhaTEC from './src/pages/Login/RecuperarSenhaTEC';
import RedefinirSenhaTEC from './src/pages/Login/RedefinirSenhaTEC';
import SplashSucessoTEC from './src/pages/SplashSucessoTEC';
import HubTEC from './src/pages/TEC/HubTEC';
import PerfilTEC from './src/pages/TEC/PerfilTEC';
import i18n from './src/pages/Home/i18n';
import index2 from './src/pages/Home/index2';
import TelaAvaliacaoTEC from './src/pages/TEC/TelaAvaliacaoTEC';
import TelaSupervisaoTEC from './src/pages/TEC/TelaSupervisaoTEC';
import ConsultasAnterioresTEC from './src/pages/TEC/ConsultasAnterioresTEC';
import TelaHistoricoTEC from './src/pages/TEC/TelaHistoricoTEC';
import TelaEncerramentoSimples from './src/pages/ACS/TelaEncerramentoSimples';
import TelaEncerramentoTEC from './src/pages/TEC/TelaEncerramentoTEC';


Icon.loadFont();



const linking = {
  prefixes: ['https://voxforge.com.br', 'voxforge://'],
  config: {
    screens: {
      ResetSenha: 'reset?token=:token',
    },
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={Home} options={{ title: '' }} />
          <Stack.Screen name="Profissao" component={Profissao} options={{ title: '' }} />
          <Stack.Screen name="LoginACS" component={LoginACS} options={{ title: '' }} />
          <Stack.Screen name="LoginTecnico" component={LoginTecnico} options={{ title: '' }}/>
          <Stack.Screen name="LoginEnfermeiro" component={LoginEnfermeiro} options={{ title: '' }}/>
          <Stack.Screen name="LoginMedico" component={LoginMedico} options={{ title: '' }}/>
          <Stack.Screen name="DiretrizesIWGDF" component={DiretrizesIWGDF} options={{ headerShown: false }} />
          <Stack.Screen name="EscolhaAcaoACS" component={EscolhaAcaoACS} />
          <Stack.Screen name="SplashSucesso" component={SplashSucesso} />
          <Stack.Screen name="TelaAvaliacao" component={TelaAvaliacao} />
          <Stack.Screen name="TelaHistorico" component={TelaHistorico} />
          <Stack.Screen name="CadastroACS" component={CadastroACS} />
          <Stack.Screen name="HubACS" component={HubACS} />
          <Stack.Screen name="PerfilACS" component={PerfilACS} />
          <Stack.Screen name="RecuperarSenhaACS" component={RecuperarSenhaACS} />
          <Stack.Screen name="RedefinirSenhaACS" component={RedefinirSenhaACS} />
          <Stack.Screen name="ResetSenha" component={ResetSenha} />
          <Stack.Screen name="TelaEstadoVascular" component={TelaEstadoVascular} />
          <Stack.Screen name="TelaInstrumento" component={TelaInstrumento} />
          <Stack.Screen name="TelaSensoriais" component={TelaSensoriais} />
          <Stack.Screen name="TelaSensoriais2" component={TelaSensoriais2} />
          <Stack.Screen name="TelaDiapasao" component={TelaDiapasao} />
          <Stack.Screen name="TelaEncerramento" component={TelaEncerramento} />
          <Stack.Screen name="TelaOrientacoesCategoria3" component={TelaOrientacoesCategoria3} />
          <Stack.Screen name="TelaOrientacoesCategoria1" component={TelaOrientacoesCategoria1} />
          <Stack.Screen name="ConsultasAnteriores" component={ConsultasAnteriores} />
          <Stack.Screen name="TelaToqueLeve" component={TelaToqueLeve} />
          <Stack.Screen name="Explicacao" component={Explicacao} />
          <Stack.Screen name="CadastroTEC" component={CadastroTEC} />
          <Stack.Screen name="RecuperarSenhaTEC" component={RecuperarSenhaTEC} />
          <Stack.Screen name="RedefinirSenhaTEC" component={RedefinirSenhaTEC} />
          <Stack.Screen name="SplashSucessoTEC" component={SplashSucessoTEC} />
          <Stack.Screen name="HubTEC" component={HubTEC} />
          <Stack.Screen name="PerfilTEC" component={PerfilTEC} />
          <Stack.Screen name="index2" component={index2} />
          <Stack.Screen name="TelaAvaliacaoTEC" component={TelaAvaliacaoTEC} />
          <Stack.Screen name="TelaSupervisaoTEC" component={TelaSupervisaoTEC} />
          <Stack.Screen name="ConsultasAnterioresTEC" component={ConsultasAnterioresTEC} />
          <Stack.Screen name="TelaHistoricoTEC" component={TelaHistoricoTEC} />
          <Stack.Screen name="TelaEncerramentoSimples" component={TelaEncerramentoSimples} />
          <Stack.Screen name="TelaEncerramentoTEC" component={TelaEncerramentoTEC} />
         
        </Stack.Navigator>
      </NavigationContainer>

    </>
  );
}
