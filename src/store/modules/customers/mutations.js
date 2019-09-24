const mutations = {
  CUSTOMERS: (state, payload) => {
    state.customers = payload;
    state.customer = payload.items[0];
  },
  CUSTOMER: (state, payload) => (state.customer = payload),
  DELETE_CUSTOMER: (state, payload) => {
    const customerIndex = state.customers.items.findIndex(
      item => item.id === payload
    );
    if (customerIndex != -1) {
      state.customers.items.splice(customerIndex, 1);
      state.customer = state.customers.items[customerIndex + 1];
    }
    // state.customers.items.filter(customer => customer.id !== payload);
  },
  NEW_CUSTOMER: (state, payload) => {
    state.customers.items.push(payload);
  },
  EDIT_CUSTOMER: (state, payload) => {
    const index = state.customers.items.findIndex(
      item => item.id == payload.id
    );
    if (index != -1) {
      state.customers.items.splice(index, 1, payload);
      state.customer = state.customers.items[index];
    }
  }
};

export default mutations;
