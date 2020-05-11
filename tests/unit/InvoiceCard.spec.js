// Libraries
import Vue from 'vue';
import Vuetify from 'vuetify';
Vue.use(Vuetify);
// Components
import InvoiceCard from '@/components/InvoiceCard';

// Utilities
import { mount, createLocalVue } from '@vue/test-utils';

const localVue = createLocalVue();

describe('InvoiceCard.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('renders a vue instance', () => {
    const wrapper = mount(InvoiceCard, {
      localVue,
      vuetify,
      propsData: {
        formTitle: 'Foobar',
        editedInvoice: {
          invoice_no: 1213,
          due_date: new Date().toISOString().substr(0, 10)
        }
      }
    });
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('should have a custom title and match snapshot', () => {
    const wrapper = mount(InvoiceCard, {
      localVue,
      vuetify,
      propsData: {
        formTitle: 'Foobar',
        editedInvoice: {
          invoice_no: 1213,
          due_date: new Date().toISOString().substr(0, 10)
        }
      }
    });

    expect(wrapper.html()).toMatchSnapshot();

    const title = wrapper.find('.v-card__title > span');

    expect(title.text()).toBe('Foobar');
  });

  it('v-btn is clickable', () => {
    const wrapper = mount(InvoiceCard, {
      localVue,
      vuetify,
      propsData: {
        formTitle: 'Foobar',
        editedInvoice: {
          invoice_no: 1213,
          due_date: new Date().toISOString().substr(0, 10)
        }
      }
    });

    const button = wrapper.find('.v-btn');

    button.trigger('click');
  });

  it('Input Accepts User input', () => {
    const wrapper = mount(InvoiceCard, {
      localVue,
      vuetify,
      propsData: {
        formTitle: 'Foobar',
        editedInvoice: {
          invoice_no: 1213,
          due_date: new Date().toISOString().substr(0, 10)
        }
      }
    });

    const newValue = 'Updated value';
    const input = wrapper.find('input');
    input.element.value = newValue;
    input.trigger('change');
  });
});
