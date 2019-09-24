import { createLocalVue, mount } from '@vue/test-utils';
import InvoiceItems from '@/components/InvoiceItems.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
Vue.use(Vuetify);
import store from '@/store';

const localVue = createLocalVue();

describe('InvoiceItems.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('renders a vue instance', () => {
    const wrapper = mount(InvoiceItems, {
      store,
      localVue,
      vuetify
    });
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('has a button', () => {
    const wrapper = mount(InvoiceItems, {
      store,
      localVue,
      vuetify
    });
    expect(wrapper.contains('button')).toBe(true);
  });
});
