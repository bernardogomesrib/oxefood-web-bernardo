import { Route, Routes } from "react-router-dom";
import FormCliente from "./views/client/FormCliente";
import ListCliente from "./views/client/ListCliente";
import FormConfiguracaoSistema from "./views/configuracaosistema/FormConfiguracaoSistema";
import ListaConfiguracaoSistema from "./views/configuracaosistema/ListConfiguracaoSistema";
import FormEntregador from "./views/entregador/FormEntregador";
import ListEntregador from "./views/entregador/ListEntregador";
import Home from "./views/home/Home";
import FormLogin from "./views/login/FormLogin";
import FormProduto from "./views/produto/FormProduto";
import ListProduto from "./views/produto/ListProduto";
import ProtectedRoute from "./views/util/ProtectedRoute";
function Rotas() {
  return (
    <Routes>
      <Route
        path="home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="form-cliente"
        element={
          <ProtectedRoute>
            <FormCliente />
          </ProtectedRoute>
        }
      />
      <Route
        path="form-produto"
        element={
          <ProtectedRoute>
            <FormProduto />
          </ProtectedRoute>
        }
      />
      <Route
        path="form-entregador"
        element={
          <ProtectedRoute>
            <FormEntregador />
          </ProtectedRoute>
        }
      />
      <Route
        path="form-empresa"
        element={
          <ProtectedRoute>
            <FormConfiguracaoSistema />
          </ProtectedRoute>
        }
      />
      <Route
        path="list-cliente"
        element={
          <ProtectedRoute>
            <ListCliente />
          </ProtectedRoute>
        }
      />
      <Route
        path="list-produto"
        element={
          <ProtectedRoute>
            <ListProduto />
          </ProtectedRoute>
        }
      />
      <Route
        path="list-entregador"
        element={
          <ProtectedRoute>
            <ListEntregador />
          </ProtectedRoute>
        }
      />
      <Route
        path="list-empresa"
        element={
          <ProtectedRoute>
            <ListaConfiguracaoSistema />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<FormLogin />} />
    </Routes>
  );
}
export { Rotas };
