exports.toReadablePrice = price => `$${Math.floor(price/100)}.${price%100 === 0 ? '00' : price%100}`;
