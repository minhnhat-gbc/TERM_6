// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { getPlaiceholder } = require("plaiceholder")
export default async function handler(req, res) {
	try {
		if (req.method === "POST") {
			const { imageLink } = req.body
			const { base64, img } = await getPlaiceholder(imageLink)
			res.status(200).json({ image: img, blurDataURL: base64 })
		} else {
			res.status(200).send("hei")
		}
	} catch (error) {
		console.log(error.message)
		res.status(400).json(error)
	}
}
