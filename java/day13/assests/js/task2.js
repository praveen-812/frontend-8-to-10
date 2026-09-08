const head = document.getElementById("task2")
const button = document.getElementById("btn")
button.addEventListener("click",()=>{
    head.textContent = "this is change"
    head.classList.add("dark")
})
