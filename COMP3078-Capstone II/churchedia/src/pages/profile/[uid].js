import { FiArrowLeft } from "react-icons/fi"
import { BiCalendar } from "react-icons/bi"
import Image from "next/image"
import Link from "next/link"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { getAllTweetsByUID, onSnapshot } from "@/firebase"
import { setTweetsOfCurrentUser, updateLikes, deleteTweet } from "@/features/tweetSlice"
import Tweet from "@/components/Tweet/Tweet"
import { useRouter } from "next/router"
import { admin } from "../api/admin/adminConfig"
function Profile({ user }) {
	const currentUser = JSON.parse(user)
	if (currentUser.error) {
		return <div className='text-2xl font-bold'>Not found</div>
	}
	const auth = useSelector(store => store.auth)
	const router = useRouter()
	const signedInUser = JSON.parse(auth.currentUser)
	if (currentUser.uid === signedInUser.uid) {
		router.push("/profile")
		return
	}
	const { tweetsOfCurrentUser } = useSelector(store => store.tweet)
	const dispatch = useDispatch()
	const [joinedDate, setJoinDate] = useState(new Date(parseInt(currentUser.createdAt) || currentUser.metadata?.creationTime))

	const convertMonthToText = monthInNumber => {
		switch (monthInNumber) {
			case 0:
				return "Jan"
			case 1:
				return "February"
			case 2:
				return "March"
			case 3:
				return "April"
			case 4:
				return "May"
			case 5:
				return "June"
			case 6:
				return "July"
			case 7:
				return "August"
			case 8:
				return "September"
			case 9:
				return "October"
			case 10:
				return "November"
			case 11:
				return "December"
			default:
				return "Error"
		}
	}

	useEffect(() => {
		;(async () => {
			try {
				const { allTweets, allTweetsQuery } = await getAllTweetsByUID(currentUser.uid)
				dispatch(setTweetsOfCurrentUser(allTweets))
				onSnapshot(allTweetsQuery, snapshot => {
					snapshot.docChanges().forEach(change => {
						if (change.type === "modified") {
							dispatch(updateLikes({ id: change.doc.id, ...change.doc.data() }))
							// console.log(snapshot)
							// console.log(allTweets)
						} else if (change.type === "removed") {
							dispatch(deleteTweet({ id: change.doc.id }))
						}
					})
				})
			} catch (error) {
				alert("Error at line 77 of profile, check console")
				console.log(error)
			}
		})()
	}, [])

	return (
		<div className='h-full xl:basis-2/4 border border-gray-200 relative'>
			<div className='flex w-full h-fit sticky top-0 z-30 bg-neutral-50 bg-opacity-80 bg-clip-padding'>
				<div className='h-fit ml-4 my-4'>
					<Link href='/home'>
						<FiArrowLeft size={23}></FiArrowLeft>
					</Link>
				</div>

				<div className='ml-7 my-1'>
					<div className='font-bold text-lg hover:cursor-pointer'>{currentUser.displayName || "User"}</div>
					<div className='text-sm text-slate-500'>{tweetsOfCurrentUser.length} Tweets</div>
				</div>
			</div>

			<div className='h-fit relative'>
				<div className='bg-slate-200 h-40 sm:h-52 xl:h-64'>
					<input type='file' className='hidden' name='bg-image' />
				</div>

				<div className='flex justify-between '>
					<div className=''>
						<Image
							alt='logo'
							src={currentUser.photoURL ? currentUser.photoURL : require("../../images/cat.png")}
							width={120}
							height={120}
							className='absolute border-4 sm:border-4 rounded-full object-cover
		                        ml-5 sm:ml-6 top-1/2 sm:top-1/2 sm:h-36 sm:w-36 xl:h-40 xl:w-40 xl:top-1/2 xl:mt-4'
						></Image>
					</div>
					<div className='float-right mr-4 md:mr-10 md:mt-2'>
						<div
							className='mt-3 pt-1 rounded-3xl text-center text-white text-sm sm:text-base
		                font-medium bg-green-400 w-24 h-7 sm:h-8 sm:w-28 hover:bg-green-300 hover:cursor-pointer'
						>
							<button className=''>Edit Profile</button>
						</div>
					</div>
				</div>
			</div>
			<div className='my-6 mx-4 sm:my-8 sm:mb-6 sm:mx-6'>
				<div className='text-xl font-bold'>{currentUser.displayName}</div>
				<div className='text-sm text-slate-700'>{currentUser.email}</div>
				<div className='flex flex-row text-slate-700 text-sm my-3 sm:mb-2'>
					<BiCalendar size={20} />
					<span className='ml-1'>
						Joined {convertMonthToText(joinedDate.getMonth())} {joinedDate.getFullYear()}
					</span>
				</div>
			</div>

			<div className='flex flex-row text-sm sm:text-base sm:justify-evenly w-full'>
				<div className='flex text-center items-center w-full '>
					<a
						href='#'
						className="w-full relative bg-transparent py-2.5 px-2.5 sm:px-14
		            font-medium  text-gray-800 transition-colors before:absolute
		            before:left-0 before:top-0 before:-z-10 before:h-full before:w-full
		            before:origin-top-left before:scale-y-0 before:bg-green-400 active:bg-green-800
		            focus:bg-green-400 before:transition-transform before:duration-300 before:content-['']
		            hover:text-white before:hover:scale-y-100"
					>
						Tweets
					</a>
				</div>

				<div className='flex text-center items-center w-full'>
					<a
						href='#'
						className="w-full relative bg-transparent py-2.5 px-5 sm:px-14
		            font-medium  text-gray-800 transition-colors before:absolute
		            before:left-0 before:top-0 before:-z-10 before:h-full before:w-full
		            before:origin-top-left before:scale-y-0 before:bg-green-400 active:bg-green-800
		            focus:bg-green-400 before:transition-transform before:duration-300 before:content-['']
		            hover:text-white before:hover:scale-y-100"
					>
						Media
					</a>
				</div>
				<div className='flex text-center items-center w-full'>
					<a
						href='#'
						className="w-full relative bg-transparent py-2.5 px-5 sm:px-14
		            font-medium text-gray-800 transition-colors before:absolute
		            before:left-0 before:top-0 before:-z-10 before:h-full before:w-full
		            before:origin-top-left before:scale-y-0 before:bg-green-400 active:bg-green-800
		            focus:bg-green-400 before:transition-transform before:duration-300 before:content-['']
		            hover:text-white before:hover:scale-y-100 "
					>
						Likes
					</a>
				</div>
			</div>
			{tweetsOfCurrentUser.map(tweet => {
				return <Tweet key={tweet.date} tweet={tweet} otherUser={user}></Tweet>
			})}
		</div>
	)
}

export default Profile

export async function getServerSideProps(context) {
	const { uid } = context.params
	try {
		const user = await admin.auth().getUser(uid)
		return {
			props: {
				user: JSON.stringify(user)
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
