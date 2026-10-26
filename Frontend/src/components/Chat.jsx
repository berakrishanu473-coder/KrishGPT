import '../styles/Chat.css';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from '../MyContext';
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import rehypeHighlight from 'rehype-highlight'
import "highlight.js/styles/github-dark.css";

const Chat = () => {
    const {newChat, prevChats, reply} = useContext(MyContext);
    const [latestReply, setLatestReply] = useState(null);

    useEffect(() => {
      // latest reply separate => typing effect create
      if(!prevChats?.length) return;

      const content = reply.split(" "); // individual words

      let idx = 0;
      const interval = setInterval(() => {
          setLatestReply(content.slice(0, idx+1).join(" "));
          idx++;

          if(idx >= content.length) clearInterval(interval);
      }, 40)

      return () => clearInterval(interval);

    }, [prevChats, reply]);
    
  return (
    <>
      {newChat && <h1>Start a New Chat !</h1>}
      <div className='chats'>
        {
            prevChats?.slice(0, -1).map((chat, idx) => (
                <div key={idx} className={chat.role === "user" ? "userDiv" : "gptDiv"}>
                    {
                        chat.role === "user" ?
                            <p className='userMsg'>{chat.content}</p> :
                            <div className="gptMsg">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeHighlight]}
                                >
                                    {chat.content}
                                </ReactMarkdown>
                            </div>
                    }
                </div>
            ))
        }

        {
            prevChats.length > 0 && latestReply != null && 
            <div className='gptDiv' key={'typing'}>
                <div className="gptMsg">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                    >
                        {latestReply}
                    </ReactMarkdown>
                </div>
            </div>
        }
      </div>
    </>
  )
}

export default Chat
