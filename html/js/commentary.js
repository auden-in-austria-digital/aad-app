var comments = document.getElementById("commentary");
var comment = document.getElementsByClassName("note");
[...comment].forEach((c) => {
  c.addEventListener("click", function () {
    let ref = c.getAttribute("ref").split("#")[1];
    comment_description = document.getElementById(ref);
    if (comments.classList.contains("fade-all")) {
      comments.classList.remove("fade-all");
    }
    if (comment_description.classList.contains("fade-all")) {
      comment_description.classList.remove("fade-all");
    }
    comment_description.scrollIntoView();
    comment_description.style = "border: 2px solid #b59890;";
    setTimeout(() => {
      comment_description.style = "border: none;";
    }, 2000);
  });
});
let buttons = document.getElementsByClassName("btn-commentary");
[...buttons].forEach((b) => {
  b.addEventListener("click", function () {
    let id = b.getAttribute("id").split("-")[0];
    comment_description = document.getElementById(id);
    comment_description.classList.add("fade-all");
  });
});
