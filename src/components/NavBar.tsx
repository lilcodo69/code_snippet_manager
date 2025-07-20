import Login from "../pages/Login";
import { Link } from 'react-router-dom';


    
const Navbar = () => { 

return (
  <nav className="">
    <div className="flex   justify-end items-center  gap-4" >
        <Link to='/' className="">
                CodeSnippets
        </Link>

        
        <div className="flex gap-4">
            <Link to="/" className="">
            Home
          </Link>
          <Link to="/login" className="">
            Login
          </Link>
        </div>
    </div>
  </nav>
    
)
    


    
}

export default Navbar;