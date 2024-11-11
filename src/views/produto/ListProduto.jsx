import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function ListProduto() {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8080/api/produto").then((response) => {
      setLista(response.data);
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

            <br />
            <br />
            <br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>codigo</Table.HeaderCell>
                  <Table.HeaderCell>titulo</Table.HeaderCell>
                  <Table.HeaderCell>descricao</Table.HeaderCell>
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
                    <Table.Cell>{Produto.valorUnitario}</Table.Cell>
                    <Table.Cell>{Produto.tempoEntregaMinimo}</Table.Cell>
                    <Table.Cell>{Produto.tempoEntregaMaximo}</Table.Cell>
                    <Table.Cell textAlign="center">
                    <Button
                        inverted
                        circular
                        color="green"
                        title="Clique aqui para editar os dados deste produto"
                        icon
                      >
                        <Link
                          to="/form-produto"
                          state={{ id: Produto.id }}
                          style={{ color: "green" }}
                        >
                          {" "}
                          <Icon name="edit" />{" "}
                        </Link>
                      </Button>{" "}
                      &nbsp;
                      <Button
                        inverted
                        circular
                        color="red"
                        title="Clique aqui para remover este Produto"
                        icon
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
    </div>
  );
}
