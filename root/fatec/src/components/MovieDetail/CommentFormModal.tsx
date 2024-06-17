import CommentForm from './CommentForm'

interface CommentFormModalProps {
	movieId: number
	isOpen: boolean
	onClose: () => void
	onCommentAdded: () => void
}

const CommentFormModal = ({
	movieId,
	isOpen,
	onClose,
	onCommentAdded,
}: CommentFormModalProps) => {
	if (!isOpen) {
		return null
	}

	return (
		<div className='modal-overlay'>
			<div className='modal-content'>
				<button
					className='modal-close-button'
					onClick={onClose}
				>
					&times;
				</button>
				<CommentForm
					movieId={movieId}
					onCommentAdded={onCommentAdded}
				/>
			</div>
		</div>
	)
}

export default CommentFormModal
