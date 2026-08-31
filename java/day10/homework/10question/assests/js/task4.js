//question 1 even and odd print//
const value=[1,2,3,4,5,6,7,8,9,10];
const even = value.filter(value=>value%2==0)
const odd = value.filter(value=>value%2===1)
console.log(even)
console.log(odd)

//question 2 
const number=[10,20,50,55,40,90,100];
const largeNumber=number.filter(n=>n >40)
console.log(largeNumber)

//question 3 reverse a numnber//
let numbers=[1,2,3,4,5];
numbers.reverse()
console.log(numbers)
numbers.reverse()
console.log(numbers)

//question 4 use palindrome//
let num=121;
let orginal=num;
let reverse=0;

//question 5 prime number say true or false//

let sum=9;
let prime=true

if( sum<2){
    prime=false
}
for(let i=2;i<sum;i++){
    if(sum%i===0){
        prime=false;
        break;
        
    }
}
if(prime){
    console.log("prime number")
}else{
    console.log("not prime number")
}

// question 6 factorial//

let numb=5;
let fact=1;

for (let a=1;a<=numb;a++){
    fact=fact*a;
}
console.log(fact)
//fibonaccis series//
let start=7;
let c=0;
let d=1;
for (let e=1;e<=7;e++){
    console.log(c)

    let next=c+d;
    c=d;
    d=next;
}