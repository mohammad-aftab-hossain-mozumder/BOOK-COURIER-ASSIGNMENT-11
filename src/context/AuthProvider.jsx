import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContex'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { auth } from '../firebase/firebase.init'

const gauthprovider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {

    const [user, setuser] = useState()
    const [loader, setloader] = useState(true)


    const manualregister = (email, password) => {
        setloader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const manualsignin = (email, password) => {
        setloader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const gsign = () => {
        setloader(true)
        return signInWithPopup(auth, gauthprovider)
    }

    // after login

    const logOutMan = () => {
        return signOut(auth)
    }
    const updateProfileMan = (user, profile) => {
        setloader(true)
        return updateProfile(user, profile)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            setuser(currentuser)
            setloader(false)
        })
        return () => unsubscribe()

    }, [])

    const authInfo = {
        loader,
        user,
        updateProfileMan,
        logOutMan,
        gsign,
        manualsignin,
        manualregister,
        setuser
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    )
}

export default AuthProvider