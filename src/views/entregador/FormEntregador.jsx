import React from "react";
import InputMask from "react-input-mask";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";

export default function FormEntregador() {
    const options = [
        "AC",
        "AL",
        "AP",
        "AM",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MT",
        "MS",
        "MG",
        "PA",
        "PB",
        "PR",
        "PE",
        "PI",
        "RJ",
        "RN",
        "RS",
        "RO",
        "RR",
        "SC",
        "SP",
        "SE",
        "TO",

    ]
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
                <Form.Input required fluid label="Nome" maxLength="100" />

                <Form.Input required fluid label="CPF">
                  <InputMask required mask="999.999.999-99" />
                </Form.Input>
                <Form.Input required fluid label="RG">
                  <InputMask required mask="9.999.999" />
                </Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input fluid label="DT Nascimento" width={6}>
                  <InputMask mask="99/99/9999" />
                </Form.Input>
                <Form.Input fluid label="Fone Celular" width={6}>
                  <InputMask mask="(99) 9999.9999" />
                </Form.Input>

                <Form.Input fluid label="Fone Fixo" width={6}>
                  <InputMask mask="(99) 9999.9999" />
                </Form.Input>

                <Form.Input fluid label="QTD Entregas Realizadas" width={6}>
                  <InputMask mask="9999" />
                </Form.Input>
                <Form.Input fluid label="Valor Por Frete" width={6}>
                  <InputMask mask="9999.99" />
                </Form.Input>
              </Form.Group>
              <Form.Group>
                <Form.Input fluid label="Rua" width={100} />
                <Form.Input fluid label="Número" width={6} />
                </Form.Group>
                <Form.Group>
                <Form.Input fluid label="Bairro" width={6} />
                <Form.Input fluid label="Cidade" width={6} />
                <Form.Input fluid label="CEP" width={6} />
                </Form.Group>
                <Form.Group>
                    <Form.Dropdown fluid label="UF" selection options={options} />
                </Form.Group>
                <Form.Group>
                    <Form.Input fluid label="Complemento" width={100} />
                </Form.Group>
                <Form.Group>
                    <Form.RadioButton label="Ativo" />
                    <Form.RadioButton label="Inativo" selected={true}/>
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
