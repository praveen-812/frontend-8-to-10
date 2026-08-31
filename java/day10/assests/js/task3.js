class student{
    constructor (name,age,mark){
        this.name=name;
        this.age=age;
        this.mark=mark;
    }

    displayDetails(){
        console.log(`this is my ${this.name}`);
        console.log(`this is age ${this.age}`);
        console.log(`this is my mark ${this.mark}`)
    }
}
    const student1= new student("ravi",22,95);
    const student2=new student("praveen",26,90);


student1.displayDetails();
student2.displayDetails();

// use promise and await asyn//
const dataPromise = new Promise((resolve) =>{
    setTimeout(() =>{
        resolve("data loaded")

    },2000);
});
  dataPromise.then((data) =>{
    console.log(data)
  });
  async function loaded(){
    const data = await dataPromise;
    console.log(data)
  }
loaded();

// use chaining nullish coalescing??
const user={
    name:"praveen"
};
const city=user?.city?? "no city"
console.log(city)
// use filter and find and includes and map//
const number=[10,25,30,45,50,65];
const filterValue=number.filter(n=>n > 30);
const findValue= number.find(n=>n > 40);
const includesValue=number.includes(50);
const mapValue=number.map(n=>n*2);
console.log(filterValue);
console.log(findValue);
console.log(includesValue);
console.log(mapValue);

//task10 change the code for es6+//
const name="ravi";
const age=25;

const studentBoy={
    name,
    age
}
const greet= name=>`hello ${name}`;
console.log(greet(name))
