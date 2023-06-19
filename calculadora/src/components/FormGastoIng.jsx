import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function FormGastoIng() {

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicDate">
        <Form.Label>Fecha:</Form.Label>
        <Form.Control type="date" placeholder="Enter date" />
        <Form.Text className="text-muted">
          Seleccione la fecha del movimiento de dinero
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicNumber">
        <Form.Label>Monto:</Form.Label>
        <Form.Control type="number" placeholder="Ingrese monto" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Categoría:</Form.Label>
        <Form.Control type="text" placeholder="Categoría" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Subcategoría:</Form.Label>
        <Form.Control type="text" placeholder="Subcategoría" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Comentario:</Form.Label>
        <Form.Control type="text" placeholder="Comentario..." />
        <Form.Text className="text-muted">
          Opcional, para identificar el movimiento
        </Form.Text>
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default FormGastoIng;