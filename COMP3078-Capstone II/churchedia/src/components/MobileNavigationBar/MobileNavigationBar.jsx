import {
	IoHomeSharp,
	IoHomeOutline,
	IoPersonCircleOutline,
	IoNotificationsOutline,
	IoNotificationsSharp,
	IoSettingsOutline,
	IoSettingsSharp
} from "react-icons/io5"
import { BsChatDots, BsChatDotsFill } from "react-icons/bs"
import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

function MobileNavigationBar() {
	const ICON_SIZE = 23
	const router = useRouter()
	useEffect(() => {
		const currentActiveTab = document.querySelector(".active-mobile-tab")
		currentActiveTab.children[0].children[0].classList.remove("hidden") // show the outline icon
		currentActiveTab.children[0].children[1].classList.add("hidden") // hide the filled icon
		currentActiveTab.classList.remove("active-tab") // remove the active-tab class from the current active tab

		const mobileTabs = document.querySelectorAll(".mobile-tab")
		switch (router.pathname) {
			case "/home":
				mobileTabs[0].children[0].children[0].classList.add("hidden")
				mobileTabs[0].children[0].children[1].classList.remove("hidden")
				break

			case "/notification":
				mobileTabs[1].children[0].children[0].classList.add("hidden")
				mobileTabs[1].children[0].children[1].classList.remove("hidden")
				break

			case "/settings":
				mobileTabs[3].children[0].children[0].classList.add("hidden")
				mobileTabs[3].children[0].children[1].classList.remove("hidden")
				break

			default:
				break
		}
	}, [router.pathname])
	return (
		<>
			<div className='h-14 xl:hidden'></div>{/* This div is used to push the below navigation down by its height because of the fixed position. Try to comment this div out and see what happens */}
			<div className='mobile-navigation-tab w-full border border-t-2 fixed bottom-0 h-14 z-50 flex justify-around items-center xl:hidden bg-white'>
				<div className='flex active-mobile-tab mobile-tab'>
					<Link href='/home'>
						<IoHomeOutline className='hidden' size={ICON_SIZE} />

						<IoHomeSharp size={ICON_SIZE} />
					</Link>
				</div>

				<div className='flex mobile-tab'>
					<Link href='/notification'>
						<IoNotificationsOutline size={ICON_SIZE}></IoNotificationsOutline>
						<IoNotificationsSharp className='hidden' size={ICON_SIZE}></IoNotificationsSharp>
					</Link>
				</div>

				<div className='flex mobile-tab'>
					<Link href='/message'>
						<BsChatDots size={ICON_SIZE}></BsChatDots>
						<BsChatDotsFill className='hidden' size={ICON_SIZE}></BsChatDotsFill>
					</Link>
				</div>
				<div className='flex mobile-tab'>
					<Link href='/settings'>
						<IoSettingsOutline size={ICON_SIZE}></IoSettingsOutline>
						<IoSettingsSharp className='hidden' size={ICON_SIZE}></IoSettingsSharp>
					</Link>
				</div>
			</div>
		</>
	)
}
export default MobileNavigationBar
