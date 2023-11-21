import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signin.css'

export function SignIn() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const handleSignIn = () => {
		const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')

		const isValidUser = storedUsers.some(
			(user: { username: string; password: string }) =>
				user.username === username && user.password === password
		)

		if (isValidUser) {
			const user = { username, isLoggedIn: true }

			localStorage.setItem('user', JSON.stringify(user))

			navigate('/')
		} else {
			alert('Nome ou senha inválidos.')
		}
	}

	const navigateToSignUp = () => {
		navigate('/signup')
	}

	return (
		<div className='container'>
			<h2>Entrar</h2>
			<form>
				<label className='form-label'>
					Usuário:
					<input
						className='form-input'
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
				<br />
				<label className='form-label'>
					Senha:
					<input
						className='form-input'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<br />
				<button
					className='form-button'
					type='button'
					onClick={handleSignIn}
				>
					Entrar
				</button>
			</form>
			<p className='signup-text'>
				Não tem uma conta?{' '}
				<span
					className='signup-link'
					onClick={navigateToSignUp}
				>
					Cadastrar
				</span>
			</p>
		</div>
	)
}
