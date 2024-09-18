export const getCount = (name, items) => {
    let sum = 0;
    if (items?.length > 0) {
      items?.forEach((item, i) => {
        if (item?.itemTotal > 0) {
            if (name === 'weightInGrams') {
                sum = sum + Number(item.weightInGrams);
              }
              else if (name === 'quantity') {
                sum = sum + Number(item.quantity);
              }
              else if (name === 'stoneWeight') {
                sum = sum + Number(item.stoneWeight);
              }
              else if (name === 'netWeightInGrams') {
                const n = Number(item.weightInGrams - item.stoneWeight);
                console.log(n, 'dd123')
                sum = sum + n;
            }
        }
        
      })
    }
    return sum;
  }


  export const dropDownOptions = () => {
    const options = [];
    for ( let i = 11; i <= 24; i++ ) {
        let obj = {};
        obj['value'] = i;
        obj['label'] =  i;
        // obj['label'] = `${i} Carat`;
        options.push(obj);
    }
    return options;
  }