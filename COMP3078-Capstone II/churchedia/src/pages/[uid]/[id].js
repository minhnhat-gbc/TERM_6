import Link from "next/link"
import { AiOutlineHeart, AiOutlinePicture, AiOutlineFileGif } from "react-icons/ai"
// import { CiLocationOn } from "react-icons/ci"
import { BiDotsHorizontalRounded } from "react-icons/bi"
// import { FaRegComment } from "react-icons/fa"
import { IoPersonCircleOutline } from "react-icons/io5"
import { RiDeleteBin6Line } from "react-icons/ri"
// import { BsBookmark, BsUpload } from "react-icons/bs"
import { FiArrowLeft, FiRefreshCw } from "react-icons/fi"
import { useSelector } from "react-redux"
import { useRef, useState, useEffect } from "react"
import { getTweetDetail, onSnapshot } from "@/firebase"
import Image from "next/image"
import { useRouter } from "next/router"
import Comment from "@/components/Comment/Comment"
import { admin } from "../api/admin/adminConfig"

function StatusPage({otherUser}) {
	const auth = useSelector(store => store.auth)
	const currentUser = !otherUser ? JSON.parse(auth.currentUser) : JSON.parse(otherUser)
	const signedInUser = JSON.parse(auth.currentUser)
	const [openDeleteBox, setOpenDeleteBox] = useState(false)
	const deleteBoxRef = useRef()
	const [tweet, setTweet] = useState(null)
	const router = useRouter()

	const handleClickOutside = event => {
		if (deleteBoxRef.current && !deleteBoxRef.current.contains(event.target)) {
			setOpenDeleteBox(false)
		}
	}
	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true)
		return () => {
			document.removeEventListener("click", handleClickOutside, true)
		}
	}, [])

	useEffect(() => {
		;(async () => {
			const tweetID = router.asPath.split("/")[2]
			const { tweetRef, data } = await getTweetDetail(tweetID)
			onSnapshot(tweetRef, snapshot => {
				setTweet(snapshot.data())
			})
			setTweet(data)
		})()
		// console.log(router.asPath.split("/")[2])
		// const {data} = await getTweetDetail()
	}, [])

	if (!tweet) {
		return <>Loading...</>
	}
	return (
		<>
			<div className='h-full xl:basis-2/4 border border-white relative'>
				<div className='flex w-full h-fit sticky top-0 z-30 bg-gray-100 bg-opacity-80 bg-clip-padding'>
					<div className='h-fit ml-4 my-3'>
						<Link href={`/profile/${currentUser.uid}`}>
							<FiArrowLeft size={23}></FiArrowLeft>
						</Link>
					</div>

					<div className='ml-7 my-2'>
						<div className='font-bold text-lg hover:cursor-pointer'>Tweet</div>
					</div>
				</div>
				<div className='h-fit relative'>
					<div className='flex mt-8 ml-6 space-between'>
						<div className='profile-picture '>
							{currentUser?.photoURL ? (
								<Image
									className='rounded-full w-10 xl:w-16'
									src={currentUser.photoURL}
									width={60}
									height={60}
									alt='user photo'
								/>
							) : (
								<IoPersonCircleOutline className='hover:cursor-pointer' size={50} />
							)}
						</div>
						<div className='flex w-full justify-between'>
							<div className='ml-2'>
								<div className='font-bold text-lg hover:cursor-pointer'>{currentUser.displayName || "User"}</div>
								<div className='text-sm text-slate-700'>@{currentUser.email.split("@")[0]}</div>
							</div>
							<div className='mr-3 sm:mr-8'>
								{!currentUser ? (
									<div
										ref={deleteBoxRef}
										className='3-dot relative basis-1/6 flex justify-end xl:pr-3 hover:cursor-pointer h-fit '
									>
										<BiDotsHorizontalRounded
											onClick={() => {
												setOpenDeleteBox(prev => !prev)
											}}
											className='hover:bg-gray-300 xl:rounded-full '
											size={23}
										/>
										<div
											className={`${
												openDeleteBox ? "" : "hidden"
											} border rounded-lg flex justify-center absolute xl:bottom-5 top-3 right-5 xl:-top-3 xl:right-9 xl:py-4 bg-white xl:w-36`}
											onClick={async () => {
												try {
													// await deleteTweet(tweet.id)
													// dispatch(setShowNewestTweet(false))
													// dispatch(setNewestTweet(""))
												} catch (error) {
													alert(error)
													console.log(error)
												}
											}}
										>
											<span className='flex items-center justify-center xl:w-10/12'>
												<RiDeleteBin6Line color='red' />
												<span className='text-sm xl:text-md'>Delete</span>
											</span>
										</div>
									</div>
								) : null}
							</div>
						</div>
					</div>
				</div>
				<div className='px-5 pt-6 mb-4 sm:px-8'>
					<p className=''>{tweet.content}</p>
					{/* <Image
						alt='picture'
						src={signedInUser.photoURL ? signedInUser.photoURL : require("../../images/anh.jpg")}
						className='pt-6 hover:cursor-pointer scale-100'
					></Image> */}
					{tweet.image ? (
						<Image
							src={tweet.image}
							alt='tweet picture'
							placeholder='blur'
							key={tweet.id}
							blurDataURL={tweet.blurDataURL}
							width={500}
							height={250}
							className='rounded-md hover:cursor-pointer'
						/>
					) : null}
				</div>
				<div
					className='space-x-3 flex border-b-2 border-gray-100 justify-center 
            sm:justify-start sm:ml-8 text-sm text-gray-500 pb-5 mx-4'
				>
					<span className=''>
						{new Date(tweet.date).getHours()}:{new Date(tweet.date).getMinutes()}
					</span>
					<span className=''>{new Date(tweet.date).toDateString()}</span>
					{/* <span className='font-bold pr-1 text-black'>104.8</span>Views */}
				</div>
				<div
					className='space-x-3 flex border-b-2 border-gray-100 text-sm 
            text-gray-500 py-5 pl-3 mx-4 xl:pl-2'
				>
					{/* <span className='font-bold pr-1 text-black sm:ml-2'>345</span>Retweets */}
					{/* <span className='font-bold pr-1 text-black'>104.8</span>Quotes */}
					<div className='sm:flex invisible sm:visible'>
						<span className='font-bold pr-1 text-black'>{tweet.likes.length}</span>Likes
						{/* <span className='font-bold pr-1 pl-4 text-black'>104.8</span>Bookmarks */}
					</div>
				</div>
				<div className='space-x-3 flex border-b-2 border-gray-100 text-sm text-gray-500 py-5 pl-3 mx-4 sm:hidden'>
					<span className='font-bold pr-1 text-black'>104.8</span>Likes
					<span className='font-bold pr-1 text-black'>104.8</span>Bookmarks
				</div>
				{/* <div className='space-x-10 flex justify-evenly pt-5 pb-2 mx-4 px-2 border-b-2 border-gray-100'>
					<FaRegComment size={25} />
					<FiRefreshCw size={25} />
					<AiOutlineHeart size={30} />
					<BsBookmark size={25} />
					<BsUpload size={25} />
				</div> */}
				<div className='flex-col border-b-2 border-gray-100'>
					<div className='mx-4 mt-2'>
						<div className='items-start flex'>
							{signedInUser?.photoURL ? (
								<Image
									className='rounded-full w-10 xl:w-16'
									src={signedInUser.photoURL}
									width={60}
									height={60}
									alt='user photo'
								/>
							) : (
								<IoPersonCircleOutline className='hover:cursor-pointer pb-8' size={100} />
							)}
							<textarea
								className='w-full placeholder-gray-500 focus:outline-none resize-none pt-4 pl-3 h-16 text-xl sm:text-3xl xl:text-3xl'
								placeholder='Tweet your reply'
							/>
						</div>
					</div>
					<div className='flex mb-6 sm:mb-4 xl:mb-2 justify-between'>
						<div className='flex ml-20 sm:ml-32 space-x-4 '>
							<AiOutlinePicture size={24} color='green' className='mr-3 sm:w-6 sm:h-6' />
							{/* <AiOutlineFileGif size={22} color='green' className='mr-3 sm:w-6 sm:h-6' /> */}
							{/* <CiLocationOn size={24} color='green' className=' sm:w-6 sm:h-6' /> */}
						</div>
						<div className='mr-4'>
							<div
								className='py-1 rounded-3xl text-center text-white text-sm 
						    sm:text-base xl:text-lg font-medium bg-green-400 w-20 h-9 sm:w-20 sm:h-10 xl:h-10  
						    hover:bg-green-300 hover:cursor-pointer'
							>
								<button className=''>Reply</button>
							</div>
						</div>
					</div>
				</div>
				{tweet.comments.map(comment => (
					<Comment key={comment.text} comment={comment}></Comment>
				))}
				<br />
				<br />
				<br />
				<br />
			</div>
		</>
	)
}

export default StatusPage
export const getStaticPaths = async () => {
	return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}
export async function getStaticProps(context) {
	const { uid } = context.params
	try {
		const user = await admin.auth().getUser(uid)
		return {
			props: {
				otherUser: JSON.stringify(user)
			} // will be passed to the page component as props
		}
	} catch (error) {
		return {
			props: {
				user: JSON.stringify({
					error: error.message
				})
			}
		}
	}
}
