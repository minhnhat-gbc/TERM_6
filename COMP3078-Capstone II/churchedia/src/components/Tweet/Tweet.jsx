import { AiOutlineHeart, AiFillHeart, AiOutlinePicture, AiOutlineArrowLeft } from "react-icons/ai"
import { FaRegComment } from "react-icons/fa"
import { BiDotsHorizontalRounded } from "react-icons/bi"
import { IoPersonCircleOutline } from "react-icons/io5"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useSelector, useDispatch } from "react-redux"
import { useRef, useEffect, useState, Fragment } from "react"
import Image from "next/image"
import { deleteTweet, modifyLikes, checkIfCurrentUserHasLikedTheTweet, commentAPost } from "@/firebase"
import { setShowNewestTweet, setNewestTweet } from "@/features/tweetSlice"
import { Dialog, Transition } from "@headlessui/react"
import Link from "next/link"
import { useRouter } from "next/router"

function Tweet({ tweet, otherUser }) {
	const auth = useSelector(store => store.auth)
	const currentUser = !otherUser ? JSON.parse(auth.currentUser) : JSON.parse(otherUser)
	const signedInUser = JSON.parse(auth.currentUser)
	const [openDeleteBox, setOpenDeleteBox] = useState(false)
	const [comment, setComment] = useState("")

	const deleteBoxRef = useRef()
	const [openCommentModal, setOpenCommentModal] = useState(false)
	const [isClickLikeButton, setIsClickLikeButton] = useState(false)
	const dispatch = useDispatch()
	const router = useRouter()

	const handleClickOutside = event => {
		if (deleteBoxRef.current && !deleteBoxRef.current.contains(event.target)) {
			setOpenDeleteBox(false)
		}
	}

	const handleClickTweetDetail = event => {
		// use parentNode because for the filled heart icon, when users click on it, event.target will return <path></path> and <path></path> is the child of <svg></svg>
		// which has a className of like-icon
		// <path></path> element itself does not have className of like - icon
		// in case of event.target returning <svg></svg> element like when an outlined heart or comment icon is clicked, it will check if its parent has a class of icon-container
		if (
			event.target.parentNode.classList.contains("icon-container") ||
			event.target.parentNode.classList.contains("like-icon") ||
			event.target.parentNode.classList.contains("comment-icon") ||
			event.target.parentNode.classList.contains("delete-icon")
		) {
			return
		} else {
			router.push(`/${currentUser.uid}/${tweet.id}`)
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
			const userExist = await checkIfCurrentUserHasLikedTheTweet(signedInUser.uid, tweet.id)
			userExist ? setIsClickLikeButton(true) : null
		})()
	}, [])

	if (!tweet) {
		return
	}
	return (
		<>
			<Transition appear show={openCommentModal} as={Fragment}>
				<Dialog as='div' className='relative z-30' onClose={setOpenCommentModal}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed inset-0 bg-black bg-opacity-25' />
					</Transition.Child>
					<div className='fixed inset-0 flex justify-center items-center '>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<Dialog.Panel
								className='w-full h-screen sm:h-fit xl:mb-96 sm:max-w-xl xl:max-w-2xl sm:rounded-2xl transform 
													overflow-hidden bg-white text-left align-middle shadow-xl transition-all'
							>
								<div className='h-fit flex justify-between pr-0'>
									<div className='pl-4 pt-4 '>
										<button type='button' onClick={() => setOpenCommentModal(open => !open)}>
											<AiOutlineArrowLeft size={23} />
										</button>
									</div>
									<div className='sm:hidden'>
										<div
											className='mt-3 mr-4 py-1 rounded-3xl text-center text-white text-sm 
														m:text-base font-medium bg-green-400 w-16 h-7  
														hover:bg-green-300 hover:cursor-pointer'
										>
											<button className=''>Reply</button>
										</div>
									</div>
								</div>
								<div className='h-fit mt-4 flex '>
									<div className='pl-4 flex justify-center basis-1/6 w-fit h-full'>
										<Link href='/profile'>
											{currentUser?.photoURL ? (
												<Image
													className='rounded-full w-10 xl:w-16'
													src={currentUser.photoURL}
													width={60}
													height={60}
													alt='user photo'
												/>
											) : (
												<IoPersonCircleOutline
													className='hover:cursor-pointer sm:w-16 sm:h-16 xl:w-20 xl:h-20 '
													size={60}
												/>
											)}
										</Link>
									</div>
									<div className='flex flex-col w-9/12 ml-1 pr-5 sm:pr-0 '>
										<textarea
											className='w-full placeholder-gray-500 focus:outline-none resize-none pt-4 pl-1 h-44 text-xl sm:text-2xl xl:text-3xl'
											rows='99'
											cols='20'
											placeholder='Tweet your reply'
											value={comment}
											onChange={e => {
												setComment(e.target.value)
											}}
										/>
										<hr className='sm:mt-4 sm:mb-2 invisible sm:visible' />
										<div className=' my-2 sm:mt- w-fit ml-3 xl:ml-1 flex sm:w-full '>
											<div className='flex mt-1'>
												<AiOutlinePicture size={18} color='green' className='mr-3 sm:w-6 sm:h-6' />
												{/* <AiOutlineFileGif size={18} color='green' className='mr-3 sm:w-6 sm:h-6' />
												<AiOutlineUnorderedList size={18} color='green' className='mr-3 sm:w-6 sm:h-6' />
												<AiOutlineSchedule size={18} color='green' className='mr-3 sm:w-6 sm:h-6' />
												<CiLocationOn size={18} color='green' className='sm:w-6 sm:h-6' /> */}
											</div>
											<div className='ml-48 sm:ml-50 xl:ml-64 invisible sm:visible'>
												<div
													className='py-1 rounded-3xl text-center text-white text-sm 
														sm:text-base xl:text-lg font-medium bg-green-400 w-16 h-7 sm:w-20 sm:h-8 xl:h-10  
														hover:bg-green-300 hover:cursor-pointer'
												>
													<button
														onClick={async e => {
															try {
																await commentAPost(
																	tweet.id,
																	comment,
																	signedInUser.uid,
																	signedInUser.displayName,
																	signedInUser.email,
																	signedInUser.photoURL,
																	currentUser.uid
																)
																setOpenCommentModal(false)
															} catch (error) {
																alert("Error at line 162 in Tweet.jsx, check console")
																console.log(error)
															}

															setComment("")
														}}
													>
														Reply
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
			<div
				className='tweet-just-posted flex w-full h-fit xl:pt-4 xl:pl-4 border-b border-x hover:bg-gray-200 hover:cursor-pointer'
				onClick={event => {
					handleClickTweetDetail(event)
				}}
			>
				<div className='profile-picture basis-1/6 flex justify-center items-start '>
					<Link href='/profile'>
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
					</Link>
				</div>
				<div className='tweet-content basis-2/3 flex flex-col xl:pl-3'>
					<div className='xl:basis-1/5'>
						<span className='hover:underline hover:cursor-pointer text-sm'>
							{currentUser.email.split("@")[0].toUpperCase()}
						</span>
						<span className='text-gray-400 hover:cursor-pointer text-sm'>{` @${
							currentUser.email.split("@")[0]
						}`}</span>
					</div>
					<div className='relative xl:w-fit xl:h-fit'>
						<p className={`text-sm ${tweet.content ? null : "hidden"}`}>{tweet.content}</p>
						{tweet.image ? (
							tweet.image?.includes("https://media.tenor.com/o8m3bKTsifUAAAAM/hold-on.gif") ? (
								<Image
									src={tweet.image}
									alt='tweet picture'
									placeholder='blur'
									// blurDataURL='https://s3.amazonaws.com/demo/image/profilePic.webp?w=10&q=80'
									blurDataURL='https://www.google.com/images/spin-32.gif'
									// {...imagePlaceholderProps}
									width={80}
									height={80}
									className='rounded-md hover:cursor-pointer'
								/>
							) : (
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
							)
						) : null}
					</div>
					<div className='flex justify-between items-center w-1/5 xl:mt-3 xl:mb-2 mt-2 mb-2 basis-1/5'>
						<div className='flex items-center w-1/4 justify-between icon-container'>
							{isClickLikeButton ? (
								<AiFillHeart
									color='red'
									className='hover:cursor-pointer hover:bg-gray-300 rounded-full like-icon'
									onClick={async () => {
										try {
											const result = await modifyLikes(
												tweet.id,
												signedInUser.uid,
												"unClick",
												currentUser.uid
											)
											setIsClickLikeButton(false)
										} catch (error) {
											alert("Error at line 257 of Tweet.jsx, check console")
											console.log(error)
										}
									}}
								/>
							) : (
								<AiOutlineHeart
									color='red'
									className='hover:cursor-pointer hover:bg-gray-300 rounded-full like-icon'
									onClick={async () => {
										try {
											const result = await modifyLikes(
												tweet.id,
												signedInUser.uid,
												"click",
												currentUser.uid,
												signedInUser.displayName,
												signedInUser.email,
												signedInUser.photoURL
											)
											setIsClickLikeButton(true)
										} catch (error) {
											alert("Error at line 295 of Tweet.jsx, check console")
											console.log(error)
										}
									}}
								/>
							)}
							<span className='text-sm'>{tweet.likes.length === 0 ? null : tweet.likes.length}</span>
						</div>
						<div
							className='flex items-center w-1/4 justify-between icon-container'
							onClick={() => setOpenCommentModal(open => !open)}
						>
							<FaRegComment
								color='green'
								className='hover:cursor-pointer hover:bg-gray-300 rounded-full comment-icon'
							/>

							<span className='text-sm'>{tweet.comments.length === 0 ? null : tweet.comments.length}</span>
						</div>
					</div>
				</div>
				{!otherUser ? (
					<div
						ref={deleteBoxRef}
						className='3-dot relative basis-1/6 flex justify-end xl:pr-3 pr-4 hover:cursor-pointer w-fit h-fit icon-container'
					>
						<BiDotsHorizontalRounded
							onClick={() => {
								setOpenDeleteBox(prev => !prev)
							}}
							className='hover:bg-gray-300 xl:rounded-full delete-icon'
							size={23}
						/>
						<div
							className={`${
								openDeleteBox ? "" : "hidden"
							} border rounded-lg flex justify-center absolute xl:bottom-5 top-3 right-5 p-2 xl:-top-3 xl:right-9 xl:py-4 bg-white xl:w-36 icon-container`}
							onClick={async () => {
								try {
									await deleteTweet(tweet.id)
									dispatch(setShowNewestTweet(false))
									dispatch(setNewestTweet(""))
								} catch (error) {
									alert(error)
									console.log(error)
								}
							}}
						>
							<div className='flex items-center justify-center xl:w-10/12 icon-container'>
								<RiDeleteBin6Line color='red' />
								<span className='text-sm xl:text-md'>Delete</span>
							</div>
						</div>
					</div>
				) : null}
			</div>
		</>
	)
}

export default Tweet
