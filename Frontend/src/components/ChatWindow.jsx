import '../styles/ChatWindow.css';
import Chat from './Chat.jsx';

const ChatWindow = () => {
  return (
    <div className='chatWindow'>
      <div className='navbar'>
        <span>KrishGPT<i className="fa-solid fa-chevron-down"></i></span>
        <div className="userIconDiv">
            <span className='userIcon'><i className="fa-solid fa-user"></i></span>
        </div>
      </div>
      <Chat />
      <div className="chatInput">
        <div className="inputBox">
            <textarea placeholder='Ask KrishGPT'/>
            <div id='submit'><i className="fa-solid fa-paper-plane"></i></div>
        </div>
        <p className='info'>
            KrishGPT can make mistakes. Check impotant docs.
        </p>
      </div>
    </div>
  )
}

export default ChatWindow
