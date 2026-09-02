// let count=50;
// let even="";
// for (let a=1;a<=count;a++){
//     if(a%2==0){
//       even+=a+ " "
//     }
// }
// console.log(even)
// while loop
//  let num=5;
//  let factorial=1
//  let i=1
// while (i<=num){
// factorial=factorial *i
// i++
// }
// console.log(factorial)


// num = int(input("Enter a number: "))
// let a=20
// do{
//     console.log(a)
//     a--
// }while(a>=1)

// let b=20;

// while(b>=1){
// console.log(b)
//    b--
// }
// let word="javacsript"
// let reverse=" "
// for (let a=word.length -1;a>=0;a--){
//     reverse+=word[a] + " ";
// }
// console.log(reverse)

// const numbers = [45, 12, 89, 34, 67, 90, 23];
// let highest =numbers[0];
// for (a=1;a<numbers.length;a++){
//     if(numbers[a]>highest){
//         highest=numbers[a]
//     }
// }
// console.log(highest)
const numbers = [10, 15, 20, 25, 30, 35, 40];
let total=0
for (a=0;a<numbers.length;a++){
    if(numbers[a]%2 ==1){
        console.log(numbers[a])
        total=numbers[a]+total
    }
}
console.log("total:",total)