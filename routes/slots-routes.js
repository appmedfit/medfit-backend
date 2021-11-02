const express = require("express");
const {
  addAvailableSlots,
  getAllAvailableSlots,
  getAvailableSlots,
  updateAvailableSlots,
  deleteAvailableSlots,
  addBooking,
  getBooking,
  updateBooking,
} = require("../controllers/slotsController");

const router = express.Router();
router.post("/", addAvailableSlots);
router.get("/", getAllAvailableSlots);
router.post("/getSlots/", getAvailableSlots);
router.put("/:id", updateAvailableSlots);
// router.delete('/:id', deleteStudent);
router.post("/booking/", addBooking);
router.post("/bookingDetails", getBooking);
router.post("/updateBooking", updateBooking);

module.exports = {
  routes: router,
};
