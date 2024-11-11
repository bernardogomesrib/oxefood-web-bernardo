import axios from "axios";
import React from "react";
import { useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function FormProduto() {
  const [titulo, setTitulo] = React.useState("");
  const [codigo, setCodigo] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const [valorUnitario, setValorUnitario] = React.useState("");
  const [tempoEntregaMinimo, setTempoEntregaMinimo] = React.useState("");
  const [tempoEntregaMaximo, setTempoEntregaMaximo] = React.useState("");

  const [produtoId,setProdutoId] = React.useState();
  const { state } = useLocation();

  React.useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/produto/" + state.id)
        .then((response) => {
          setProdutoId(response.data.id);
          setCodigo(response.data.codigo);
          setDescricao(response.data.descricao);
          setValorUnitario(response.data.valorUnitario);
          setTempoEntregaMaximo(response.data.tempoEntregaMaximo);
          setTempoEntregaMinimo(response.data.tempoEntregaMinimo);
          setTitulo(response.data.titulo);
        });
    }
  }, [state]);



  const salvar = () => {
    let produtoRequest = {
      codigo: codigo,
      titulo: titulo,
      descricao: descricao,
      valorUnitario: valorUnitario,
      tempoEntregaMinimo: tempoEntregaMinimo,
      tempoEntregaMaximo: tempoEntregaMaximo,
    };
    console.log(produtoRequest);
    if(state!==null && produtoId!==null){
      axios
        .put("http://localhost:8080/api/produto/"+produtoId, produtoRequest)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }else{
      axios
        .post("http://localhost:8080/api/produto", produtoRequest)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

    }
  };
  return (
    <div>
      <MenuSistema tela="produto" />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
         {produtoId?( <h2>
            {" "}
            <span style={{ color: "darkgray" }}>
              {" "}
              Produto &nbsp;
              <Icon name="angle double right" size="small" />{" "}
            </span>{" "}
            Alteração{" "}
          </h2>):( <h2>
            {" "}
            <span style={{ color: "darkgray" }}>
              {" "}
              Produto &nbsp;
              <Icon name="angle double right" size="small" />{" "}
            </span>{" "}
            Cadastro{" "}
          </h2>)}

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
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
                <Form.Input
                  required
                  fluid
                  label="Código do produto"
                  placeholder="Informe o código do produto"
                  width={8}
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.TextArea
                  fluid
                  label="Descrição"
                  width={16}
                  value={descricao}
                  placeholder="Informe a descrição do produto"
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Valor unitário"
                  type="number"
                  value={valorUnitario}
                  placeholder="Informe o valor unitário"
                  onChange={(e) => setValorUnitario(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Tempo de Entrega Mínimo em Minutos"
                  type="number"
                  placeholder="30"
                  value={tempoEntregaMinimo}
                  onChange={(e) => setTempoEntregaMinimo(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Tempo de Entrega Máximo em Minutos"
                  type="number"
                  placeholder="40"
                  value={tempoEntregaMaximo}
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
