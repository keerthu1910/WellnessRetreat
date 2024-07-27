import { Landingpage } from "./Pages/Landingpage";
import './style.scss';
import axios from "axios";
axios.defaults.baseURL = "https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1"
function App(){
    return(
        <>
             <Landingpage />
        </>
    )
}

export default App;