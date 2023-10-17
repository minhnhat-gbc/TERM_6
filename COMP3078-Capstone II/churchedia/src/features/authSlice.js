import { createSlice } from "@reduxjs/toolkit"
const initialState = {
	isSignedIn: false,
	currentUser: null
}
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		signUserIn: (state, action) => {
			const user = action.payload
			if (user) {
				state.currentUser = user
				state.isSignedIn = true
			}
		},
		signUserOut: state => {
			state.currentUser = null
			state.isSignedIn = false
		},
		signUp: () => {}
	}
})

export const { signUserIn, signUserOut } = authSlice.actions

export default authSlice.reducer
