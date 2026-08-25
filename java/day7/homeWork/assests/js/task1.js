// 1///
let aNumber=[10,20,30,40];
console.log(aNumber);

// 2//
let bNumber=[10,20,30,40,50,];
console.log(bNumber[0]);
// 3 //
let cfruits=["apple","mango","grapes","gova"];
console.log(cfruits);
// 4 //
let dfruits=["apple","mango","grapes","gova"];
console.log(dfruits[1]);
console.log(dfruits[0])
//5 //
let num=[];
num.push(10);
num.push(20);
num.push(30);
// 6//
let fNumbers=[10,20,30,40,50,];
console.log(fNumbers.length);
//7 //
let gNumbers=[10,20,30,40,50,60];
console.log(gNumbers[gNumbers.length-1]);
//8 //
let hNumbers=[10,20,30,40,50,60];
hNumbers[0]=100;
console.log(hNumbers);
//9//
let iNumbers=[10,20,30,40,50,60];
iNumbers[iNumbers.length-1]=100;
console.log(iNumbers)
//10//
let numberPush=[10,20,30,40,];
numberPush.push(100);
console.log(numberPush);
//11 //
let numPush=[10,20,30,40];
numPush[3]=100;
console.log(numPush)
//12 //
let popNumber=[10,20,30,40];
popNumber.pop();
console.log(popNumber);
//13 //
let shiftNumber=[20,30,40,50,60];
shiftNumber.unshift(10);
console.log(shiftNumber);
// 14 //
let aShift=[10,20,30,40,50,60];
aShift.shift();
console.log(aShift)
//push mean value add in back and pop is last value easer and unshift in front add and shift is remove//

//15 //
let inNumbers=[10,20,30,40,50,60];
console.log(inNumbers.includes(30));
// 16 //
let inNumber=[10,20,30,40,50,60];
console.log(inNumbers.includes(80));

// 17 //
let indexNumber=[10,20,30,40,50,60];
console.log(indexNumber.indexOf(30));
// includes mean say true or false statements and use indexOf use indexvalue//

//18 //
let Fruits=["mango","orange","grapes","gova"];
console.log(Fruits.join(" "));
// important use single line value use join key //

// 20 //
let slicenumbers=[10,20,30,40,50,60];
console.log(slicenumbers.slice(1,4));
//21 //
let spliceNumbers=[10,20,30,40,50,60];
spliceNumbers.splice(2,1);
console.log(spliceNumbers);

// 22 /
let spliceNumber=[10,20,,40,50,60];
spliceNumber.splice(2,1,30);
console.log(spliceNumber);
//23 //
let sortNumber=[20,40,30,50,10];
sortNumber.sort();
console.log(sortNumber);
//24 //
let sortNames=["ganesh","praveen","guru","gopi"];
sortNames.sort();
console.log(sortNames);
// 25 //
let reverseNumber=[10,20,30,40,50,60];
reverseNumber.reverse();
console.log(reverseNumber);
//26//
let a=[10,20,30];
let b=[40,50,60];
let result = a.concat(b);
console.log(result);
//27 //
let joinFruits=["mango","organe","grape"]
console.log(joinFruits.join(" ,"))
// 28 //
let maxNumbers=[50,40,20,60,70];
console.log(Math.max(...maxNumbers));
// 29 //
let maxnew=[50,70,40,20,66,20,40,11];
console.log(Math.max(...maxnew));
// 30 //
let minnew=[50,70,40,20,66,20,40,11];
console.log(Math.min(...minnew));
//31 //
let sumNumbers=[10,20,30];
let sum= sumNumbers[0]+sumNumbers[1]+sumNumbers[2]
console.log(sum);
// 32 //
let avgNumbers=[10,20,30,40];
let avgsum=avgNumbers[0]+avgNumbers[1]+avgNumbers[2]+avgNumbers[3]/4;
console.log(avgsum)
//33 //
let arrNumbers=[10,20,30,40,50,60];
console.log(arrNumbers[4]);
//34 //
let lastNumbers=[10,20,30,40,50,60];
console.log(lastNumbers[lastNumbers.length-2]);
// 35 //
let enNumber=[10,20,30,40,50,60];
let enNumber[2]=100;
console.log(enNumber);