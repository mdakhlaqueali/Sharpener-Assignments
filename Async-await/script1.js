console.log('person1:shows ticket');

console.log('person2:shows ticket');

const promiseWifeBringingTicks = new Promise(function(resolve, reject){

setTimeout(function(){

resolve('ticket');

// reject('Promise rejected')

}, 3000)

});

// promiseWifeBringingTicks

// .then((t) => {

// console.log(`person3: shows ${t}`);

// });



const getPopcorn = promiseWifeBringingTicks.then(function (t) {

console.log('Wife:I have the ticket');

console.log('Husband:we should go in');

console.log('Wife: no I am hungry');

return new Promise(function (resolve, reject) {

resolve(`${t} Popcorn`)

})

});

const getButter = getPopcorn.then(function(t) {

console.log('Husband:I got some popcorn');

console.log('Husband: we should go in');

console.log('Wife: I need butter on my popcorn');

return new Promise(function (resolve, reject) {

resolve(`${t} Butter`)

})

});

const getColdDrinks = getButter.then(function(t){

console.log("Wife:I need cold drinks");

console.log("Husband:I got some cold drink");

return new Promise(function (resolve, reject) {

resolve(`${t} Cold Drinks`)

})

})

getColdDrinks.then(function(t){

console.log(t);

})

console.log('person4:shows ticket');

console.log('person5:shows ticket');