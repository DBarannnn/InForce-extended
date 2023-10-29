import { NavLink } from "react-router-dom"
import "./Header.css"

const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
}

export default function Header(){
    return(
        <header>
             <div className="nav-option-container left">
                <NavLink 
                to="/"
                className="nav-option"
                style={({isActive}) => isActive ? activeStyles : null}>
                About
                </NavLink>

                <NavLink 
                to="/Url" 
                className="nav-option"
                style={({isActive}) => isActive ? activeStyles : null}>
                URLS
                </NavLink>

            </div>
            
            <NavLink to="/Url" className="brand-name">URL Shortener</NavLink>

            <div className="nav-option-container right">
                <NavLink 
                to="/login" 
                className="nav-option"
                style={({isActive}) => isActive ? activeStyles : null}
                >Login
                </NavLink>


                <NavLink 
                to="/register" 
                className="nav-option"
                style={({isActive}) => isActive ? activeStyles : null}
                >Register</NavLink>
            </div>
        </header>
    )
}