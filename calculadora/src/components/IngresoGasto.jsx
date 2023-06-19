import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

import FormGastoIng from './FormGastoIng' 

function IngresoGasto(props) {

  const tipoMovimiento = props.titulo
  
  return (
    <>
      
      <Offcanvas placement={props.placement} show={props.show} onHide={props.handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{props.titulo}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FormGastoIng tipoMovimiento= {tipoMovimiento} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default IngresoGasto;