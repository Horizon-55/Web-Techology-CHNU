const wrapper = document.querySelector(".wrapper");
const singupHeader = document.querySelector(".singup header");
const LoginHeader = document.querySelector(".login header");

LoginHeader.addEventListener("click", () => {
    wrapper.classList.add("active");
});
singupHeader.addEventListener("click", () => {
    wrapper.classList.remove("active");
});
