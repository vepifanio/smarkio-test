const { Router } = require("express");
const CommentController = require("./controllers/CommentController");

const commentsRouter = Router();

commentsRouter.get("/", CommentController.index);

commentsRouter.post("/", CommentController.create);

commentsRouter.get("/:id", CommentController.createAudioFile);

module.exports = commentsRouter;