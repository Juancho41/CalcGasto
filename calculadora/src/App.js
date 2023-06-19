import NavbarCalc from "./components/NavbarCalc";
import BilleGrid from "./components/BilleGrid";

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

  return (
    <>
      <NavbarCalc />
      <BilleGrid mockDataBilletera={mockDataBilletera}/>

    </>
  );
}

export default App;
