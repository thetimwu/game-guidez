const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.addAdminRole = functions.https.onCall(async (data, context) => {
  try {
    const user = await admin.auth().getUserByEmail(data.email);
    if (context.auth.token.admin !== true) {
      return { error: "only admins can add other admins!" };
    }
    await admin.auth().setCustomUserClaims(user.uid, {
      admin: true,
    });
    return {
      message: `Success! ${data.email} has been made an admin`,
    };
  } catch (err) {
    return err;
  }
});
