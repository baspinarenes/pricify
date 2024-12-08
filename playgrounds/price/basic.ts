import { Price } from "../../lib";

const price = new Price(1000.5);

console.log("Price:", price.amount);
console.log("Added $20:", price.increase(20).amount);
console.log("Removed $40:", price.decrease(40).amount);
console.log("Discounted 20%:", price.discount(20).amount);
console.log("Round to integer:", price.round(0, "nearest").amount);
console.log("Equals to $784:", price.equal(784));
