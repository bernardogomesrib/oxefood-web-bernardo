import axios from "axios";
import React from "react";
import InputMask from "react-input-mask";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";

export default function FormEntregador() {
  const options = [
    { key: "AC", value: "AC", text: "Acre" },
    { key: "AL", value: "AL", text: "Alagoas" },
    { key: "AP", value: "AP", text: "Amapá" },
    { key: "AM", value: "AM", text: "Amazonas" },
    { key: "BA", value: "BA", text: "Bahia" },
    { key: "CE", value: "CE", text: "Ceará" },
    { key: "DF", value: "DF", text: "Distrito Federal" },
    { key: "ES", value: "ES", text: "Espírito Santo" },
    { key: "GO", value: "GO", text: "Goiás" },
    { key: "MA", value: "MA", text: "Maranhão" },
    { key: "MT", value: "MT", text: "Mato Grosso" },
    { key: "MS", value: "MS", text: "Mato Grosso do Sul" },
    { key: "MG", value: "MG", text: "Minas Gerais" },
    { key: "PA", value: "PA", text: "Pará" },
    { key: "PB", value: "PB", text: "Paraíba" },
    { key: "PR", value: "PR", text: "Paraná" },
    { key: "PE", value: "PE", text: "Pernambuco" },
    { key: "PI", value: "PI", text: "Piauí" },
    { key: "RJ", value: "RJ", text: "Rio de Janeiro" },
    { key: "RN", value: "RN", text: "Rio Grande do Norte" },
    { key: "RS", value: "RS", text: "Rio Grande do Sul" },
    { key: "RO", value: "RO", text: "Rondônia" },
    { key: "RR", value: "RR", text: "Roraima" },
    { key: "SC", value: "SC", text: "Santa Catarina" },
    { key: "SP", value: "SP", text: "São Paulo" },
    { key: "SE", value: "SE", text: "Sergipe" },
    { key: "TO", value: "TO", text: "Tocantins" },
  ];
  const [ativo, setAtivo] = React.useState(false);
  const [nome, setNome] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [rg, setRg] = React.useState("");
  const [dataNascimento, setDataNascimento] = React.useState("");
  const [foneCelular, setFoneCelular] = React.useState("");
  const [foneFixo, setFoneFixo] = React.useState("");
  const [qtdEntregas, setQtdEntregas] = React.useState("");
  const [valorFrete, setValorFrete] = React.useState("");
  const [rua, setRua] = React.useState("");
  const [numero, setNumero] = React.useState("");
  const [bairro, setBairro] = React.useState("");
  const [cidade, setCidade] = React.useState("");
  const [cep, setCep] = React.useState("");
  const [uf, setUf] = React.useState("");
  const [complemento, setComplemento] = React.useState("");
  const salvar = () => {
    let entregadorRequest = {
      ativo: ativo,
      nome: nome,
      cpf: cpf,
      rg: rg,
      dataNascimento: dataNascimento,
      foneCelular: foneCelular,
      foneFixo: foneFixo,
      qtdEntregas: qtdEntregas,
      valorFrete: valorFrete,
      rua: rua,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      cep: cep,
      uf: uf,
      complemento: complemento,
    };
    axios
      .post("http://localhost:8080/api/entregador", entregadorRequest)
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
              Entregador &nbsp;
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
                  label="Nome"
                  maxLength="100"
                  onChange={(e) => setNome(e.target.value)}
                />
                <Form.Input required fluid label="CPF">
                  <InputMask
                    required
                    mask="999.999.999-99"
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </Form.Input>
                <Form.Input required fluid label="RG">
                  <InputMask
                    required
                    mask="9.999.999"
                    onChange={(e) => setRg(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input fluid label="DT Nascimento" width={6}>
                  <InputMask
                    mask="99/99/9999"
                    onChange={(e) => setDataNascimento(e.target.value)}
                  />
                </Form.Input>
                <Form.Input fluid label="Fone Celular" width={6}>
                  <InputMask
                    mask="(99) 99999.9999"
                    onChange={(e) => setFoneCelular(e.target.value)}
                  />
                </Form.Input>

                <Form.Input fluid label="Fone Fixo" width={6}>
                  <InputMask
                    mask="(99) 9999.9999"
                    onChange={(e) => setFoneFixo(e.target.value)}
                  />
                </Form.Input>

                <Form.Input fluid label="QTD Entregas Realizadas" width={6}>
                  <InputMask
                    mask="9999"
                    onChange={(e) => setQtdEntregas(e.target.value)}
                  />
                </Form.Input>
                <Form.Input
                  fluid
                  label="Valor Por Frete"
                  width={6}
                  onChange={(e) => setValorFrete(e.target.value)}
                ></Form.Input>
              </Form.Group>
              <Form.Group>
                <Form.Input
                  fluid
                  label="Rua"
                  width={8}
                  onChange={(e) => setRua(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Número"
                  width={8}
                  onChange={(e) => setNumero(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  fluid
                  label="Bairro"
                  width={6}
                  onChange={(e) => setBairro(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Cidade"
                  width={6}
                  onChange={(e) => setCidade(e.target.value)}
                />
                <Form.Input fluid label="CEP" width={6}>
                  <InputMask
                    mask="99999-999"
                    onChange={(e) => setCep(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>
              <Form.Group>
                <Form.Dropdown
                  fluid
                  label="UF"
                  selection
                  options={options}
                  width={16}
                  onChange={(e, { value }) => setUf(value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  fluid
                  label="Complemento"
                  width={16}
                  onChange={(e) => setComplemento(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Radio
                  label="Ativo"
                  name="ativo"
                  value={true}
                  checked={ativo === true}
                  onChange={() => setAtivo(true)}
                />
                <Form.Radio
                  label="Inativo"
                  name="ativo"
                  value={false}
                  checked={ativo === false}
                  onChange={() => setAtivo(false)}
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
