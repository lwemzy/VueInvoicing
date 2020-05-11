<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-card class="pa-2">
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="editedCustomer.name" label="Name" :rules="nameRules" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedCustomer.address"
                label="Address"
                :rules="addressRules"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedCustomer.avatar"
                label="Avator"
                :rules="avatarRules"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['formTitle', 'dialog', 'editedCustomer', 'editedIndex'],
  name: 'Form',
  data() {
    return {
      defaultCustomer: {
        name: '',
        address: '',
        avatar: ''
      },
      valid: true,
      nameRules: [v => !!v || 'Name is required'],
      addressRules: [v => !!v || 'Address is required'],
      avatarRules: [v => !!v || 'Avatar is required']
    };
  },
  methods: {
    ...mapActions(['newCustomer', 'editCustomer']),
    close() {
      this.$emit('update:dialog', false);
      setTimeout(() => {
        // clear modal on close
        this.$refs.form.reset();
        // this.editedCustomer = Object.assign({}, this.defaultCustomer);
        this.$emit(
          'update:editedCustomer',
          Object.assign({}, this.defaultCustomer)
        );
        this.$emit('update:editedIndex', -1);
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        // edited customer
        this.editCustomer(this.editedCustomer);
        this.snackbar = true;
        this.text = 'Customer Successfully Edited';
      } else {
        // new customer
        this.newCustomer(this.editedCustomer);
        this.snackbar = true;
        this.text = 'Customer Successfully Saved';
      }
      this.close(this.$refs.form);
    }
  }
};
</script>