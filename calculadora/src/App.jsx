import NavbarCalc from "./components/NavbarCalc";
import BilleGrid from "./components/BilleGrid";
import ListaIngresos from "./components/ListaIngresos";
import ListaGastos from "./components/ListaGastos";

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
      'fecha': new Date ('06/20/2023'),
      'monto': 100000,
      'categoria': 'sueldo',
      'comentario': 'sueldo mensual',
      'destino': 'Banco'
    },
    {
      'id': 2,
      'fecha': new Date ('10/06/2023'),
      'monto': 500,
      'categoria': 'movimiento',
      'comentario': 'movimiento a mercado pago',
      'destino': 'MercadoPago'
    },
    {
      'id': 3,
      'fecha': new Date ('05/06/2023'),
      'monto': 30,
      'categoria': 'movimiento',
      'comentario': 'extraccion de efectivo',
      'destino': 'Efectivo'
    }
  ]
  const mockDataGastos = [
    {
      'id': 1,
      'fecha': new Date ('06/20/2023'),
      'monto': 2000,
      'categoria': 'Gimnasio',
      'comentario': 'cuota mes junio',
      'origen': 'Efectivo',
      'credito': false
    },
    {
      'id': 2,
      'fecha': new Date ('06/20/2023'),
      'monto': 2000,
      'categoria': 'Aleman',
      'comentario': 'cuota mes junio',
      'origen': 'Banco',
      'credito': false
    },
    {
      'id': 3,
      'fecha': new Date ('06/20/2023'),
      'monto': 4000,
      'categoria': 'Compritas',
      'comentario': 'botitas nichi',
      'origen': 'Banco',
      'credito': true
    },
    {
      'id': 4,
      'fecha': new Date ('06/20/2023'),
      'monto': 500,
      'categoria': 'Servicios',
      'comentario': 'gas junio',
      'origen': 'MercadoPago',
      'credito': false
    }
  ]


  return (
    <BrowserRouter>
      <NavbarCalc />
      <Routes>
        <Route path="/" element={<BilleGrid mockDataBilletera={mockDataBilletera} />} />
        <Route path="/ingresos" element={<ListaIngresos mockDataIngresos={mockDataIngresos}/>} />
        <Route path="/gastos" element={<ListaGastos mockDataGastos={mockDataGastos}/>} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
