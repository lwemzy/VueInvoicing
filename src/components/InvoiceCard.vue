<template>
  <v-form ref="form" v-model="validForm" lazy-validation>
    <v-card class="pa-2">
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                :rules="invoiceRules"
                v-model="editedInvoice.invoice_no"
                label="Invoice Number"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="editedInvoice.due_date"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="editedInvoice.due_date"
                    label="Due Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="editedInvoice.due_date" no-title scrollable>
                  <div class="flex-grow-1"></div>
                  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(editedInvoice.due_date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
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
export default {
  name: "InvoiceCard",
  props: ["editedInvoice", "formTitle", "menu", "invoiceRules", "valid"],
  data() {
    return {
      validForm: this.valid
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    save() {
      if (this.$refs.form.validate()) {
        this.$emit("save");
      }
    }
  }
};
</script> 