import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'

export function SignUp() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const handleSignUp = () => {
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

				navigate('/')
			}
		} else {
			alert('Preencha todos os campos.')
		}
	}

	const navigateToSignIn = () => {
		navigate('/signin')
	}

	return (
		<div className='container'>
			<h2>Cadastrar</h2>
			<form>
				<label className='form-label-signup'>
					Usuário:
					<input
						className='form-input-signup'
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
				<br />
				<label className='form-label-signup'>
					Senha:
					<input
						className='form-input-signup'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<br />
				<button
					className='form-button-signup'
					type='button'
					onClick={handleSignUp}
				>
					Cadastrar
				</button>
			</form>
			<p className='signup-text'>
				Já tem uma conta?{' '}
				<span
					className='signin-link'
					onClick={navigateToSignIn}
				>
					Entrar
				</span>
			</p>
		</div>
	)
}
