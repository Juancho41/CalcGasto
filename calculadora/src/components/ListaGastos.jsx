import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";

import DateFilter from "./DateFilter";

import { useState, useEffect } from "react";

//importar servicios
import gastosService from '../services/gastos'

// importar componente
import ModificarGastosIngresos from "./ModificarGastosIngresos";

function ListaGastos({ gastosUsuario, setGastosUsuario }) {

  //Logica para filtrar por fechas
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState(gastosUsuario);

   // actualiza filteredData cuando gastosUsuario cambia
   useEffect(() => {
    setFilteredData(gastosUsuario);
  }, [gastosUsuario]);


  const handleFilter = (start, end) => {
    setStartDate(start);
    setEndDate(end);

    if (!start || !end) {
      //si alguna de las fechas no está, se resetea el filtro para mostrar toda la data
      setFilteredData(gastosUsuario);
      return;
    }

    const startObj = new Date(start).toISOString().substring(0, 10);
    const endObj = new Date(end).toISOString().substring(0, 10);
    //comparación entre las fechas seleccionadas y los datos
    const filtered = gastosUsuario.filter(
      (item) => new Date(item.date).toISOString().substring(0, 10) >= startObj && new Date(item.date).toISOString().substring(0, 10) <= endObj
    );

    setFilteredData(filtered);
  };


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
      <DateFilter
      handleFilter={handleFilter}
      startDate={startDate}
      endDate={endDate}
    />
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
          {filteredData && filteredData.map((gasto) => {
            return (
              <tr key={gasto.id}>
                <td>{new Date(gasto.date).toISOString().split('T')[0].split('-').reverse().join('-')}</td>
                <td>{gasto.monto}</td>
                <td>{gasto.categoria}</td>
                <td>{gasto.comentario}</td>
                <td>{gasto.billetera.nombre}</td>
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
