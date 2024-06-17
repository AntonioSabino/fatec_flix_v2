import { useEffect, useState } from 'react'

interface CommentFormProps {
	movieId: number
	onCommentAdded: () => void
}

const CommentForm = ({ movieId, onCommentAdded }: CommentFormProps) => {
	const [userName, setUserName] = useState('')
	const [rating, setRating] = useState('')
	const [comment, setComment] = useState('')

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user') || '{}')
		setUserName(user.username || '')
	}, [])

	const handleSubmit = () => {
		const myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/json')

		const myInit = {
			method: 'POST',
			headers: myHeaders,
			body: JSON.stringify({
				user_name: userName,
				movie_id: movieId,
				rating: parseFloat(rating),
				comment,
			}),
		}

		fetch('http://localhost:8080/fatec/api/criar_comentario.php', myInit)
			.then(() => {
				onCommentAdded()
				setRating('')
				setComment('')
			})
			.catch((error) => {
				console.error('Error adding comment:', error)
				alert('Erro ao tentar adicionar comentário.')
			})
	}

	return (
		<form
			className='comment-form'
			method='POST'
		>
			<h2>Adicionar Comentário</h2>
			<div>
				<label>Usuário:</label>
				<input
					type='text'
					value={userName}
					disabled
				/>
			</div>
			<div>
				<label>
					Avaliação:
					<input
						type='number'
						value={rating}
						onChange={(e) => setRating(e.target.value)}
						min='0'
						max='5'
						step='0.1'
						required
					/>
				</label>
			</div>
			<div>
				<label>
					Comentário:
					<textarea
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						required
					/>
				</label>
			</div>
			<button
				type='button'
				onClick={handleSubmit}
			>
				Adicionar
			</button>
		</form>
	)
}

export default CommentForm
