const { Comment } = require("../models");
const { createAudioFile } = require("../createSpeech");

module.exports = {
  async index (req, res) {
    const comments = await Comment.findAll({
      order: [
        ["id", "ASC"],
      ]
    });
    return res.json(comments);
  },

  async create(req, res) {
    const { comment } = req.body;

    const [createdComment, created] = await Comment.findOrCreate({
      where: {
        text: comment
      }
    });

    if (!created) {
      return res.status(400).json({ message: "Comment Already Exists" });
    }

    return res.status(201).json(createdComment);
  },

  async createAudioFile(req, res) {
    const { id } = req.params;

    const comment = await Comment.findByPk(id);

    if(!comment) {
      return res.status(404).json({ error: "Not Found" });
    }

    const { id: commentId, text } = comment;

    const fileUrl = await createAudioFile(text, id);
    
    if (!fileUrl) {
      return res.status(400).json({ error: "Something Went Wrong..." });
    }

    const fileServed = `http://localhost:3333/temp/comment-${commentId}.mp3`;

    return res.json({ comment, fileServed });
  }
}