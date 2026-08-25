//print seperate line use arrary//
let fruits=["orange","grapes","mango","banna"];
for (let a=0;a<fruits.length;a++){
    console.log (fruits[a]);
}

//print individual in object//
 let student={name:"praveen",age:26,course:"javascript",mark:95};

    console.log("student name:",student.name)
    console.log("student age:",student.age)
    console.log("student course:" ,student.course)
    console.log("student mark", student["mark"])

// use array and object//

let data=[
    {name:"santhosh",age:21 ,course:"java", mark:85},
    {name:"karthi",age:22 ,course:"python", mark:80},
    {name:"subash",age:25 ,course:"react", mark:75},
    {name:"suva",age:22 ,course:"dotnet", mark:95}
]
for(let c=0;c<data.length;c++){
    console.log("student name:",data[c].name,"student mark:",data[c].mark)
}
//find a student//
let targetName="santhosh"
let targetMark=85

let dataFind=[
    {name:"santhosh",age:21 ,course:"java", mark:85},
    {name:"karthi",age:22 ,course:"python", mark:80},
    {name:"subash",age:25 ,course:"react", mark:75},
    {name:"suva",age:22 ,course:"dotnet", mark:95}
]
for(let d=0;d<dataFind.length;d++){
    if(targetName==dataFind[d].name && targetMark==dataFind[d].mark){

    console.log("student name:",dataFind[d].name,"student mark:",dataFind[d].mark)
}
}

//greater than 40000/

let employee=[
    {name:"praveen",age:26,work:"technical",salary:20000},
     {name:"mariya",age:25,work:"coworker",salary:50000},
      {name:"suva",age:36,work:"software",salary:28000},
       {name:"pradeepa",age:46,work:"mechanical",salary:45000}
]
for(let e=0;e<employee.length;e++){
    if(employee[e].salary>40000){
        console.log(employee[e].salary)
    }
}