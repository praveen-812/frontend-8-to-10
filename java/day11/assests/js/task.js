console.log("<==task1==>")
const calculate=(a,b,callback)=>{
    const result=a+b;
    callback(result)
}
const displaycall = (data)=>{
    console.log(data)
}
calculate(10,20,displaycall)

console.log("<==task3==>")

let a=[10,20,30,40,50]
a.push(60)
console.log(a)
a.pop()
console.log(a)

console.log("<==task4==")

let c=[10,20,30,40,50]
c.unshift(20)
console.log(c)
c.shift()
console.log(c)

console.log("<==task5==>")

let d=[10,20,30,40,50]
let num =""
for(let e=0;e<=d.length-1;e++){
    num+=d[e]+ " "
}
num+=60
console.log(num)

console.log("<==task 6==>")


const fruits = ["Apple", "Mango", "Orange"];
const vegetables = ["Carrot", "Potato"];
let result=fruits.concat(vegetables)
console.log(result)