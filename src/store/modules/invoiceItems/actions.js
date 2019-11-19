import api from '../../../api/index';

const mutations = {
	async getInvoiceItems({ commit }, obj) {
		commit('ALL_INVOICE_ITEMS', (await api.getInvoiceItem(obj)).data);
	},

	async addInvoiceItem({ commit }, obj) {
		commit('ADD_INVOICE_ITEM', (await api.addInvoiceItem(obj)).data);
	},

	async deleteInvoiceItem({ commit }, obj) {
		{
			await api.deleteInvoiceItem(obj);
		}
		commit('DELETE_INVOICE_ITEM', obj.id);
	}
};

export default mutations;
