import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";

import { useState } from "react";

import Billetera from "./Billetera";
import IngresoGasto from "./IngresoGasto";
import AddBilletera from "./AddBilletera";

function BilleGrid(props) {
  // UseState de los Canvas de Ingreso y Gasto
  const [showIngreso, setShowIngreso] = useState(false);
  const [showGasto, setShowGasto] = useState(false);
  const handleCloseIng = () => setShowIngreso(false);
  const handleShowIng = () => setShowIngreso(true);
  const handleCloseGas = () => setShowGasto(false);
  const handleShowGas = () => setShowGasto(true);

  const [idBilletera, setIdBilletera] = useState(null);
  const [date, setDate] = useState(0);
  const [monto, setMonto] = useState(0);
  const [categoria, setCategoria] = useState(0);
  const [comentario, setComentario] = useState(0);
  const [destino, setDestino] = useState(null);
  const [origen, setOrigen] = useState(null);
  const [checkbox, setCheckbox] = useState(false);

  const handleSubmitGasIng = (event) => {
    event.preventDefault();
    if (destino != null) {
      props.billeterasUsuario.map((bille) => {
        if (bille.nombre == destino) {
          bille.monto += parseInt(monto);

          setDestino(null);
          handleCloseIng();
        }
      });
    }
    if (origen != null) {
      props.billeterasUsuario.map((bille) => {
        if (bille.nombre == origen) {
          if (bille.permiteCredito == true && checkbox) {
            const nuevaBilletera = {
              ...bille,
              montoCredito: bille.montoCredito + parseInt(monto),
            };
            console.log(nuevaBilletera)
            props.setBilleterasUsuario(props.billeterasUsuario.map(bille => bille.id !== idBilletera ? bille : nuevaBilletera))

            const nuevoGasto = {
              id: props.gastosUsuario.length + 1,
              fecha: new Date(),
              monto: monto,
              categoria: categoria,
              comentario: comentario,
              origen: origen,
              credito: checkbox,
            };
            props.setGastosUsuario(props.gastosUsuario.concat(nuevoGasto));

            setDate(null);
            setMonto(0);
            setCategoria("");
            setComentario("");
            setOrigen(null);
            setCheckbox(false);
            handleCloseGas();
          } else {
            bille.monto -= parseInt(monto);
            setOrigen(null);
            handleCloseGas();
          }
        }
      });
    }
  };

  // UseState del AddBilletera

  const [showAddBilletera, setShowAddBilletera] = useState(false);
  const handleCloseAddB = () => {
    setShowAddBilletera(false);
    setCheckboxAddB(false);
  };
  const handleShowAddB = () => setShowAddBilletera(true);

  const [checkboxAddB, setCheckboxAddB] = useState(false);
  const [nombreBilletera, setNombreBilletera] = useState("");
  const [diaPagoCredito, setDiaPagoCredito] = useState(0);

  const handleGuardarBilletera = (event) => {
    event.preventDefault();
    const nuevaBilletera = {
      nombre: nombreBilletera,
      permiteCredito: checkboxAddB,
      fechaPagoTarj: diaPagoCredito,
    };
    setCheckboxAddB(false);
    setNombreBilletera("");
    setDiaPagoCredito(0);
  };

  return (
    <Container className="mt-4">
      <Row>
        <AddBilletera
          handleCloseAddB={handleCloseAddB}
          handleShowAddB={handleShowAddB}
          showAddBilletera={showAddBilletera}
          setCheckboxAddB={setCheckboxAddB}
          checkboxAddB={checkboxAddB}
          handleGuardarBilletera={handleGuardarBilletera}
        />
      </Row>
      <Row xs={1} md={2} className="mt-2 g-4">
        {props.billeterasUsuario.map((billetera) => (
          <div key={billetera.id}>
            <Col>
              <Billetera
                bille={billetera}
                setIdBilletera={setIdBilletera}
                setDestino={setDestino}
                setOrigen={setOrigen}
                handleShowIng={handleShowIng}
                handleShowGas={handleShowGas}
              />
            </Col>
          </div>
        ))}
        <IngresoGasto
          placement={"start"}
          handleClose={handleCloseIng}
          show={showIngreso}
          titulo={"Ingreso"}
          setDate={setDate}
          setCategoria={setCategoria}
          setCheckbox={setCheckbox}
          setComentario={setComentario}
          setDestino={setDestino}
          setMonto={setMonto}
          setOrigen={setOrigen}
          handleSubmitGasIng={handleSubmitGasIng}
          destino={destino}
        />
        <IngresoGasto
          placement={"end"}
          handleClose={handleCloseGas}
          show={showGasto}
          titulo={"Gasto"}
          setDate={setDate}
          setCategoria={setCategoria}
          setCheckbox={setCheckbox}
          setComentario={setComentario}
          setDestino={setDestino}
          setMonto={setMonto}
          setOrigen={setOrigen}
          handleSubmitGasIng={handleSubmitGasIng}
          origen={origen}
        />
      </Row>
    </Container>
  );
}

export default BilleGrid;
