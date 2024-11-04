import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default function MenuSistema(props) {
  return (
    <>
      <Menu inverted>
        <Menu.Item
          name="home"
          active={props.tela === "home"}
          as={Link}
          to="/"
        />

        <Menu.Item
          name="cliente"
          active={props.tela === "cliente"}
          as={Link}
          to="/form-cliente"
        />
        <Menu.Item
          name="produto"
          active={props.tela === "produto"}
          as={Link}
          to="/form-produto"
        />

        <Menu.Item
          name="entregador"
          active={props.tela === "entregador"}
          as={Link}
          to="/form-entregador"
        />
        <Menu.Item
            name='cliente'
            active={props.tela === 'Clientes'}
            as={Link}
            to='/list-cliente'
         />
         <Menu.Item
            name='lista de produtos'
            content='Lista de produtos'
            active={props.tela === 'Produtos'}
            as={Link}
            to='/list-produto'
         />
         <Menu.Item
            name='ListaDeEntregadores'
            content='Lista de entregadores'
            active={props.tela === 'Entregadores'}
            as={Link}
            to='/list-entregador'
         />
        
      </Menu>
    </>
  );
}