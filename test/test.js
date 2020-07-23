/**
 * Tests for PriceCalculator
 */

var assert = require('assert');

const PriceCalculator = require('../PriceCalculator');



describe('PriceCalculator', () => {
  describe('#stringToNormalizedArray()', () => {
    it('should return array of the same items', () => {
      assert.deepEqual(PriceCalculator.stringToNormalizedArray("milk, bread, bread, apple, banana"), ["milk", "bread", "bread", "apple", "banana"]);
    });
    it('should remove blank items from array', () => {
      assert.deepEqual(PriceCalculator.stringToNormalizedArray("milk, bread, , bread, apple, banana"), ["milk", "bread", "bread", "apple", "banana"]);
    });
    it('should ignore any items not in PriceTable', () => {
      assert.deepEqual(PriceCalculator.stringToNormalizedArray("milk, bread, foo, bread, apple, bar, banana"), ["milk", "bread", "bread", "apple", "banana"]);
    });
    it('should ignore extra white space and case', () => {
      assert.deepEqual(PriceCalculator.stringToNormalizedArray("milK,, brEaD, , Bread, ,    ,   , APPLE, bAnAnA"), ["milk", "bread", "bread", "apple", "banana"]);
    });
  });
  describe('#countItems()', () => {
    it('should return key value object where key is item and value is count', () => {
      assert.deepEqual(PriceCalculator.countItems(["milk", "bread", "bread", "apple", "banana"]), {"milk": 1, "bread": 2, "apple": 1, "banana": 1});
    });
  });
  describe('#calculateCost()', () => {
    it('should return total sale price', () => {
      assert.deepEqual(PriceCalculator.calculateCost({"milk": 3, "bread": 4, "apple": 1, "banana": 1})["totalSalePrice"], 19.02);
    });
    it('should return total list price', () => {
      assert.deepEqual(PriceCalculator.calculateCost({"milk": 3, "bread": 4, "apple": 1, "banana": 1})["totalListPrice"], 22.47);
    });
  });
  describe('#printReceipt()', () => {
    it('should return message that you purchased no items', () => {
      assert.equal(PriceCalculator.printReceipt({costs: {}, totalListPrice: 0, totalSalePrice: 0}), 
        "You purchased no items today.\n"
        + "\n"
        + "Total price: $0.00\n"
        + "You saved $0.00 today."
      );
    });
    it('should return correct receipt', () => {
      assert.equal(PriceCalculator.printReceipt(PriceCalculator.calculateCost({"milk": 3, "bread": 4, "apple": 1, "banana": 1})),
        "Item\t  Quantity\tPrice\n"
        + "--------------------------------------\n"
        + "Milk\t  3\t\t$8.97\n"
        + "Bread\t  4\t\t$8.17\n"
        + "Banana\t  1\t\t$0.99\n"
        + "Apple\t  1\t\t$0.89\n"
        + "\n"
        + "Total price: $19.02\n"
        + "You saved $3.45 today."
      );
    });
  });
});


