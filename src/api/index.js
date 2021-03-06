import axios from 'axios';

// axios instance
const apiClient = axios.create({
  baseURL: `http://5d7bc0c06b8ef80014b296e9.mockapi.io/sp5/api/v1`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
// TODO
// use template strings instead of string concatenation
export default {
  getCustomers() {
    return apiClient.get('/customer');
  },
  deleteCustomer(id) {
    return apiClient.delete('/customer/' + id);
  },
  newCustomer(obj) {
    return apiClient.post('/customer/', obj);
  },
  editCustomer(obj) {
    return apiClient.put('/customer/' + obj.id, obj);
  },
  getInvoices(id) {
    return apiClient.get('/customer/' + id + '/invoice');
  },
  newInvoice(obj) {
    return apiClient.post('/customer/' + obj.customerId + '/invoice', obj);
  },
  deleteInvoice(obj) {
    return apiClient.delete(
      '/customer/' + obj.customerId + '/invoice/' + obj.id
    );
  },
  editInvoice(obj) {
    return apiClient.put('/customer/' + obj.customerId + '/invoice/' + obj.id);
  },
  getInvoiceItem(obj) {
    return apiClient.get(
      '/customer/' +
        obj.customerId +
        '/invoice/' +
        obj.invoiceId +
        '/invoice_item'
    );
  },
  addInvoiceItem(obj) {
    // console.log(obj.product.invoiceId);
    return apiClient.post(
      '/customer/' +
        obj.customerId +
        '/invoice/' +
        obj.product.invoiceId +
        '/invoice_item',
      obj.product
    );
  },
  deleteInvoiceItem(obj) {
    console.log(obj);
    return apiClient.delete(
      '/customer/' +
        obj.customerId +
        '/invoice/' +
        obj.invoiceId +
        '/invoice_item/' +
        obj.id
    );
  }
};
