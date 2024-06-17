import './Admin.css'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

interface User {
	id: string
	user_name: string
	email: string
}

function Admin() {
	const [users, setUsers] = useState<User[]>([])
	const [editingUser, setEditingUser] = useState<string | null>(null)
	const [editedUser, setEditedUser] = useState<User | null>(null)

	const isLogged = localStorage.getItem('user')
	const user = JSON.parse(isLogged!.toString())

	useEffect(() => {
		const myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/json')

		const myInit = {
			method: 'GET',
			headers: myHeaders,
		}

		fetch('http://localhost:8080/fatec/api/listar.php', myInit)
			.then((response) => response.json())
			.then((data) => {
				const withoutAdmin = data[0].filter(
					(item: User) => item.user_name !== 'admin'
				)
				setUsers(withoutAdmin)
			})
	}, [])

	const handleEdit = (user: User) => {
		setEditingUser(user.user_name)
		setEditedUser({ ...user })
	}

	const handleSave = () => {
		const myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/json')

		const myInit = {
			method: 'PUT',
			headers: myHeaders,
			body: JSON.stringify(editedUser),
		}

		fetch('http://localhost:8080/fatec/api/editar_usuario.php', myInit)
			.then((response) => response.json())
			.then((data) => {
				if (data.status === 200) {
					const updatedUsers = users.map((user) => {
						if (user.id === editedUser?.id) {
							return editedUser
						}
						return user
					})
					setUsers(updatedUsers)
				} else {
					alert('Erro ao editar usuário...')
				}
			})
			.catch((error) => {
				console.error('Erro ao editar usuário:', error)
				alert('Erro ao editar usuário...')
			})

		setEditedUser(null)
		setEditingUser(null)
	}

	const handleDelete = (userName: string) => {
		const myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/json')

		const myInit = {
			method: 'DELETE',
			headers: myHeaders,
			body: JSON.stringify({
				user_name: userName,
			}),
		}

		fetch('http://localhost:8080/fatec/api/deletar_usuario.php', myInit)
			.then((response) => response.json())
			.then((data) => {
				if (data.status === 200) {
					const updatedUsers = users.filter(
						(user) => user.user_name !== userName
					)
					setUsers(updatedUsers)
				} else {
					alert('Erro ao deletar usuário...')
				}
			})
			.catch((error) => {
				console.error('Erro ao deletar usuário:', error)
				alert('Erro ao deletar usuário...')
			})
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (editedUser) {
			setEditedUser({ ...editedUser, [e.target.name]: e.target.value })
		}
	}

	if (!isLogged && user.username === 'admin') {
		return (
			<Navigate
				to='/signin'
				replace={true}
			/>
		)
	}

	return (
		<div className='admin-container'>
			<h1>Gerenciamento de Usuários</h1>
			{users.length ? (
				users.map((u) => (
					<div
						className='user-card'
						key={u.user_name}
					>
						<div className='user-info'>
							{editingUser === u.user_name ? (
								<>
									<input
										type='text'
										name='user_name'
										value={editedUser?.user_name}
										onChange={handleChange}
									/>
									<input
										type='email'
										name='email'
										value={editedUser?.email}
										onChange={handleChange}
									/>
								</>
							) : (
								<>
									<h2>
										<strong>Nome:</strong> {u.user_name}
									</h2>
									<p>
										<strong>Email:</strong> {u.email}
									</p>
								</>
							)}
						</div>
						<div className='user-actions'>
							{editingUser === u.user_name ? (
								<button onClick={handleSave}>Save</button>
							) : (
								<>
									<img
										src='/img/edit.png'
										alt='Edit'
										onClick={() => handleEdit(u)}
									/>
									<img
										src='/img/delete.png'
										alt='Delete'
										onClick={() => handleDelete(u.user_name)}
									/>
								</>
							)}
						</div>
					</div>
				))
			) : (
				<p>No users found</p>
			)}
		</div>
	)
}

export default Admin
