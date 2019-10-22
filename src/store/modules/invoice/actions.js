import axios from 'axios';

const actions = {
  async getInvoices({ commit }, id) {
    const response = await axios.get(
      `http://5d7bc0c06b8ef80014b296e9.mockapi.io/sp5/api/v1/customer/${id}/invoice`
    );
    commit('INVOICES', response.data);
  },
  async getInvoiceById({ commit }, obj) {
    const response = await axios.get(
      `http://5d7bc0c06b8ef80014b296e9.mockapi.io/sp5/api/v1/customer/${obj.customerId}/invoice/${obj.invoiceId}`
    );
    commit('INVOICE_BY_ID', response.data);
  },

  async newInvoice({ commit }, invoice) {
    const response = await axios.post(
      `http://5d7bc0c06b8ef80014b296e9.mockapi.io/sp5/api/v1/customer/${invoice.customerId}/invoice`,
      invoice
    );
    commit('NEW_INVOICES', response.data);
  },

  async deleteInvoice({ commit }, obj) {
    await axios.delete(
      `http://5d7bc0c06b8ef80014b296e9.mockapi.io/sp5/api/v1/customer/${obj.customerId}/invoice/${obj.id}`
    );
    commit('DELETE_INVOICES', obj.id);
  },

  async editInvoice({ commit }, obj) {
    await axios.put(
      `http://5d7bc0c06b8ef80014b296e9.mockapi.io/sp5/api/v1/customer/${obj.customerId}/invoice/${obj.id}`,
      obj
    );
    commit('EDIT_INVOICES', obj);
  }
};

export default actions;
