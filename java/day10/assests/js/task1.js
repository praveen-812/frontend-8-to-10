//var use function scope var is global function but you declared the value insdie function only inside 
//globally run apart from that outer can you use cannot run//
function test() {
    var username = "Praveen";

    console.log(username);
}

test();

//console.log(username); // Error//

//let is a block scope //

if(true){
    let userFunction=10;
    console.log(userFunction);//work//
}
//console.log(userFuncion)error//

// var same//
if(true){
    const age=25;
    console.log(age);
}
//console.log(age)error//

//redeclaration only work on var cannot work on let and var //
//var use //
var names="praveen";
var names="kumar";
console.log(names);
//let us//
let sister="sona";
// let sister="pradeepa";
console.log(sister);//work error tdz//
//const use//
const brother="sanjeev";
// const brother="raju";
console.log(brother);//same error tdz//
// reassign var and let only work const cannot work because this is const value//
//var use//
var fruit="apple";
fruit="grappes"
console.log(fruit);
//let use//
let carParts="engine";
carParts="tyre"
console.log(carParts);
// use const cannot be work//
const peoples=10;
// peoples=20;
console.log(peoples)

//hoistic method use var let const hoistic before declaration of the variable//
//var use //
console.log(a);
var a="maha"
//let//
// console.log(b);
// let b="ambiga";
// // const//
// console.log(c);
// cosnt c="sibi"
