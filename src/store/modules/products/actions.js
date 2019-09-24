import axios from 'axios';

const actions = {
  async getAllProducts({ commit }) {
    const response = await axios.get(
      `http://5d7bc0c06b8ef80014b296e9.mockapi.io/sp5/api/v1/product`
    );
    commit('ALL_PRODUCTS', response.data);
  }
};
export default actions;
