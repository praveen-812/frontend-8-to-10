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
// question 7 cfibonaccis series//
let start=7;
let c=0;
let d=1;
for (let e=1;e<=7;e++){
    console.log(c)-

    let next=c+d;
    c=d;
    d=next;
}
//question 8 use sum 1234 > 10 1234 is whole value but write 1,2,3,4 add 10
// important modules to use last for Ex. 123.4 the after point value only considered to take the code //
// next math.floor to use 1234/10 123.4 this one to take 123
let items =1234;
let add=0;
while (items>0){
    let modules=items%10;
    add=add+modules;
    items=Math.floor(items/10)
}
console.log(add)

// //question 9 count number//
// let countValue=12345;
// let count=0;
// while(countValue>0){
//     num=countValue%10;
//     count++
// }
// console.log(count)

//question 10 javascript reverse//
let words="javascript"
let reversing="";
for(let w=words.length-1;w>=0;w--){
    reversing=reversing + words[w]; 
}
console.log(reversing)