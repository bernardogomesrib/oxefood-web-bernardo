import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Icon,
  Menu,
  Modal,
  Segment,
  Table,
} from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { setupAxiosInterceptors } from "../util/AuthenticationService";
import { notifyError, notifySuccess } from "../util/util";

export default function ListCliente() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();
  const [Cliente, setCliente] = useState();
  const [modelVer, setModelVer] = useState(false);
  const [modelEndereco, setModelEndereco] = useState(false);
  const [endereco, setEndereco] = useState();
  const [editando, setEditando] = useState(false);


  const [menuFiltro, setMenuFiltro] = useState(false);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");


  async function enviarEndereco() {
    const enderecoRequest = {
      rua: endereco.rua,
      numero: endereco.numero,
      complemento: endereco.complemento,
      bairro: endereco.bairro,
      cidade: endereco.cidade,
      estado: endereco.estado,
      cep: endereco.cep,
      clienteId: endereco.clienteId,
    };
    if (editando) {
      axios
        .put(
          "http://localhost:8080/api/cliente/endereco/" + endereco.id,
          enderecoRequest
        )
        .then((response) => {
          console.log(response.data);
          notifySuccess("Endereço atualizado com sucesso.");
          setModelEndereco(false);
          setEditando(false);
          carregarLista()
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
    } else {
      setEditando(false);
      axios
        .post(
          "http://localhost:8080/api/cliente/endereco/" + endereco.clienteId,
          enderecoRequest
        )
        .then((response) => {
          console.log(response.data);
          notifySuccess("Endereço adicionado com sucesso.");
          setModelEndereco(false);
          carregarLista()
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
    }
  }
  function confirmaVer(Cliente) {
    setModelVer(true);
    setCliente(Cliente);
  }
  async function apagarEndereco(id) {
    await axios
      .delete("http://localhost:8080/api/cliente/endereco/" + id)
      .then((response) => {
        console.log("Endereço removido com sucesso.");
        notifySuccess("Endereço removido com sucesso.");
        carregarLista();
        setModelVer(false);
        axios.get("http://localhost:8080/api/cliente").then((response) => {
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
      })
      .catch((error) => {
        if(error.response.data.errors!== undefined){
          error.response.data.errors.forEach((erro) => {
            notifyError(erro.defaultMessage);
          });
        }else{
          notifyError(error.response.data.message);
        }
      });
  }
  async function editar(endereco) {
    setEndereco(endereco);
    setEditando(true);
    setModelEndereco(true);
  }
  async function remover() {
    await axios
      .delete("http://localhost:8080/api/cliente/" + idRemover)
      .then((response) => {
        console.log("Cliente removido com sucesso.");
        notifySuccess("Cliente removido com sucesso.");
        axios.get("http://localhost:8080/api/cliente").then((response) => {
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

  useEffect(() => {
    carregarLista();
    setupAxiosInterceptors();
  }, []);


  const handleCpf= (value)=>{
    filtrarClientes(value, nome);
  }
  const handleNome =(value)=>{
    filtrarClientes(cpf, value);
  }
  async function filtrarClientes(cpf, nome) {
    let formData = new FormData();

    if (cpf !== undefined) {
        setCpf(cpf)
        formData.append('cpf', cpf);
    }
    if (nome !== undefined) {
        setNome(nome)
        formData.append('nome', nome);
    }
    

    await axios.post("http://localhost:8080/api/cliente/filtrar", formData)
    .then((response) => {
        setLista(response.data)
    })
}

  


  function carregarLista() {
    axios.get("http://localhost:8080/api/cliente").then((response) => {
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
            <Menu compact>
              <Menu.Item
                name="menuFiltro"
                active={menuFiltro === true}
                onClick={() => setMenuFiltro(!menuFiltro)}
              >
                <Icon name="filter" />
                Filtrar
              </Menu.Item>
            </Menu>

            {menuFiltro ? (
              <Segment>
                <Form className="form-filtros">
                  <Form.Input
                    icon="search"
                    value={nome}
                    onChange={(e) => handleNome(e.target.value)}
                    label="Nome de cliente"
                    placeholder="Filtrar por Nome de cliente"
                    labelPosition="left"
                    width={4}
                  />
                  <Form.Group widths="equal">
                    <Form.Input
                      icon="search"
                      value={cpf}
                      onChange={(e) => handleCpf(e.target.value)}
                      label="CPF"
                      placeholder="Filtrar por CPF"
                      labelPosition="left"
                    />
                  </Form.Group>
                </Form>
              </Segment>
            ) : (
              ""
            )}
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
                      &nbsp;
                      <Button
                        inverted
                        circular
                        color="blue"
                        title="Adicionar Endereço"
                        icon
                        onClick={(e) => {
                          setModelEndereco(true);
                          setEndereco({ clienteId: cliente.id });
                        }}
                      >
                        <Icon name="map marker alternate" />
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
          <p>
            <strong>Endereços: </strong>
            {Cliente?.enderecos?.map((endereco, key) => (
              <div>
                <h5>Endereço {key + 1}</h5>
                <div>
                  <strong>Rua: </strong>
                  {endereco.rua}
                </div>
                <div>
                  <strong>Número: </strong>
                  {endereco.numero}
                </div>
                <div>
                  <strong>Complemento: </strong>
                  {endereco.complemento}
                </div>
                <div>
                  <strong>Bairro: </strong>
                  {endereco.bairro}
                </div>
                <div>
                  <strong>Cidade: </strong>
                  {endereco.cidade}
                </div>
                <div>
                  <strong>Estado: </strong>
                  {endereco.estado}
                </div>
                <div>
                  <strong>CEP: </strong>
                  {endereco.cep}
                </div>
                <div>
                <Button
                    inverted
                    circular
                    color="red"
                    title="Clique aqui para apagar os dados deste endereço"
                    icon
                    onClick={() => {
                      apagarEndereco(endereco.id);
                    }}
                  >
                    {" "}
                    <Icon name="remove" /> apagar
                  </Button>
                  <Button
                    inverted
                    circular
                    color="green"
                    title="Clique aqui para editar os dados deste endereço"
                    icon
                    onClick={() => {
                      editar(endereco);
                    }}
                  >
                    {" "}
                    <Icon name="edit" /> editar
                  </Button>
                </div>
              </div>
            ))}
          </p>
        </div>
        <Modal.Actions>
          <Button color="green" inverted onClick={() => setModelVer(false)}>
            <Icon name="remove" /> Fechar
          </Button>
        </Modal.Actions>
      </Modal>

      <Modal
        basic
        onClose={() => setModelEndereco(false)}
        onOpen={() => setModelEndereco(true)}
        open={modelEndereco}
      >
        <Header icon>
          <div style={{ marginTop: "5%" }}> Endereço </div>
        </Header>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            color: "black",
          }}
        >
          <Form>
            <Form.Group>
              <Form.Input
                width={8}
                fluid
                label="Rua"
                type="text"
                value={endereco?.rua}
                placeholder="Informe a rua"
                onChange={(e) =>
                  setEndereco({ ...endereco, rua: e.target.value })
                }
              />
              <Form.Input
                width={8}
                fluid
                label="Número"
                type="text"
                value={endereco?.numero}
                placeholder="Informe o número"
                onChange={(e) =>
                  setEndereco({ ...endereco, numero: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                width={8}
                fluid
                label="Complemento"
                type="text"
                value={endereco?.complemento}
                placeholder="Informe o complemento"
                onChange={(e) =>
                  setEndereco({ ...endereco, complemento: e.target.value })
                }
              />
              <Form.Input
                width={8}
                fluid
                label="Bairro"
                type="text"
                value={endereco?.bairro}
                placeholder="Informe o bairro"
                onChange={(e) =>
                  setEndereco({ ...endereco, bairro: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                width={8}
                fluid
                label="Cidade"
                type="text"
                value={endereco?.cidade}
                placeholder="Informe a cidade"
                onChange={(e) =>
                  setEndereco({ ...endereco, cidade: e.target.value })
                }
              />
              <Form.Input
                width={8}
                fluid
                label="Estado"
                type="text"
                value={endereco?.estado}
                placeholder="Informe o estado"
                onChange={(e) =>
                  setEndereco({ ...endereco, estado: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                width={16}
                fluid
                label="CEP"
                type="text"
                value={endereco?.cep}
                placeholder="Informe o CEP"
                onChange={(e) =>
                  setEndereco({ ...endereco, cep: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </div>
        <Modal.Actions>
          <Button color="red" inverted onClick={() => setModelEndereco(false)}>
            <Icon name="remove" /> Fechar
          </Button>
          <Button color="green" inverted onClick={() => enviarEndereco()}>
            <Icon name="checkmark" /> {!editando?"Adicionar Endereço":"Atualizar Endereço"}
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
