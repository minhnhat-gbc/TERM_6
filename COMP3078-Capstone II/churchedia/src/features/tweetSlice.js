import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	tweet: "",
	showNewestTweet: false,
	showNewestTweetSkeleton: false,
	newestTweet: "",
	isOpenPostTweetModal: false,
	tweetsOfCurrentUser: []
}

const tweetSlice = createSlice({
	initialState,
	name: "tweet",
	reducers: {
		setTweet: (state, action) => {
			state.tweet = action.payload
		},
		setShowNewestTweet: (state, action) => {
			state.showNewestTweet = action.payload
		},
		setShowNewestTweetSkeleton: (state, action) => {
			state.showNewestTweetSkeleton = action.payload
		},

		setNewestTweet: (state, action) => {
			state.newestTweet = action.payload
		},
		setIsOpenPostTweetModal: (state, action) => {
			state.isOpenPostTweetModal = action.payload
		},
		setTweetsOfCurrentUser: (state, action) => {
			state.tweetsOfCurrentUser = action.payload
		},
		updateLikes: (state, action) => {
			const updatedTweet = action.payload
			state.tweetsOfCurrentUser = state.tweetsOfCurrentUser.map(tweet => {
				if (tweet.id === updatedTweet.id) {
					tweet = updatedTweet
				}
				return tweet
			})
		},
		deleteTweet: (state, action)=>{
			const deleteTweet = action.payload
			state.tweetsOfCurrentUser = state.tweetsOfCurrentUser.filter(tweet => tweet.id != deleteTweet.id)
		}
	}
})

export const {
	setTweet,
	setShowNewestTweet,
	setShowNewestTweetSkeleton,
	setNewestTweet,
	setIsOpenPostTweetModal,
	setTweetsOfCurrentUser,
	updateLikes,
	deleteTweet
} = tweetSlice.actions
export default tweetSlice.reducer
