const commentsList = document.querySelector(".comments-list");
const loadingDiv = document.querySelector(".loading");

const xhttp = new XMLHttpRequest();

function createCommentsList(comments) {
  comments.forEach((comment, idx) => {
    const listItem = document.createElement("li");
    const paragraph = document.createElement("p");
    const listenButton = document.createElement("button");
    const audioTag = document.createElement("audio");
    const sourceTag = document.createElement("source");

    paragraph.innerHTML = comment.text;

    listenButton.innerHTML = "Ouvir";
    listenButton.classList.add("btn", "listen");
    
    listenButton.addEventListener("click", (e) => {
      loadingDiv.style.visibility = "visible";
      xhttp.open("GET", `http://localhost:3333/comments/${comment.id}`);
      
      xhttp.send();

      xhttp.onreadystatechange = function() {
        if (this.status === 200 && this.readyState === 4) {

          const { fileServed } = JSON.parse(this.responseText);

          if (!fileServed) {
            return alert("Something went wrong");
          }

          sourceTag.setAttribute("src", fileServed);
          sourceTag.setAttribute("type", "audio/mpeg");

          audioTag.appendChild(sourceTag);
          listItem.appendChild(audioTag);

          loadingDiv.style.visibility = "hidden";
          audioTag.play();
        }
      }
    });

    listItem.appendChild(paragraph);
    listItem.appendChild(listenButton);

    commentsList.appendChild(listItem);
  });
}

xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    const comments = JSON.parse(this.response);
    createCommentsList(comments);
  }
}

xhttp.open("GET", "http://localhost:3333/comments");
xhttp.send();