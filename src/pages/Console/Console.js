import React from "react";
import { Link } from "react-router-dom";
import { Auth } from "../../services";
import "./Console.scss";

function Console (props) {
    
    function handleLogout() {
        Auth.logout();
        props.hasLoggedIn(false);
        props.setUser({});
        props.history.push("/auth");
    }
    
    return (
        <div className="Console">
            <aside className="Console-aside">
                <section className="Console-profile">
                    <div className="Console-profile-avatar">
                        <i className="material-icons md-48">account_circle</i>
                    </div>
                    <div className="Console-profile-name">
                        <p>{props.user.username}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </section>
                <Link 
                    className="Console-doodle-btn"
                    to="/editor"
                >
                    New Doodle
                </Link>
                <ul className="Console-nav">
                    <li>Home</li>
                    <li>Your Doodles</li>
                    <li>Settings</li>
                </ul>
            </aside>
            <div className="Console-aside-shadow" />
            <section className="Console-content">
            </section>
        </div>
    );
}

export default Console;
