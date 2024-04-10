import Homepage from './components/homepage';
import './App.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Toaster />
        <Homepage />
    </div>
  );
}

export default App;
