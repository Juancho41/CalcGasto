import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';

import { useState } from 'react';

import Billetera from './Billetera';
import IngresoGasto from './IngresoGasto';

function BilleGrid(props) {
    const [showIngreso, setShowIngreso] = useState(false);
    const [showGasto, setShowGasto] = useState(false);
    const handleCloseIng = () => setShowIngreso(false);
    const handleShowIng = () => setShowIngreso(true);
    const handleCloseGas = () => setShowGasto(false);
    const handleShowGas = () => setShowGasto(true);

    return (
        <Container className='mt-5'>
            <Row xs={1} md={2} className="g-4">
                {props.mockDataBilletera.map((billetera) => (
                    <Col key={billetera.id}>
                        <Billetera bille={billetera} handleShowIng={handleShowIng} handleShowGas={handleShowGas}/>
                    </Col>
                ))}
            </Row>
            <IngresoGasto placement={'start'} handleClose={handleCloseIng} show={showIngreso}/>
            <IngresoGasto placement={'end'} handleClose={handleCloseGas} show={showGasto}/>
        </Container>

    );
}

export default BilleGrid;


