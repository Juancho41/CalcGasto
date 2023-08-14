import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import billeteraService from "../services/billeteras";

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
    if(confirm('Está seguro q quier borrar esta billetera? Todos los gastos e ingresos pertenecientes a la misma serán borrados')) {
      try {
        await billeteraService.deleteBille(id)
        //quitar billetera borrada
        props.setBilleterasUsuario(
          props.billeterasUsuario.filter((bille) =>bille.id != id)
        );
        //quitar los gastos de la billetera borrada
        props.setGastosUsuario(
          props.gastosUsuario.filter((gasto) =>gasto.billeteraId != id)
        );
         //quitar ingresos de la billetera borrada
        props.setIngresosUsuario(
          props.ingresosUsuario.filter((ingreso) =>ingreso.billeteraId != id)
        );
      } catch (error) {
        alert(error)
      }
    } else {
      return
    }

  }

  if (props.bille.permitCredit) {
    return (
      <Card>
        <Card.Header as="h5" className="d-flex justify-content-between">
          {props.bille.nombre}
          <Button variant="danger" onClick={() => borrarBille(props.bille.id)}>
            X
          </Button>
        </Card.Header>
        <Card.Body>
          <Card.Title>Monto: </Card.Title>
          <Card.Text>{props.bille.monto}</Card.Text>
          <Card.Title>Crédito: </Card.Title>
          <Card.Text>{props.bille.montoCredito}</Card.Text>
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
  return (
    <Card>
      <Card.Header as="h5" className="d-flex justify-content-between">
        {props.bille.nombre}
        <Button variant="danger" onClick={() => borrarBille(props.bille.id)}>
          X
        </Button>
      </Card.Header>
      <Card.Body>
        <Card.Title>Monto: </Card.Title>
        <Card.Text>{props.bille.monto}</Card.Text>
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
