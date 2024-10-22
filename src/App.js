import { Segment } from 'semantic-ui-react';
import './App.css';
import FormProduto from './views/produto/FormProduto';
//import FormEntregador from './views/entregador/FormEntregador';
//import FormCliente from './views/client/FormCliente';

function App() {
  return (
    <div className="App">
      
      <FormProduto/>

      <div style={{marginTop: '6%'}}>
        <Segment vertical color='grey' size='tiny' textAlign='center'>
          &copy; 2024 - Projeto WEB III - IFPE Jaboatão dos Guararapes
        </Segment>
      </div>

    </div>
  );
}

export default App;
