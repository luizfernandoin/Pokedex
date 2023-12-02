document.addEventListener("DOMContentLoaded", () => {
    const authorJose = document.querySelector("#author-jose");
    const authorLuiz = document.querySelector("#author-luiz");

    authorJose.addEventListener("click", () => {
        window.open("https://jandersonarruda.github.io/", "_blank");
    });

    authorLuiz.addEventListener("click", () => {
        window.open("https://luizfernandoin.github.io", "_blank");
    });
});
