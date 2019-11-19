import api from '../../../api/index';

const actions = {
	async getInvoices({ commit }, id) {
		commit('INVOICES', (await api.getInvoices(id)).data);
	},

	async getInvoiceById({ commit }, id) {
		commit('INVOICE_BY_ID', id);
	},

	async newInvoice({ commit }, invoice) {
		commit('NEW_INVOICES', (await api.newInvoice(invoice)).data);
	},

	async deleteInvoice({ commit }, obj) {
		{
			await api.deleteInvoice(obj);
		}
		commit('DELETE_INVOICES', obj.id);
	},

	async editInvoice({ commit }, obj) {
		commit('EDIT_INVOICES', (await api.editInvoice(obj)).data);
	}
};

export default actions;
