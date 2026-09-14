const  showing = document.querySelector("#dataShowing")

document.addEventListener("DOMContentLoaded",()=>{

    showing.innerHTML=""


    const getData = async()=>{

    const  dataApi = await fetch("https://dummyjson.com/carts")
    const dataChange = await  dataApi.json()
    console.log(dataChange.carts)
    const result= dataChange.carts

    result.forEach((e)=>{
        showing.innerHTML +=
        `<p>${e.id}</p>
        <p>${e.total}</p>
        <p>${e.title}</p>`
    })
}
getData()

})
