import { FaFacebook, FaGoogle, FaEnvelope, FaLock } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { signUserIn } from "@/features/authSlice"
import { signInWithGoogle, onAuthStateChanged, authFirebase, signInByEmailAndPassword, signOutFirebase } from "@/firebase"
import { useRouter } from "next/router"
import Link from "next/link"

function LogIn() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const dispatch = useDispatch()

	const router = useRouter()

	const [error, setError] = useState("")
	const [checkIfUserIsLoggedIn, setCheckIfUserIsLoggedIn] = useState(true)

	useEffect(() => {
		onAuthStateChanged(authFirebase, user => {
			if (user) {
				dispatch(signUserIn(JSON.stringify(user)))
				// setCheckIfUserIsLoggedIn(true)
				router.push("/home")
			} else {
				// signOutFirebase()
				// dispatch(signUserOut())
				setCheckIfUserIsLoggedIn(false)
			}
		})
	}, [])

	useEffect(() => {
		const errorTimeout = setTimeout(() => {
			setError("")
		}, 3000)
		return () => {
			clearTimeout(errorTimeout)
		}
	}, [error])

	if (checkIfUserIsLoggedIn) {
		return
	}

	return (
		<div className='flex flex-col items-center justify-center min-h-screen py-2 xl'>
			<main className='flex flex-col items-center justify-center w-full flex-1 px20 text-center'>
				<div className='sm:bg-white sm:rounded-2xl sm:shadow-2xl sm:flex sm:w-5/6 sm:max-w-4xl  md:bg-white md:rounded-2xl md:shadow-2xl md:flex md:w-5/6 md:max-w-4xl'>
					<div className='p-5 m-5 sm:p-5 md:w-3/5 md:p-5'>
						<div className='text-left font-bold'>
							Greenhills Christian Fellowship
							<span className='text-red-500'> Toronto</span>
						</div>

						<div className='py-20 ml-2 md:py-10'>
							<h2 className='text-3xl font-bold text-green-500 object md:text-3xl md:font-bold md:text-green-500'>Sign In to Account</h2>
							<div className='border-2 w-10 border-green-500 mb-2 inline-block'></div>
							<div className='flex justify-center my-2'>
								{/* <a href='#' className='border-2 border-gray-200 rounded-full p-3 mx-1 hover:cursor-pointer'>
									<FaFacebook className='text-xl' />
								</a> */}
								<a
									onClick={async () => {
										const user = await signInWithGoogle()
										// console.log(user)
										if (user?.user) {
											dispatch(signUserIn(JSON.stringify(user.user)))
										}
									}}
									className='border-2 border-gray-200 rounded-full p-3 mx-1 hover:cursor-pointer'
								>
									<FaGoogle className='text-xl' />
								</a>
							</div>
							<p className='text-gray-500 my-3'>or use your email address</p>
							<p className='italic text-red-500'>{error}</p>
							<div className='flex flex-col sm:items-right sm:items-left md:items-center'>
								<div className='bg-gray-100 flex items-center mb-3 w-73 p-2 sm:bg-gray-100 sm:flex sm:items-center sm:mb-3 sm:w-64 sm:p-2 md:bg-gray-100 md:flex md:items-center md:mb-3 md:w-72 md:p-2'>
									<FaEnvelope className='text-gray-400 m-2' />
									<input
										type='email'
										name='email'
										placeholder='Enter email'
										className='bg-gray-100 outline-none text-sm flex-1'
										value={email}
										onChange={e => {
											setEmail(e.target.value)
										}}
									/>
								</div>
								<div className='bg-gray-100 p-2 flex items-center mb-3 sm:bg-gray-100 sm:w-73 sm:p-2 sm:flex sm:items-center sm:mb-3 md:bg-gray-100 md:w-72 md:p-2 md:flex md:items-center md:mb-3'>
									<FaLock className='text-gray-400 m-2' />
									<input
										type='password'
										name='password'
										placeholder='Enter password'
										className='bg-gray-100 outline-none text-sm flex-1'
										value={password}
										onChange={e => {
											setPassword(e.target.value)
										}}
									/>
								</div>
								<div className='flex justify-between w-64 mb-5'>
									<label className='flex items-center text-xs'>
										<input type='checkbox' name='remember' className='mr-1' /> Remember Me
									</label>
									<a href='#' className='text-xs sm:text-xs'>
										Forgot Password?
									</a>
								</div>
								<button
									className='border-2 border-black rounded-full md:border-2 md:border-black md:rounded-full sm:px-12 py-2 inline-block bg-white text-black font-semibold hover:bg-black hover:text-white'
									onClick={async () => {
										try {
											const user = await signInByEmailAndPassword(email, password)
											router.push("/home")
											dispatch(signUserIn(JSON.stringify(user)))
										} catch (error) {
											// alert("Error")
											setError(error.message)
										}
									}}
								>
									Sign In
								</button>
							</div>
						</div>
					</div>
					{/* w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-18				 */}
					<div className='bg-gray-200 p-12 w-full sm:px-18 sm:w-2/5 sm:bg-green-500 sm:text-white sm:rounded-tr-2xl sm:rounded-br-2xl sm:py-36 sm:px-18 sm :w-2/5 md:bg-green-500 md:text-white md:rounded-tr-2xl md:rounded-br-2xl md:py-36 md:px-18'>
						<h2 className='text-3xl font-bold mb-2 sm:text-3xl sm:font-bold sm:mb-2 md:text-3xl md:font-bold md:mb-2'>Hello!</h2>
						<div className='sm:border-2 sm: w-10 sm:border-white sm:mb-2 sm:inline-block md:border-2 md:w-10 md:border-white md:mb-2 md:inline-block'></div>
						<p className='px-3 mb-4 py-2 px-3 mb-4 py-2 sm:px-3 sm:mb-4 sm:py-2  md:px-3 md:mb-4 md:py-2'>Don't have an ACCOUNT yet? Put your personal information to sign up!.</p>
						<Link
							href='/signup'
							className='p-20 border-2 border-black rounded-full md:border-2 md:border-black md:rounded-full sm:px-12 py-2 inline-block bg-white text-black font-semibold hover:bg-black hover:text-white'
						>
							Sign Up
						</Link>
					</div>
				</div>
			</main>
		</div>
	)
}
export default LogIn
