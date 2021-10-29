'use strict';

const {firebase,admin} = require('../db');
const firestore = firebase.firestore();


const generateToken=async (req, res, next) => {
    try {

          firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
                    const id=user.uid
                   

                    let newUser={token:idToken,id:id}
                   getUser(req, res, newUser)
                    
                  }).catch(function(error) {
                    // Handle error
                  });

    }
    
    catch (error) {
        res.status(400).send(error.message);
    }

}


const signUp =  async (req, res, next) => {
    try {
        const {email,password,role,name} = req.body;
       
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            let data={email,role,name,id:user.uid}
             firestore.collection('users').doc(user.uid).set(data).then(()=>{
                res.send("successfully signed up")
             }) .catch((error) => {
                res.status(400).send(error.message);
            });
            // ...
          
        })
        .catch((error) => {
            res.status(400).send(error.message);
        });
       
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const signOut =  async (req, res, next) => {
    try {
        const {email,password,role,name} = req.body;
       
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            res.send("Sign-out successful")
          }).catch((error) => {
            // An error happened.
          });
       
    } catch (error) {
        res.status(400).send(error.message);
    }
}



const signIn =  (req, res, next) => {
    try {
        
            const {email,password}= req.body;
            console.log(email,password)
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
              //  console.log(user)
                firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
                    const id=user.uid
                   

                    let newUser={token:idToken,id:id}
                   getUser(req, res, newUser)
                    
                  }).catch(function(error) {
                    // Handle error
                  });
            })
            .catch((error) => {
                res.status(400).send(error.message);
            });


    } catch (error) {
        res.status(400).send(error.message);
    }
}

function mapUser(user) {
    const customClaims = (user.customClaims || { role: '' }) 
    const role = customClaims.role ? customClaims.role : ''
    return {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        role,
        lastSignInTime: user.metadata.lastSignInTime,
        creationTime: user.metadata.creationTime
    }
}

const getUser = async (req, res, user) => {
    try {
       
        const newuser = await firestore.collection('users').doc(user.id);
        const data = await newuser.get();
        if(!data.exists) {
            res.status(404).send('user with the given ID not found');
        }else {

            res.send({ user:{...data.data(),token:user.token}});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    signIn,
    signUp,
    generateToken,signOut

}