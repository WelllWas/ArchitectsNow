import { createContext, ReactNode, useEffect, useState } from "react";
import React from 'react';

type User = {
  email: any;
  picture?: any;
  name?:any;
}

type SignIn = {
 user: User;
}

type AuthContextProviderProps = {
  children?: ReactNode | undefined;
}

type AuthContextType = {
  user: User | undefined;
  signIn: (props: SignIn) => void;
  signOut: () => void;
  signed: any;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider(props: AuthContextProviderProps){
    const [user, setUser] = useState<any | null>();

    useEffect(() => {
    const userToken = localStorage.getItem("user_token") || "";
    if(userToken){
      const parsedUser = JSON.parse(userToken);
      setUser(parsedUser);
    }
    }, []);

    function signIn(userSignIn:any){
        try{
          const email = userSignIn.email;
          const type = userSignIn.type;
          const id = userSignIn.id;
          const signedUser = {email, type, id}
          const jsonUser = JSON.stringify(signedUser)
          localStorage.setItem("user_token", jsonUser);
          setUser(signedUser);
          return;
        }catch(e){
          return e;
        }
      };
    
      function signOut(){
        setUser(null);
        localStorage.removeItem("user_token");
      };

    const value = {
        user,
        signIn,
        signOut,

        signed: 
        !!user,
    }

    return (
        <AuthContext.Provider value={value} >
            {props.children}
        </AuthContext.Provider>
    )
    
};