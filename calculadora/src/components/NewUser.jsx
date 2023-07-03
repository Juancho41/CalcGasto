import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import { Link } from 'react-router-dom';


import userService from '../services/users'
import billeteraService from '../services/billeteras';

function NewUser({ setUsuario, setVerLogin }) {

    // Validacion del formulario
    const [validated, setValidated] = useState(false);

    //Onchange del Username
    const [username, setUsername] = useState(null)
    const handleUsername = (event) => {
        setUsername(event.target.value)
    }

    //Onchange del Email
    const [email, setEmail] = useState(null)
    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    //Onchange del Pass
    const [pass, setPass] = useState(null)
    const handlePass = (event) => {
        setPass(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);

        const newUser = {
            'username': username,
            'email': email,
            'password': pass
        }

        try {

            const createUser = await userService.create(newUser)
            console.log(createUser.data)
            setUsuario(createUser.data)
            billeteraService.setToken(createUser.data.token)
            window.localStorage.setItem(
                'nuevoUsuarioCalc', JSON.stringify(createUser.data)
            )
            setUsername('')
            setEmail('')
            setPass('')
        } catch (exception) {
            alert(exception)

        }


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
                                onChange={handleUsername}
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
                                    onChange={handleEmail}
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
                            <Form.Control type="password" placeholder="Contraseña" required onChange={handlePass} />
                            <Form.Control.Feedback type="invalid">
                                La contraseña debe ser válida.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col></Col>
                </Row>

                <Row className="mb-3">
                <Col></Col>
                    <Col>
                        <Button variant="primary" type="submit">
                            Crear!
                        </Button>
                    </Col>
                    <Col></Col>

                </Row>
                <Row className="mb-3">
                <Col></Col>
                <Col xs={6}>
                    ¿Ya tenes usuario?
                    <Link onClick={() => setVerLogin(true)}>
                        LogIn
                    </Link>
                </Col>
                <Col></Col>

            </Row>

            </Form>

        </Container>

    );
}

export default NewUser;