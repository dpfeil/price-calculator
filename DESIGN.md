# Design considerations


## User interaction

- Must prompt user for items
- User enters list of items seperated by a "`,`"
  - Misspelled items, or items not included
  - Extra commas (resulting in empty items)

## Steps
1. Prompt user for list of items
2. Convert string from user to array and normalize text (`split(,)`, `trim()`, `toLowerCase()`)
3. Calculate price
4. Print output


## Data model

This is the data model for the store's price table. This will be stored as a separate module and included. Keeping the price table separate makes it cleaner and easier to modify.
- Each item type has a `unit price`
- Items on sale have a `sale price` that contains a `quantity` and `price` for that quantity.

Something like:
```javascript
const PriceTable = {
  "milk": {
    "label": "Milk",
    "unitPrice": 3.97,
    "salePrice": {
      "quantity": 2,
      "price": 5.00,
    },
  }
}
```

## Output requirements

- List of items with count and total item cost
- Total price
- Amount saved

Example of what the output should look like:

```
Please enter all the items purchased separated by a comma
milk,milk, bread,banana,bread,bread,bread,milk,apple

Item     Quantity      Price
--------------------------------------
Milk      3            $8.97
Bread     4            $8.17
Apple     1            $0.89
Banana    1            $0.99  

Total price : $19.02
You saved $3.45 today.
```


## Coding considerations

Turning the user string into an array of items is straight forward. But what is the best way to calculate price?

### Counting items
Could use `reduce` to turn the array into an object which lists the count. `reduce` may make things cleaner, but it's much slower than a regular `for` loop. 

### Calculating price
Price is just the unit price multiplied by the count for each item (unless that item is on sale). 

If the item is on sale, calculating the sale price is a simple formula:

```javascript
price = Math.floor(itemCount \ saleQuantity)*salePrice + (itemCount % saleQuantity)*unitPrice
```
