import React from 'react'
import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme/AppTheme';

export const JounalApp = () => {
  return (
    <>
        <AppTheme>
            {/* Renderizar el sistema de rutas principal de la app */}
            <AppRouter/>

        </AppTheme>   
    </>
  )
}
