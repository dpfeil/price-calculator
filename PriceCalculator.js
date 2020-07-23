const numeral = require("numeral");
const PriceTable = require("./PriceTable");


/**
 * Returns the USD currencey format ($0,000.00) for supplied number
 * @param {number} amount - any dollar amount as a numbers
 * @returns {string} USD formatted string
 */
const formatMoney = (amount) => numeral(amount).format("($0,000.00)");

/**
 * PriceCalculator.js
 * Contains all functionality required to calculate
 * prices based on a string of items from the store.
 * @class
 * @hideconstructor
 */
class PriceCalculator {;

  /**
   * Takes the received string of items and returns a 
   * normalized array of strings
   * @function
   * @param {string} itemString - string of items separated by comma
   * @returns {string[]} array of item strings
   */
  static stringToNormalizedArray = (itemString) => {
    
    const items = 
      itemString.split(',') // split on ',' into array
        .map(d => d.toLowerCase().trim()) // normalize strings
        .filter(d => d in PriceTable); // remove items not in Price Table

    return items;
  };

  /**
   * Returns a key-value Object from an array of items 
   * where the key is the item and the value is the count 
   * of that item.
   * @function
   * @param {string[]} items - array of item strings
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
   * Returns an Object including costs for each item 
   * and total list and sale prices calculated
   * from the PriceTable
   * @function
   * @param {Object} countedItems - Object key-value store of item and count
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
   * Creates a string of the receipt for the items.
   * @function
   * @static
   * @param {Object} allCosts - Objects of costs per item and total costs
   * @returns {string} receipt
   */
  static printReceipt = (allCosts) => {
    const {costs, totalListPrice, totalSalePrice} = allCosts;
    let output = "";
    if(Object.keys(costs).length === 0) {
      output += "You purchased no items today.\n";
    } else {
      output += "Item\t  Quantity\tPrice\n"
      + "--------------------------------------\n";
      let items = Object.keys(costs);

      // sort items by
      items.sort((a,b) => (costs[b]['salePrice'] - costs[a]['salePrice']));
      items.forEach((item) => {
        const itemData = PriceTable[item];
        const itemCost = costs[item];
        output += `${itemData["label"]}\t  ${itemCost["count"]}\t\t${formatMoney(itemCost["salePrice"])}\n`;
      });
    }
    output += "\n"
    + `Total price: ${formatMoney(totalSalePrice)}\n`
    + `You saved ${formatMoney(totalListPrice - totalSalePrice)} today.`;

    return output;
  }

};

module.exports = PriceCalculator;