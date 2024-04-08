import { BrowserRouter as Router } from 'react-router-dom'; 
import './App.css';
import { Verificacion } from './verificacion';

function App() {
  //hola
  return (
    <div className="App">
      <Router>
        <Verificacion />
      </Router>

    </div>
  );
}

export default App;
