# Price Calculator
Node.js app that calculates and prints the total cost of all the items listed by the user.

#### Table of contents
- [Installation](#installation)
- [Availabe scripts](#available-scripts)
- [About](#about)
- [Details](#details)

---

## Installation

To install, first clone the git reposity. Then in the project directory, run:

```
npm install
```

## Available scripts

In the project directory you can run:

### `npm start`

Runs the app in production mode.


### `npm test`

Launches the test runner. This package uses mocha for testing.



---


## About

When executed, ***Price Calculator*** prompts the user for a list of items purchased in any order. Items must be separated by a comma. Once the user has listed all the items, ***Price Calculator*** calculates and prints the total cost for each item as well as the total cost for all items and the amount saved. 

## Details

At the local grocery store items are sold by quantity. For example Milk costs `$3.97`. However sometimes there is a sale and then consumers can buy `n` items for a lower price.

This week the pricing table at the local grocery store looks like this:

```
Item     Unit price        Sale price
--------------------------------------
Milk      $3.97            2 for $5.00
Bread     $2.17            3 for $6.00
Banana    $0.99
Apple     $0.89
```

At the cash counter the items are accepted in any order. So at the cash counter the order of items can be in the order of Bread, Banana, Milk, Apple, Bread and then Milk. Notice that quantity of the Milk is 2 and this week there is a sale on milk if 2 bottles of milk are purchased. So the price applied for milk should be $5.00.

Also note that if the user buys three bottles of milk then for the first two bottles of milk the user should get the sale price and on the third bottle of milk the user should get the unit price.
