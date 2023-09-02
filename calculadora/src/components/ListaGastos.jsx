import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";

import DateFilter from "./DateFilter";

import { useState, useEffect } from "react";

//importar servicios
import gastosService from '../services/gastos'

// importar componente
import ModificarGastosIngresos from "./ModificarGastosIngresos";

function ListaGastos({ gastosUsuario, setGastosUsuario, billeterasUsuario, setBilleterasUsuario }) {

  //Logica para filtrar por fechas
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState(gastosUsuario);
  const [categoriaFilter, setCategoriaFilter] = useState("");
  const [origenFilter, setOrigenFilter] = useState("");

   // actualiza filteredData cuando gastosUsuario cambia
   useEffect(() => {
    setFilteredData(gastosUsuario);
  }, [gastosUsuario]);


  const handleFilter = (start, end, categoria, origen) => {
    setStartDate(start);
    setEndDate(end);
    setCategoriaFilter(categoria);
    setOrigenFilter(origen);

    if (!start || !end) {
      setFilteredData(gastosUsuario);
      return;
    }

    const startObj = new Date(start).toISOString().substring(0, 10);
    const endObj = new Date(end).toISOString().substring(0, 10);

    const filtered = gastosUsuario.filter((item) => {
      const dateCondition =
        new Date(item.date).toISOString().substring(0, 10) >= startObj &&
        new Date(item.date).toISOString().substring(0, 10) <= endObj;

      const categoriaCondition =
        !categoria || item.categoria.toLowerCase().includes(categoria.toLowerCase());

      const origenCondition =
        !origen || item.billetera.nombre.toLowerCase().includes(origen.toLowerCase());

      return dateCondition && categoriaCondition && origenCondition;
    });

    setFilteredData(filtered);
  };

  //Funcion para actualizar las billeteras despues de modificar o eliminar
  const updateBille = (id) => {
    const gasto = gastosUsuario.find((gasto) => gasto.id == id)
    const bille = billeterasUsuario.find(bille => bille.id == gasto.billeteraId)

      const nuevaBilletera = {
        ...bille,
        monto: (bille.monto += parseInt(gasto.monto)),
      };

      setBilleterasUsuario(
        billeterasUsuario.map((bille) =>
          bille.id !== gasto.billeteraId ? bille : nuevaBilletera
        )
      );
  }


  // funcion para eliminar un gasto
  const deleteGasto = async (id) => {
    await gastosService.deleteGasto(id);
    setGastosUsuario(gastosUsuario.filter((gasto) => gasto.id != id));
    updateBille(id);
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
      origenFilter={origenFilter}
      categoriaFilter={categoriaFilter}
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
