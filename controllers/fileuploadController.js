const config = require("../config");
const saltedMd5 = require("salted-md5");
const path = require("path");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { storage, firebase } = require("../db");
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./files");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

let newupload = upload.single("file");
const fileUpload = async (req, res, next) => {
  try {
    newupload(req, res, async function (err) {
      if (err) {
        console.log("There was an error uploading the image.", err);
      }
      const name = saltedMd5(req.file.originalname, "SUPER-S@LT!");
      console.log("name", name);
      const fileName = name + path.extname(req.file.originalname);
      //   await storage.file(fileName).createWriteStream().end(req.file.buffer);
      //   res.send("done");
      firebase
        .storage()
        .ref(`/images/${fileName}`)
        .put(req.file.buffer)
        .then((snapshot) => {
          console.log("Uploaded a blob or file!");
          res.send("done");
        });
    });

    // }
    //   if (err instanceof multer.MulterError) {
    //     console.log(err);
    //     return res.status(500).json(err);
    //   } else if (err) {
    //     console.log(err);
    //     return res.status(500).json(err);
    //   }
    //   console.log(req.file);
    //   return res.status(200).send(req.name);
    // });

    // storage
    //   .ref(`/images/${req.name}`)
    //   .put(req.file)
    //   .then((snapshot) => {
    //     console.log("Uploaded a blob or file!");
    //   });

    // Create the file metadata
    // var metadata = {
    //   contentType: "image/jpeg",
    // };
    // var storageRef = firebase.storage().ref();
    // // Upload file and metadata to the object 'images/mountains.jpg'
    // var uploadTask = storageRef
    //   .child("images/" + req.name)
    //   .put(req.file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    // uploadTask.on(
    //   firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    //   (snapshot) => {
    //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log("Upload is " + progress + "% done");
    //     switch (snapshot.state) {
    //       case firebase.storage.TaskState.PAUSED: // or 'paused'
    //         console.log("Upload is paused");
    //         break;
    //       case firebase.storage.TaskState.RUNNING: // or 'running'
    //         console.log("Upload is running");
    //         break;
    //     }
    //   },
    //   (error) => {
    //     // A full list of error codes is available at
    //     // https://firebase.google.com/docs/storage/web/handle-errors
    //     switch (error.code) {
    //       case "storage/unauthorized":
    //         // User doesn't have permission to access the object
    //         break;
    //       case "storage/canceled":
    //         // User canceled the upload
    //         break;

    //       // ...

    //       case "storage/unknown":
    //         // Unknown error occurred, inspect error.serverResponse
    //         break;
    //     }
    //   },
    //   () => {
    //     // Upload completed successfully, now we can get the download URL
    //     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
    //       console.log("File available at", downloadURL);
    //     });
    //   }
    // );
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  fileUpload,
};
