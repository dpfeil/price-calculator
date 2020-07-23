const numeral = require("numeral");
const PriceTable = require("./PriceTable");

/**
 * Contains all functionality required to calculate
 * prices based on a string of items from the store.
 */
class PriceCalculator {

  /**
   * Takes the received string of items and returns a 
   * normalize array of strings
   * @param {string} itemString
   * @returns {string[]} array of strings
   */
  static stringToNormalizedArray = (itemString) => {
    // Split the string of items to array of lowercase strings
    return itemString.split(',').map(d => d.toLowerCase().trim()).filter(d => d != "");
  };

  /**
   * Returns a key-value Object from an array of items 
   * where the key is the item and the value is the count 
   * of that item.
   * @param {string[]} items 
   * @returns {Object} Key-value item count
   */
  static countItems = (items) => {
    let countedItems = {};
    for(let i = 0; i < items.length; i++) {
      let item = items[i];
      if (!(item in countedItems)) countedItems[item] = 0;
      countedItems[item]++;
    }
    return countedItems;
  };

  /**
   * Calculates and returns an Object including costs 
   * for each item and total list and sale prices calculated
   * from the PriceTable
   * @param {Object} countedItems 
   * @returns {Object} Object including cost of each item and total costs
   */
  static calculateCost = (countedItems) => {
    let totalListPrice = 0;
    let totalSalePrice = 0;
    let costs = {};
    for(var item in countedItems) {
      let count = countedItems[item];
      const itemData = PriceTable[item];
      costs[item] = {
        count: count,
        listPrice: count*itemData["unitPrice"],
        salePrice: count*itemData["unitPrice"],
      };
      if("salePrice" in itemData) {
        costs[item]["salePrice"] = Math.floor(count/itemData["salePrice"]["quantity"])*itemData["salePrice"]["price"] + (count % itemData["salePrice"]["quantity"])*itemData["unitPrice"];
      }
      totalListPrice += costs[item]["listPrice"];
      totalSalePrice += costs[item]["salePrice"];
    }
    return {costs, totalListPrice, totalSalePrice};
  };


  /**
   * Outputs the receipt for the items to them console.
   * @param {Object} allCosts 
   */
  static printReceipt = (allCosts) => {

    const {costs, totalListPrice, totalSalePrice} = allCosts;
    console.log("Item\t  Quantity\tPrice");
    console.log("--------------------------------------");
    for(var item in costs) {
      const itemData = PriceTable[item];
      const itemCost = costs[item];
      console.log(`${itemData["label"]}\t  ${itemCost["count"]}\t\t${numeral(itemCost["salePrice"]).format("$(0,000.00)")}`);
    }
    console.log("");
    console.log(`Total price : ${numeral(totalSalePrice).format("($0,000.00)")}`);
    console.log(`You saved ${numeral(totalListPrice - totalSalePrice).format("($0,000.00)")} today.`);
  }
  

}


module.exports = PriceCalculator;