import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { JournalPage } from '../pages/JournalPage'

export const JournalRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<JournalPage/>}/>

        {/* Si entro a esta ruta y no estoy en el JorunalPage, cualquier ruta me lleva a JorunalPage */}
        <Route path='/*' element={<Navigate to="/"/>}/>
    </Routes>
  )
}
