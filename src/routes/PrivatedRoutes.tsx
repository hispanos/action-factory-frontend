import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { AppContext } from "./Routes";

const PrivatedRoutes = () => {
    const { isLogged, loadingLogin } = useContext(AppContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!loadingLogin) {
          if (!isLogged) {
            navigate('/login');
          }
        }
      }, [isLogged, loadingLogin]);

    return(
        isLogged ? <Outlet/> : <></>
    )
}

export default PrivatedRoutes