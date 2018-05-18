import React from 'react'
import { Link } from 'react-router-dom'


const Sidebar = () => (
    <div>
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <Link to="/" className="navbar-brand">Food Me Up</Link>
                </div>
                <ul className="nav navbar-nav">
                    <li><Link to="/recipes">Recettes</Link></li>
                    <li><Link to="/ingredients">Ingrédients</Link></li>
                </ul>
                <form className="navbar-form navbar-right" action="">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search" />
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        </nav>
        <div>

        </div>
    </div>
  )

export default Sidebar