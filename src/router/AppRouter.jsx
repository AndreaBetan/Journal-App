import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { CheckingAuth } from '../ui';
import { useCheckAuth } from '../hooks';

export const AppRouter = () => {

  // Tomar el status del hook
  const status = useCheckAuth();

  // Si el status es checking se muesta el louder y no carga las rutas
  if (status === 'checking') return <CheckingAuth />

  return (

    <Routes>

      {/* Si el usuario esta autenticado va a la ruta privada del Journal de lo contrario va a Login y Register*/}
      {(status === 'authenticated')
        /* JournalApp: Cualquier path que no entre por auth JournalRoutes */
        ? <Route path="/*" element={ <JournalRoutes /> } />
        /* Login y Register: Cualquier path que entre por auth mostrara el AuhRoutes */
        : <Route path="/auth/*" element={ <AuthRoutes /> } />
      }

      <Route path='/*' element={<Navigate to='/auth/login' />} />

    </Routes>
  )
}
