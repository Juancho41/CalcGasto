import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

import FormGastoIng from './FormGastoIng'

function IngresoGasto({handleSubmitGasIng, setDate, setMonto, setCategoria, setComentario, setDestino, setOrigen, setCheckbox, titulo, placement, show, handleClose, destino, origen, billetera}) {

  const ingreso = titulo == "Ingreso" ? true : false
  const gasto = titulo == "Gasto" ? true : false

  return (
    <>

      <Offcanvas placement={placement} show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{titulo}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FormGastoIng ingreso={ingreso} gasto={gasto} setDate={setDate} setCategoria={setCategoria}
            setCheckbox={setCheckbox} setComentario={setComentario} setDestino={setDestino} billetera={billetera}
            setMonto={setMonto} setOrigen={setOrigen} handleSubmitGasIng={handleSubmitGasIng} destino={destino} origen={origen}/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default IngresoGasto;