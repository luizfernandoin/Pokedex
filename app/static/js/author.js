document.addEventListener("DOMContentLoaded", () => {
    const authors = document.querySelectorAll(".container-author");
    const authorJose = document.querySelector("#author-jose");
    const authorLuiz = document.querySelector("#author-luiz");

    authors.forEach((author) => {
        author.addEventListener("mouseover", () => {
            author.style.cursor = "pointer";
        });    
    });
    
    authorJose.addEventListener("click", () => {
        window.open("https://jandersonarruda.github.io/", "_blank");
    });

    authorLuiz.addEventListener("click", () => {
        window.open("https://luizfernandoin.github.io", "_blank");
    });
});
