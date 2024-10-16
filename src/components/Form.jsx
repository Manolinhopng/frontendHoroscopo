import "./styles/Form.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Form({ callback }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const goTo = useNavigate();

  const validateUser = async (event) => {
    event.preventDefault();
    console.log("Datos enviados:", { username, password });
    try {
      const response = await axios.post(
        "https://backend-horoscopo.vercel.app/v1/auth/login",
        {
          username,
          password,
        }
      );

      if (response.status === 200 && response.data.success) {
        const role = response.data.role;
        callback(role);

        if (role === "admin") {
          goTo("/adminHome");
        } else if (role === "user") {
          goTo("/userHome");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Credenciales incorrectas");
      } else {
        console.error("Error en la solicitud:", error);
        alert("Ocurrió un error en el servidor, intenta más tarde.");
      }
    }
  };

  return (
    <form onSubmit={validateUser}>
      <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>
      <h4 className="txt">Nombre de Usuario</h4>
      <input
        type="text"
        className="entry"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <h4 className="txt">Contraseña</h4>
      <input
        type="password"
        className="entry"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <input type="submit" value="Ingresar" id="btnEnviar" />
    </form>
  );
}

export default Form;
