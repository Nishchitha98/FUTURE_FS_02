const express = require("express");
const router = express.Router();

const {
  createLead,
  getLeads,
  updateLeadStatus,
  addNote,
  deleteLead,
  deleteNote,
} = require("../controllers/leadController");

const auth = require("../middleware/authMiddleware");

// 🔐 ALL protected
router.get("/", auth, getLeads);
router.post("/", auth, createLead);
router.put("/:id", auth, updateLeadStatus);
router.post("/:id/notes", auth, addNote);
router.delete("/:id/notes/:noteId", auth, deleteNote);
router.delete("/:id", auth, deleteLead);

module.exports = router;