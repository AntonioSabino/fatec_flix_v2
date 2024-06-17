import React from 'react'
import './UserSocials.css'

interface UserSocialsProps {
	imageLink: string
	hrefLink: string
	title: string
	hex: string
}

const UserSocials: React.FC<UserSocialsProps> = ({
	imageLink,
	hrefLink,
	title,
	hex,
}) => {
	return (
		<li
			className='item'
			style={{ backgroundColor: `#${hex}` }}
		>
			<a href={hrefLink}>
				<img
					src={imageLink}
					alt={title}
				/>
				<p>{title}</p>
			</a>
		</li>
	)
}

export default UserSocials
