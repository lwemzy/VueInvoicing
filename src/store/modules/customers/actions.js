import axios from 'axios';

const actions = {
  async getAllCustomer({ commit }) {
    const response = await axios.get(
      `http://5d7bc0c06b8ef80014b296e9.mockapi.io/sp5/api/v1/customer`
    );
    commit('CUSTOMERS', response.data);
  },

  async getCustomerById({ commit }, id) {
    const response = await axios.get(
      `http://5d7bc0c06b8ef80014b296e9.mockapi.io/sp5/api/v1/customer/${id}`
    );
    commit('CUSTOMER', response.data);
  },

  async deleteCustomer({ commit }, id) {
    await axios.delete(
      `http://5d7bc0c06b8ef80014b296e9.mockapi.io/sp5/api/v1/customer/${id}`
    );
    commit('DELETE_CUSTOMER', id);
  },

  async newCustomer({ commit }, customer) {
    const response = await axios.post(
      `http://5d7bc0c06b8ef80014b296e9.mockapi.io/sp5/api/v1/customer`,
      customer
    );
    commit('NEW_CUSTOMER', response.data);
  },

  async editCustomer({ commit }, customer) {
    const response = await axios.put(
      `http://5d7bc0c06b8ef80014b296e9.mockapi.io/sp5/api/v1/customer/${customer.id}`,
      customer
    );
    commit('EDIT_CUSTOMER', response.data);
  }
};

export default actions;
