import axios from "axios";
import React from "react";
import InputMask from "react-input-mask";
import { useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, FormGroup, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { setupAxiosInterceptors } from "../util/AuthenticationService";
import { notifyError, notifySuccess } from "../util/util";

export default function FormCliente() {
  const [nome, setNome] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [foneCelular, setFoneCelular] = React.useState("");
  const [foneFixo, setFoneFixo] = React.useState("");
  const [dataNascimento, setDataNascimento] = React.useState("");
  const { state } = useLocation();
  const [idCliente, setIdCliente] = React.useState();
  const [email, setEmail] = React.useState();
  const [senha, setSenha] = React.useState();
  //const [error, setError] = React.useState();
  React.useEffect(()=>{
    setupAxiosInterceptors();
  },[]);
  React.useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/cliente/" + state.id)
        .then((response) => {
          setIdCliente(response.data.id);
          setNome(response.data.nome);
          setCpf(response.data.cpf);
          setDataNascimento(response.data.dataNascimento);
          setFoneCelular(response.data.foneCelular);
          setFoneFixo(response.data.foneFixo);
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
  }, [state]);

  const salvarCliente = () => {
    setupAxiosInterceptors();
    console.log("Nome: ", nome);
    console.log("CPF: ", cpf);
    console.log("Fone Celular: ", foneCelular);
    console.log("Fone Fixo: ", foneFixo);
    console.log("Data Nascimento: ", dataNascimento);
    let clienteRequest = {
      nome: nome,
      cpf: cpf,
      foneCelular: foneCelular,
      foneFixo: foneFixo,
      dataNascimento: dataNascimento,
      email: email,
      password: senha
    };
    if (idCliente != null) {
      axios
        .put("http://localhost:8080/api/cliente/" + idCliente, clienteRequest)
        .then((response) => {
          console.log(response.data);
          notifySuccess("Cliente alterado com sucesso!");
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
    } else {
      axios
        .post("http://localhost:8080/api/cliente", clienteRequest)
        .then((response) => {
          console.log(response.data);
          notifySuccess("Cliente cadastrado com sucesso!");
          setNome("");
          setCpf("");
          setFoneCelular("");
          setFoneFixo("");
          setDataNascimento("");
        })
        .catch((error) => {
          console.log(error);
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
      <MenuSistema tela="cliente" />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idCliente === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Cliente &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idCliente !== undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Cliente &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Alteração
            </h2>
          )}

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
              </Form.Group>

              <Form.Group>
                <Form.Input fluid label="Fone Celular" width={6}>
                  <InputMask
                    mask="(99) 9999.9999"
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

                <Form.Input fluid label="Data Nascimento" width={6}>
                  <InputMask
                    mask="99/99/9999"
                    value={dataNascimento}
                    maskChar={null}
                    placeholder="Ex: 20/03/1985"
                    onChange={(e) => setDataNascimento(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>
              <FormGroup>
                <Form.Input fluid label="email"
                value = {email}
                onChange={(e)=> setEmail(e.target.value)}
                type="email"
                width={8}
                />
                <Form.Input flueid label="senha"
                value ={senha}
                onChange={(e)=> setSenha(e.target.value)}
                type="password"
                width={8}
                />
              </FormGroup>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Button
                type="button"
                inverted
                circular
                icon
                labelPosition="left"
                color="orange"
                onClick={() => window.location.href="/list-cliente"}
              >
                <Icon name="reply" />
                Listar
              </Button>

              <Button
                onClick={salvarCliente}
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
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
