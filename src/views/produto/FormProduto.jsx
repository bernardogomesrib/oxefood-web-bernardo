import axios from "axios";
import React from "react";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";

export default function FormProduto() {
  const [titulo, setTitulo] = React.useState("");
    const [codigo, setCodigo] = React.useState("");
    const [descricao, setDescricao] = React.useState("");
    const [valorUnitario, setValorUnitario] = React.useState("");
    const [tempoEntregaMinimo, setTempoEntregaMinimo] = React.useState("");
    const [tempoEntregaMaximo, setTempoEntregaMaximo] = React.useState("");

  const salvar = () => {
    let produtoRequest = {
        codigo:codigo,
        titulo:titulo,
        descricao:descricao,
        valorUnitario:valorUnitario,
        tempoEntregaMinimo:tempoEntregaMinimo,
        tempoEntregaMaximo:tempoEntregaMaximo
    };
    axios
      .post("http://localhost:8080/api/produto", produtoRequest)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
return (
    <div>
        <div style={{ marginTop: "3%" }}>
            <Container textAlign="justified">
                <h2>
                    {" "}
                    <span style={{ color: "darkgray" }}>
                        {" "}
                        Produto &nbsp;
                        <Icon name="angle double right" size="small" />{" "}
                    </span>{" "}
                    Cadastro{" "}
                </h2>

                <Divider />

                <div style={{ marginTop: "4%" }}>
                    <Form>
                        <Form.Group widths="equal">
                            <Form.Input
                                required
                                fluid
                                label="Título"
                                maxLength="100"
                                placeholder="Informe o título do produto"
                                width={16}
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                            <Form.Input 
                                required 
                                fluid 
                                label="Código do produto" 
                                placeholder="Informe o código do produto" 
                                width={8}
                                onChange={(e) => setCodigo(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.TextArea 
                                fluid 
                                label="Descrição" 
                                width={16}
                                placeholder="Informe a descrição do produto"
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input
                                fluid
                                label="Valor unitário"
                                type="number"
                                placeholder="Informe o valor unitário"
                                onChange={(e) => setValorUnitario(e.target.value)}
                            />
                            <Form.Input
                                fluid
                                label="Tempo de Entrega Mínimo em Minutos"
                                type="number"
                                placeholder="30"
                                onChange={(e) => setTempoEntregaMinimo(e.target.value)}
                            />
                            <Form.Input
                                fluid
                                label="Tempo de Entrega Máximo em Minutos"
                                type="number"
                                placeholder="40"
                                onChange={(e) => setTempoEntregaMaximo(e.target.value)}
                            />
                        </Form.Group>
                        
                        
                    </Form>

                    <div style={{ marginTop: "4%" }}>
                        <Button
                            type="button"
                            inverted
                            circular
                            icon
                            labelPosition="left"
                            color="orange"
                        >
                            <Icon name="reply" />
                            Listar
                        </Button>

                        <Button
                            inverted
                            circular
                            icon
                            labelPosition="left"
                            color="blue"
                            floated="right"
                            onClick={salvar}
                        >
                            <Icon name="save" />
                            Salvar
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    </div>
);
}
