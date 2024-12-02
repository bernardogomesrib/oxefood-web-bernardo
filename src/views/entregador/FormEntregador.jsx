import axios from "axios";
import React from "react";
import InputMask from "react-input-mask";
import { useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { notifyError, notifySuccess } from "../util/util";

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
  const [entregadorId,setEntregadorId] = React.useState();
  const { state } = useLocation();

  React.useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/entregador/" + state.id)
        .then((response) => {
          setEntregadorId(response.data.id);
          setNome(response.data.nome);
          setCpf(response.data.cpf);
          setDataNascimento(response.data.dataNascimento);
          setFoneCelular(response.data.foneCelular);
          setFoneFixo(response.data.foneFixo);
          setAtivo(response.data.ativo);
          setCep(response.data.cep);
          setRg(response.data.rg);
          setQtdEntregas(response.data.qtdEntregasRealizadas);
          setValorFrete(response.data.valorFrete);
          setRua(response.data.enderecoRua);
          setNumero(response.data.enderecoNumero);
          setBairro(response.data.enderecoBairro);
          setCidade(response.data.enderecoCidade);
          setCep(response.data.enderecoCep);
          setUf(response.data.enderecoUf);
          setComplemento(response.data.complemento);
          console.log(response.data);
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
        ;
    }
  }, [state]);






  const salvar = () => {
    let entregadorRequest = {
      ativo: ativo,
      nome: nome,
      cpf: cpf,
      rg: rg,
      dataNascimento: dataNascimento,
      foneCelular: foneCelular,
      foneFixo: foneFixo,
      qtdEntregasRealizadas: qtdEntregas,
      valorFrete: valorFrete,
      enderecoRua: rua,
      enderecoNumero: numero,
      enderecoBairro: bairro,
      enderecoCidade: cidade,
      enderecoCep: cep,
      enderecoUf: uf,
      complemento: complemento,
    };
    if(entregadorId!==null){
      axios
        .put("http://localhost:8080/api/entregador/"+entregadorId, entregadorRequest)
        .then((response) => {
          console.log(response.data);
          notifySuccess("Entregador alterado com sucesso.");
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
    }else{
      axios
        .post("http://localhost:8080/api/entregador", entregadorRequest)
        .then((response) => {
          console.log(response.data);
          notifySuccess("Entregador cadastrado com sucesso.");
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

  };
  return (
    <div>
      <MenuSistema tela="entregador" />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {entregadorId?((<h2>
            {" "}
            <span style={{ color: "darkgray" }}>
              {" "}
              Entregador &nbsp;
              <Icon name="angle double right" size="small" />{" "}
            </span>{" "}
            Alteração{" "}
          </h2>)):(<h2>
            {" "}
            <span style={{ color: "darkgray" }}>
              {" "}
              Entregador &nbsp;
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
                  label="Nome"
                  maxLength="100"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <Form.Input required fluid label="CPF">
                  <InputMask
                    required
                    mask="999.999.999-99"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </Form.Input>
                <Form.Input required fluid label="RG">
                  <InputMask
                    required
                    mask="9.999.999"
                    value = {rg}
                    onChange={(e) => setRg(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input fluid label="DT Nascimento" width={6}>
                  <InputMask
                    mask="99/99/9999"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                  />
                </Form.Input>
                <Form.Input fluid label="Fone Celular" width={6}>
                  <InputMask
                    mask="(99) 99999.9999"
                    value={foneCelular}
                    onChange={(e) => setFoneCelular(e.target.value)}
                  />
                </Form.Input>

                <Form.Input fluid label="Fone Fixo" width={6}>
                  <InputMask
                    mask="(99) 9999.9999"
                    value={foneFixo}
                    onChange={(e) => setFoneFixo(e.target.value)}
                  />
                </Form.Input>

                <Form.Input fluid label="QTD Entregas Realizadas" width={6}>
                  <InputMask
                    mask="9999"
                    value={qtdEntregas}
                    onChange={(e) => setQtdEntregas(e.target.value)}
                  />
                </Form.Input>
                <Form.Input
                  fluid
                  label="Valor Por Frete"
                  width={6}
                  value = {valorFrete}
                  onChange={(e) => setValorFrete(e.target.value)}
                ></Form.Input>
              </Form.Group>
              <Form.Group>
                <Form.Input
                  fluid
                  label="Rua"
                  width={8}
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Número"
                  width={8}
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  fluid
                  label="Bairro"
                  width={6}
                  value = {bairro}
                  onChange={(e) => setBairro(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Cidade"
                  width={6}
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                />
                <Form.Input fluid label="CEP" width={6}>
                  <InputMask
                    mask="99999-999"
                    value={cep}
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
                  value={uf}
                  onChange={(e, { value }) => setUf(value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  fluid
                  label="Complemento"
                  width={16}
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Radio
                  label="Ativo"
                  name="ativo"
                  value={ativo?true:false}
                  checked={ativo === true}
                  onChange={() => setAtivo(true)}
                />
                <Form.Radio
                  label="Inativo"
                  name="ativo"
                  value={!ativo?false:true}
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
