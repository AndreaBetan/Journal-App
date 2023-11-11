import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../pages';

export const AuthRoutes = () => {
  return (
   <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        
        {/* Si se entra a la ruta de Auth, cualquiero ruta que no sea login o register, me lleva a login */}
        <Route path='/*' element={<Navigate to='/auth/ogin'/>}/>
   </Routes>
  )
}
