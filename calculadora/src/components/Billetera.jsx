import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import billeteraService from "../services/billeteras";

import TransferButton from "./TransferButton";

function Billetera(props) {
  const handleClickIng = () => {
    console.log(props.bille.nombre);
    props.setDestino(props.bille.nombre);
    props.setIdBilletera(props.bille.id);
    props.handleShowIng();
  };
  const handleClickGas = () => {
    console.log(props.bille.nombre);
    props.setIdBilletera(props.bille.id);
    props.setOrigen(props.bille.nombre);
    props.handleShowGas();
  };

  const borrarBille = async (id) => {
    if (confirm('Está seguro q quier borrar esta billetera? Todos los gastos e ingresos pertenecientes a la misma serán borrados')) {
      try {
        await billeteraService.deleteBille(id)
        //quitar billetera borrada
        props.setBilleterasUsuario(
          props.billeterasUsuario.filter((bille) => bille.id != id)
        );
        //quitar los gastos de la billetera borrada
        props.setGastosUsuario(
          props.gastosUsuario.filter((gasto) => gasto.billeteraId != id)
        );
        //quitar ingresos de la billetera borrada
        props.setIngresosUsuario(
          props.ingresosUsuario.filter((ingreso) => ingreso.billeteraId != id)
        );
      } catch (error) {
        alert(error)
      }
    } else {
      return
    }

  }

  const tranferirBille = async (origen, destino, cambioMonto) => {
    const billeOrigen = props.billeterasUsuario.find((item) => item.id == origen.id)
    billeOrigen.monto -= Number(cambioMonto);    
    
    const billeDestino = props.billeterasUsuario.find((item) => item.id == destino.id)
    billeDestino.monto += Number(cambioMonto);

    const transferObj = {
      monto: cambioMonto,
      billeDestino: billeDestino
    }

    try {
      await billeteraService.transfer(origen.id, transferObj)

      props.setBilleterasUsuario(
        props.billeterasUsuario.map((bille) => {
          if (bille.id == billeOrigen.id) {
            return billeOrigen
          } else if (bille.id == billeDestino.id) {
            return billeDestino
          } else {
            return bille
          }
        })
      );
            
    } catch (error) {
      console.log(error)
    }

    
  }

  return (
    <Card>
      <Card.Header as="h5" className="d-flex justify-content-between">
        {props.bille.nombre}
        <div className="d-flex justify-content-between">
          <div style={{ marginRight: '10px' }}>
            <TransferButton 
            bille={props.bille}
            billeterasUsuario={props.billeterasUsuario}
            tranferirBille={tranferirBille} />
          </div>
          <div>
            <Button variant="danger" onClick={() => borrarBille(props.bille.id)}>
              X
            </Button>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title>Monto: </Card.Title>
        <Card.Text>{props.bille.monto}</Card.Text>
        {props.bille.permitCredit &&
          <>
            <Card.Title>Crédito: </Card.Title>
            <Card.Text>{props.bille.montoCredito}</Card.Text>
          </>

        }
        <Button variant="success" onClick={handleClickIng}>
          Ingreso
        </Button>
        <Button className="m-2" variant="danger" onClick={handleClickGas}>
          Gasto
        </Button>
      </Card.Body>
    </Card>
  );

}

export default Billetera;
