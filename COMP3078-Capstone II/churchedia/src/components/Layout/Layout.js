import React, { useEffect, useState, Fragment, useRef } from "react"
import { useRouter } from "next/router"
import { GoFileMedia } from "react-icons/go"
import { authFirebase, onAuthStateChanged } from "@/firebase"
import { signUserIn } from "@/features/authSlice"
import { setTweet, setIsOpenPostTweetModal } from "@/features/tweetSlice"
import { postATweet } from "@/firebase"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { Dialog, Transition } from "@headlessui/react"
import { IoPersonCircleOutline } from "react-icons/io5"
import { BsFillPencilFill } from "react-icons/bs"
import MobileNavigationBar from "../MobileNavigationBar/MobileNavigationBar"

function Layout({ children }) {
	// if (typeof window !== 'undefined') {
	// 	console.log(window.screen.width,window.screen.height)
	// }
	const tweetStore = useSelector(store => store.tweet)
	const auth = useSelector(store => store.auth)
	const signedInUser = JSON.parse(auth.currentUser)
	const [imageFileName, setImageFileName] = useState("")
	const tweetPictureRef = useRef()
	const { tweet, isOpenPostTweetModal } = tweetStore
	const [presentTime, setPresentTime] = useState(Date.now())

	const router = useRouter()
	const dispatch = useDispatch()

	const [checkIfUserIsLoggedIn, setCheckIfUserIsLoggedIn] = useState(false)
	useEffect(() => {
		onAuthStateChanged(authFirebase, user => {
			if (user) {
				dispatch(signUserIn(JSON.stringify(user)))
				setCheckIfUserIsLoggedIn(true)
			} else {
				router.push("/login")
			}
		})
	}, [])

	if (!checkIfUserIsLoggedIn) {
		return
	}
	function closePostTweetModal() {
		dispatch(setIsOpenPostTweetModal(false))
	}

	function openPostTweetModal() {
		dispatch(setIsOpenPostTweetModal(true))
	}
	return (
		<div className='xl:flex relative'>
			<Transition appear show={isOpenPostTweetModal} as={Fragment}>
				<Dialog as='div' className='relative z-10' onClose={closePostTweetModal}>
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
					<div className='p-4 fixed inset-0 flex justify-center items-center'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<div className='flex xl:h-36'>
									<div className='user-picture xl:basis-1/6 xl:flex items-center justify-center'>
										<Link href='/profile'>
											{signedInUser?.photoURL ? (
												<Image
													className='rounded-full w-14'
													src={signedInUser.photoURL}
													width={75}
													height={75}
													alt='user photo'
												/>
											) : (
												<IoPersonCircleOutline className='hover:cursor-pointer' size={50} />
											)}
										</Link>
									</div>
									<div className='tweeting-area xl:px-5 px-4 flex flex-col xl:basis-5/6'>
										<input
											className='focus:outline-none xl:text-2xl basis-2/5'
											value={tweet}
											onChange={e => {
												dispatch(setTweet(e.target.value))
											}}
											type='text'
											placeholder="What's in your mind?"
										/>
										<span className='basis-1/5 italic text-gray-400'>Good morning!!!</span>
										<br />
										<div className='flex justify-between items-center basis-2/5'>
											<div className='p-1 hover:cursor-pointer hover:bg-gray-300'>
												<label htmlFor='picture-upload-mobile'>
													<GoFileMedia className='' size={20} />
													<p>{imageFileName}</p>
												</label>
												<input
													type='file'
													name='picture-upload'
													id='picture-upload-mobile'
													accept='image/*'
													ref={tweetPictureRef}
													className='hidden'
													onChange={e => {
														setImageFileName(e.target.files[0].name)
													}}
												/>
											</div>
											<button
												onClick={async () => {
													try {
														setPresentTime(Date.now())
														const tweetPicture = tweetPictureRef.current.files[0]
														setImageFileName("")
														closePostTweetModal()
														const result = await postATweet(signedInUser.uid, tweet, tweetPicture)
														if (result === false) {
															throw new Error("Check firebase function")
														} else if (result === true) {
															dispatch(setTweet(""))
															// dispatch(setShowNewestTweet(true))
														}
													} catch (error) {
														alert(error)
														console.log(error)
													}
												}}
												className='rounded-3xl xl:text-xl text-center px-3 text-white font-semibold bg-green-300 xl:px-3 py-1 hover:bg-green-500 hover:cursor-pointer'
											>
												Tweet
											</button>
										</div>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
			{children}

			{/* This is the button to open Tweet model when it's in mobile view */}
			<div
				onClick={openPostTweetModal}
				className='xl:hidden tweet-button border border-gray-300 shadow-lg shadow-gray-500 bg-green-400 fixed z-20 bottom-28 right-5 rounded-full p-4 hover:cursor-pointer'
			>
				<BsFillPencilFill size={30} />
			</div>

			{/* This is the navigation for mobile view */}
			<MobileNavigationBar />
		</div>
	)
}

export default Layout
