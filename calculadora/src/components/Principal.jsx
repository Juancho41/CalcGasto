import BilleGrid from "./BilleGrid";
import Login from "./Login";

function Principal ( {mockDataBilletera, usuario}) {

    if (usuario) {
        return (
            <BilleGrid mockDataBilletera={mockDataBilletera}/>
        )
    } else {
        return (
            <Login/>
        )
    }
}

export default Principal;