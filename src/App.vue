<template>
	<v-app>
		<v-app-bar app>
			<v-toolbar-title class="headline text-uppercase">
				<span class="font-weight-light">Invoice App</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn text to="/">
				<span class="mr-2">Customers</span>
			</v-btn>
		</v-app-bar>

		<v-content>
			<router-view></router-view>
		</v-content>
	</v-app>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'App',
	data: () => ({
		//
	}),
	methods: {
		...mapActions(['getAllCustomer', 'getCustomerById']),
	},
	created() {
		// console.log(this.$route.params);
		// Simple fix
		// TODO
		// getcustomer from api call
		this.getAllCustomer();
		setTimeout(() => {
			if (this.$route.params.id) {
				this.getCustomerById(this.$route.params.id);
			} else {
				this.getCustomerById(0);
			}
		}, 2000);
	},
};
</script>
