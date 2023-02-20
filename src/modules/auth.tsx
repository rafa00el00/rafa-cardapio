import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
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