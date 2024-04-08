import { BrowserRouter as Router } from 'react-router-dom'; 
import './App.css';
import { Verificacion } from './verificacion';

function App() {
  //
  return (
    <div className="App">
      <Router>
        <Verificacion />
      </Router>

    </div>
  );
}

export default App;
