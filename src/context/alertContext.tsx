import { Alert, AlertColor, CircularProgress, Snackbar } from "@mui/material"
import { createContext, useState } from "react"

type AlertContextProps = {
    alertSuccess: (msg: string) => void;
    alertFail: (msg: string) => void;
    alertInfo: (msg: string) => void;
    alertWarn: (msg: string) => void;
    startLoading: () => void;
    stopLoading: () => void;
}
export const AlertContext = createContext({} as AlertContextProps)

type AlertProviderProps = {
    children: JSX.Element

}

export enum AlertTypes {
    SUCESSO = "success",
    FALHA = "error",
    WARN = "warn",
    INFO = "info"
}
export const AlertProvider = ({ children }: AlertProviderProps) => {
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState<AlertColor>("info")
    const [msg, setMsg] = useState("");
    const toastDefault = 6000;
    const [toastTime, setToastTime] = useState(toastDefault);
    const [loading, setLoading] = useState(false);
    // <CircularProgress />

    const setCustomAlert = (type: string, msg: string, time: number = toastDefault) => {
        setType(type as AlertColor)
        setMsg(msg);
        setToastTime(time);
        setVisible(true);
    }
    const alertSuccess = (msg: string) => {
        setCustomAlert(AlertTypes.SUCESSO, msg)
    }
    const alertFail = (msg: string) => {
        setCustomAlert(AlertTypes.FALHA, msg)
    }
    const alertInfo = (msg: string) => {
        setCustomAlert(AlertTypes.INFO, msg)
    }
    const alertWarn = (msg: string) => {
        setCustomAlert(AlertTypes.WARN, msg)
    }

    return (
        <AlertContext.Provider value={{
            alertSuccess,
            alertFail,
            alertInfo,
            alertWarn
        } as AlertContextProps}>
            <Snackbar open={visible} autoHideDuration={toastTime} onClose={() => { setVisible(false) }} >
                <Alert severity={type} onClose={() => { setVisible(false) }} >{msg}</Alert>
            </Snackbar>

            {children}


        </AlertContext.Provider>
    )
}