//task2.1 use implict
const add=(a,b)=>a+b;
console.log(add(10,20));

//task2.2 use implict//
const multiply=(number) => number*number;
console.log(multiply(10,20))
//task3//
//use destructing array//
const value=[10,20,30];
const [a,b,c]=value;
console.log(a);
console.log(b);
console.log(c);

//use object function//
const student={
    name:"ravi",
    age:25,
    course:"javaScript"
}
const {name,age,course}=student;
console.log(name);
console.log(age);
console.log(course);

//task 4 use rest //
function Add(...numbers){
    console.log(numbers);
}
Add(10,20,30)
//spread use//
const spread=[10,20,30];
const newnumber=[...spread,40,50];
console.log(newnumber)

//task5 use template literals//
function newStudent(name,course,city="chennai"){
    return `my name is ${name} I am learning ${course} I live in ${city}`
}
console.log(newStudent("praveen","javascript"));

