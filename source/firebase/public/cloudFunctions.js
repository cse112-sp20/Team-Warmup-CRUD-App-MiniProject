const functions = require("firebase-functions");
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');

admin.initializeApp();

const database = admin.database().ref('/items');

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from a Serverless Database!");
});

const getItemsFromDatabase = (res) => {
  let items = [];

  return database.on('value', (snapshot) => {
    snapshot.forEach((item) => {
      items.push({
        id: item.key,
        firstName: item.val().firstName,
        lastName: item.val().lastName
      });
    });   
    res.status(200).json(items);
  }, (error) => {
    res.status(error.code).json({
      message: `Something went wrong. ${error.message}`
    })
  })
};

const getAddedItem = (res) => {
  let items = [];

  return database.on('value', (snapshot) => {
    snapshot.forEach((item) => {
      items.push({
        id: item.key,
        firstName: item.val().firstName,
        lastName: item.val().lastName
      });
    });   
    res.status(200).json(items[items.length - 1]);
  }, (error) => {
    res.status(error.code).json({
      message: `Something went wrong. ${error.message}`
    })
  })
};

exports.addItem = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if(req.method !== 'POST') {
      return res.status(401).json({
        message: 'Not allowed'
      })
    };

    const idToken = req.body.idToken;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    admin.auth().verifyIdToken(idToken)
    .then(function(decodedToken) {
      uid = decodedToken.uid;
      database.child(uid).push({firstName, lastName}).then(function(){
        console.log("Good!added successful");
        res.status(200).json({});
      }).catch(function(error){
        console.log("error on adding element");
        res.status(400).json({});
      });
    }).catch(function(error) {
      console.log("error retriving the token");
      res.status(400).json({});
    });

    res.status(400).json({});
    //getAddedItem(res)
  });
});

exports.getItems = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if(req.method !== 'GET') {
      return res.status(401).json({
        message: 'Not allowed'
      });
    };
    getItemsFromDatabase(res)
  })
});

exports.delete = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
      if(req.method !== 'DELETE') {
        return res.status(401).json({
          message: 'Not allowed'
        })
      }
      const id = req.query.id
      admin.database().ref(`/items/${id}/`).remove()
      getItemsFromDatabase(res)
    })
});

exports.update = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if(req.method !== 'PUT') {
          return res.status(401).json({
            message: 'Not allowed'
          })
        };
        const id = req.query.id
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        admin.database().ref(`/items/${id}/`).set({ firstName, lastName })
        getItemsFromDatabase(res)
      });
});