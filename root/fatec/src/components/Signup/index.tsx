import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'

export function SignUp() {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [validatePassword, setValidatePassword] = useState('')
	const navigate = useNavigate()

	const handleSignUp = () => {
		if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
			if (username && password) {
				const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')

				const isUsernameTaken = existingUsers.some(
					(user: { username: string }) => user.username === username
				)

				if (isUsernameTaken) {
					alert('Usuário já existe.')
				} else {
					const newUser = { username, password }
					const updatedUsers = [...existingUsers, newUser]
					localStorage.setItem('users', JSON.stringify(updatedUsers))
					const user = { username, isLoggedIn: true }
					localStorage.setItem('user', JSON.stringify(user))

					const myHeaders = new Headers()
					myHeaders.append('Content-Type', 'application/json')

					const myInit = {
						method: 'POST',
						headers: myHeaders,
						body: JSON.stringify({
							user_name: username,
							email: email,
							password,
						}),
					}

					fetch('http://localhost:8080/fatec/api/cadastrar.php', myInit)
						.then((response) => response.json())
						.then((data) => {
							if (data === '0000') {
								const user = { username, isLoggedIn: true }

								localStorage.setItem('user', JSON.stringify(user))

								user.username === 'admin' ? navigate('/admin') : navigate('/')
							} else {
								alert('Usuário ou email já cadastrado...')
							}
						})
				}
			} else {
				alert('Preencha todos os campos.')
			}
		} else {
			alert('Email inválido')
		}
	}

	const navigateToSignIn = () => {
		navigate('/signin')
	}

	return (
		<div className='signup-container'>
			<div
				className='poster-container'
				style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/original/fX44bgxKQsS4P4ewb2iotHveEkn.jpg)`,
				}}
			>
				<img src='https://www.themoviedb.org/t/p/w1280/kO6K9zEsKhNyqcrdGTSqAI6jrie.jpg' />
			</div>

			<div className='form-signup-container'>
				<h1>Cadastrar</h1>
				<form
					className='form-signup'
					method='POST'
				>
					<label className='form-label-signup'>
						Usuário:
						<input
							className='form-input-signup'
							type='text'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder='Nome de Usuário.'
							name='user_name'
							id='user_name'
							required
						/>
					</label>
					<label className='form-label-signup'>
						Email:
						<input
							className='form-input-signup'
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='Email.'
							name='email'
							id='email'
							required
						/>
					</label>
					<br />
					<br />
					<label className='form-label-signup'>
						Senha:
						<input
							className='form-input-signup'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder='Pelo menos 8 caractéres.'
							name='password'
							id='password'
							required
						/>
					</label>
					<label className='form-label-signup'>
						Confirme a Senha:
						<input
							className='form-input-signup'
							type='password'
							value={validatePassword}
							onChange={(e) => setValidatePassword(e.target.value)}
							{...(password !== validatePassword
								? { style: { borderColor: 'red' } }
								: {})}
							placeholder='Digite a senha novamente.'
							required
						/>
					</label>
					<br />
					<button
						className='form-button-signup'
						type='button'
						onClick={
							password === validatePassword
								? handleSignUp
								: () => alert('As senhas não coincidem.')
						}
					>
						Cadastrar
					</button>
					<p className='signup-text'>
						Já tem uma conta?{' '}
						<span
							className='signin-link'
							onClick={navigateToSignIn}
						>
							Entrar
						</span>
					</p>
				</form>
			</div>
		</div>
	)
}

// import { useState } from "react";

// import { useNavigate } from "react-router-dom";
// import "./Signin.css";

// interface LoggedUser {
//   user_name: string | null;
// }

// export function SignIn() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loggedUser, setLoggedUser] = useState<LoggedUser[]>([]);

//   const navigate = useNavigate();

//   const handleSignIn = () => {
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     const myInit = {
//       method: "POST",
//       headers: myHeaders,
//       body: JSON.stringify({
//         user_email: username,
//         password,
//       }),
//     };

//     fetch("http://localhost:8080/fatec/api/login.php", myInit)
//       .then((response) => response.json())
//       .then((data) => {
//         setLoggedUser(data);
//       });

//     if (loggedUser[0] && loggedUser[0].user_name === username) {
//       const user = { username, isLoggedIn: true };

//       localStorage.setItem("user", JSON.stringify(user));

//       navigate("/");
//     } else {
//       alert("Login inválido!");
//     }
//   };

//   const navigateToSignUp = () => {
//     navigate("/signup");
//   };

//   return (
//     <div className="login-container">
//       <div className="form-signin-container">
//         <div>
//           <h1>Bem vindo 👋</h1>
//           <h4>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//             eiusmod tempor incididunt ut labore.
//           </h4>
//         </div>
//         <form className="form-signin" method="POST">
//           <label className="form-label-signin">
//             Usuário:
//             <input
//               className="form-input-signin"
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Email ou nome de Usuário."
//               name="user_email"
//               id="user_email"
//             />
//           </label>
//           <br />
//           <label className="form-label-signin">
//             Senha:
//             <input
//               className="form-input-signin"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Pelo menos 8 caractéres."
//               name="password"
//               id="password"
//             />
//           </label>
//           <br />
//           <button
//             className="form-button-signin"
//             type="button"
//             onClick={handleSignIn}
//           >
//             Entrar
//           </button>
//         </form>
//         <p className="signup-text">
//           Não tem uma conta?{" "}
//           <span className="signup-link" onClick={navigateToSignUp}>
//             Cadastrar
//           </span>
//         </p>
//       </div>

//       <div className="poster-container" style={{backgroundImage:`url(https://www.themoviedb.org/t/p/w1280/kO6K9zEsKhNyqcrdGTSqAI6jrie.jpg)`}}>
//     <img src="https://www.themoviedb.org/t/p/w1280/kO6K9zEsKhNyqcrdGTSqAI6jrie.jpg" />
// </div>
//     </div>
//   );
// }
