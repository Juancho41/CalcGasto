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

    const [date, setDate] = useState(0)
    const [monto, setMonto] = useState(0)
    const [categoria, setCategoria] = useState(0)
    const [comentario, setComentario] = useState(0)
    const [destino, setDestino] = useState(null)
    const [origen, setOrigen] = useState(null)
    const [checkbox, setCheckbox] = useState(false)

    const handleSubmitGasIng = (event) => {
        event.preventDefault()
        if (destino != null) {
            props.mockDataBilletera.map(bille => {
                if (bille.nombre == destino) {
                    bille.monto += parseInt(monto)
                    setDestino(null)
                    handleCloseIng()
                }
            })
            
        } 
        if (origen != null) {
            props.mockDataBilletera.map(bille => {
                
                if (bille.nombre == origen) {
                    if (bille.permiteCredito == true && checkbox) {
                        bille.montoCredito += parseInt(monto)
                        setOrigen(null)
                        setCheckbox(false)
                        handleCloseGas()
                    } else {
                        bille.monto -= parseInt(monto)
                        setOrigen(null)
                        handleCloseGas()
                    }
                    
                }
                
            })
            
        }

    }


    return (
        <Container className='mt-5'>
            <Row xs={1} md={2} className="g-4">
                {props.mockDataBilletera.map((billetera) => (
                    <Col key={billetera.id}>
                        <Billetera bille={billetera} setDestino={setDestino} setOrigen={setOrigen} handleShowIng={handleShowIng} handleShowGas={handleShowGas} />
                    </Col>
                ))}
            </Row>
            <IngresoGasto placement={'start'} handleClose={handleCloseIng} show={showIngreso}
                titulo={'Ingreso'} setDate={setDate} setCategoria={setCategoria} setCheckbox={setCheckbox}
                setComentario={setComentario} setDestino={setDestino} setMonto={setMonto}
                setOrigen={setOrigen} handleSubmitGasIng={handleSubmitGasIng} destino={destino} />
            <IngresoGasto placement={'end'} handleClose={handleCloseGas} show={showGasto} titulo={'Gasto'}
                setDate={setDate} setCategoria={setCategoria} setCheckbox={setCheckbox}
                setComentario={setComentario} setDestino={setDestino} setMonto={setMonto}
                setOrigen={setOrigen} handleSubmitGasIng={handleSubmitGasIng} origen={origen}/>
        </Container>

    );
}

export default BilleGrid;


