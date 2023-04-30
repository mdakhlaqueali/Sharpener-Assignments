console.log('Person1:shows ticket');

console.log('Person2:shows ticket');



const preMovie = async function () {

const promiseWifeBringingTicks = new Promise(function (resolve, reject) {

setTimeout(function () {

resolve('ticket');

}, 3000)

});



const getPopcorn = new Promise(function (resolve, reject) {

resolve(`Popcorn`);

});

const addButter = new Promise(function (resolve, reject) {

resolve(`Butter`);

});



const getColdDrinks = new Promise(function (resolve, reject) {

resolve(`Cold Drinks`)

})



let ticket = await promiseWifeBringingTicks;



console.log(`Wife:I have the ${ticket}`);

console.log('Husband:we should go in');

console.log('Wife: No! I am hungry');



let popcorn = await getPopcorn;



console.log(`Husband:I got some ${popcorn}`);

console.log('Husband: we should go in');

console.log('Wife: I need butter on my popcorn');



let butter = await addButter;



console.log(`Husband: I got some ${butter} on popcorn`);

console.log(`Husband:Anything else darling`);

console.log(`Wife:Lets go we are getting late`);

console.log(`Husband:Thank you for the reminder`);



let coldDrinks = await getColdDrinks;



console.log("Wife:I need cold drinks");

console.log("Husband:I got some cold drink");



return ticket;

}



preMovie().then(function (msg) {

console.log(`Person3:shows ${msg}`);

});



console.log('Person4:shows ticket');

console.log('Person5:shows ticket');