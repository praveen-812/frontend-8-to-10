const showing = document.querySelector("#show")

document. addEventListener("DOMContentLoaded", ()=>{

    const  getData =async ()=>{
        showing.innerHTML=""
        const dataApi= await fetch("https://dummyjson.com/quotes")
        const dataChange= await dataApi.json()
        console. log(dataChange.quotes)
        const result = dataChange.quotes

        result.forEach((e)=>{
            showing.innerHTML +=
            `<tr>
              <td>${e.id}</td>
              <td>${e.quote}</td>
              
            
            </tr>`
        })

    }

    getData()
})