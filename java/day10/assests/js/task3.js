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