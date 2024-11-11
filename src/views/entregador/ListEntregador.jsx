import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function ListEntregador() {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8080/api/entregador").then((response) => {
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
                    <Button
                        inverted
                        circular
                        color="green"
                        title="Clique aqui para editar os dados deste entregador"
                        icon
                      >
                        <Link
                          to="/form-entregador"
                          state={{ id: Entregador.id }}
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
                        title="Clique aqui para remover este Entregador"
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
