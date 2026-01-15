import {BrowserRouter , Routes , Route ,Navigate} from 'react-router-dom';

import {AuthProvider} from './route/authProvider.jsx'
import PrivateRoute from './route/privateRoute.jsx'
import PublicRoute from './route/publicRoute.jsx' 

import Landing from './pages/landing.jsx'
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import MainLayout from './pages/mainLayout.jsx'
import Home from './pages/home.jsx'
import TotalEvents from './pages/totalEvents.jsx'
import Upcoming from './pages/upcoming.jsx'
import Closed from './pages/closed.jsx'
import Add from './pages/add.jsx'
import Detail from './pages/detail.jsx'
import DeconnexionSure from './pages/deconnexionSure.jsx'

function App () {
  return (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing/>}/>
      
        <Route path="/" element={<PublicRoute><Landing /></PublicRoute>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        { /*
        <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        */}
        <Route path="/app" 
          element={
                <PrivateRoute>
                     <MainLayout/> 
                </PrivateRoute>}
        >
                <Route index element={<Home/>}/>
                <Route path="home" element={<Home/>}/>
                <Route path="totalEvents" element={<TotalEvents/>}/>
                <Route path="upcoming" element={<Upcoming/>}/>
                <Route path="closed" element={<Closed/>}/>
                <Route path="add" element={<Add/>}/>
                <Route path="detail" element={<Detail/>}/>
                <Route path="deconnexionSure" element={<DeconnexionSure/>}/>
        </Route>

        <Route path="/detail/:id"
          element={
            <PrivateRoute>
                <Detail/>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace/>}/>

      </Routes>
    </BrowserRouter>
  </AuthProvider>
  )
}

export default App
