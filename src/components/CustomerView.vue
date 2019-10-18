<template>
  <CardComponet :elevation="0">
    <template #haeder>
      <v-img :src="getCustomer.avatar" width="350px"></v-img>
    </template>
    <template #title>{{getCustomer.name}}</template>
    <template #subtitle>Address: {{getCustomer.address}}</template>

    <template #actions>
      <v-row justify="center">
        <v-btn outlined color="primary" @click="editItem(getCustomer)">Edit</v-btn>
        <v-btn outlined color="red darken-3" @click="deleteCustomer(getCustomer.id)">Delete</v-btn>
        <v-btn outlined color="green lighten-1" @click="viewInvoice(getCustomer.id)">Invoice</v-btn>
      </v-row>
    </template>
  </CardComponet>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "customer-view",
  props: ["editedIndex", "editedCustomer", "dialog"],
  components: {
    CardComponet: () => import("../components/CardComponet")
  },
  computed: {
    ...mapGetters(["getCustomer", "allCustomers"])
  },
  methods: {
    ...mapActions(["deleteCustomer"]),
    editItem(item) {
      const index = this.allCustomers.items.findIndex(
        item => item.id === item.id
      );
      this.$emit("update:editedIndex", index);
      this.$emit("update:editedCustomer", Object.assign({}, item));
      this.$emit("update:dialog", !this.dialog);
    },
    viewInvoice(id) {
      console.log(id);
      this.$router.push(`/customer/${id}/invoice`);
    }
  }
};
</script>