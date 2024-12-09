import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { setupAxiosInterceptors } from "../util/AuthenticationService";
import { notifyError, notifySuccess } from "../util/util";

export default function ListaConfiguracaoSistema() {
  const [lista, setLista] = useState([]);
  useEffect(() => {
    carregarLista();
    setupAxiosInterceptors();
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();
  const [entregador,setEntregador]= useState();
  const [modelVer,setModelVer]= useState(false);
  function confirmaVer(Entregador){
      setModelVer(true);
      setEntregador(Entregador);
  }

  async function remover() {
    await axios
      .delete("http://localhost:8080/api/configuracao-sistema/" + idRemover)
      .then((response) => {
        console.log("configuração de sistema removido com sucesso.");
        notifySuccess("configuração de sistema removido com sucesso.");
        axios.get("http://localhost:8080/api/configuracao-sistema").then((response) => {
          setLista(response.data);
        }).catch((error) => {
          if(error.response.data.errors!== undefined){
            error.response.data.errors.forEach((erro) => {
              notifyError(erro.defaultMessage);
            });
          }else{
            notifyError(error.response.data.message);
          }
        });
      }).catch((error) => {
        if(error.response.data.errors!== undefined){
          error.response.data.errors.forEach((erro) => {
            notifyError(erro.defaultMessage);
          });
        }else{
          notifyError(error.response.data.message);
        }
      });
      
    setOpenModal(false);
  }

  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }

  function carregarLista() {
    axios.get("http://localhost:8080/api/configuracao-sistema").then((response) => {
      setLista(response.data);
    }).catch((error) => {
      if(error.response.data.errors!== undefined){
        error.response.data.errors.forEach((erro) => {
          notifyError(erro.defaultMessage);
        });
      }else{
        notifyError(error.response.data.message);
      }
    });
  }
  /* function formatarData(dataParam) {
    if (dataParam === null || dataParam === "" || dataParam === undefined) {
      return "";
    }
    if (dataParam.includes("-")) {
      let arrayData = dataParam.split("-");

      return arrayData[2] + "/" + arrayData[1] + "/" + arrayData[0];
    } else {
      return dataParam;
    }
  } */
  return (
    <div>
      <MenuSistema tela={"ListaConfiguraçãoSistema"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Empresas </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-empresa"
            />

            <br />
            <br />
            <br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome da empresa</Table.HeaderCell>
                  <Table.HeaderCell>cnpj </Table.HeaderCell>
                  <Table.HeaderCell>email de contato</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((Entregador) => (
                  <Table.Row key={Entregador.id}>
                    <Table.Cell>{Entregador.nomeEmpresa}</Table.Cell>
                    <Table.Cell>{Entregador.cnpj}</Table.Cell>
                    <Table.Cell>{Entregador.emailContato}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Link
                        to="/form-configuracao-sistema"
                        state={{ id: Entregador.id }}
                        style={{ color: "green" }}
                        asChild
                      >
                        <Button
                          inverted
                          circular
                          color="green"
                          title="Clique aqui para editar os dados desta Configuração de Sistema"
                          icon
                        >
                          {" "}
                          <Icon name="edit" />{" "}
                        </Button>{" "}
                      </Link>
                      &nbsp;
                      <Button
                        inverted
                        circular
                        color="orange"
                        title="Clique aqui para visualizar esta Configuração de Sistema"
                        icon
                        onClick={(e) => confirmaVer(Entregador)}
                      >
                        
                        <Icon name="eye" />
                      </Button>
                      &nbsp;
                      <Button
                        inverted
                        circular
                        color="red"
                        title="Clique aqui para remover esta Configuração de Sistema"
                        icon
                        onClick={(e) => confirmaRemover(Entregador.id)}
                      >
                        
                        <Icon name="trash" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Container>
      </div>
      <Modal
        basic
        onClose={() => setOpenModal(false)}
        onOpen={() => setOpenModal(true)}
        open={openModal}
      >
        <Header icon>
          <Icon name="trash" />
          <div style={{ marginTop: "5%" }}>
            {" "}
            Tem certeza que deseja remover esse registro?{" "}
          </div>
        </Header>
        <Modal.Actions>
          <Button
            basic
            color="red"
            inverted
            onClick={() => setOpenModal(false)}
          >
            <Icon name="remove" /> Não
          </Button>
          <Button color="green" inverted onClick={() => remover()}>
            <Icon name="checkmark" /> Sim
          </Button>
        </Modal.Actions>
      </Modal>


      <Modal
        basic
        onClose={() => setModelVer(false)}
        onOpen={() => setModelVer(true)}
        open={modelVer}
      >
        <Header icon>
          
          <div style={{ marginTop: "5%"}}>
            {" "}
                
                Configuração do sistema
                
            {" "}
          </div>
        </Header>
        <div style={{display:'flex',flexDirection:'column',backgroundColor:'white',color:'black'}}>
                <p style={{marginBottom:3}}><strong>Nome: </strong>{entregador?.nomeEmpresa}</p>
                <p style={{marginBottom:3}}><strong>CNPJ: </strong>{entregador?.cnpj}</p>
                <p style={{marginBottom:3}}><strong>site </strong>{entregador?.site }</p>
                <p style={{marginBottom:3}}><strong>email </strong>{entregador?.emailContato }</p>
                <p style={{marginBottom:3}}><strong>Tempo minimo de agendamento de pedidos </strong>{entregador?.tempoMinimoAgendamentoPedidos }</p>
                <p style={{marginBottom:3}}><strong>Está aceitando pedidos?  </strong>{entregador?.ligarAceitePedidos?"Sim":"Não" }</p>
                <p style={{marginBottom:3}}><strong>Data de entrada no sistema</strong>{entregador?.dataEntradaSistema }</p>
        </div>
        <Modal.Actions>
        
          <Button color="green" inverted onClick={() => setModelVer(false)}>
            <Icon name="remove" /> Fechar
          </Button>
        </Modal.Actions>
      </Modal>




    </div>
  );
}
