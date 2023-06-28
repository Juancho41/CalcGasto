import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Link } from 'react-router-dom';


function NavbarCalc({ usuario, setUsuario }) {

  const linkStyle = {
    fontSize: "15px",
    color: "grey",
    padding: "10px",
    textDecoration: "none",
  }

  const logOutUser = () => {
    window.localStorage.clear()
    setUsuario(null)
  }

  

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Calculadora de gastos</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {usuario &&
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" style={linkStyle}>
                Resumen
              </Link>
              <Link to="/ingresos" style={linkStyle}>
                Ingresos
              </Link>
              <Link to="/gastos" style={linkStyle}>
                Gastos
              </Link>
            </Nav>
            <Nav>
              <div style={linkStyle}>
                Hola {usuario.username}!
              </div>
              <Link onClick={logOutUser} style={linkStyle}>
                Log Out
              </Link>
            </Nav>
          </Navbar.Collapse>
        }
      </Container>
    </Navbar>
  );
}

export default NavbarCalc;