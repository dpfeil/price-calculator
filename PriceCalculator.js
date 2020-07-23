

class PriceCalculator {
  constructor(items) {
    this.items = items;
    this.stringToNormalizedArray = this.stringToNormalizedArray.bind(this);
  }

  /**
   * Takes the received string of items and converts it to an array
   * @param {string} items 
   */
  stringToNormalizedArray = (items) => {
    // Split the string of items to array of lowercase items
    return items.split(',').map(d => d.toLowerCase().trim()).filter(d => d != "");
  };



  
}


module.exports = PriceCalculator;