import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";

import { useState } from "react";

import Billetera from "./Billetera";
import IngresoGasto from "./IngresoGasto";
import AddBilletera from "./AddBilletera";

import billeteraService from "../services/billeteras";
import gastosService from '../services/gastos'

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

  const handleSubmitGasIng = async (event) => {
    event.preventDefault();
    //para un ingreso
    if (destino != null) {

      const bille = props.billeterasUsuario.find(bille => bille.id == idBilletera)


      const nuevaBilletera = {
        ...bille,
        monto: (bille.monto += parseInt(monto)),
      };

      props.setBilleterasUsuario(
        props.billeterasUsuario.map((bille) =>
          bille.id !== idBilletera ? bille : nuevaBilletera
        )
      );

      const nuevoIngreso = {
        id: props.ingresosUsuario.length + 1,
        fecha: new Date(),
        monto: monto,
        categoria: categoria,
        comentario: comentario,
        destino: destino,
        billeteraId: idBilletera,
      };



      props.setIngresosUsuario(props.ingresosUsuario.concat(nuevoIngreso));

      setDate(null);
      setMonto(0);
      setCategoria("");
      setComentario("");
      setDestino(null);
      handleCloseIng();


    }


    //para un gasto
    if (origen != null) {

      const bille = props.billeterasUsuario.find(bille => bille.id == idBilletera)

      //Para gastos con credito
      if (bille.permitCredit && checkbox) {
        const nuevaBilletera = {
          ...bille,
          montoCredito: bille.montoCredito + parseInt(monto),
        };

        props.setBilleterasUsuario(
          props.billeterasUsuario.map((bille) =>
            bille.id !== idBilletera ? bille : nuevaBilletera
          )
        );

        const nuevoGasto = {
          date: new Date(),
          monto: monto,
          categoria: categoria,
          comentario: comentario,
          origen: origen,
          credito: checkbox,
          billeteraId: idBilletera,
        };

        const respuestaGasto = await gastosService.create(nuevoGasto);

        props.setGastosUsuario(props.gastosUsuario.concat(respuestaGasto));

        setDate(null);
        setMonto(0);
        setCategoria("");
        setComentario("");
        setOrigen(null);
        setCheckbox(false);
        handleCloseGas();

      } else {      //Para gastos sin credito
        const nuevaBilletera = {
          ...bille,
          monto: bille.monto - parseInt(monto),
        };

        props.setBilleterasUsuario(
          props.billeterasUsuario.map((bille) =>
            bille.id !== idBilletera ? bille : nuevaBilletera
          )
        );

        const nuevoGasto = {
          date: new Date(),
          monto: monto,
          categoria: categoria,
          comentario: comentario,
          credito: checkbox,
          billeteraId: idBilletera,
        };

        const respuestaGasto = await gastosService.create(nuevoGasto);
        props.setGastosUsuario(props.gastosUsuario.concat(respuestaGasto));

        setDate(null);
        setMonto(0);
        setCategoria("");
        setComentario("");
        setOrigen(null);
        setCheckbox(false);
        handleCloseGas();
      }

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
  const [diaCierreCredito, setDiaCierreCredito] = useState(0);

  const handleGuardarBilletera = async () => {
    const nuevaBilletera = {
      nombre: nombreBilletera,
      monto: 0,
      montoCredito: 0,
      permitCredit: checkboxAddB,
      numDiaPagoTarj: diaPagoCredito,
      numDiaCierreTarj: diaCierreCredito
    };

    const respuesta = await billeteraService.create(nuevaBilletera);

    props.setBilleterasUsuario(props.billeterasUsuario.concat(respuesta));

    setCheckboxAddB(false);
    setNombreBilletera("");
    setDiaPagoCredito(0);
    handleCloseAddB();
    console.log(props.billeterasUsuario);
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
          setDiaPagoCredito={setDiaPagoCredito}
          setNombreBilletera={setNombreBilletera}
          setDiaCierreCredito={setDiaCierreCredito}
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
                setBilleterasUsuario={props.setBilleterasUsuario}
                billeterasUsuario={props.billeterasUsuario}
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
