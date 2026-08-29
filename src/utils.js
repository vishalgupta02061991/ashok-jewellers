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

  export const jewelryTypes = [
    { value: "Necklaces", hindi: "गले के हार", english: "Necklaces" },
    { value: "Earrings", hindi: "कान के झुमके / बालियाँ", english: "Earrings" },
    { value: "Bangles", hindi: "हाथ के कंगन / चूड़ियाँ", english: "Bangles" },
    { value: "Rings", hindi: "अंगूठियाँ", english: "Rings" },
    { value: "Anklets", hindi: "पायल", english: "Anklets" },
    { value: "Head Jewelry", hindi: "मांग टीका / शीशपट्टी", english: "Head Jewelry" },
    { value: "Waist Chains", hindi: "कमरबंद", english: "Waist Chains" },
    { value: "Armlets", hindi: "बाजूबंद", english: "Armlets" },
    { value: "Toe Rings", hindi: "बिछिया", english: "Toe Rings" },
    { value: "Nose Rings", hindi: "नथ / नाक की कील", english: "Nose Rings" }
];

export const validateItem = (item) => {
  let error = {};
  console.log(item,'ii123', (!item.weightInGrams || Number(item.weightInGrams) <= 0))
  if (!item.name || item.name?.length === 0) {
    error.name = "Name is required";
  }
  if (!item.quantity || Number(item.quantity) <= 0) {
    error.quantity = "Quantity must be greater than 0";
  }
  if (!item.weightInGrams || Number(item.weightInGrams) <= 0) {
    error.weightInGrams = "Gross weight must be greater than 0";
  }
  if (!item.purity || Number(item.purity) <= 0) {
    error.purity = "Purity must be selected";
  }
  if (!item.netWeightInGrams || Number(item.netWeightInGrams) <= 0) {
    error.netWeightInGrams = "Net weight must be greater than 0";
  }
  if (!item.itemTotal || Number(item.itemTotal) <= 0) {
    error.itemTotal = "Total must be greater than 0";
  }
  return Object.keys(error).length ? error : null;
};

export const jewelryTypes2 = [
  { value: "Haar", label: "Haar" },
  { value: "Jhumki", label: "Jhumki" },
  { value: "Jhala", label: "Jhala" },
  { value: "Phool", label: "Phool" },
  { value: "Tika", label: "Tika" },
  { value: "Chain", label: "Chain" },
  { value: "Ring", label: "Ring" },
  { value: "Kundal", label: "Kundal" },
  { value: "Katiya", label: "Katiya" },
  { value: "Locket", label: "Locket" },
  { value: "Nath", label: "Nath" },
  { value: "Churi", label: "Churi" },
  { value: "Sahara", label: "Sahara" },
  { value: "Kada", label: "Kada" }
];

export const branchs = [
  { value: "Domariganj", label: "Domariganj" },
  { value: "A.C.B Domariganj", label: "A.C.B Domariganj" },
  { value: "Hallour", label: "Hallour" },
  { value: "Auratal", label: "Auratal" },
  { value: "Chaukhada", label: "Chaukhada" },
  { value: "Phatra", label: "Phatra" },
  { value: "Mannijot", label: "Mannijot" },
  { value: "Bhanwapur", label: "Bhanwapur" },
  { value: "Bhawaniganj", label: "Bhawaniganj" },
  { value: "Sikta", label: "Sikta" },
];

export const branchList = branchs.sort((a, b) => a.label.localeCompare(b.label));

export const jewelryTypeList = jewelryTypes2.sort((a, b) => a.label.localeCompare(b.label));