import { useEffect, useState } from "react"
import { getAllNotifications, viewAllNewNotification } from "@/firebase"
import { useSelector } from "react-redux"
import Image from "next/image"
import Link from "next/link"
function Notifications() {
	const auth = useSelector(store => store.auth)
	const signedInUser = JSON.parse(auth.currentUser)
	const [notifications, setNotifications] = useState()
	useEffect(() => {
		;(async () => {
			try {
				const n = await getAllNotifications(signedInUser.uid)
				setNotifications(n.docs)
				await viewAllNewNotification(signedInUser.uid)
			} catch (error) {
				alert("Error, check console in the index file of notification")
				console.log(error)
			}
		})()
	}, [])
	if (!notifications) {
		return <div>Loading...</div>
	}
	// console.log(notifications)
	return (
		<div className='xl:basis-2/4 border border-gray-200'>
			{notifications.map(notification => {
				return (
					<Link href={`${notification.get("to_uid")}/${notification.get("tweetID")}`}>
						<div
							className='border-b border-gray-200 flex items-center xl:px-6 xl:py-3 hover:cursor-pointer hover:bg-gray-100'
							key={notification.get("date")}
						>
							<Image
								className='rounded-full'
								src={notification.get("from_photoURL") || require("../../images/cat.png")}
								width={70}
								height={70}
								alt='avatar'
							></Image>
							<div className='xl:ml-4'>
								{notification.get("action") === "like" ? (
									<span>
										<span className='font-bold'>{notification.get("from_displayName")}</span> just liked your
										post
									</span>
								) : (
									<span>
										<span className='font-bold'>{notification.get("from_displayName")}</span> commented one of
										your posts
									</span>
								)}
							</div>
						</div>
					</Link>
				)
			})}
		</div>
	)
}
export default Notifications
