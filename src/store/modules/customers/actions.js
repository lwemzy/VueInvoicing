import api from '../../../api/index';

const actions = {
	async getAllCustomer({ commit }) {
		commit('CUSTOMERS', (await api.getCustomers()).data);
	},

	async getCustomerById({ commit }, id) {
		commit('CUSTOMER', id);
	},

	async deleteCustomer({ commit }, id) {
		{
			await api.deleteCustomer(id);
		}
		commit('DELETE_CUSTOMER', id);
	},

	async newCustomer({ commit }, customer) {
		commit('NEW_CUSTOMER', (await api.newCustomer(customer)).data);
	},

	async editCustomer({ commit }, customer) {
		commit('EDIT_CUSTOMER', (await api.editCustomer(customer)).data);
	},
};

export default actions;
