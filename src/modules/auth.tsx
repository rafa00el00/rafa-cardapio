import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";


export async function doLogin(user: string,pass: string){
    return await signInWithEmailAndPassword(auth,user,pass)
        .then(r => {
            console.log(r)
            console.log(r.user)
            return r
        })
}

export async function doLogoff() {
    return await signOut(auth);
}