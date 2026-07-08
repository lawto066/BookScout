import { useNavigate } from 'react-router-dom'

function Navbar({ showBack = false }) {
  const navigate = useNavigate();

  return (
    <nav id="navbar">

      {showBack && (<button id="navbar-back" onClick={() => navigate(-1)}>←</button>)}

      <h2>BookScout</h2>

    </nav>
  );
}

export default Navbar;