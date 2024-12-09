import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { setupAxiosInterceptors } from "../util/AuthenticationService";
import { notifyError, notifySuccess } from "../util/util";

export default function ListEntregador() {
  const [lista, setLista] = useState([]);
  useEffect(() => {
    carregarLista();
    setupAxiosInterceptors()
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
      .delete("http://localhost:8080/api/entregador/" + idRemover)
      .then((response) => {
        console.log("Entregador removido com sucesso.");
        notifySuccess("Entregador removido com sucesso.");
        axios.get("http://localhost:8080/api/entregador").then((response) => {
          setLista(response.data);
        });
      })
      .catch((error) => {
        if(error.response.data.errors!== undefined){
          error.response.data.errors.forEach((erro) => {
            notifyError(erro.defaultMessage);
          });
        }else{
          notifyError(error.response.data.message);
        }
      })
    setOpenModal(false);
  }

  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }

  function carregarLista() {
    axios.get("http://localhost:8080/api/entregador").then((response) => {
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
      <MenuSistema tela={"Entregadores"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Entregadores </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-Entregador"
            />

            <br />
            <br />
            <br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>CPF</Table.HeaderCell>
                  <Table.HeaderCell>RG</Table.HeaderCell>
                  <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                  <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                  <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                  <Table.HeaderCell>QTD Entregas</Table.HeaderCell>
                  <Table.HeaderCell>Valor Frete</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((Entregador) => (
                  <Table.Row key={Entregador.id}>
                    <Table.Cell>{Entregador.nome}</Table.Cell>
                    <Table.Cell>{Entregador.cpf}</Table.Cell>
                    <Table.Cell>{Entregador.rg}</Table.Cell>
                    <Table.Cell>{Entregador.dataNascimento}</Table.Cell>
                    <Table.Cell>{Entregador.foneCelular}</Table.Cell>
                    <Table.Cell>{Entregador.foneFixo}</Table.Cell>
                    <Table.Cell>{Entregador.qtdEntregasRealizadas}</Table.Cell>
                    <Table.Cell>{Entregador.valorFrete}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Link
                        to="/form-entregador"
                        state={{ id: Entregador.id }}
                        style={{ color: "green" }}
                        asChild
                      >
                        <Button
                          inverted
                          circular
                          color="green"
                          title="Clique aqui para editar os dados deste entregador"
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
                        title="Clique aqui para visualizar este Entregador"
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
                        title="Clique aqui para remover este Entregador"
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
                
                Entregador
                
            {" "}
          </div>
        </Header>
        <div style={{display:'flex',flexDirection:'column',backgroundColor:'white',color:'black'}}>
                <p style={{marginBottom:3}}><strong>Nome: </strong>{entregador?.nome}</p>
                <p style={{marginBottom:3}}><strong>Ativo: </strong>{(entregador?.ativo?"Sim":"Não") }</p>
                <p style={{marginBottom:3}}><strong>CPF: </strong>{entregador?.cpf }</p>
                <p style={{marginBottom:3}}><strong>RG: </strong>{entregador?.rg }</p>
                <p style={{marginBottom:3}}><strong>Data de Nascimento: </strong>{entregador?.dataNascimento }</p>
                <p style={{marginBottom:3}}><strong>Fone Celular: </strong>{entregador?.foneCelular }</p>
                <p style={{marginBottom:3}}><strong>Fone Fixo: </strong>{entregador?.foneFixo }</p>
                <p style={{marginBottom:3}}><strong>QTD Entregas Realizadas: </strong>{entregador?.qtdEntregasRealizadas }</p>
                <p style={{marginBottom:3}}><strong>Valor Frete: </strong>{entregador?.valorFrete }</p>
                <p style={{marginBottom:3}}><strong>Endereço Rua: </strong>{entregador?.enderecoRua }</p>
                <p style={{marginBottom:3}}><strong>Endereço Número: </strong>{entregador?.enderecoNumero }</p>
                <p style={{marginBottom:3}}><strong>Endereço Bairro: </strong>{entregador?.enderecoBairro }</p>
                <p style={{marginBottom:3}}><strong>Endereço Cidade: </strong>{entregador?.enderecoCidade }</p>
                <p style={{marginBottom:3}}><strong>Endereço CEP: </strong>{entregador?.enderecoCep }</p>
                <p style={{marginBottom:3}}><strong>Endereço UF: </strong>{entregador?.enderecoUf }</p>
                <p style={{marginBottom:3}}><strong>Complemento: </strong>{entregador?.complemento}</p>
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
