const body = document.querySelector("body");
const h1 = document.querySelector("h1");

h1.addEventListener("click", () => {
    const clicked = document.createElement("p");
    clicked.textContent = "clicked";
    body.appendChild(clicked);
});