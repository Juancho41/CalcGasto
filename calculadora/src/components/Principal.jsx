import { useState } from "react";
import BilleGrid from "./BilleGrid";
import Login from "./Login";
import NewUser from "./NewUser";



function Principal({ setUsuario, billeterasUsuario, usuario, setGastosUsuario, gastosUsuario, setBilleterasUsuario, ingresosUsuario, setIngresosUsuario }) {

    const [verLogin, setVerLogin] = useState(true)

    
    if (usuario) {
        return (
            <BilleGrid billeterasUsuario={billeterasUsuario} setGastosUsuario={setGastosUsuario} gastosUsuario={gastosUsuario} setBilleterasUsuario={setBilleterasUsuario} ingresosUsuario={ingresosUsuario} setIngresosUsuario={setIngresosUsuario} />
        )
    } else {

        if (verLogin) {
            return (
                <Login setUsuario={setUsuario} setVerLogin={setVerLogin} />
            )

        } else {
            return(
                <NewUser setUsuario={setUsuario} setVerLogin={setVerLogin}/>
            )
        }

    }
}

export default Principal;