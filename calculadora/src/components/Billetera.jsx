import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Billetera(props) {

  const handleClickIng = () => {
    console.log(props.bille.nombre)
    props.setDestino(props.bille.nombre)
    props.setIdBilletera(props.bille.id)
    props.handleShowIng()
  }
  const handleClickGas = () => {
    console.log(props.bille.nombre)
    props.setIdBilletera(props.bille.id)
    props.setOrigen(props.bille.nombre)
    props.handleShowGas()
  }

  if (props.bille.permitCredit) {
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
          <Button variant="success" onClick={handleClickIng}>Ingreso</Button>
          <Button className="m-2" variant="danger" onClick={handleClickGas}>Gasto</Button>
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
        <Button variant="success" onClick={handleClickIng}>Ingreso</Button>
        <Button className="m-2" variant="danger" onClick={handleClickGas}>Gasto</Button>
      </Card.Body>
    </Card>
  )

}

export default Billetera;