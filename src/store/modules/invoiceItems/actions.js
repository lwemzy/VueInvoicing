import axios from 'axios';
const mutations = {
  async getInvoiceItems({ commit }, obj) {
    const items = await axios.get(
      `http://5d7bc0c06b8ef80014b296e9.mockapi.io/sp5/api/v1/customer/${obj.customerId}/invoice/${obj.invoiceId}/invoice_item`
    );
    commit('ALL_INVOICE_ITEMS', items.data);
  },

  async addInvoiceItem({ commit }, obj) {
    const response = await axios.post(
      `http://5d7bc0c06b8ef80014b296e9.mockapi.io/sp5/api/v1/customer/${obj.customerId}/invoice/${obj.product.invoiceId}/invoice_item`,
      obj.product
    );
    commit('ADD_INVOICE_ITEM', response.data);
  },

  async deleteInvoiceItem({ commit }, obj) {
    await axios.delete(
      `http://5d7bc0c06b8ef80014b296e9.mockapi.io/sp5/api/v1//customer/${obj.customerId}/invoice/${obj.invoiceId}/invoice_item/${obj.id}`
    );
    commit('DELETE_INVOICE_ITEM', obj.id);
  }
};

export default mutations;
