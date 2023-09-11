import Table from "react-bootstrap/Table";
import { Container, Row, Col } from "react-bootstrap/esm/";
import Button from "react-bootstrap/esm/Button";

import { useState, useEffect } from "react";

//importar servicios
import ingresosService from '../services/ingresos'

// importar componente
import ModificarGastosIngresos from "./ModificarGastosIngresos";
import DateFilter from "./DateFilter";
import GastosChart from './GastosChart';

function ListaIngresos({ ingresosUsuario, setIngresosUsuario, billeterasUsuario, setBilleterasUsuario }) {

  //Logica para filtrar por fechas
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState(ingresosUsuario);
  const [categoriaFilter, setCategoriaFilter] = useState("");
  const [origenFilter, setOrigenFilter] = useState("");

  // actualiza filteredData cuando ingresosUsuario cambia
  useEffect(() => {
    setFilteredData(ingresosUsuario);
  }, [ingresosUsuario]);

  //filtro para la fecha
  const handleDateFilter = (start, end) => {
    setStartDate(start);
    setEndDate(end);

    if (!start || !end) {
      setFilteredData(ingresosUsuario);
      return;
    }

    const startObj = new Date(start).toISOString().substring(0, 10);
    const endObj = new Date(end).toISOString().substring(0, 10);

    const filtered = ingresosUsuario.filter((item) => {
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

    const filtered = ingresosUsuario.filter((item) => {

      const categoriaCondition =
        !categoria || item.categoria.toLowerCase().includes(categoria.toLowerCase());

      const origenCondition =
        !origen || item.billetera.nombre.toLowerCase().includes(origen.toLowerCase());

      return categoriaCondition && origenCondition;
    });

    setFilteredData(filtered);
  };

  //Funcion para actualizar las billeteras despues de eliminar
  const updateBilleElim = (id) => {
    const gasto = ingresosUsuario.find((gasto) => gasto.id == id)
    const bille = billeterasUsuario.find(bille => bille.id == gasto.billeteraId)

    const nuevaBilletera = {
      ...bille,
      monto: (bille.monto -= parseInt(gasto.monto)),
    };

    setBilleterasUsuario(
      billeterasUsuario.map((bille) =>
        bille.id !== gasto.billeteraId ? bille : nuevaBilletera
      )
    );
  }

  //Funcion para actualizar las billeteras despues de cambiar gasto de billetera
  const updateBilleCamb = (idBilleNueva, idBilleAnt, gasto) => {
    const billeNueva = billeterasUsuario.find(bille => bille.id == idBilleNueva)
    const billeAnt = billeterasUsuario.find(bille => bille.id == idBilleAnt)

    const nuevaBilletera = {
      ...billeNueva,
      monto: (billeNueva.monto += parseInt(gasto.monto)),
    };

    const antBilletera = {
      ...billeAnt,
      monto: (billeAnt.monto -= parseInt(gasto.monto)),
    };

    setBilleterasUsuario(
      billeterasUsuario.map((bille) => {
        if (bille.id == billeNueva.id) {
          return billeNueva
        } else if (bille.id == antBilletera.id) {
          return antBilletera
        } else {
          return bille
        }

      })
    );
  }
  // funcion para eliminar un ingreso
  const deleteIngreso = async (id) => {
    await ingresosService.deleteIngreso(id);
    setIngresosUsuario(ingresosUsuario.filter((ingreso) => ingreso.id != id));
    updateBilleElim(id)
  };

  //funcion para modificar lista de gastos
  const editIngreso = async (nuevoGastoIng, idBilleAnt) => {
    await ingresosService.update(nuevoGastoIng.id, nuevoGastoIng);
    setIngresosUsuario(ingresosUsuario.map(gasto => gasto.id == nuevoGastoIng.id ? nuevoGastoIng : gasto))
    updateBilleCamb(nuevoGastoIng.billeteraId, idBilleAnt, nuevoGastoIng)
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
                <th>Destino</th>
                <th>Modificar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {filteredData &&
                filteredData.map((ingreso) => {
                return (
                  <tr key={ingreso.id}>
                    <td>{new Date(ingreso.date)
                      .toISOString()
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("-")}</td>
                    <td>{ingreso.monto}</td>
                    <td style={styles.td}>{ingreso.categoria}</td>
                    <td style={styles.td}>{ingreso.comentario}</td>
                    <td>{ingreso.billetera.nombre}</td>
                    <td>
                      <ModificarGastosIngresos
                        ingreso={ingreso}
                        editIngreso={editIngreso}
                        billeterasUsuario={billeterasUsuario}
                      />
                    </td>
                    <td>
                      <Button onClick={() => deleteIngreso(ingreso.id)}>X</Button>
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

export default ListaIngresos;
