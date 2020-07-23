/**
 * Tests for mocha
 */

var assert = require('assert');

const PriceCalculator = require('../PriceCalculator');



describe('PriceCalculator', () => {
  describe('stringToNormalizedArray()', () => {
    it('should return array of the same items', () => {
      assert.deepEqual(PriceCalculator.stringToNormalizedArray("milk, bread, bread, apple, banana"), ["milk", "bread", "bread", "apple", "banana"]);
    });
    it('should remove blank items from array', () => {
      assert.deepEqual(PriceCalculator.stringToNormalizedArray("milk, bread, , bread, apple, banana"), ["milk", "bread", "bread", "apple", "banana"]);
    });
    it('should ignore extra white space and case', () => {
      assert.deepEqual(PriceCalculator.stringToNormalizedArray("milK,, brEaD, , Bread, ,    ,   , APPLE, bAnAnA"), ["milk", "bread", "bread", "apple", "banana"]);
    });
  });
  describe('countItems()', () => {
    it('should return key value object where key is item and value is count', () => {
      assert.deepEqual(PriceCalculator.countItems(["milk", "bread", "bread", "apple", "banana"]), {"milk": 1, "bread": 2, "apple": 1, "banana": 1});
    });
  });
  describe('calculateCost()', () => {
    it('should return total sale price', () => {
      assert.deepEqual(PriceCalculator.calculateCost({"milk": 3, "bread": 4, "apple": 1, "banana": 1})["totalSalePrice"], 19.02);
    });
  });
  describe('calculateCost()', () => {
    it('should return total list price', () => {
      assert.deepEqual(PriceCalculator.calculateCost({"milk": 3, "bread": 4, "apple": 1, "banana": 1})["totalListPrice"], 22.47);
    });
  });
});
