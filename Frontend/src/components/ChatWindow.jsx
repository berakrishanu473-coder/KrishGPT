import '../styles/ChatWindow.css';
import Chat from './Chat.jsx';
import { MyContext } from '../MyContext.jsx';
import { useContext, useState, useEffect } from 'react';
import { ScaleLoader } from 'react-spinners'

const ChatWindow = () => {
  const {prompt, setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats, setNewChat} = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getReply = async() => {
    setLoading(true);
    setNewChat(false);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId
      })
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/chat`, options);
      const res = await response.json();
      console.log(res);
      setReply(res.reply)
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  // Append new chat to prevChats
  useEffect(() => {
    if(prompt && reply) {
      setPrevChats(prevChats => (
        [...prevChats,
          {
            role: "user",
            content: prompt,
          },
          {
            role: "assistant",
            content: reply
          }
        ]
      ));
    }

    setPrompt("");
  }, [reply])
  

  return (
    <div className='chatWindow'>
      <div className='navbar'>
        <span>KrishGPT<i className="fa-solid fa-chevron-down"></i></span>
        <div className="userIconDiv" onClick={() => setIsOpen(!isOpen)}>
            <span className='userIcon'><i className="fa-solid fa-user"></i></span>
        </div>
      </div>

      {
        isOpen && 
        <div className='dropDown'>
           <div className="dropDownItem"><i class="fa-solid fa-cloud-arrow-up"></i> Upgrade Plan</div>
           <div className="dropDownItem"><i class="fa-solid fa-gear"></i> Settings</div>
           <div className="dropDownItem"><i class="fa-solid fa-right-from-bracket"></i> Log Out</div>
        </div>
      }

      <Chat />


      <ScaleLoader color='#fff' loading={loading} />

      <div className="chatInput">
        <div className="inputBox">
            <textarea 
              placeholder='Ask KrishGPT'
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' ? getReply() : ''}
            />
            <div id='submit' onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
        </div>
        <p className='info'>
            KrishGPT can make mistakes. Check important docs.
        </p>
      </div>
    </div>
  )
}

export default ChatWindow
