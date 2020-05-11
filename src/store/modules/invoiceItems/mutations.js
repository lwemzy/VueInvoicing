const mutations = {
  ALL_INVOICE_ITEMS: (state, payload) => (state.items = payload),
  DELETE_INVOICE_ITEM: (state, payload) =>
    (state.items = state.items.filter(val => val.id !== payload.toString())),
  ADD_INVOICE_ITEM: (state, payload) => state.items.push(payload)
};

export default mutations;
