/** @type {import('next').NextConfig} */
const { withPlaiceholder } = require("@plaiceholder/next")
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["lh3.googleusercontent.com", "firebasestorage.googleapis.com", "www.google.com", "media.tenor.com"]
	}
}

module.exports = withPlaiceholder(nextConfig)
