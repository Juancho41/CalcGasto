import BilleGrid from "./BilleGrid";
import Login from "./Login";

function Principal ( {setUsuario, billeterasUsuario, usuario, setGastosUsuario, gastosUsuario, setBilleterasUsuario, ingresosUsuario, setIngresosUsuario}) {

    if (usuario) {
        return (
            <BilleGrid billeterasUsuario={billeterasUsuario} setGastosUsuario={setGastosUsuario} gastosUsuario={gastosUsuario} setBilleterasUsuario={setBilleterasUsuario} ingresosUsuario={ingresosUsuario} setIngresosUsuario={setIngresosUsuario}/>
        )
    } else {
        return (
            <Login setUsuario={setUsuario} />
        )
    }
}

export default Principal;