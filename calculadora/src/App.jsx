import NavbarCalc from "./components/NavbarCalc";
import Principal from "./components/Principal";
import ListaIngresos from "./components/ListaIngresos";
import ListaGastos from "./components/ListaGastos";
import NewUser from "./components/NewUser";

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {


  const mockDataBilletera = [
    {
      'id': 1,
      'nombre': 'Banco',
      'monto': 1234,
      'permiteCredito': true,
      'fechaPagoTarj': 1,
      'montoCredito': 555
    },
    {
      'id': 2,
      'nombre': 'Efectivo',
      'monto': 500,
      'permiteCredito': false,
    },
    {
      'id': 3,
      'nombre': 'MercadoPago',
      'monto': 67678,
      'permiteCredito': false,
    },
  ]
  const mockDataIngresos = [
    {
      'id': 1,
      'fecha': new Date('06/20/2023'),
      'monto': 100000,
      'categoria': 'sueldo',
      'comentario': 'sueldo mensual',
      'destino': 'Banco'
    },
    {
      'id': 2,
      'fecha': new Date('10/06/2023'),
      'monto': 500,
      'categoria': 'movimiento',
      'comentario': 'movimiento a mercado pago',
      'destino': 'MercadoPago'
    },
    {
      'id': 3,
      'fecha': new Date('05/06/2023'),
      'monto': 30,
      'categoria': 'movimiento',
      'comentario': 'extraccion de efectivo',
      'destino': 'Efectivo'
    }
  ]
  const mockDataGastos = [
    {
      'id': 1,
      'fecha': new Date('06/20/2023'),
      'monto': 2000,
      'categoria': 'Gimnasio',
      'comentario': 'cuota mes junio',
      'origen': 'Efectivo',
      'credito': false
    },
    {
      'id': 2,
      'fecha': new Date('06/20/2023'),
      'monto': 2000,
      'categoria': 'Aleman',
      'comentario': 'cuota mes junio',
      'origen': 'Banco',
      'credito': false
    },
    {
      'id': 3,
      'fecha': new Date('06/20/2023'),
      'monto': 4000,
      'categoria': 'Compritas',
      'comentario': 'botitas nichi',
      'origen': 'Banco',
      'credito': true
    },
    {
      'id': 4,
      'fecha': new Date('06/20/2023'),
      'monto': 500,
      'categoria': 'Servicios',
      'comentario': 'gas junio',
      'origen': 'MercadoPago',
      'credito': false
    }
  ]
  const mockDataUser = {
    'id': 1,
    'username': 'Aririta',
    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFyaXJpdGEiLCJpZCI6MSwiaWF0IjoxNjg3NjUxOTkxfQ.KltSb1F977kylXcKCXckjdwnoebNVfXygQxe_fVWCpk'
  }

  const [billeterasUsuario, setBilleterasUsuario] = useState(mockDataBilletera)
  const [ingresosUsuario, setIngresosUsuario] = useState(mockDataIngresos)
  const [gastosUsuario, setGastosUsuario] = useState(mockDataGastos)
  const [usuario, setUsuario] = useState(null);
  useEffect(() => {
    setUsuario(mockDataUser)
  }, [])


  return (
    <BrowserRouter>
      <NavbarCalc usuario={usuario} setUsuario={setUsuario} />
      <Routes>
        <Route path="/" element={<Principal billeterasUsuario={billeterasUsuario}
          setBilleterasUsuario={setBilleterasUsuario} usuario={usuario}
          setGastosUsuario={setGastosUsuario} gastosUsuario={gastosUsuario}
          ingresosUsuario={ingresosUsuario} setIngresosUsuario={setIngresosUsuario} />} />
        <Route path="/ingresos" element={<ListaIngresos ingresosUsuario={ingresosUsuario} setIngresosUsuario={setIngresosUsuario} />} />
        <Route path="/gastos" element={<ListaGastos gastosUsuario={gastosUsuario} setGastosUsuario={setGastosUsuario}/>} />
        <Route path="/newuser" element={<NewUser />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
