import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import React from 'react';

export default function useAuth(){
  const context = useContext(AuthContext);

  return context;
};