import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Auth, Doodle } from "../../services";
import { useToggle } from "../../hooks";
import "./Console.scss";

function Console (props) {
    const [doodles, setDoodles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showMenu, setShowMenu] = useToggle(false);
    
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
            <header className="Console-header">
                <button className="Console-header__button" onClick={setShowMenu}>
                    <i className="material-icons md-36">menu</i>
                </button>
            </header>
            <aside className={showMenu ? "Console-menu show" : "Console-menu hide"}>
                <header className="Console-menu__header">
                    <button className="Console-menu__close-button" onClick={setShowMenu}>
                        <i className="material-icons md-36">clear</i>
                    </button>
                </header>
                <section className="Console-menu__user">
                    <i className="material-icons md-48">account_circle</i>
                    <p>{props.user.username}</p>
                </section>
                <Link className="Console-menu__create" to="/editor">
                    New Doodle
                </Link>
                <nav className="Console-menu__nav">
                </nav>
                <button className="Console-menu__logout" onClick={handleLogout}>
                    Logout
                </button>
            </aside>
            <div className="Console-menu__shadow" />
            {isLoading 
                ? <div className="Console-list__loader" />
                : <main className="Console-list">
                    <section className="Console-list__header">
                        <div>Title</div>
                        <div>Created</div>
                        <div>Options</div>
                    </section>
                    {doodles.map( d => 
                        <section key={d._id} className="Console-list__item">
                            <div>
                                {d.title}
                            </div>
                            <div>
                                {moment(d.created).format("YYYY/MM/DD")}
                            </div>
                            <div>
                                <Link to={`/editor?id=${d._id}`} title="Edit this doodle">
                                    <i className="material-icons">edit</i>
                                </Link>
                                <button onClick={ () => handleDelete(d._id) } title="Delete this doodle">
                                    <i className="material-icons">delete</i>
                                </button>
                            </div>
                        </section>
                    )}
                  </main>
            }
        </div>
    );
}

export default Console;
