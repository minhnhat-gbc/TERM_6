import Link from "next/link"
import Image from "next/image"
import { IoPersonCircleOutline } from "react-icons/io5"
const Comment = ({ comment }) => {
	return (
		<div className='tweet-just-posted flex w-full h-full xl:py-4 xl:pl-4 border-b border-x hover:bg-gray-200 hover:cursor-pointer'>
			<div className='profile-picture basis-1/6 flex justify-center items-start'>
				<Link href={`/profile/${comment.from}`}>
					{comment?.photoURL ? (
						<Image
							className='rounded-full w-10 xl:w-16'
							src={comment.photoURL}
							width={40}
							height={40}
							alt='user photo'
						/>
					) : (
						<IoPersonCircleOutline className='hover:cursor-pointer' size={40} />
					)}
				</Link>
			</div>
			<div className='tweet-content basis-2/3 flex flex-col xl:pl-3'>
				<div className='xl:basis-1/5'>
					<span className='hover:underline hover:cursor-pointer text-sm'>
						{comment.email.split("@")[0].toUpperCase()}
					</span>
					<span className='text-gray-400 hover:cursor-pointer text-sm'>{`@${comment.email.split("@")[0]}`}</span>
				</div>
				<div className='relative xl:w-fit xl:h-fit'>
					<p className='text-sm'>{comment.text}</p>
				</div>
			</div>
		</div>
	)
}

export default Comment
