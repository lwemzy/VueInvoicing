import { createLocalVue, mount } from '@vue/test-utils';
import Invoice from '@/views/Invoice.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
Vue.use(Vuetify);
import store from '@/store';

const localVue = createLocalVue();

describe('Invoice.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('has a button', () => {
    const wrapper = mount(Invoice, {
      store,
      localVue,
      vuetify
    });
    expect(wrapper.contains('button')).toBe(true);
  });

  it('Card should have text and match snapshot', () => {
    const wrapper = mount(Invoice, {
      store,
      localVue,
      vuetify
    });

    // create snapshot files of the HTML output
    expect(wrapper.html()).toMatchSnapshot();

    const text = wrapper.find('.v-card__text > span');

    expect(text.text()).toBe('');
  });

  it('has a Pagination', () => {
    const wrapper = mount(Invoice, {
      store,
      localVue,
      vuetify
    });
    expect(wrapper.html()).toMatchSnapshot();

    const pagination = wrapper.find('.v-pagination__navigation');

    expect(pagination.text()).toBe('');
  });

  it('button is clickable', () => {
    const wrapper = mount(Invoice, {
      store,
      localVue,
      vuetify
    });

    const button = wrapper.find('button');

    // Simulate a click on the button
    button.trigger('click');
  });
});
