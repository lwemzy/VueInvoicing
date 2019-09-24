const getters = {
  allCustomers: state => state.customers,
  getCustomer: state => state.customer,
  isLoaded: state => !!Object.keys(state.customers).length
  // checking if an object is empty
  // Object.entries(state.customers).length === 0 &&
  //   state.customers.constructor === Object
};

export default getters;
