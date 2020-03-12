import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Auth, Doodle } from "../../services";
import "./Console.scss";

function Console (props) {
    const [doodles, setDoodles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect( () => {
        async function loadDoodles () {
            let res = await Doodle.getAll(props.user.id);  
            setDoodles(res);
            setIsLoading(false);
        }
        
        loadDoodles();
    }, [props.user.id]); 
    
    async function handleDelete(id) {
        setIsLoading(true);
        
        try {
            await Doodle.remove(props.user.id, id);
            setDoodles( doodles.filter(d => d._id !== id) );
        } catch (e) {
            alert(e);
        }
        
        setIsLoading(false);
    }
    
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
                    className="Console-create-btn"
                    to="/editor"
                >
                    New Doodle
                </Link>
                <ul className="Console-nav">
                </ul>
            </aside>
            <div className="Console-aside-shadow" />
            <section className="Console-content">
                <header>
                    <div className="Console-content-1">
                        Title
                    </div>
                    <div className="Console-content-2">
                        Created
                    </div>
                    <div className="Console-content-3">
                        Options
                    </div>
                </header>
                {isLoading 
                    ? <div className="Console-loader"/>
                    : <React.Fragment> 
                        {doodles.map(d =>
                            <section key={d._id}>
                                <div className="Console-content-1">
                                    <i className="material-icons">image</i>
                                    {d.title}
                                </div>
                                <div className="Console-content-2">
                                    {d.created}
                                </div>
                                <div className="Console-content-3">
                                    <Link to={`/editor?id=${d._id}`}>
                                        <i className="material-icons">edit</i>
                                    </Link>
                                    <button onClick={ () => handleDelete(d._id) }>
                                        <i className="material-icons">delete</i>
                                    </button>
                                </div>
                            </section>
                        )}
                    </React.Fragment>
                }
            </section>
        </div>
    );
}

export default Console;
