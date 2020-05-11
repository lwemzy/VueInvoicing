<template>
  <v-speed-dial
    v-model="fab"
    :top="false"
    :bottom="true"
    :right="true"
    :left="false"
    :open-on-hover="false"
  >
    <template v-slot:activator>
      <v-btn v-model="localDialog" color="blue darken-2" dark fab>
        <v-icon v-if="localDialog">mdi-close</v-icon>
        <v-icon v-else>mdi-account-circle</v-icon>
      </v-btn>
    </template>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn @click="editCustomer(getCustomer)" v-on="on" fab dark small color="green">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <span>Edit Customer</span>
    </v-tooltip>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn @click="showDialog" v-on="on" fab dark small color="indigo">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>New Customer</span>
    </v-tooltip>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn fab dark small color="red" @click="deleteItem(getCustomer.id)" v-on="on">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
      <span>Delete Customer</span>
    </v-tooltip>
  </v-speed-dial>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SpeedDial",
  props: ["dialog", "getCustomer"],
  data() {
    return {
      fab: false,
      localDialog: this.dialog
    };
  },
  methods: {
    showDialog() {
      this.$emit("displayDialog");
    },

    editCustomer(val) {
      this.$emit("editCustomer", val);
    },

    deleteItem(val) {
        this.$emit('deleteItem', val)
    }
  }
};
</script>