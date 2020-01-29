const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();

const database = admin.database().ref("/items");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.addItem = functions.https.onRequest((req, res) => {
  // The logic of the function is written inside cors for Cross Origin Resource SHaring
  return cors(req, res, () => {
    console.log(req.body);
    if (req.method !== "POST") {
      return res.status(401).json({
        message: "Not allowed"
      });
    }

    const item = req.body.item;
    database.push(item);

    let items = [];

    // The on function listens for data changes at a prticualr location
    // https://firebase.google.com/docs/reference/js/firebase.database.Reference#on
    return database.on(
      "value",
      snapshot => {
        snapshot.forEach(item => {
          items.push({
            id: item.key,
            items: item.val()
          });
        });
        res.status(200).json(items);
      },
      error => {
        res.status(error.code).json({
          message: `Something went wrong. ${error.message}`
        });
      }
    );
  });
});
