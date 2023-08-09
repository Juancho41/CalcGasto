import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";

import { useState } from "react";

//importar servicios
import gastosService from '../services/gastos'

// importar componente
import ModificarGastosIngresos from "./ModificarGastosIngresos";

function ListaGastos({ gastosUsuario, setGastosUsuario }) {
  // funcion para eliminar un gasto
  const deleteGasto = async (id) => {
    await gastosService.deleteGasto(id);
    setGastosUsuario(gastosUsuario.filter((gasto) => gasto.id != id));
  };

  //funcion para modificar lista de gastos
  const editGasto = ( nuevoGastoIng ) => {
    setGastosUsuario(gastosUsuario.map(gasto => gasto.id == nuevoGastoIng.id ? nuevoGastoIng : gasto))
  }


  return (
    <Container className="mt-5">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Categoría</th>
            <th>Comentario</th>
            <th>Origen</th>
            <th>¿Es crédito?</th>
            <th>Modificar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {gastosUsuario.map((gasto) => {
            return (
              <tr key={gasto.id}>
                <td>{new Date(gasto.date).toLocaleDateString("en-GB")}</td>
                <td>{gasto.monto}</td>
                <td>{gasto.categoria}</td>
                <td>{gasto.comentario}</td>
                <td>{gasto.origen}</td>
                <td>{gasto.credito ? "Si" : "No"}</td>
                <td>
                  <ModificarGastosIngresos
                    gasto={gasto} editGasto={editGasto}
                  />
                </td>
                <td>
                  <Button onClick={() => deleteGasto(gasto.id)}>X</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListaGastos;
