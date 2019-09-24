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
        <v-btn color="blue darken-1" text @click="cancle">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="submitForm">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
export default {
  props: ["formTitle", "editedCustomer"],
  name: "Form",
  data() {
    return {
      valid: true,
      nameRules: [v => !!v || "Name is required"],
      addressRules: [v => !!v || "Address is required"],
      avatarRules: [v => !!v || "Avatar is required"]
    };
  },
  methods: {
    cancle() {
      this.$emit("cancle", this.$refs.form);
    },
    submitForm() {
      if (this.$refs.form.validate()) {
        this.$emit("submitForm", this.$refs.form);
      }
    }
  }
};
</script>