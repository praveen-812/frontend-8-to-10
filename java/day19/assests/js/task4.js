const dataContent=document.querySelector("#content")

document.addEventListener("DOMContentLoaded",()=>{

  const getData =async ()=>{
   dataContent.innerHTML=""

   const dataApi= await fetch(" https://dummyjson.com/posts")
   const change= await  dataApi.json()
    console.log(change.posts)
    const result = change.posts

    result.forEach((e)=>{
        dataContent.innerHTML +=
        `<tr>
           <td>${e.id}</td>
             <td>${e.title}</td>
               <td>${e.body}</td>
        
        </tr>`
    })

  }
getData()

})