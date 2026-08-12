import { useNavigate } from 'react-router-dom'

function Navbar({ showBack = false, backTo = "/" }) {
  const navigate = useNavigate();

  return (
    <nav id="navbar">

      {showBack && (<button id="navbar-back" onClick={() => navigate(backTo)}>←</button>)}

      <h2>BookScout</h2>

      <button id="navbar-help" onClick={() => navigate("/help")}>?</button>

    </nav>
  );
}

export default Navbar;