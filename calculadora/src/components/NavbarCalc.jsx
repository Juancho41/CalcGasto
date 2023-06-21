import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Link } from 'react-router-dom';

function NavbarCalc() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand >Calculadora de gastos</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/">
              Resumen
            </Link>
            <Link to="/ingresos">
              Ingresos
            </Link>
            <Link to="/gastos">
              Gastos
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarCalc;