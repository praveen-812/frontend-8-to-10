const heading = document.getElementById("title")
heading.textContent= "This is changing "
const paragraph = document.querySelectorAll(".para")
paragraph.forEach( (paragraph)=>{
    paragraph.textContent="this is js with dom para"
})
