import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';

function NewUser() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <Container className='mt-5'>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col></Col>
                    <Col xs={6}>
                        <Form.Group controlId="validationCustom01">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Username"
                            />
                            <Form.Control.Feedback>Username válido!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col></Col>
                </Row>
                <Row className="mb-3">
                    <Col></Col>
                    <Col xs={6}>
                        <Form.Group controlId="validationCustomUsername">
                            <Form.Label>Correo electrónico</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Coloque un correo electrónico válido.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col></Col>
                </Row>
                <Row className="mb-3">
                    <Col></Col>
                    <Col xs={6}>
                        <Form.Group md="6" controlId="validationCustom03">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Contraseña" required />
                            <Form.Control.Feedback type="invalid">
                                La contraseña debe ser válida.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col></Col>
                </Row>

                <Row className="mb-3">
                    <Col></Col>
                    <Col xs={6}>
                        <Form.Group className="mb-3">
                            <Form.Check
                                required
                                label="Estoy de acuerdo con los términos y condiciones"
                                feedback="Debes estar de acuerdo apara poder crear el usuario"
                                feedbackType="invalid"
                            />
                        </Form.Group>
                        <Button type="submit">Crear usuario</Button>
                    </Col>
                    <Col></Col>
                </Row>
            </Form>

        </Container>

    );
}

export default NewUser;