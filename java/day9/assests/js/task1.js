//task 1 function return//
function add(a,b){
    return a+b;
}
console.log(add(20,30));
// task2 function for loop//
function even(n){
    for(let c=1;c<=n;c++){
        if(c%2==0){
            console.log(c)
        }
    }
}
even(10)
// task 3 use arrow function factorial//
const factorial=(n)=>{
    let count=1;
    for(let d=1;d<=n;d++){
        count=count*d
    }
    return count;
}
console.log(factorial(5))
// task4 using var let const fucntional scope block scope global scope//
//global scope//
var globalVar="this is global var"
let globalLet="this is global let"
const globalConst="this is global const"
console.log(globalVar);
console.log(globalLet);
console.log(globalConst);
//function scope only work function inside can access another block but only inside the function//
function main(){
    var functionVar="this is function var"
    let functionLet="this is function Let"
    const functionConst="this is function Const"
    console.log(functionVar)
    console.log(functionLet)
    console.log(functionConst)
}
main()
//block scope only work block inside cannot access another block//
function block(){
    //  if(){
    //     //cannot acces this block use only one block that time only works its
    //  }
   {
        var blockVar="this is block var"
        let blockLet="this is block let"
        let blockConst="this is block Const"
        console.log(blockVar);
        console.log(blockLet);
        console.log(blockConst);
        
        
    }
}
block()
// task5 hoisted method use var let const and function//
// function hoisted can be run because the entire declartion place to move the top of declare value//
type()
function type(){
    console.log("hello")
}
//var this is hoisted so the value send undefined//
console.log(c)
var c=20 
//let this is gives error temporal dead zone TDZ//
console.log(e);
let e=20;
//const this is gives same error//
console.log(f);
const f=30