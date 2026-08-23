// 1 print 1 to 10//
for( let a=1;a<=10;a++){
    console.log(a)
}
// 2 print 10 to 1//
for (let b=10;b>=1;b--){
    console. log(b)
}
// 3 print even no 1  to  20//
for (let  c=1;c<=20;c++){
    if(c%2==0)
    console. log(c)
}
// 4 print odd  no  1  to  20//
for (let d=1;d<=20;d++){
    if(d%2==1)
    console.log(d)
}
// 5 print 1  to  50//
for  (let e=1; e<=50;e++){
    console.log(e)
}
// 6 print50 to 1//
for (let f=50;f>=1;f--){
    console. log(f)
}
// 7 print 10 natural numbers //
 output="";
for(let g=1; g<=10;g++){
    output +=g;
    if(g<10){
        output +=",";
    }
}
console.log(output);
//8 print 5*//
 number="";
 for (let i=1;i<=10;i++){
    number +=i*5;
    if(i<10){
        number +=",";
    }
 }
console.log(number)
//9 print 3 *//
table=""
for(let j=1;j<=10;j++){
    table +=j*3;
    if(j<10){
        table +=","
    }
}
console.log(table)

//10 print john//
// for ( k=1;k<=10;k++){

//     console.log( "john")  
// }doubt

//11 print java script use , //
java="javascript";
print=""
word="javascript";
for (let l of word){
    print +=l+","
}
console.log(print)

//12 my  name  print 5times//


add="";
for(let m=1;m<=5;m++){
    add +="praveen";
    if(m<5){
        add +=","
    }
}
console.log(add);

//13 sum of no 1 to 10//
sum=0
for (let n=1;n<=10;n++){
    sum +=n   
}
 console.log(sum)

 //14 sum same 1 to 100//

 sum=0;
 for(let o=1;o<=100;o++){
    sum +=o;    
 }
 console.log(sum)

 //15 even number sum 1 to 50//

sumEven=0;
for (let p=1;p<=50;p++){
  if(p%2==0){
    sumEven +=p
  }
  
}
console.log(sumEven)

//16 sum odd 1 to 50//

sumOdd=0;
for (let q=1;q<50;q++){
    if(q%2==1){
        sumOdd +=q;
    }
}
console.log(sumOdd)

// 17 table 5//
number=5
for (let r=1;r<=10;r++){
    console.log( number+"x"+r+"="+(number*r))
}

//18 multiply user//

let num="";
for (let s=1;s<=10;s++){
    console.log(number+"x"+s+"="+num*s)
}

// 19 factorial of 5//
fact=1;
for (let t=1;t<=5;t++){
    fact =fact*t
}
console.log(fact)
//20 fact of 6//
factorial=1;
nu=6
for (let u=1;u<=nu;u++){
    factorial=factorial*u;
}
console.log(factorial)

// 21 count number 1 to 100//
count=0;
for (let v=1;v<=100;v++){
    if(v%5===0){
      count++
    }
}
  console.log(count)

  // 22 divisible by 3 and 5
div=0
  for (let x=1;x<=100;x++){
    if(x%3===0 && x%5===0){
       div++
    }
  }
 console.log(div)

 //23 find the largest number//

 numbers=[10,20,30,40,50,60,];
 large=0;
 for (let y of numbers){
       if(y>large){
         large=y;
       }
 }
  console.log(large)

  // 24 find smallest number// //doubt for can work greater cant work less
number=[10,20,30,40,80,90,];
small=number[0];
for(let z of number){
    if(z<small){
        small=z
    }
}
console.log(small)

// 25 print in array
numbering=[10,20,30,40,50];
for(let el of numbering){
    console.log(el)
}
// 26 print in sum of array//

numbered=[10,20,30,40,50,60]
su=0
for (let sums of numbered){
    su = su +sums; 
}
console.log(su)

// 27 average//
numberes=[10,20,30,40,50,]
average=0
for (let av of numberes){
    average=average+av;

}
average=average/5
console.log(average)

// 28  count the even numbers in array//

totalNo=[10,21,22,55,47,16]
no=0
for (let n of totalNo){
    if( n%2==0){
        no++
    }
}
console.log(no)

// 29  print odd number count//

totals=[10,21,44,75,84,69]
co=0
for ( let to of totals){
    if( to%2==1){
        co++
    }
}
console.log(co)

// 30 print numbers greater than 10 from array//
naturalNum=[10,20,30,10,55,5,4]
for (let abc of naturalNum){
    if(abc>10){
        console.log(abc)
    }
}
//  31 print count how many times

word="banana"
add=0
for (let wo of word){
    if( wo==="a"){
        add++
    }
}
console.log(add)

// 32 print the vowels in a stirng

words= "javascript"
counts=0
for (let letters  of words){
    if("aeiou".includes(letters)){
        counts++
    }
}
console.log(counts)

//33 count the  constant//

wording="javascript"
counting=0
for (let wor of wording){
    if(!"aeiou".includes(wor)){
        counting++
    }
}
console.log(counting)

//34 reverse a string useing a loop            
name="praveen"
reverse=""
for(let na of name){
    reverse=na+reverse
}
console.log(reverse)
//35 count string without using .length//

wordCount="javascript"
tCount=0
for (let wd of wordCount){
    tCount++
}
console.log(tCount)

//36 find the largest number array// doubt for same sum how to get highest value and lowest value
samesum=[10,50,60,70,88];
largest=0;
for (let same of samesum){
    if(same>largest){
        largest=same;
    }
}
console.log(largest)
//37 check whether a number is prime

pnumber="7";
for (let prime of pnumber){
    if(prime%2==0){
        console.log("prime no")
    }else{
        console.log("non prime no")
    }
}

//38 print all prime numbers 1 to 100// doubt for prime number

// for (let i=1;i<=100;i++){
//     if ()
// }

// 39 find all factors of a numbers//
