import './App.css';
import Sidebar from './components/Sidebar.jsx';
import ChatWindow from './components/ChatWindow.jsx';
import { MyContext } from './MyContext.jsx';

function App() {
  const providerValues = {}; // passing values

  return (
    <div className='app'>
      <MyContext.Provider value={providerValues}>
        <Sidebar />
        <ChatWindow />
      </MyContext.Provider>
    </div>
  )
}

export default App
