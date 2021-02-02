import { Link } from 'react-router-dom';

export default function UserHome({ user }) {
  const { nombre } = user;

  return (
    <div className="text-center bg-white p-2">
      <div>
        <img
          src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
          alt="profile"
          width="200"
          className="rounded-circle m-2"
          style={{ border: '2px solid #18809a' }}
        />
      </div>
      <h4 className="text-uppercase">{nombre}</h4>
      <div className="d-flex justify-content-between px-5">
        <Link to="/newmood">
          <p>New Mood</p>
        </Link>
        <Link to="/feedback">
          <p>Feedback</p>
        </Link>
      </div>
    </div>
  );
}
