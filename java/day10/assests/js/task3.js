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
