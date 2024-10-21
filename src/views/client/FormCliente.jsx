import axios from "axios";
import React from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';

export default function FormCliente () {
    const [nome, setNome] = React.useState('');
    const [cpf, setCpf] = React.useState('');
    const [foneCelular, setFoneCelular] = React.useState('');
    const [foneFixo, setFoneFixo] = React.useState('');
    const [dataNascimento, setDataNascimento] = React.useState('');
    const salvarCliente = () => {
        console.log('Nome: ', nome);
        console.log('CPF: ', cpf);
        console.log('Fone Celular: ', foneCelular);
        console.log('Fone Fixo: ', foneFixo);
        console.log('Data Nascimento: ', dataNascimento);
        let clienteRequest = {
            nome: nome,
            cpf: cpf,
            foneCelular: foneCelular,
            foneFixo: foneFixo,
            dataNascimento: dataNascimento
        }
        axios.post("http://localhost:8080/api/cliente", clienteRequest)
        .then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    return (

        <div>

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                    <h2> <span style={{color: 'darkgray'}}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    onChange={(e) => setNome(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        onChange={(e) => setCpf(e.target.value)}
                                    /> 
                                </Form.Input>

                            </Form.Group>
                            
                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Fone Celular'
                                    width={6}>
                                    <InputMask 
                                        mask="(99) 9999.9999"
                                        onChange={(e) => setFoneCelular(e.target.value)}
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    width={6}>
                                    <InputMask 
                                        mask="(99) 9999.9999"
                                        onChange={(e) => setFoneFixo(e.target.value)}
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Data Nascimento'
                                    width={6}
                                >
                                    <InputMask 
                                        mask="99/99/9999" 
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        onChange={(e) => setDataNascimento(e.target.value)}
                                    /> 
                                </Form.Input>

                            </Form.Group>
                        
                        </Form>
                        
                        <div style={{marginTop: '4%'}}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                Voltar
                            </Button>
                                
                            <Button
                                onClick={salvarCliente}
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>
                        </div>
                    </div>
                    
                </Container>
            </div>
        </div>

    );

}
