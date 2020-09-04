import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Doodle } from '../../services';
import Loader from '../../components/Loader';
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
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    onLoad();
  }, [props.user.id]);

  const handleDelete = async (id) => {
    setLoading(true);

    try {
      await Doodle.remove(props.user.id, id);
      setDoodles(doodles.filter((doodle) => doodle._id !== id));
    } catch (error) {
      alert(error);
    }

    setLoading(false);
  };

  return (
    <main className="Console">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="Console-list">
          <section className="Console-list-header">
            <div>Title</div>
            <div>Created</div>
            <div>Options</div>
          </section>
          {doodles.map((doodle) => (
            <section key={doodle._id} className="Console-list-item">
              <div>{doodle.title}</div>
              <div>{moment(doodle.created).format('YYYY/MM/DD')}</div>
              <div>
                <Link to={`/editor?id=${doodle._id}`} title="Edit this doodle">
                  <i className="material-icons">edit</i>
                </Link>
                <button
                  onClick={() => handleDelete(doodle._id)}
                  title="Delete this doodle"
                >
                  <i className="material-icons">delete</i>
                </button>
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}

export default Console;
