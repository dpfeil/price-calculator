/**
 * Tests for mocha
 */

var assert = require('assert');

const PriceCalculator = require('../PriceCalculator');


// Create and initialize PriceCalculator instance for testing
const priceCalculator = new PriceCalculator();

describe('PriceCalculator', () => {
  describe('stringToNormalizedArray()', () => {
    it('should return array of the same items', () => {
      assert.deepEqual(priceCalculator.stringToNormalizedArray("milk, bread, bread, apple, banana"), ["milk", "bread", "bread", "apple", "banana"]);
    });
    it('should remove blank items from array', () => {
      assert.deepEqual(priceCalculator.stringToNormalizedArray("milk, bread, , bread, apple, banana"), ["milk", "bread", "bread", "apple", "banana"]);
    });
    it('should ignore extra white space and case', () => {
      assert.deepEqual(priceCalculator.stringToNormalizedArray("milK,, brEaD, , Bread, ,    ,   , APPLE, bAnAnA"), ["milk", "bread", "bread", "apple", "banana"]);
    });
  });
});