import '../styles/Sidebar.css';
import { useContext, useEffect } from 'react';
import { MyContext } from '../MyContext';
import {v1 as uuidv1} from 'uuid'

const Sidebar = () => {
    const {allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats} = useContext(MyContext);

    const getAllThreads = async() => {
        try {
            const response = await fetch("http://localhost:8080/api/thread");
            const res = await response.json();
            const filteredData = res.map(thread => ({ threadId: thread.threadId, title: thread.title }));
            setAllThreads(filteredData);
            console.log(filteredData)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
      getAllThreads();
    }, [currThreadId])
    

    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    }

  return (
    <section className='sidebar'>
        <button onClick={createNewChat}>
            <img 
                src="src/assets/blacklogo.png" 
                alt="gpt-logo" 
                className='logo'
            />
            <span><i className="fa-solid fa-pen-to-square"></i></span>
        </button>

        <ul className='history'>
            {
                allThreads?.map((thread, idx) => (
                    <li key={idx}>{thread.title}</li>
                ))
            }
        </ul>

        <div className='sign'>
            <p>By Krishanu &hearts;</p>
        </div>
    </section>
  )
}

export default Sidebar
