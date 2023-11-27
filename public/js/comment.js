const newFormHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    const comment = document.querySelector("#comment").value.trim();

    if (comment) {
      console.log(comment);
      const response = await fetch(`/api/blogs/${id}`, {
        method: "POST",
        body: JSON.stringify({ comment }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert("Failed to create comment");
      }
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/comment/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to delete comment");
    }
  }
};

document
  .querySelector(".newCommentForm")
  .addEventListener("submit", newFormHandler);

if (document.querySelector(".commentList"))
  document
    .querySelector(".commentList")
    .addEventListener("click", delButtonHandler);
