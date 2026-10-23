import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <section className='sidebar'>
        <button>
            <img 
                src="src/assets/blacklogo.png" 
                alt="gpt-logo" 
                className='logo'
            />
            <span><i className="fa-solid fa-pen-to-square"></i></span>
        </button>

        <ul className='history'>
            <li>thread1</li>
            <li>thread2</li>
            <li>thread3</li>
        </ul>

        <div className='sign'>
            <p>By Krishanu &hearts;</p>
        </div>
    </section>
  )
}

export default Sidebar
