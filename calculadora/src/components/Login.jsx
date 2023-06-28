import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from 'react-router-dom';
import { useState } from 'react';

import loginService from '../services/login'

function Login({ setUsuario }) {

    const [email, setEmail] = useState(null)
    const [pass, setPass] = useState(null)

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePass = (event) => {
        setPass(event.target.value)
    }

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        const user = {
            'email': email,
            'password': pass
        }

        try {
            const login = await loginService.login(user)

            setUsuario(login.data)
            window.localStorage.setItem(
                'usuarioCalc', JSON.stringify(login.data)
            )
            setEmail('')
            setPass('')
        } catch (exception) {
            alert('Wrong credentials')

        }
    }

    return (
        <Container className='mt-5'>
            <Row>
                <Col></Col>
                <Col xs={6}>

                    <Form onSubmit={handleLoginSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control type="email" placeholder="Ingrese email" onChange={handleEmail} />
                            <Form.Text className="text-muted">
                                No compartiremos tu email con nadie.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Contraseña" onChange={handlePass} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Ingresar
                        </Button>
                    </Form>

                </Col>
                <Col></Col>
            </Row>
            <Row className="mb-3">
                <Col></Col>
                <Col xs={6}>
                    ¿Aún no tenes usuario?
                    <Link to="/newuser">
                        Crear usuario
                    </Link>
                </Col>
                <Col></Col>

            </Row>

        </Container>

    );
}

export default Login;