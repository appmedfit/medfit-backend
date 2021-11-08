"use strict";

const { firebase, admin } = require("../db");
const {
  sendBookingConfirmationMail,
  sendPrescriptionMail,
} = require("./emailController");

const firestore = firebase.firestore();

const addAvailableSlots = async (req, res, next) => {
  try {
    const data = req.body;
    var batch = firestore.batch();

    data.forEach((doc) => {
      // console.log(doc);
      // console.log(doc?.id && doc?.id?.length > 0);
      if (doc?.id && doc?.id?.length > 0) {
        // console.log("hi in if");
        batch.set(firestore.collection("AvailableSlots").doc(doc.id), doc);
      } else {
        // console.log("hi in else");
        batch.set(firestore.collection("AvailableSlots").doc(), doc);
      }
    });
    batch.commit().then(function () {
      res.send("Record saved successfuly");
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllAvailableSlots = async (req, res, next) => {
  try {
    const AvailableSlots = await firestore.collection("AvailableSlots");
    const data = await AvailableSlots.get();
    const AvailableSlotsArray = [];
    if (data.empty) {
      res.status(404).send("No AvailableSlots record found");
    } else {
      data.forEach((doc) => {
        //   const AvailableSlots = {
        //       doc.id,
        //       doc.data().firstName,
        //       doc.data().lastName,
        //       doc.data().fatherName,
        //       doc.data().class,
        //       doc.data().age
        //   }
        AvailableSlotsArray.push(AvailableSlots);
      });
      res.send(AvailableSlotsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAvailableSlots = async (req, res, next) => {
  try {
    const AvailableSlots = await firestore.collection("AvailableSlots");
    let query = AvailableSlots;
    let reqBody = req.body ? req.body : {};
    let keys = Object.keys(reqBody);
    if (keys.length > 0) {
      keys.forEach((key) => {
        // console.log(key, "==", reqBody[key]);
        query = query.where(key, "==", reqBody[key]);
      });
    }

    query.get().then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.send(data);
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateAvailableSlots = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    firestore
      .collection("AvailableSlots")
      .doc(id)
      .set(data)
      .then(() => {
        res.send("successfully updated");
      })
      .catch((error) => {
        res.status(400).send(error.message);
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addBooking = async (req, res, next) => {
  try {
    const data = req.body;
    // console.log(data);
    // updateAvailableSlots;
    //

    firestore
      .collection("AvailableSlots")
      .doc(data.slot.id)
      .set(data.slot)
      .then(() => {
        let slot = data.slot;
        (slot.slotId = slot.id), delete slot.id;
        let bookingData = {
          ...slot,
          patientId: data.patientId,
          consultancyFee: data.consultancyFee,
          prescribtion: data.prescribtion,
          patientName: data.patientName,
          patientEmail: data.patientEmail,
          doctorName: data.doctorName,

          status: "booked",
        };
        firestore
          .collection("bookings")
          .doc()
          .set(bookingData)
          .then(() => {
            sendBookingConfirmationMail(
              {
                patientName: data.patientName,
                patientEmail: data.patientEmail,
                doctorName: data.doctorName,
                fullDate: slot.fullDate,
              },
              res,
              next
            );
          })
          .catch((error) => {
            res.status(400).send(error.message);
          });
      })
      .catch((error) => {
        res.status(400).send(error.message);
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getBooking = async (req, res, next) => {
  try {
    const AvailableSlots = await firestore.collection("bookings");
    let query = AvailableSlots;
    let reqBody = req.body ? req.body : {};
    let keys = Object.keys(reqBody);
    if (keys.length > 0) {
      keys.forEach((key) => {
        // console.log(key, "==", reqBody[key]);
        query = query.where(key, "==", reqBody[key]);
      });
    }

    query.get().then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.send(data);
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const updateBooking = async (req, res, next) => {
  try {
    const id = req.body.id;
    const data = req.body;
    console.log("kkk");
    firestore
      .collection("bookings")
      .doc(id)
      .set(data)
      .then(() => {
        console.log("hi");
        if (data.prescriptionStatus && data.prescriptionStatus == "completed") {
          sendPrescriptionMail(
            {
              patientName: data.patientName,
              patientEmail: data.patientEmail,
              doctorName: data.doctorName,
              fullDate: slot.fullDate,
            },
            res,
            next
          );
        } else {
          res.send("successfully updated");
        }
      })
      .catch((error) => {
        res.status(400).send(error.message);
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const deleteAvailableSlots = async (req, res, next) => {
  try {
    const id = req.params.id;
    await firestore.collection("AvailableSlots").doc(id).delete();
    res.send("Record deleted successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addAvailableSlots,
  getAllAvailableSlots,
  getAvailableSlots,
  updateAvailableSlots,
  deleteAvailableSlots,
  addBooking,
  getBooking,
  updateBooking,
};
