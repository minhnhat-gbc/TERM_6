import "@/styles/globals.css"
import { Provider } from "react-redux"
import Trending from "@/components/Trending/Trending"
import Sidebar from "@/components/Sidebar/Sidebar"
import Layout from "@/components/Layout/Layout"
import store from "@/store"
import LogIn from "./login"
import SignUp from "./signup"
import Admin from "./admin"

export default function App({ Component, pageProps }) {
	if (Component === LogIn || Component === SignUp || Component === Admin) {
		return (
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		)
	} else {
		return (
			<Provider store={store}>
				<Layout>
					<Sidebar></Sidebar>
					<Component {...pageProps} />
					<Trending></Trending>
				</Layout>
			</Provider>
		)
	}
}
