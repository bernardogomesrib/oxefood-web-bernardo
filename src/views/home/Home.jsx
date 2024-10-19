import React from "react";
import { Container, Grid, Image } from "semantic-ui-react";

export default function Home() {
  return (
    <div>
      <div style={{ marginTop: "5%" }}>
        <Container>
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column>
                <Image src="/logo-IFPE.png" size="large" alt="Logo IFPE" />
              </Grid.Column>
              <Grid.Column>
                Bem vindo ao sistema <strong>OxeFood</strong> ! <br />
                Este sistema foi desenvolvido na disciplina de Desenvolvimento
                para WEB III. <br /> <br />
                Para acessar o código da <strong>API</strong> do sistema,
                acesse:{" "}
                <a
                  href="https://github.com/bernardogomesrib/oxefood-api-bernardo"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  https://github.com/bernardogomesrib/oxefood-api{"-bernardo"}
                </a>{" "}
                <br /> <br />
                Para acessar o código do <strong>Módulo WEB</strong>, acesse:{" "}
                <a
                  href="https://github.com/bernardogomesrib/oxefood-web-bernardo"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  https://github.com/bernardogomesrib/oxefood-web{"-bernardo"}
                </a>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
