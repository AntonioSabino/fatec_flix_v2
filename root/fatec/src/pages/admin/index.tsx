import "./Admin.css";

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface User {
  user_name: string;
  email: string;
}

function Admin() {
  const [users, setUsers] = useState<User[]>()

  const isLogged = localStorage.getItem("user");

  const user = JSON.parse(isLogged!.toString());

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const myInit = {
      method: "GET",
      headers: myHeaders,
    };

    fetch("http://localhost:8080/fatec/api/listar.php", myInit)
      .then((response) => response.json())
      .then((data) => {
        const withoutAdmin = data[0].filter((item: User) => item.user_name !== "admin")

        setUsers(withoutAdmin);
      });
  }, []);

  console.log("User", users);
  
  if (!isLogged && user.username === 'admin') {
    return <Navigate to="/signin" replace={true} />;
  }

  return (
    <div className="home-container">
      <h1>ADMIN</h1>
      {users?.length && users.map((u) => (
          <div key={u.user_name}>
            <h2>{u.user_name}</h2>
          </div>
        ))}
    </div>
  );
}

export default Admin;
