const express = require("express")
const noteModel = require("./models/note.model")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(cors())
app.use(express.json())

// serve frontend
app.use(express.static(path.join(__dirname, "../public")))

/**
 * POST /api/notes
 */
app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body

  if (!title || !description) {
    return res.status(400).json({ message: "title and description required" })
  }

  const note = await noteModel.create({ title, description })

  res.status(201).json({
    message: "note created successfully",
    note
  })
})

/**
 * GET /api/notes
 */
app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find()

  res.status(200).json({
    message: "Notes fetched successfully",
    notes
  })
})

/**
 * DELETE /api/notes/:id
 */
app.delete("/api/notes/:id", async (req, res) => {
  await noteModel.findByIdAndDelete(req.params.id)

  res.status(200).json({
    message: "note deleted successfully"
  })
})

/**
 * PATCH /api/notes/:id
 */
app.patch("/api/notes/:id", async (req, res) => {
  const note = await noteModel.findByIdAndUpdate(
    req.params.id,
    { description: req.body.description },
    { new: true }
  )

  res.status(200).json({
    message: "note description updated successfully",
    note
  })
})

// frontend fallback
app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"))
})

module.exports = app