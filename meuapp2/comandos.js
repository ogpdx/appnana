import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
class App extends Component { //componente
  render() { //metodo
    let nome = 'Diego'; //setar algo
    let img = 'https://reactnative.dev/img/tiny_logo.png'; //setar algo
    return ( //retornar, VIEW para mostrar dentro do aplicativo
      <View> 
        <Text>Olá Mundo!</Text> 
        <Text style={{color: 'red', fontSize: 25, margin: 15}}>Olá Mundo!</Text>
        <Image 
        source= {{uri: img }} 
        style={{width: 50, height: 50}}/>
        <Text>{nome}</Text>
        <Jobs largura={300} altura={300} fulano="testexz"></Jobs>
      </View>
      
    );
  }
}
export default App; //exportar para aparecer no aplicativo //aula 14
class Jobs extends Component{
  render(){
    let img = 'https://reactnative.dev/img/tiny_logo.png';
    return(
      <View>
      <Image
        source={{uri: img}} 
        style={{width: this.props.largura, height:this.props.altura}}>
      </Image>
      <Text> {this.props.fulano}</Text>
      </View>
    );
  }
}
class botão extends Component{ //classe com botão de entrar
// 
  constructor(props) { //construtor para fazer o  botão funcionar //aula15
    super(props);
    this.state = {
      nome: '',
    };
    this.entrar = this.entrar.bind(this);
  }
entrar(nome) {
  this.setState({nome: nome});
}  render(){
    let img = 'https://reactnative.dev/img/tiny_logo.png';
    return(
      <View>
        <Button title="Entrar" onPress={() => this.entrar('Diego')}></Button>
        <Text style={{fontSize: 25, color: 'red', textAlign: 'center'}}>{this.state.nome}</Text>
      </View>
    );
  }
}

