import { Comment } from './index'

interface CommentsProps {
	comments: Comment[]
}

const Comments = ({ comments }: CommentsProps) => {
	return (
		<div className='comments-container'>
			<h1>Comentários:</h1>
			{comments.length ? (
				comments.map((comment) => (
					<div
						className='comment'
						key={comment.id}
					>
						<img
							src='https://cdn-icons-png.flaticon.com/128/149/149071.png'
							alt=''
							className='comment-icon'
						/>
						<div>
							<p>
								<strong>User: </strong>
								{comment.user_name || 'Anônimo'}
							</p>
							<p>
								<strong>Rating: </strong>
								{comment.rating}
							</p>
							<p>
								<strong>Comment: </strong>
								{comment.comment}
							</p>
						</div>
					</div>
				))
			) : (
				<p>Nenhum comentário encontrado.</p>
			)}
		</div>
	)
}

export default Comments
