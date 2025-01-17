import logo from './logo.svg';
import './App.css';
import Login from './Screen/Login';
import Router from './Routing/Router';
import { SessionProvider } from './Session/Session';

function App() {
  return (
    <SessionProvider>
      <Router/>
    </SessionProvider>
  );
}

export default App;
