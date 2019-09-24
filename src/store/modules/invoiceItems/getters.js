const getters = {
  AllItems: state =>
    state.items.map(val => ({
      ...val,
      price: val.quantity * (val.item_price * 1)
    }))
};

export default getters;
