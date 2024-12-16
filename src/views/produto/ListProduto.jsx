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

export default function ListProduto() {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    carregarLista();
    setupAxiosInterceptors();
    carregarCategorias();
  }, []);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();
  const [produto, setProduto] = useState();
  const [modelVer, setModelVer] = useState(false);

  const [menuFiltro, setMenuFiltro] = useState();
  const [codigo, setCodigo] = useState();
  const [titulo, setTitulo] = useState();
  const [idCategoria, setIdCategoria] = useState();
  const [listaCategoriaProduto, setListaCategoriaProduto] = useState([]);

  function confirmaVer(produto) {
    setModelVer(true);
    setProduto(produto);
  }

  async function carregarCategorias() {
    axios
      .get("http://localhost:8080/api/produto/categoria")
      .then((response) => {
        const dropDownCategorias = [];
        dropDownCategorias.push({ text: "", value: "" });
        response.data.map((c) =>
          dropDownCategorias.push({ text: c.descricao, value: c.id })
        );
        console.log(dropDownCategorias);
        setListaCategoriaProduto(dropDownCategorias);
      })
      .catch((error) => {
        console.log("Erro ao carregar as categorias.");
        if (error.response.data.errors !== undefined) {
          error.response.data.errors.forEach((erro) => {
            notifyError(erro.defaultMessage);
          });
        } else {
          notifyError(error.response.data.message);
        }
      });
  }

  async function remover() {
    await axios
      .delete("http://localhost:8080/api/produto/" + idRemover)
      .then((response) => {
        console.log("Cliente removido com sucesso.");
        notifySuccess("Produto removido com sucesso.");

        axios.get("http://localhost:8080/api/produto").then((response) => {
          setLista(response.data);
        });
      })
      .catch((error) => {
        console.log("Erro ao remover um cliente.");
        if (error.response.data.errors !== undefined) {
          error.response.data.errors.forEach((erro) => {
            notifyError(erro.defaultMessage);
          });
        } else {
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
    axios
      .get("http://localhost:8080/api/produto")
      .then((response) => {
        setLista(response.data);
      })
      .catch((error) => {
        if (error.response.data.errors !== undefined) {
          error.response.data.errors.forEach((erro) => {
            notifyError(erro.defaultMessage);
          });
        } else {
          notifyError(error.response.data.message);
        }
      });
  }

  function handleMenuFiltro() {
    if (menuFiltro === true) {
      setMenuFiltro(false);
    } else {
      setMenuFiltro(true);
    }
  }

  function handleChangeCodigo(value) {
    filtrarProdutos(value, titulo, idCategoria);
  }

  function handleChangeTitulo(value) {
    filtrarProdutos(codigo, value, idCategoria);
  }

  function handleChangeCategoriaProduto(value) {
    filtrarProdutos(codigo, titulo, value);
  }

  async function filtrarProdutos(codigoParam, tituloParam, idCategoriaParam) {
    let formData = new FormData();

    if (codigoParam !== undefined) {
      setCodigo(codigoParam);
      formData.append("codigo", codigoParam);
    }
    if (tituloParam !== undefined) {
      setTitulo(tituloParam);
      formData.append("titulo", tituloParam);
    }
    if (idCategoriaParam !== undefined) {
      setIdCategoria(idCategoriaParam);
      formData.append("idCategoria", idCategoriaParam);
    }

    await axios
      .post("http://localhost:8080/api/produto/filtrar", formData)
      .then((response) => {
        setLista(response.data);
      });
  }

  return (
    <div>
      <MenuSistema tela={"Produtos"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Produto </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-produto"
            />
            <Menu compact>
              <Menu.Item
                name="menuFiltro"
                active={menuFiltro === true}
                onClick={() => handleMenuFiltro()}
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
                    value={codigo}
                    onChange={(e) => handleChangeCodigo(e.target.value)}
                    label="Código do Produto"
                    placeholder="Filtrar por Código do Produto"
                    labelPosition="left"
                    width={4}
                  />
                  <Form.Group widths="equal">
                    <Form.Input
                      icon="search"
                      value={titulo}
                      onChange={(e) => handleChangeTitulo(e.target.value)}
                      label="Título"
                      placeholder="Filtrar por título"
                      labelPosition="left"
                    />
                    <Form.Select
                      placeholder="Filtrar por Categoria"
                      label="Categoria"
                      options={listaCategoriaProduto}
                      value={idCategoria}
                      onChange={(e, { value }) => {
                        handleChangeCategoriaProduto(value);
                      }}
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
                  <Table.HeaderCell>codigo</Table.HeaderCell>
                  <Table.HeaderCell>titulo</Table.HeaderCell>
                  <Table.HeaderCell>descricao</Table.HeaderCell>
                  <Table.HeaderCell>categoria</Table.HeaderCell>
                  <Table.HeaderCell>valor Unitario</Table.HeaderCell>
                  <Table.HeaderCell>tempo de Entrega Minimo</Table.HeaderCell>
                  <Table.HeaderCell>tempo de Entrega Maximo</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((Produto) => (
                  <Table.Row key={Produto.id}>
                    <Table.Cell>{Produto.codigo}</Table.Cell>
                    <Table.Cell>{Produto.titulo}</Table.Cell>
                    <Table.Cell>{Produto.descricao}</Table.Cell>
                    <Table.Cell>
                      {Produto.categoria ? Produto.categoria.descricao : ""}
                    </Table.Cell>
                    <Table.Cell>{Produto.valorUnitario}</Table.Cell>
                    <Table.Cell>{Produto.tempoEntregaMinimo}</Table.Cell>
                    <Table.Cell>{Produto.tempoEntregaMaximo}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Link
                        to="/form-produto"
                        state={{ id: Produto.id }}
                        style={{ color: "green" }}
                        asChild
                      >
                        <Button
                          inverted
                          circular
                          color="green"
                          title="Clique aqui para editar os dados deste produto"
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
                        title="Clique aqui para visualizar este produto"
                        icon
                        onClick={(e) => confirmaVer(Produto)}
                      >
                        <Icon name="eye" />
                      </Button>
                      &nbsp;
                      <Button
                        inverted
                        circular
                        color="red"
                        title="Clique aqui para remover este produto"
                        icon
                        onClick={(e) => confirmaRemover(Produto.id)}
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
          <div style={{ marginTop: "5%" }}> Produto </div>
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
            <strong>Código: </strong>
            {produto?.codigo}
          </p>
          <p style={{ marginBottom: 3 }}>
            <strong>Título: </strong>
            {produto?.titulo}
          </p>
          <p style={{ marginBottom: 3 }}>
            <strong>Descrição: </strong>
            {produto?.descricao}
          </p>
          <p style={{ marginBottom: 3 }}>
            <strong>Valor Unitário: </strong>
            {produto?.valorUnitario}
          </p>
          <p style={{ marginBottom: 3 }}>
            <strong>Tempo de Entrega Mínimo: </strong>
            {produto?.tempoEntregaMinimo}
          </p>
          <p style={{ marginBottom: 3 }}>
            <strong>Tempo de Entrega Máximo: </strong>
            {produto?.tempoEntregaMaximo}
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
