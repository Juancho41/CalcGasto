import Table from "react-bootstrap/Table";
import { Container, Row, Col } from "react-bootstrap/esm/";
import Button from "react-bootstrap/esm/Button";

import { useState, useEffect } from "react";

//importar servicios
import gastosService from '../services/gastos'

// importar componente
import ModificarGastosIngresos from "./ModificarGastosIngresos";
import DateFilter from "./DateFilter";
import GastosChart from './GastosChart';

function ListaGastos({ gastosUsuario, setGastosUsuario, billeterasUsuario, setBilleterasUsuario }) {

  //Logica para filtrar por fechas
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState(gastosUsuario);
  const [categoriaFilter, setCategoriaFilter] = useState("");
  const [origenFilter, setOrigenFilter] = useState("");

  // actualiza filteredData cuando gastosUsuario cambia
  useEffect(() => {
    setFilteredData(gastosUsuario);
  }, [gastosUsuario]);

  //filtro para la fecha
  const handleDateFilter = (start, end) => {
    setStartDate(start);
    setEndDate(end);

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

      return dateCondition;
    });

    setFilteredData(filtered);
  };

  // filtro para categoria y origen
  const handleCatFilter = (categoria, origen) => {
    setCategoriaFilter(categoria);
    setOrigenFilter(origen);

    const filtered = gastosUsuario.filter((item) => {

      const categoriaCondition =
        !categoria || item.categoria.toLowerCase().includes(categoria.toLowerCase());

      const origenCondition =
        !origen || item.billetera.nombre.toLowerCase().includes(origen.toLowerCase());

      return categoriaCondition && origenCondition;
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
  const editGasto = async (nuevoGastoIng) => {
    await gastosService.update(nuevoGastoIng.id, nuevoGastoIng);
    setGastosUsuario(gastosUsuario.map(gasto => gasto.id == nuevoGastoIng.id ? nuevoGastoIng : gasto))
  }
  const styles = {
    td: {
      maxWidth: "5px", // Set the maximum width to 100% of the available space
      whiteSpace: "nowrap", // Prevent text from wrapping
      overflow: "hidden", // Hide overflowing content
      textOverflow: "ellipsis", // Show ellipsis (...) for overflowing text
    },
  };


  return (
    <Container className="mt-5">
      <DateFilter
        handleCatFilter={handleCatFilter}
        handleDateFilter={handleDateFilter}
        startDate={startDate}
        endDate={endDate}
        origenFilter={origenFilter}
        categoriaFilter={categoriaFilter}
      />
      <Row>

        <Col xl={8}>
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
              {filteredData &&
                filteredData.map((gasto) => {
                  return (
                    <tr key={gasto.id}>
                      <td>
                        {new Date(gasto.date)
                          .toISOString()
                          .split("T")[0]
                          .split("-")
                          .reverse()
                          .join("-")}
                      </td>
                      <td>{gasto.monto}</td>
                      <td style={styles.td}>{gasto.categoria}</td>
                      <td style={styles.td}>{gasto.comentario}</td>
                      <td>{gasto.billetera.nombre}</td>
                      <td>{gasto.credito ? "Si" : "No"}</td>
                      <td>
                        <ModificarGastosIngresos
                          gasto={gasto}
                          editGasto={editGasto}
                          billeterasUsuario={billeterasUsuario}
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
        </Col>


        <Col xl={4}>
          <GastosChart data={filteredData} />
        </Col>
      </Row>
    </Container>
  );
}

export default ListaGastos;
