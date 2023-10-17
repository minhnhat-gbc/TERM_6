import { useState, useEffect } from "react"
import Link from "next/link"
import { FaFacebook, FaGoogle, FaEnvelope, FaLock, FaPen } from "react-icons/fa"
import { signUpWithEmailAndPassword } from "@/firebase"
import { useDispatch } from "react-redux"

function SignUp() {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")

	useEffect(() => {
		const errorTimeout = setTimeout(() => {
			setError("")
		}, 3000)
		return () => {
			clearTimeout(errorTimeout)
		}
	}, [error])
	return (
		<div className='flex flex-col items-center justify-center min-h-screen py-2  xl'>
			<main className='flex flex-col items-center justify-center w-full flex-1 px20 text-center'>
				<div className='sm:bg-white sm:rounded-2xl sm:shadow-2xl sm:flex sm:w-5/6 sm:max-w-4xl  md:bg-white md:rounded-2xl md:shadow-2xl md:flex md:w-5/6 md:max-w-4xl'>
					<div className='p-5 m-5 sm:p-5 md:w-3/5 md:p-5'>
						<div className='text-left font-bold'>
							Greenhills Christian Fellowship
							<span className='text-red-500'> Toronto</span>
						</div>

						<div className='py-20 ml-2 md:py-10'>
							<h2 className='text-3xl font-bold text-green-500'>Sign Up</h2>
							<div className='border-2 w-10 border-green-500 mb-2 inline-block'></div>
							<div className='flex justify-center my-2'></div>
							{/* <div className='flex justify-center my-2'>
								<a href='#' className='border-2 border-gray-200 rounded-full p-3 mx-1'>
									<FaFacebook className='text-xl' />
								</a>
								<a href='#' className='border-2 border-gray-200 rounded-full p-3 mx-1'>
									<FaGoogle className='text-xl' />
								</a>
							</div> */}
							<p className='text-gray-500 my-3'>Or fill in your personal information below : </p>
							<p className='italic text-red-500'>{error}</p>
							<div className='flex flex-col sm:items-right sm:items-left md:items-center'>
								<div className='bg-gray-100 flex items-center mb-3 w-73 p-2 sm:bg-gray-100 sm:flex sm:items-center sm:mb-3 sm:w-64 sm:p-2 md:bg-gray-100 md:flex md:items-center md:mb-3 md:w-64 md:p-2'>
									<FaPen className='text-gray-400 m-2' />
									<input
										type='text'
										name='text'
										placeholder='First Name'
										className='bg-gray-100 outline-none text-sm flex-1'
										value={firstName}
										onChange={e => {
											setFirstName(e.target.value)
										}}
									/>
								</div>
								<div className='bg-gray-100 flex items-center mb-3 w-73 p-2 sm:bg-gray-100 sm:flex sm:items-center sm:mb-3 sm:w-64 sm:p-2 md:bg-gray-100 md:flex md:items-center md:mb-3 md:w-64 md:p-2'>
									<FaPen className='text-gray-400 m-2' />
									<input
										type='text'
										name='text'
										placeholder='Last Name'
										className='bg-gray-100 outline-none text-sm flex-1'
										value={lastName}
										onChange={e => {
											setLastName(e.target.value)
										}}
									/>
								</div>
								<div className='bg-gray-100 flex items-center mb-3 w-73 p-2 sm:bg-gray-100 sm:flex sm:items-center sm:mb-3 sm:w-64 sm:p-2 md:bg-gray-100 md:flex md:items-center md:mb-3 md:w-64 md:p-2'>
									<FaEnvelope className='text-gray-400 m-2' />
									<input
										type='email'
										name='email'
										placeholder='Email'
										className='bg-gray-100 outline-none text-sm flex-1'
										value={email}
										onChange={e => {
											setEmail(e.target.value)
										}}
									/>
								</div>
								<div className='bg-gray-100 flex items-center mb-3 w-73 p-2 sm:bg-gray-100 sm:flex sm:items-center sm:mb-3 sm:w-64 sm:p-2 md:bg-gray-100 md:flex md:items-center md:mb-3 md:w-64 md:p-2'>
									<FaLock className='text-gray-400 m-2' />
									<input
										type='password'
										name='password'
										placeholder='Password'
										className='bg-gray-100 outline-none text-sm flex-1'
										value={password}
										onChange={e => {
											setPassword(e.target.value)
										}}
									/>
								</div>

								<button
									className='border-2 border-black rounded-full md:border-2 md:border-black md:rounded-full sm:px-12 py-2 inline-block bg-white text-black font-semibold hover:bg-black hover:text-white'
									onClick={async () => {
										try {
											await signUpWithEmailAndPassword(email, password, firstName, lastName)
										
										} catch (error) {
											
											setError(error.message)
										}
									}}
								>
									Sign Up
								</button>
							</div>
						</div>
					</div>
					{/* w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-18 */}
					<div className='bg-gray-200 p-12 w-full sm:px-18 sm:w-2/5 sm:bg-green-500 sm:text-white sm:rounded-tr-2xl sm:rounded-br-2xl sm:py-36 sm:px-18 sm :w-2/5 md:bg-green-500 md:text-white md:rounded-tr-2xl md:rounded-br-2xl md:py-36 md:px-18'>
						<h2 className='text-3xl font-bold mb-2 sm:text-3xl sm:font-bold sm:mb-2 md:text-3xl md:font-bold md:mb-2'>Hello!</h2>
						<div className='sm:border-2 sm: w-10 sm:border-white sm:mb-2 sm:inline-block md:border-2 md:w-10 md:border-white md:mb-2 md:inline-block'></div>
						<p className='px-3 mb-4 py-2 px-3 mb-4 py-2 sm:px-3 sm:mb-4 sm:py-2  md:px-3 md:mb-4 md:py-2'>Don't have an ACCOUNT yet? Put your personal information to sign up!.</p>
						<Link
							href='/login'
							className='p-20 border-2 border-black rounded-full md:border-2 md:border-black md:rounded-full sm:px-12 py-2 inline-block bg-white text-black font-semibold hover:bg-black hover:text-white'
						>
							Login
						</Link>
					</div>
				</div>
			</main>
		</div>
	)
}
export default SignUp
