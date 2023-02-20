import { Login } from "@mui/icons-material";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { RotasEnum } from "../modules/rotasEnum";
import { AuthContext, AuthContextProps } from "../pages/context/authContext";

export function PrivateRoutes(){

    const {signed} = useContext(AuthContext) as AuthContextProps;
    const navLogin = RotasEnum.LOGIN;
   
    return signed ? <Outlet /> : <Navigate to={navLogin} />


}