import axios from "axios";
import React from "react";
import InputMask from "react-input-mask";
import { useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function FormConfiguracaoSistema() {
  const [nomeEmpresa, setNomeEmpresa] = React.useState();
  const [cnpj, setCnpj] = React.useState();
  const [site, setSite] = React.useState();
  const [emailContato, setEmailContato] = React.useState();
  const [tempoMinimoAgendamentoPedidos, setTempoMinimoAgendamentoPedidos] =
    React.useState();
  const [ligarAceitePedidos, setLigarAceitePedidos] = React.useState(true);
  const [dataEntradaSistema, setDataEntradaSistema] = React.useState();
  const [configuracaoSistemaId, setConfiguracaoSistemaId] =
    React.useState(null);
  const { state } = useLocation();

  React.useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/configuracao-sistema/" + state.id)
        .then((response) => {
          setConfiguracaoSistemaId(response.data.id);
          setNomeEmpresa(response.data.nomeEmpresa);
          setCnpj(response.data.cnpj);
          setSite(response.data.site);
          setEmailContato(response.data.emailContato);
          setTempoMinimoAgendamentoPedidos(
            response.data.tempoMinimoAgendamentoPedidos
          );
          setLigarAceitePedidos(response.data.ligarAceitePedidos);
          setDataEntradaSistema(response.data.dataEntradaSistema);
          console.log(response.data);
        });
    }
  }, [state]);

  const salvar = () => {
    let configuracaoSistemaRequest = {
      nomeEmpresa,
      cnpj,
      site,
      emailContato,
      tempoMinimoAgendamentoPedidos,
      ligarAceitePedidos,
      dataEntradaSistema,
      configuracaoSistemaId,
    };
    if (configuracaoSistemaId !== null) {
      axios
        .put(
          "http://localhost:8080/api/configuracao-sistema/" +
            configuracaoSistemaId,
          configuracaoSistemaRequest
        )
        .then((response) => {
          console.log(response.data);
          alert("Configuração de sistema alterada com sucesso.");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(
          "http://localhost:8080/api/configuracao-sistema",
          configuracaoSistemaRequest
        )
        .then((response) => {
          console.log(response.data);
          alert("Configuração de sistema salva com sucesso.");
          setCnpj("");
          setNomeEmpresa("");
          setSite("");
          setEmailContato("");
          setTempoMinimoAgendamentoPedidos("");
          setLigarAceitePedidos(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div>
      <MenuSistema tela="Configuração Sistema" />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {configuracaoSistemaId ? (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Configuração Sistema &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Alteração{" "}
            </h2>
          ) : (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Entregador &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro{" "}
            </h2>
          )}

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Nome da Empresa"
                  maxLength="100"
                  value={nomeEmpresa}
                  onChange={(e) => setNomeEmpresa(e.target.value)}
                />
                <Form.Input required fluid label="CNPJ">
                  <InputMask
                    required
                    mask="999.999.999/9999-99"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input fluid label="DT Entrada" width={9}>
                  <InputMask
                    mask="99/99/9999"
                    value={dataEntradaSistema}
                    onChange={(e) => setDataEntradaSistema(e.target.value)}
                  />
                </Form.Input>

                <Form.Input
                  fluid
                  label="Tempo mínimo de agendamento de pedidos"
                  width={9}
                  type="number"
                  value={tempoMinimoAgendamentoPedidos}
                  onChange={(e) =>
                    setTempoMinimoAgendamentoPedidos(e.target.value)
                  }
                ></Form.Input>
              </Form.Group>
                <Form.Group><Form.Input
                  fluid
                  label="Email"
                  width={16}
                  type="email"
                  value={emailContato}
                  onChange={(e) => setEmailContato(e.target.value)}
                /></Form.Group>
              
              <Form.Group>
                <Form.Input
                  fluid
                  label="site"
                  width={16}
                  type="text"
                  value={site}
                  onChange={(e) => setSite(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Radio
                  label="Está aceitando Pedidos"
                  name="Aceita Pedidos"
                  value={ligarAceitePedidos ? true : false}
                  checked={ligarAceitePedidos === true}
                  onChange={() => setLigarAceitePedidos(true)}
                />
                <Form.Radio
                  label="Não está aceitando Pedidos"
                  name="Aceita Pedidos"
                  value={!ligarAceitePedidos ? false : true}
                  checked={ligarAceitePedidos === false}
                  onChange={() => setLigarAceitePedidos(false)}
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
                Voltar
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
