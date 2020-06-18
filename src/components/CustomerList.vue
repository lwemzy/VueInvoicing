<template>
	<CardComponet>
		<template #haeder>
			<v-toolbar color="primary lighten-1" dark flat>
				<v-toolbar-title>Customers</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-btn @click="$emit('update:dialog', !dialog)" text>
					New Customer
					<!-- <v-icon>mdi-plus</v-icon> -->
				</v-btn>
			</v-toolbar>
		</template>
		<template #body>
			<ListItems
				:pageCount="pageCount"
				:itemsPerPage="itemsPerPage"
			></ListItems>
		</template>
		<template #actions>
			<v-row justify="end">
				<div class="text-center pa-2 ma-2">
					<v-pagination
						@input="btnInput"
						v-model="page"
						:length="paginatedPageCount"
						:total-visible="4"
						circle
					></v-pagination>
				</div>
			</v-row>
		</template>
	</CardComponet>
</template>

<script>
// TODO
// change toolbar

import { mapGetters } from 'vuex';
import CardComponet from '../components/CardComponet';
import ListItems from '../components/ListItems';

export default {
	name: 'customer-list',
	props: ['dialog'],
	components: {
		CardComponet,
		ListItems,
	},
	data() {
		return {
			page: 1,
			pageCount: 0,
			itemsPerPage: 8,
		};
	},
	computed: {
		...mapGetters(['allCustomers', 'isLoaded']),
		paginatedPageCount() {
			if (this.isLoaded) {
				let l = this.allCustomers.items.length;
				let s = this.itemsPerPage;
				return Math.ceil(l / s);
			}
			return 0;
		},
	},
	methods: {
		btnInput(number) {
			this.page = number;
			this.pageCount = number - 1;
		},
	},
};
</script>
