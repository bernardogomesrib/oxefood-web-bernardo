import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Modal,
  Table,
} from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function ListCliente() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();
  const [Cliente, setCliente] = useState();
  const [modelVer, setModelVer] = useState(false);
  function confirmaVer(Cliente) {
    setModelVer(true);
    setCliente(Cliente);
  }
  async function remover() {
    await axios
      .delete("http://localhost:8080/api/cliente/" + idRemover)
      .then((response) => {
        console.log("Cliente removido com sucesso.");

        axios.get("http://localhost:8080/api/cliente").then((response) => {
          setLista(response.data);
        });
      })
      .catch((error) => {
        console.log("Erro ao remover um cliente.");
      });
    setOpenModal(false);
  }

  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8080/api/cliente").then((response) => {
      setLista(response.data);
    });
  }
  function formatarData(dataParam) {
    if (dataParam === null || dataParam === "" || dataParam === undefined) {
      return "";
    }
    if (dataParam.includes("-")) {
      let arrayData = dataParam.split("-");

      return arrayData[2] + "/" + arrayData[1] + "/" + arrayData[0];
    } else {
      return dataParam;
    }
  }
  return (
    <div>
      <MenuSistema tela={"Lista de clientes"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Cliente </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-cliente"
            />

            <br />
            <br />
            <br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>CPF</Table.HeaderCell>
                  <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                  <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                  <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((cliente) => (
                  <Table.Row key={cliente.id}>
                    <Table.Cell>{cliente.nome}</Table.Cell>
                    <Table.Cell>{cliente.cpf}</Table.Cell>
                    <Table.Cell>
                      {formatarData(cliente.dataNascimento)}
                    </Table.Cell>
                    <Table.Cell>{cliente.foneCelular}</Table.Cell>
                    <Table.Cell>{cliente.foneFixo}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Link
                        to="/form-cliente"
                        state={{ id: cliente.id }}
                        style={{ color: "green" }}
                        asChild
                      >
                        <Button
                          inverted
                          circular
                          color="green"
                          title="Clique aqui para editar os dados deste cliente"
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
                        title="Clique aqui para visualizar este Cliente"
                        icon
                        onClick={(e) => confirmaVer(cliente)}
                      >
                        <Icon name="eye" />
                      </Button>
                      &nbsp;
                      <Button
                        inverted
                        circular
                        color="red"
                        title="Clique aqui para remover este cliente"
                        icon
                        onClick={(e) => confirmaRemover(cliente.id)}
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
          <div style={{ marginTop: "5%" }}> Cliente </div>
        </Header>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            color: "black",
          }}
        >
          <p style={{ marginBottom: 3 }}>
            <strong>Nome: </strong>
            {Cliente?.nome}
          </p>
          <p style={{ marginBottom: 3 }}>
            <strong>CPF: </strong>
            {Cliente?.cpf}
          </p>
          <p style={{ marginBottom: 3 }}>
            <strong>Data de Nascimento: </strong>
            {Cliente?.dataNascimento}
          </p>
          <p style={{ marginBottom: 3 }}>
            <strong>Fone Celular: </strong>
            {Cliente?.foneCelular}
          </p>
          <p style={{ marginBottom: 3 }}>
            <strong>Fone Fixo: </strong>
            {Cliente?.foneFixo}
          </p>
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
