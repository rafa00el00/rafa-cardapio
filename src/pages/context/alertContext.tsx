import { createContext } from "react"

type AlertContextProps = {

}
export const AlertContext = createContext({} as AlertContextProps)

type AlertProviderProps = {
    children: JSX.Element
}
export const AlertProvider = ({children}: AlertProviderProps) => {

    return ( 
        <AlertContext.Provider value={{} as AlertContextProps}>
            {children}
        </AlertContext.Provider>
    )
}