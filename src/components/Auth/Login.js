// import React, { useState } from 'react';
// import authService from '../../services/authService';

// const Login = ({ history }) => {
//   const [credentials, setCredentials] = useState({
//     email: '',
//     password: ''
//   });

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setCredentials(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       await authService.login(credentials);
//       history.push('/');
//     } catch (error) {
//       console.error('Login failed: ', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           value={credentials.email}
//           onChange={handleChange}
//           placeholder="Email"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           value={credentials.password}
//           onChange={handleChange}
//           placeholder="Password"
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const Navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.login(formData);
      console.log("Login successful:", data);
      Navigate("/ProductList");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
