<template>
	<v-list subheader>
		<v-list-item v-for="user in paginatedData" :key="user.id" @click="getCustomerById(user.id)">
			<v-list-item-avatar>
				<v-img :src="user.avatar"></v-img>
			</v-list-item-avatar>
			<v-list-item-content>
				<v-list-item-title v-text="user.name"></v-list-item-title>
			</v-list-item-content>
		</v-list-item>
	</v-list>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'ListItems',
	props: ['pageCount', 'itemsPerPage'],
	data() {
		return {};
	},
	computed: {
		...mapGetters(['allCustomers']),
		paginatedData() {
			const start = this.pageCount * this.itemsPerPage;
			const end = start + this.itemsPerPage;
			if (this.allCustomers.items && this.allCustomers.items.length)
				return this.allCustomers.items.slice(start, end);
		}
	},
	methods: {
		...mapActions(['getCustomerById'])
	}
};
</script>