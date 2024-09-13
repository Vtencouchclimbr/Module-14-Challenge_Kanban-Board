import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

import './index.css';

function App() {

  return (
    <div className='container'>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
