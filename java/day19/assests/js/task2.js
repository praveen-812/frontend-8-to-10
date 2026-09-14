const showingData = document.querySelector("#showing")

document.addEventListener("DOMContentLoaded",()=>{
     showingData.innerHTML=""

     const getData = async ()=>{
        const getApi  = await fetch("https://dummyjson.com/products")
     const getDataChange = await getApi.json()
     console.log(getDataChange.products)
     const result=getDataChange.products

     result.forEach((e)=>{
        showingData.innerHTML +=
        `  <p>${e.id}</p>
        <p>${e.title}</p>
    <p>${e.price}</p>`
     })


    }
getData()



})