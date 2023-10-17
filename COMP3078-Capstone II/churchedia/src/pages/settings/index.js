import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"
const AccountInformation = dynamic(() => import("../../components/AccountInformation"))

const Settings = () => {
	const [showAccountInformation, setShowAccountInformation] = useState(true)
	const [isMobile, setIsMobile] = useState(false)
	const [initialLoad, setInitialLoad] = useState(true)

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768)
			if (initialLoad) {
				setInitialLoad(false)
			} else {
				setShowAccountInformation(window.innerWidth >= 768)
			}
		}

		handleResize()

		window.addEventListener("resize", handleResize)

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [initialLoad])

	return (
		<div className={`flex h-screen ${isMobile ? "flex-col" : ""}`}>
			<div
				className={`flex-initial border-r bg-white ${isMobile ? "border-gray-300" : ""}`}
				style={{
					borderLeft: ".1px solid rgba(0, 0, 0, 0.2)",
					borderRight: ".1px solid rgba(0, 0, 0, 0.2)",
					borderTop: "none",
					borderBottom: "none",
					minWidth: "320px"
				}}
			>
				<h1
					className={` bg-white text-3xl font-bold mb-6 ${
						showAccountInformation && isMobile ? "hidden" : ""
					} settings-title`}
				>
					Settings
				</h1>
				{isMobile && showAccountInformation && (
					<button className='back-button' onClick={() => setShowAccountInformation(false)}>
						Back
					</button>
				)}
				<nav className='mt-7 '>
					<ul>
						<li className='mb-2 account-info' onClick={() => setShowAccountInformation(!showAccountInformation)}>
							<div
								className={`cursor-pointer text-black px-2 text-lg flex items-center w-full account-info-text hover:bg-gray-300 ${
									showAccountInformation && isMobile ? "hidden" : ""
								}`}
								onClick={() => setShowAccountInformation(!showAccountInformation)}
							>
								Account Information
							</div>
						</li>
					</ul>
				</nav>
			</div>
			{isMobile && (
				<div className='flex-1 h-full'>
					<div className={`bg-white h-full ${showAccountInformation ? "block" : "hidden"}`}>
						<AccountInformation />
					</div>
				</div>
			)}
			{!isMobile && (
				<div className='flex-2 grid grid-cols-1 md:grid-cols-2'>
					<div className={`bg-white ${showAccountInformation ? "block" : "hidden"}`}>
						<AccountInformation />
					</div>
				</div>
			)}
			<style jsx>{`
        @media only screen and (max-width: 380px) {
          .account-info-text {
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        } 
        .account-info-text {
          padding: 10px; /
          margin: 5px 0; 
          border-radius: 5px; 
          transition: background-color 0.3s ease; 
}
      `}</style>
		</div>
	)
}

export default Settings
