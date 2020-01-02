import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      title: 'CRUD Simples com React',
      act: 0,
      index: '',
      datas: []
    }
  } 

  componentDidMount(){
    // Iniciar com Foco
    this.refs.nome.focus();
  }

  // Adicionar novo item na lista
  Adicionar = (e) =>{
    e.preventDefault();

    let datas = this.state.datas;
    let nome = this.refs.nome.value;
    let sobrenome = this.refs.sobrenome.value;

    if(this.state.act === 0){   //new
      let data = {
        nome, sobrenome
      }
      datas.push(data);
    }else{                      //update
      let index = this.state.index;
      datas[index].nome = nome;
      datas[index].sobrenome = sobrenome;
    }    

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.meuFormulario.reset();
    this.refs.nome.focus();
  }

  // Remover item da Lista
  Remover = (i) => {
    let datas = this.state.datas;
    datas.splice(i,1);
    this.setState({
      datas: datas
    });

    this.refs.meuFormulario.reset();
    this.refs.nome.focus();
  }

  // Atualizar item da Lista
  Atualizar = (i) => {
    let data = this.state.datas[i];
    this.refs.nome.value = data.nome;
    this.refs.sobrenome.value = data.sobrenome;

    this.setState({
      act: 1,
      index: i
    });

    this.refs.name.focus();
  }  

  // Montagem da Tela
  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="meuFormulario" className="meuFormulario">
          <input type="text" ref="nome" placeholder="Nome" className="formField" />
          <input type="text" ref="sobrenome" placeholder="Sobrenome" className="formField" />
          <button onClick={(e)=>this.Adicionar(e)} className="meuBotao">Adicionar</button>
        </form>
        <pre>
          {datas.map((data, i) =>
            <table className="table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nome Completo</th>
                  <th colSpan='2'>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr key={i} className="minhaLista">
                  <td>{i+1}</td>
                  <td>{data.nome} {data.sobrenome}</td>
                  <td><button onClick={()=>this.Remover(i)} className="minhaListaBotao">Remover</button></td>
                  <td><button onClick={()=>this.Atualizar(i)} className="minhaListaBotao">Atualizar</button></td>
                </tr>
              </tbody>
            </table>
          )}
        </pre>
      </div>
    );
  }
}

export default App;