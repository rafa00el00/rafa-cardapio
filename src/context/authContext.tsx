import { User } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import { doLogin, doLogoff } from "../modules/auth"

export type AuthContextProps = {
    doSingIn: (user: string, pass: string) => void
    doSignOut: () => void
    , signed: boolean
    , user: User
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)
type AuthProviderProps = {
    children: JSX.Element
}
export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState<User | null>(null)


    const doSingIn = (user: string, pass: string) => {
        return doLogin(user, pass)
            .then(async r => {
                setUser(r.user)
                console.log("Login Sucesso")
                sessionStorage.setItem("@FirebaseAuth:token", await r.user.getIdToken())
                sessionStorage.setItem("@FirebaseAuth:user", JSON.stringify(r.user));
                return r.user
            }).catch(e => {
                console.log(e.message)
                return e;
            })
    }

    const doSignOut = () => {
        return doLogoff()
            .then(r => {
                sessionStorage.removeItem("@FirebaseAuth:token")
                sessionStorage.removeItem("@FirebaseAuth:user")
                setUser(null);
            })
    }

    useEffect(() => {
        const sessionToken = sessionStorage.getItem("@FirebaseAuth:token");
        const sessionUser =  sessionStorage.getItem("@FirebaseAuth:user");
        if(sessionToken && sessionUser)
            setUser(JSON.parse(sessionUser))
    },[])


    return (
        <AuthContext.Provider
            value={{
                doSingIn,
                doSignOut,
                signed: !!user,
                user
            } as AuthContextProps}
        >
            {children}
        </AuthContext.Provider>
    )
} 