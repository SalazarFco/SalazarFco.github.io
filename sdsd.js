'use strict';
function solve(meal_cost, tip_percent, tax_percent) {
    x = Math.round(meal_cost + meal_cost*tip_percent/100 + meal_cost*tax_percent/100)
   return x // Write your code here

}

console.log(solve(12.00,20,8))
console.log(12.00 + 2)