

const showing=document.querySelector("#showingData")

document.addEventListener("DOMContentLoaded",()=>{
   showing.innerHTML=""
      const getData= async () => {
             const getFromApi= await fetch("https://dummyjson.com/users")
            

             const dataChange= await  getFromApi.json()
             console.log ( dataChange.users)
                const result =  dataChange.users


                
    result.forEach((e)=>{
        showing.innerHTML +=
        `<tr>

        <td>${e.id}</td>   
         <td>${e.firstName}</td>            
          <td>${e.lastName}</td> 
          <td><img src=${e.image}></td>
         </tr>`
              
    })

      } 

       getData()


 
  
})