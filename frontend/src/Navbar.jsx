function Navbar({ token, setIsLogin, logout }) {
  return (
    <nav className="navbar">
      <h2>Task Manager</h2>

      <div>
        {!token ? (
          <>
            <button onClick={() => setIsLogin(true)}>Login</button>
            <button onClick={() => setIsLogin(false)}>Signup</button>
          </>
        ) : (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
