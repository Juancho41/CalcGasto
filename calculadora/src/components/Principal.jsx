import BilleGrid from "./BilleGrid";
import Login from "./Login";

function Principal ( {billeterasUsuario, usuario, setGastosUsuario, gastosUsuario, setBilleterasUsuario}) {

    if (usuario) {
        return (
            <BilleGrid billeterasUsuario={billeterasUsuario} setGastosUsuario={setGastosUsuario} gastosUsuario={gastosUsuario} setBilleterasUsuario={setBilleterasUsuario}/>
        )
    } else {
        return (
            <Login/>
        )
    }
}

export default Principal;