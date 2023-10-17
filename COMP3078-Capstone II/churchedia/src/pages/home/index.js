import React, { useEffect, useRef, useState } from "react"
import { GoFileMedia } from "react-icons/go"
import Image from "next/image"
import { useSelector, useDispatch } from "react-redux"
import { postATweet, onSnapshot, recentTweetQuery } from "@/firebase"
import { IoPersonCircleOutline } from "react-icons/io5"
import Tweet from "@/components/Tweet/Tweet"
import { setTweet, setShowNewestTweet, setNewestTweet, setIsOpenPostTweetModal } from "@/features/tweetSlice"
import Link from "next/link"
import { useRouter } from "next/router"

const Home = () => {
	const auth = useSelector(store => store.auth)
	const signedInUser = JSON.parse(auth.currentUser)
	const tweetStore = useSelector(store => store.tweet)
	const tweetPictureRef = useRef()
	const [presentTime, setPresentTime] = useState(Date.now())
	const [imageFileName, setImageFileName] = useState("")
	const [disableTweetButton, setDisableTweetButton] = useState(false)
	const { tweet, newestTweet, showNewestTweet, isOpenPostTweetModal } = tweetStore
	const dispatch = useDispatch()

	function closePostTweetModal() {
		dispatch(setIsOpenPostTweetModal(false))
	}

	function openPostTweetModal() {
		dispatch(setIsOpenPostTweetModal(true))
	}

	useEffect(() => {
		onSnapshot(recentTweetQuery, snapshot => {
			snapshot.docChanges().forEach(change => {
				let millis = presentTime - change.doc.data().date
				let second = Math.floor(millis / 1000)
				if ((change.type === "added" || change.type === "modified") && second <= 1) {
					dispatch(setNewestTweet({ id: change.doc.id, ...change.doc.data() }))
					dispatch(setShowNewestTweet(true))
				}
			})
		})
	}, [])

	return (
		<div className='xl:basis-2/4'>
			<div className='xl:basis-2/4 h-28'>
				<div className='flex flex-col border sticky top-0 bg-gray-50 h-full'>
					<div className='basis-1/2 xl:text-2xl xl:p-4 xl:pt-1 font-bold xl:flex hidden h-4/'>Home</div>
					<div className='flex pt-2 xl:hidden relative'>
						<div className='flex items-start pl-2 pt-2 xl:hidden absolute'>
							<Link href='/profile'>
								{signedInUser?.photoURL ? (
									<Image
										src={signedInUser.photoURL}
										className='rounded-full'
										alt='user photo'
										height={40}
										width={40}
									/>
								) : (
									<IoPersonCircleOutline className='hover:cursor-pointer' size={50} />
								)}
							</Link>
						</div>
						<div className='flex xl:hidden justify-center w-full'>
							<Image src={require("../../images/GCF_Logo.png")} alt='church logo' height={40} width={40}></Image>
						</div>
					</div>

					<div className='flex basis-1/2 items-center'>
						<div className='basis-1/2 hover:bg-gray-200 hover:cursor-pointer flex justify-center items-center xl:py-4'>
							For you
						</div>
						<div className='basis-1/2 hover:bg-gray-200 hover:cursor-pointer flex justify-center items-center xl:py-4'>
							Following
						</div>
					</div>
				</div>
			</div>
			<div className='xl:flex border xl:h-36 hidden'>
				<div className='user-picture xl:basis-1/6 xl:flex items-center justify-center'>
					<Link href='/profile'>
						{signedInUser?.photoURL ? (
							<Image
								className='rounded-full w-14 cursor-pointer'
								src={signedInUser.photoURL}
								width={75}
								height={75}
								alt='user photo'
							/>
						) : (
							<IoPersonCircleOutline className='hover:cursor-pointer cursor-pointer' size={50} />
						)}
					</Link>
				</div>

				<div className='tweeting-area xl:px-5 xl:flex flex-col xl:basis-5/6'>
					<input
						className='focus:outline-none xl:text-2xl basis-2/5'
						value={isOpenPostTweetModal ? "" : tweet}
						onChange={e => {
							if (!isOpenPostTweetModal) {
								dispatch(setTweet(e.target.value))
							}
						}}
						type='text'
						placeholder="What's in your mind?"
					/>
					<span className='border-b basis-1/5 italic text-gray-400'>Good morning!!!</span>
					<div className='flex justify-between items-center basis-2/5'>
						<div className='p-1 hover:cursor-pointer hover:bg-gray-300'>
							<label htmlFor='picture-upload'>
								<GoFileMedia className='' size={20} />
								<p>{isOpenPostTweetModal ? "" : imageFileName}</p>
							</label>
							<input
								type='file'
								className='hidden'
								name='picture'
								id='picture-upload'
								accept='image/*'
								ref={tweetPictureRef}
								onChange={e => {
									setImageFileName(e.target.files[0].name)
								}}
							/>
						</div>
						<button
							onClick={async () => {
								setDisableTweetButton(true)
								try {
									setPresentTime(Date.now())
									const tweetPicture = tweetPictureRef.current.files[0]
									tweetPictureRef.current.value = null
									setImageFileName("")
									const result = await postATweet(signedInUser.uid, tweet, tweetPicture)
									if (result === false) {
										setDisableTweetButton(false)
										throw new Error("Check firebase function")
									} else if (result === true) {
										dispatch(setTweet(""))
										dispatch(setShowNewestTweet(true))
										setDisableTweetButton(false)
									}
								} catch (error) {
									alert(error)
								}
							}}
							className='xl:rounded-3xl xl:text-xl text-center text-white font-semibold bg-green-300 xl:px-3 xl:py-1 hover:bg-green-500 hover:cursor-pointer'
							disabled={disableTweetButton}
						>
							Tweet
						</button>
					</div>
				</div>
			</div>
			{showNewestTweet ? <Tweet tweet={newestTweet}></Tweet> : null}

			
		</div>
	)
}

export default Home
