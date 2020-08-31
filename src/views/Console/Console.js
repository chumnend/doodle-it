import React from 'react';
import { Doodle } from '../../services';
import './Console.scss';

function Console(props) {
  const [doodles, setDoodles] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const onLoad = async () => {
      try {
        const response = await Doodle.getAll(props.user.id);
        setDoodles(response);
        setLoading(false);
      } catch(error) {
        console.log(error.message);
        setLoading(false);
      }
    }
  
    onLoad();
  }, [props.user.id]);

  return (
    <div className="Console view">
      <aside className="Console-aside">
        <h2>Welcome {props.user.username}</h2>
      </aside>
      {isLoading 
        ? <p>Loading...</p>
        : (
          <main className="Console-list">
            <section className="Console-list-header">
              <div>Title</div>
              <div>Created</div>
              <div>Options</div>
            </section>
            {doodles.map(doodle => (
              <section key={doodle._id} className="Console-list-item">
    
              </section>
            ))}
          </main>
        )
      }
    </div>
  );
}

export default Console;
