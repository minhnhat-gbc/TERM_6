const admin = require("firebase-admin")
const serviceAccount = require("./churchedia-firebase-adminsdk-ai35q-dbcbe5d294.json")
if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: "https://churchedia-default-rtdb.firebaseio.com"
	})
} else {
	admin.app()
}

module.exports = { admin }
