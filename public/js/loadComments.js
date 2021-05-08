const commentFormDiv = document.querySelector(".comment-form");
const createCommentButton = document.querySelector("form .btn");
const commentTextArea = document.querySelector("textarea");


function postComment(e) {
  e.preventDefault();
  
  const commentText = commentTextArea.value.trim();

  if (commentText.length === 0) {
    const errorMessage = document.createElement("span");

    errorMessage.innerHTML = "Empty Comment";

    commentFormDiv.appendChild(errorMessage);
  } else {
    const xhttp = new XMLHttpRequest();

    xhttp.open("POST", "http://localhost:3333/comments");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    const requestBody = JSON.stringify({ comment: commentText });

    xhttp.send(requestBody);

    location.reload();
  }
};

createCommentButton.addEventListener("click", postComment);