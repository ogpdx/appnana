import React, {Component} from 'react';
import {View, Text, Image, Button, StyleSheet} from 'react-native';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nome: '',
    };
    this.entrar = this.entrar.bind(this);
  }
entrar(nome) {
  this.setState({nome: nome});
}
 render() { 
    
    return (
      <View style={styles.area}>
        <Text style={[styles.textoprincipal, styles.alinhartestoesquerda]}>TEXTO 1</Text>
        <Text style={styles.alinhartestoesquerda}>TEXTO 2</Text> 
        <Text>TEXTO 3</Text>
        <Text style={styles.textoprincipal}>TEXTO 4</Text>
        <View style={{height: 30, backgroundColor: '#222'}}></View>
        <View style={{flex: 1, backgroundColor: '#6666'}}></View>
        <View style={{height: 50, backgroundColor: '#222'}}></View>    
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{width: 50, height: 50, backgroundColor: 'gray'}}></View>
        <View style={{width: 50, height: 50, backgroundColor: 'black'}}></View>
        <View style={{width: 50, height: 50, backgroundColor: 'gray'}}></View>
      </View>       
      </View>
      //flex: 1, para ocupar toda a tela
      //flex: 2, para ocupar metade da tela
      //flex: 3, para ocupar 1/3 da tela
      // flex-direction: 'row', para deixar os elementos lado a lado
      //flex-end, flex-start e center onde iniciar
      //space-between e space-around
      //align-items: 'center' para centralizar //aula 18
    );
  }
}
//comando de estilo style={styles.alinhartestoesquerda}, para colocar 2 ao mesmo tempo style={[abre couxetes]}
const styles = StyleSheet.create({ //criar um estilo, para usar em qualquer lugar
  area: {
    margin: 25
  },
  textoprincipal: {
    fontSize: 25,
    color: '#FF0000'
  },
  alinhartestoesquerda: {
    textAlign: 'center'
  }
});