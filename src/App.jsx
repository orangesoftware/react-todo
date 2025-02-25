import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import About from './components/About';
import Home from './components/Home';
import TodoContainer from './components/TodoContainer';

function App() {
  const tableName = `${import.meta.env.VITE_TABLE_NAME}`;
  return (
    <>
      <BrowserRouter>
       <NavBar/> 
        
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/todo" element={<TodoContainer tableName={tableName} />} />                     
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
