/**
 * PriceTable 
 * 
 * Current price table:
 * Item     Unit price        Sale price
 * --------------------------------------
 * Milk      $3.97            2 for $5.00
 * Bread     $2.17            3 for $6.00
 * Banana    $0.99
 * Apple     $0.89
 */

const PriceTable  = {
  "milk": {
    "label": "Milk",
    "unitPrice": 3.97,
    "salePrice": {
      "quantity": 2,
      "price": 5.00,
    },
  },
  "bread": {
    "label": "Bread",
    "unitPrice": 2.17,
    "salePrice": {
      "quantity": 3,
      "price": 6.00,
    },
  },
  "banana": {
    "label": "Banana",
    "unitPrice": 0.99,
  },
  "apple": {
    "label": "Apple",
    "unitPrice": 0.89,
  },
}

module.exports = PriceTable;