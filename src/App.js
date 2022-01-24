
import './App.css';
import Login from './components/Login';
import io from 'socket.io-client';
import Game from './components/Game';
// import { Provider } from 'react-redux';


export const socket = io.connect('http://localhost:4000')
socket.on("alert", message => {
  alert(message);
})

function App() {

  return (
    <div>
      <Game/>
      <Login/>
    </div>
  );
}

export default App;
