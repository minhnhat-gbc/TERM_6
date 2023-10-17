import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import {
	IoHomeSharp,
	IoHomeOutline,
	IoNotificationsOutline,
	IoNotificationsSharp,
	IoPersonCircleOutline,
	IoGameControllerOutline,
	IoGameControllerSharp
} from "react-icons/io5"
import { MdExplore, MdOutlineExplore } from "react-icons/md"
import { BsFileEarmarkPerson, BsFileEarmarkPersonFill, BsChatLeftDots, BsChatLeftDotsFill } from "react-icons/bs"
import { useSelector, useDispatch } from "react-redux"
import Link from "next/link"
import { signUserOut } from "@/features/authSlice"
import { signOutFirebase, onSnapshot, getNewNotificationRef } from "@/firebase"

import { useRouter } from "next/router"

import { setIsOpenPostTweetModal } from "@/features/tweetSlice"
function Sidebar() {
	const auth = useSelector(store => store.auth)
	const signedInUser = JSON.parse(auth.currentUser)
	const ICON_SIZE = 23
	const [openLogout, setOpenLogout] = useState(false)
	const logoutBoxRef = useRef(null)
	const dispatch = useDispatch()
	const router = useRouter()
	const [hasNotification, setHasNotification] = useState(false)

	useEffect(() => {
		const currentActiveTab = document.querySelector(".active-tab")
		const tabs = document.querySelectorAll(".tab")

		switch (router.pathname) {
			case "/home":
				tabs.forEach(value => {
					value.classList.remove("font-bold")
				})
				currentActiveTab.children[0].classList.remove("hidden") // show the outline icon
				currentActiveTab.children[1].classList.add("hidden") // hide the filled icon
				currentActiveTab.classList.remove("active-tab") // remove the active-tab class from the current active tab
				tabs[0].classList.add("font-bold")
				tabs[0].classList.add("active-tab")
				tabs[0].children[0].classList.add("hidden") // hide the outline icon
				tabs[0].children[1].classList.remove("hidden") // show the filled icon to make it active
				break

			case "/profile":
				tabs.forEach(value => {
					value.classList.remove("font-bold")
				})
				currentActiveTab.children[0].classList.remove("hidden") // show the outline icon
				currentActiveTab.children[1].classList.add("hidden") // hide the filled icon
				currentActiveTab.classList.remove("active-tab") // remove the active-tab class from the current active tab
				tabs[4].classList.add("font-bold")
				tabs[4].classList.add("active-tab")
				tabs[4].children[0].classList.add("hidden")
				tabs[4].children[1].classList.remove("hidden")
				break

			case "/notifications":
				tabs.forEach(value => {
					value.classList.remove("font-bold")
				})
				currentActiveTab.children[0].classList.remove("hidden") // show the outline icon
				currentActiveTab.children[1].classList.add("hidden") // hide the filled icon
				currentActiveTab.classList.remove("active-tab") // remove the active-tab class from the current active tab
				tabs[2].classList.add("font-bold")
				tabs[2].classList.add("active-tab")
				tabs[2].children[0].classList.add("hidden")
				tabs[2].children[1].classList.remove("hidden")
				break
			case "/message":
				tabs.forEach(value => {
					value.classList.remove("font-bold")
				})
				currentActiveTab.children[0].classList.remove("hidden") // show the outline icon
				currentActiveTab.children[1].classList.add("hidden") // hide the filled icon
				currentActiveTab.classList.remove("active-tab") // remove the active-tab class from the current active tab
				tabs[3].classList.add("font-bold")
				tabs[3].classList.add("active-tab")
				tabs[3].children[0].classList.add("hidden")
				tabs[3].children[1].classList.remove("hidden")
				break

			default:
				break
		}
	}, [router.pathname])
	function openPostTweetModal() {
		dispatch(setIsOpenPostTweetModal(true))
	}

	// const changeActiveSideBarText = e => {
	// 	if (!e.currentTarget.classList.contains("font-bold")) {
	// 		const currentActiveText = document.querySelector(".active-side-bar-text")
	// 		currentActiveText.classList.remove("font-bold")
	// 		currentActiveText.classList.remove("active-side-bar-text")
	// 		currentActiveText.children[0].classList.remove("hidden")
	// 		currentActiveText.children[1].classList.add("hidden")
	// 		e.currentTarget.classList.add("font-bold")
	// 		e.currentTarget.classList.add("active-side-bar-text")
	// 		e.currentTarget.children[0].classList.add("hidden")
	// 		e.currentTarget.children[1].classList.remove("hidden")
	// 	}
	// }

	const handleClickOutside = event => {
		if (logoutBoxRef.current && !logoutBoxRef.current.contains(event.target)) {
			setOpenLogout(false)
		}
	}

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true)
		return () => {
			document.removeEventListener("click", handleClickOutside, true)
		}
	}, [])

	useEffect(() => {
		const newNotificationRef = getNewNotificationRef(signedInUser.uid)
		onSnapshot(newNotificationRef, snapshot => {
			snapshot.get("view") === false ? setHasNotification(true) : setHasNotification(false)
		})
	}, [])

	return (
		<div className='xl:basis-1/4 xl:flex xl:flex-col sticky top-0 xl:h-full hidden'>
			<div className='xl:p-2 xl:text-xl hover:cursor-pointer'>
				<div className='flex items-center w-fit xl:px-3 xl:py-1'>
					<Image alt='logo' src={require("../../images/GCF_Logo.png")} height={50} width={50}></Image>
				</div>
			</div>
			<div className='xl:p-2 xl:text-xl hover:cursor-pointer'>
				<div className='flex items-center w-fit xl:px-3 xl:py-1 xl:rounded-3xl hover:bg-gray-200 active-tab tab'>
					<IoHomeOutline className='hidden' size={ICON_SIZE} />
					<IoHomeSharp size={ICON_SIZE} />
					<Link href='/home' className='xl:ml-2'>
						Home
					</Link>
				</div>
			</div>
			<div className='xl:p-2 xl:text-xl hover:cursor-pointer'>
				<div className='flex items-center w-fit xl:px-3 xl:py-1 xl:rounded-3xl hover:bg-gray-200 tab'>
					<MdOutlineExplore size={ICON_SIZE} />
					<MdExplore className='hidden' size={ICON_SIZE} />

					<span className='xl:ml-2'>Explore</span>
				</div>
			</div>
			<div className='xl:p-2 xl:text-xl hover:cursor-pointer relative'>
				<div className='flex items-center w-fit xl:px-3 xl:py-1 xl:rounded-3xl hover:bg-gray-200 tab'>
					<IoNotificationsOutline size={ICON_SIZE} />
					<IoNotificationsSharp className='hidden' size={ICON_SIZE} />
					<Link href='/notifications' className='xl:ml-2 '>
						Notifications
					</Link>
				</div>
				{hasNotification ? (
					<div className='notification-number border rounded-full w-4 text-center absolute z-10 bg-red-600 h-1/3 left-3 top-2'></div>
				) : null}
			</div>
			<div className='xl:p-2 xl:text-xl hover:cursor-pointer relative'>
				<div className='flex items-center w-fit xl:px-3 xl:py-1 xl:rounded-3xl hover:bg-gray-200 tab'>
					<BsChatLeftDots size={ICON_SIZE} />
					<BsChatLeftDotsFill className='hidden' size={ICON_SIZE} />
					<Link className='xl:ml-2' href='/message'>
						Messages
					</Link>
				</div>
				{/* <div class`Name='notification-number border rounded-full w-4 text-center absolute z-10 bg-red-600 h-1/3 left-3 top-2'></div> */}
			</div>
			<div className='xl:p-2 xl:text-xl hover:cursor-pointer'>
				<div className='flex items-center w-fit xl:px-3 xl:py-1 xl:rounded-3xl hover:bg-gray-200 tab'>
					<BsFileEarmarkPerson size={ICON_SIZE} />
					<BsFileEarmarkPersonFill className='hidden' size={ICON_SIZE} />
					<Link href='/profile' className='xl:ml-2 '>
						Profile
					</Link>
				</div>
			</div>
			<div className='xl:p-2 xl:text-xl hover:cursor-pointer'>
				<Link href='https://namdo8467.github.io/GuessingGame/' target='_blank'>
					<div className='flex items-center w-fit xl:px-3 xl:py-1 xl:rounded-3xl hover:bg-gray-200 tab'>
						<IoGameControllerOutline size={ICON_SIZE} />
						<IoGameControllerSharp className='hidden' size={ICON_SIZE} />
						<span className='xl:ml-2 '>Mini Game</span>
					</div>
				</Link>
			</div>

			<div className='xl:p-2 xl:text-xl hover:cursor-pointer'>
				<div
					onClick={openPostTweetModal}
					className='border xl:py-3 xl:rounded-3xl text-center text-white font-semibold bg-green-500 xl:w-3/4 hover:bg-green-600'
				>
					Tweet
				</div>
			</div>

			<div ref={logoutBoxRef} className='xl:px-1 xl:text-xl hover:cursor-pointer w-fit text-center relative'>
				<div
					className='flex items-center xl:px-3 xl:py-2 xl:rounded-3xl hover:bg-gray-200'
					onClick={() => {
						setOpenLogout(prev => !prev)
					}}
				>
					<div className='flex xl:ml-2 items-center'>
						<div className='photo'>
							{signedInUser?.providerData?.photoUrl ? (
								<Image src={require(`${signedInUser.providerData[0].photoUrl}`)} alt='photo' />
							) : (
								<IoPersonCircleOutline size={ICON_SIZE + 8} />
							)}
						</div>
						<div className='display-name flex items-center flex-col xl:text-lg'>
							<div>{signedInUser?.email}</div>
							<div>{signedInUser?.displayName ? signedInUser?.displayName?.replaceAll(" ", "") : "User"}</div>
						</div>
					</div>
				</div>
				<div
					className={`${
						openLogout ? "" : "hidden"
					} xl:text-base xl:h-full absolute border border-gray-300 flex flex-col w-full xl:-top-16 xl:left-24 bg-white rounded-sm shadow-xl`}
				>
					<div className='h-full flex flex-col justify-center font-bold'>
						<div className='hover:bg-gray-100'>
							<Link href={"/profile"}>Profile</Link>
						</div>
						<div className='hover:bg-gray-100'>
							<p
								onClick={() => {
									signOutFirebase()
									dispatch(signUserOut())
									router.push("/login")
								}}
							>
								Logout
							</p>
						</div>
					</div>
					<div className='triangle border-r border-b border-gray-400 bg-white rotate-45 w-4 h-4 absolute xl:-bottom-2 xl:left-3'></div>
				</div>
			</div>
		</div>
	)
}

export default Sidebar
