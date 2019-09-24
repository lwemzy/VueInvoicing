const mutations = {
  CUSTOMER: (state, payload) => (state.customer = payload),
  INVOICES: (state, payload) => (state.invoices = payload),
  INVOICE_BY_ID: (state, payload) => (state.invoice = payload),
  NEW_INVOICES: (state, payload) => state.invoices.push(payload),
  DELETE_INVOICES: (state, payload) =>
    (state.invoices = state.invoices.filter(
      val => val.id !== payload.toString()
    )),
  EDIT_INVOICES: (state, payload) => {
    const index = state.invoices.findIndex(
      item => item.id === payload.id.toString()
    );
    if (index != -1) {
      state.invoices.splice(index, 1, payload);
    }
  }
};

export default mutations;
