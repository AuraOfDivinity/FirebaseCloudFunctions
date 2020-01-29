const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();

const database = admin.database().ref("/items");

const getItemsFromDatabase = res => {
  let items = [];

  // The on function listens for data changes at a prticualr location
  return database.on(
    "value",
    snapshot => {
      snapshot.forEach(item => {
        items.push({
          id: item.key,
          item: item.val().item
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
};

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

// https://us-central1-todoapp-70bd7.cloudfunctions.net/addItem
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

    // https://firebase.google.com/docs/reference/js/firebase.database.Reference#on
    getItemsFromDatabase(res);
  });
});

// https://us-central1-todoapp-70bd7.cloudfunctions.net/getItems
exports.getItems = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== "GET") {
      return res.status(404).json({
        message: "Not Allowed"
      });
    }
    let items = [];
    getItemsFromDatabase(res);
  });
});

exports.delete = functions.https.onRequest((req, res) => {
  return cors(re, res, () => {
    if (req.method !== "DELETE") {
      res.status(404).json({
        message: "Not allowed"
      });
    }

    const id = req.query.id;

    admin
      .database()
      .ref(`/items/${id}`)
      .remove();

    getItemsFromDatabase(res);
  });
});
