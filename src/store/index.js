import Vue from 'vue';
import Vuex from 'vuex';
import Customers from './modules/customers';
import Invoice from './modules/invoice';
import InvoiceItems from './modules/invoiceItems';
import Products from './modules/products';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Customers,
    Invoice,
    InvoiceItems,
    Products
  }
});
