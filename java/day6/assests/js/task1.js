//numbers print in single line//
let singleLine=""
for (let a=1;a<=20;a++){
    singleLine=singleLine+a+" "
}
console.log(singleLine)

//even number print single line//
let  evenNumber=""
for (let b=1;b<=50;b++){
    if(b%2==0){

        evenNumber=evenNumber+b+" "
    }
}
console. log(evenNumber)

//odd number print  in single line//
let  oddNumber="";
for(let c=1;c<=50;c++){
    if(c%2==1){
        oddNumber=oddNumber+c+" "
    }
}
console.log(oddNumber)

//sum first 20 number//
let count=0
for(let  d=1;d<=20;d++){
    count=count+d
}
console. log(count)

// even number  sum  first 50//
let  evenSum=0
for(let e=1;e<=50;e++){
    if(e%2==0){
        evenSum=evenSum+e;
    }
}
console. log(evenSum)

//how many even numbers are there//

let evenCount=0
for(let f=1;f<=100;f++){
    if(f%2==0){
        evenCount++
    }
}
console.log(evenCount)

// 73  output//
for (let  g=1;g<=100;g++){
    if(g==73){
       console.log(g)
    }
}

// reverse using  1..5//
let reverse=""
for(let h=5;h>=1;h--){
    reverse=reverse+h+" "
}
console.log(reverse)

//javascript reverse//

let stringReverse="javascript";
let print="";
for(let i=0;i<stringReverse.length;i++){
    print=stringReverse[i]+print;
}
console.log(print);

// find s use javascript//

let condition="javascript"
let target="s"
for(let j=0;j<condition.length;j++){
    if(condition[j]===target){
        console.log(condition[j])
        
    }
}