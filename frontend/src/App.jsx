import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./App.css";

const API = "http://localhost:5000/api";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const signup = async () => {
    await axios.post(`${API}/auth/register`, { name, email, password });
    alert("Signup successful! Please login.");
    setIsLogin(true);
  };

  const login = async () => {
    const res = await axios.post(`${API}/auth/login`, { email, password });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setTasks([]);
  };

  const fetchTasks = async () => {
    const res = await axios.get(`${API}/tasks`, {
      headers: { Authorization: token }
    });
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!task) return;
    await axios.post(
      `${API}/tasks`,
      { title: task },
      { headers: { Authorization: token } }
    );
    setTask("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`, {
      headers: { Authorization: token }
    });
    fetchTasks();
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  return (
    <>
      <Navbar token={token} setIsLogin={setIsLogin} logout={logout} />

      {/* FULL SCREEN HERO IMAGE */}
      <div className="hero">
        <h1>Task Management App</h1>
      </div>

      {/* CONTENT */}
      <div className="content">
        {!token && (
          <div className="card">
            <h2>{isLogin ? "Login" : "Signup"}</h2>

            {!isLogin && (
              <input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={isLogin ? login : signup}>
              {isLogin ? "Login" : "Signup"}
            </button>
          </div>
        )}

        {token && (
          <div className="card">
            <h2>Add Task</h2>

            <div className="task-box">
              <input
                placeholder="Enter task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <button onClick={addTask}>Add</button>
            </div>

            <ul>
              {tasks.map((t) => (
                <li key={t._id}>
                  {t.title}
                  <button onClick={() => deleteTask(t._id)}>❌</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
