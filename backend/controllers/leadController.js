const Lead = require("../models/Lead");

// CREATE Lead
exports.createLead = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET All Leads
exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE Lead Status
exports.updateLeadStatus = async (req, res) => {
  try {
    const lead = await Lead.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { status: req.body.status },
      { new: true }
    );
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE LEAD
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE NOTE
exports.deleteNote = async (req, res) => {
  try {
    const lead = await Lead.findOne({ _id: req.params.id, user: req.user.id });
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    lead.notes = lead.notes.filter(note => note._id.toString() !== req.params.noteId);
    await lead.save();
    res.json(lead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ADD NOTE
exports.addNote = async (req, res) => {
  try {
    const lead = await Lead.findOne({ _id: req.params.id, user: req.user.id });

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    lead.notes.push({ text: req.body.text });

    await lead.save();

    res.json(lead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};