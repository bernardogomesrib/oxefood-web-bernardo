import { ToastContainer } from 'react-toastify';
import { Segment } from 'semantic-ui-react';
import './App.css';
import { Rotas } from './Rotas';
//import FormEntregador from './views/entregador/FormEntregador';
//import FormCliente from './views/client/FormCliente';
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Rotas/>
      <div style={{marginTop: '6%'}}>
        <Segment vertical color='grey' size='tiny' textAlign='center'>
          &copy; 2024 - Projeto WEB III - IFPE Jaboatão dos Guararapes
        </Segment>
      </div>

    </div>
  );
}

export default App;
