// print single line//
let numbers=[1,2,3,4,5,6];
for (let a=0;a<numbers.length;a++){
    console.log(numbers.join(" "));
}
// array print
let names=["praveen","santhosh","gopi","suva"];
for (let b=0;b<names.length;b++){
    console.log(names[b]);
}
// find even number//
let  nNumbers=[1,2,3,4,5,6,7,8,9,10];
for (let c=0;c< nNumbers.length;c++){
    if(nNumbers[c]%2==0){
        console.log(nNumbers[c]);
    }
}
// use array of object and greater//
let students=[
    {name:"praveen",
     mark:80   
    },
    {name:"santhosh",mark:89},
    {name:"akash",mark:61},
    {name:"gopi",mark:78}
];
for(let d=0;d<students.length;d++){
    if(students[d].mark>80){
        console.log(students[d].mark)
    }
}
// use arrow function and return//
const sum=(e,f)=>{
    return e+f;
}
console.log(sum(10,20))  
// use arrow function work student name and mark//

const student=(name,age)=>{
    return `my name is{name}my age is{age}`;
}
console.log(student("praveen",26))