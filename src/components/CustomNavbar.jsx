import React, { useState } from 'react'
import { Navbar, Button, DarkThemeToggle } from 'flowbite-react'
import logo from '../assets/knowledge.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'

const CustomNavbar = () => {

    const {isLogin, login, logout, user } = useAuth();

    const [links, setLinks] = useState([
        {name: "Home", link: "/"},
        {name: "About", link: "/about"},
        {name: "Services", link: "/services"},
        {name: "Contact", link: "/contact"},
        {name: "Course", link: "/courses"},
        {name: "Categories", link: "/categories"},
    ])

  return (
    <Navbar className='shadow ' fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img 
            src={logo} 
            className="mr-3 rounded-full h-6 sm:h-9" 
            alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Mind up</span>
      </Navbar.Brand>
      

      <div className="flex gap md:order-2">
        <>
          <Link to={'/login'}>
              <Button pill size='sm' color='blue'>
                  Login
              </Button>
          </Link>
          <Link to={'/signup'}>
              <Button pill size='sm' color='purple'>
                  Signup
              </Button>
          </Link>
        </>

        {
        isLogin() && ( <>
        
        <Button pill size='sm' color='purple'>
                  {user.name}
              </Button>

              <Button onClick={() => {
                logout();
              }} pill size='sm' color='purple'>
                  Logout
              </Button>
          
        </>
      )}

      {
        isLogin() && ( <>
        
        <Button pill size='sm' color='purple'>
                  {user.name}
              </Button>

              <Button onClick={() => {
                logout();
              }} pill size='sm' color='purple'>
                  Logout
              </Button>
          
        </>
      )}

        <DarkThemeToggle />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {
            links.map((link, index) => (
                <Navbar.Link as={Link} key={index} to={link.link}>
                    {/* <Link to={"/"}>Home</Link> */}
                    {link.name}
                </Navbar.Link>
            ))
        }
      </Navbar.Collapse>
    </Navbar>
  )
}

export default CustomNavbar