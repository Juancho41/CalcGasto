import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Billetera(props) {

  if (props.bille.permiteCredito) {
    return (
      <Card>
        <Card.Header as="h5">{props.bille.nombre}</Card.Header>
        <Card.Body>
          <Card.Title>Monto: </Card.Title>
          <Card.Text>
            {props.bille.monto}
          </Card.Text>
          <Card.Title>Crédito: </Card.Title>
          <Card.Text>
            {props.bille.montoCredito}
          </Card.Text>
          <Button variant="success" onClick={props.handleShowIng}>Ingreso</Button>
          <Button className="m-2" variant="danger" onClick={props.handleShowGas}>Gasto</Button>
        </Card.Body>
      </Card>
    );
  } 
  return (
    <Card>
        <Card.Header as="h5">{props.bille.nombre}</Card.Header>
        <Card.Body>
          <Card.Title>Monto: </Card.Title>
          <Card.Text>
            {props.bille.monto}
          </Card.Text>
          <Button variant="success" onClick={props.handleShowIng}>Ingreso</Button>
          <Button className="m-2" variant="danger" onClick={props.handleShowGas}>Gasto</Button>
        </Card.Body>
      </Card>
  )

}

export default Billetera;