console.log("<==task1==>")
const value=[10,20,30,40,50];
value.push(60);
value.push(70);
value.push(80);
console.log(value)


console.log("<==task2==>")
const fruits=["apple","grapes","mango","gova","papaya"]
fruits.pop();
fruits.pop()
console.log(fruits);


console.log("<==task3==>")
const city=["banglore","chennai","manamadurai","chidhabaram",]
city.shift()
city.shift()
console.log(city)
console.log("unshift")
city.unshift("banglore")
city.unshift("chennai")
console.log(city)

console.log("<==task4==>")
let students=["gopi","santhosh","pradeep","arun","suva"]

students.forEach(function(name,index){
    console.log((index+1)+"."+name)
})

console.log("<==task5==>")
let num=[10,20,30,40,50]
let result=num.map(function(num){
        return num*2
})
console.log(result)