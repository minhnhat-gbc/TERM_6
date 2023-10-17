import { firebaseConfig } from "./firebaseConfig"

import { initializeApp } from "firebase/app"

import {
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	fetchSignInMethodsForEmail,
	updateProfile
} from "firebase/auth"
import {
	collection,
	doc,
	addDoc,
	setDoc,
	getFirestore,
	onSnapshot,
	orderBy,
	limit,
	deleteDoc,
	updateDoc,
	getDoc,
	query,
	where,
	getDocs,
	serverTimestamp
} from "firebase/firestore"
import { uploadBytesResumable, getDownloadURL, ref, getStorage } from "firebase/storage"

import axios from "axios"

const LOADING_IMAGE_URL = "https://media.tenor.com/o8m3bKTsifUAAAAM/hold-on.gif" //"https://www.google.com/images/spin-32.gif"

const app = initializeApp(firebaseConfig, "user-app")

const auth = getAuth(app)

const fireStore = getFirestore(app)

const imageStorage = getStorage(app)

const tweetCollection = collection(fireStore, "tweets")

const notificationCollection = collection(fireStore, "notifications")

const newNotificationCollection = collection(fireStore, "newNotifications")

const recentTweetQuery = query(tweetCollection, orderBy("date", "desc"), limit(1))

const googleProvider = new GoogleAuthProvider()

const errorHandler = message => {
	if (message.includes("auth/user-not-found")) {
		return "Email not found"
	} else if (message.includes("auth/invalid-email")) {
		return "Invalid email"
	} else if (message.includes("auth/wrong-password")) {
		return "Password is incorrect"
	} else if (message.includes("auth/email-already-in-use")) {
		return "Email already in use"
	} else if (message.includes("auth/password-required")) {
		return "Password is required"
	} else if (message.includes("auth/popup-closed-by-user")) {
		return
	}
}

const signInByEmailAndPassword = async (email, password) => {
	try {
		const signInMethods = await fetchSignInMethodsForEmail(auth, email)
		if (signInMethods.includes("google.com")) {
			await signInWithPopup(auth, googleProvider)
			return
		}

		const payload = await signInWithEmailAndPassword(auth, email, password)
		return payload.user
	} catch (error) {
		const message = errorHandler(error.message)
		// console.log(message)
		throw new Error(message)
	}
}

const signInWithGoogle = async () => {
	try {
		const payload = await signInWithPopup(auth, googleProvider)
		if (payload?.user) {
			return { user: payload.user }
		} else {
			return false
		}
	} catch (error) {
		const message = errorHandler(error.message)
		throw new Error(message)
	}
}

const signUpWithEmailAndPassword = async (email, password, firstName, lastName) => {
	try {
		if (!password) {
			throw new Error("auth/password-required")
		}
		const payload = await createUserWithEmailAndPassword(auth, email, password)
		const name = firstName + lastName
		await updateProfile(payload?.user, { displayName: name })
	} catch (error) {
		const message = errorHandler(error.message)
		throw new Error(message)
	}
}
const signOutFirebase = async () => {
	await signOut(auth)
}

const getBlurImagePlaceHolder = async imageURL => {
	try {
		const imagePlaceholder = await axios.post("/api/getImagePlaceholder", {
			imageLink: imageURL
		})
		const { blurDataURL } = imagePlaceholder.data
		return blurDataURL
	} catch (error) {
		alert("error in getBlurImagePlaceholder at index of firebase folder, check console")
		console.log(error)
	}
}

const postATweet = async (uid, content, image) => {
	if (content === "" && image === undefined) {
		return undefined
	} else {
		try {
			const tweetRef = await addDoc(tweetCollection, {
				uid,
				content,
				likes: [],
				comments: [],
				image: image ? LOADING_IMAGE_URL : null,
				blurDataURL: "",
				date: Date.now()
			})

			if (image !== undefined) {
				// Upload the image to Cloud Storage.
				const filePath = `${auth.currentUser.uid}/${tweetRef.id}/${image.name}`
				const newImageRef = ref(imageStorage, filePath)
				const fileSnapshot = await uploadBytesResumable(newImageRef, image)

				// Generate a public URL for the file.
				const publicImageUrl = await getDownloadURL(newImageRef)
				const blurDataURL = await getBlurImagePlaceHolder(publicImageUrl)

				// Update the chat message placeholder with the image’s URL.
				await updateDoc(tweetRef, {
					image: publicImageUrl,
					storageUri: fileSnapshot.metadata.fullPath,
					blurDataURL
				})
			}

			return true
		} catch (error) {
			console.log(error)
			return false
		}
	}
}

const deleteTweet = async tweetID => {
	const tweetRef = doc(fireStore, "tweets", tweetID)

	try {
		const result = await deleteDoc(tweetRef)
	} catch (error) {
		throw new Error(error)
	}
}

const modifyLikes = async (
	tweetID,
	signedInUserID,
	typeOfClick,
	currentUserID,
	signedInUserDisplayName,
	signedInUserEmail,
	signedInUserPhotoURL
) => {
	try {
		const tweetRef = doc(fireStore, "tweets", tweetID)
		const tweetDoc = await getDoc(tweetRef)

		if (typeOfClick === "click") {
			await updateDoc(tweetRef, {
				likes: [...tweetDoc.data().likes, signedInUserID]
			})
			if (signedInUserID !== currentUserID) {
				const notificationRef = await addDoc(notificationCollection, {
					tweetID,
					from_uid: signedInUserID,
					from_displayName: signedInUserDisplayName || signedInUserEmail,
					from_email: signedInUserEmail,
					from_photoURL: signedInUserPhotoURL || null,
					to_uid: currentUserID,
					action: "like",
					date: serverTimestamp()
				})

				// use setDoc because it can create or overwrite a document (you have to specify the ID for that document when using setDoc() )
				// addDoc will just create a new document (can't overwrite with a auto-generated ID because it's always a new ID)
				const newNotificationRef = await setDoc(doc(fireStore, "newNotifications", currentUserID), {
					uid: currentUserID,
					view: false
				})
			}
		} else {
			await updateDoc(tweetRef, {
				likes: tweetDoc.data().likes.filter(uid => uid !== signedInUserID)
			})
		}

		return true
	} catch (error) {
		console.log(error)
		return error
	}
}

const commentAPost = async (
	tweetID,
	commentText,
	signedInUserID,
	signedInUserDisplayName,
	signedInUserEmail,
	signedInUserPhotoURL,
	currentUserID
) => {
	try {
		const tweetRef = doc(fireStore, "tweets", tweetID)
		const tweetDoc = await getDoc(tweetRef)
		const comment = {
			from: signedInUserID,
			text: commentText,
			displayName: signedInUserDisplayName || signedInUserEmail,
			email: signedInUserEmail,
			photoURL: signedInUserPhotoURL || null
		}

		await updateDoc(tweetRef, {
			comments: [...tweetDoc.data().comments, comment]
		})


		if (signedInUserID !== currentUserID) {
			await addDoc(notificationCollection, {
				tweetID,
				from_uid: signedInUserID,
				from_displayName: signedInUserDisplayName || signedInUserEmail,
				from_email: signedInUserEmail,
				from_photoURL: signedInUserPhotoURL || null,
				to_uid: currentUserID,
				action: "comment",
				date: serverTimestamp()
			})

			// use setDoc because it can create or overwrite a document (you have to specify the ID for that document when using setDoc() )
			// addDoc will just create a new document (can't overwrite with a auto-generated ID because it's always a new ID)
			await setDoc(doc(fireStore, "newNotifications", currentUserID), {
				uid: currentUserID,
				view: false
			})
		}

		return true
	} catch (error) {
		console.log("Error at firebase line 281")
		console.log(error)
		return error
	}
}
const checkIfCurrentUserHasLikedTheTweet = async (userID, tweetID) => {
	try {
		const tweetRef = doc(fireStore, "tweets", tweetID)
		const tweetDoc = await getDoc(tweetRef)
		const userExist = tweetDoc.data().likes.indexOf(userID)
		if (userExist !== -1) {
			return true
		} else {
			return false
		}
	} catch (error) {
		console.log(error)
		return error
	}
}

const getAllTweetsByUID = async uid => {
	try {
		const allTweetsQuery = query(tweetCollection, where("uid", "==", uid), orderBy("date",'desc'))
		const result = await getDocs(allTweetsQuery)
		// console.log(result.docs)
		const allTweets = []
		result.forEach(doc => {
			allTweets.push({ id: doc.id, ...doc.data() })
		})
		return { allTweets, allTweetsQuery }
	} catch (error) {
		console.log(error)
		return false
	}
}

const getNewNotificationRef = uid => {
	const newNotificationRef = doc(newNotificationCollection, uid)
	return newNotificationRef
}

const viewAllNewNotification = async uid => {
	await setDoc(doc(fireStore, "newNotifications", uid), {
		uid,
		view: true
	})
}

const getTweetDetail = async tweetID => {
	try {
		const tweetRef = doc(tweetCollection, tweetID)
		const tweet = await getDoc(tweetRef)
		// console.log("1111")
		return { tweetRef, data: tweet.data() }
		// return 1
	} catch (error) {
		console.log(error)
	}
}

const getAllNotifications = async uid => {
	const q = query(notificationCollection, where("to_uid", "==", uid), orderBy("date"))
	// return q
	const notifications = await getDocs(q)
	return notifications
}
export {
	signInWithGoogle,
	onAuthStateChanged,
	signOutFirebase,
	auth as authFirebase,
	signInByEmailAndPassword,
	signUpWithEmailAndPassword,
	postATweet,
	onSnapshot,
	recentTweetQuery,
	deleteTweet,
	modifyLikes,
	checkIfCurrentUserHasLikedTheTweet,
	getAllTweetsByUID,
	commentAPost,
	getNewNotificationRef,
	getAllNotifications,
	viewAllNewNotification,
	getTweetDetail
}
