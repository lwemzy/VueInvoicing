<template>
  <v-dialog v-model="dialog2" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on }">
      <v-btn
        class="ma-1"
        outlined
        small
        fab
        color="grey"
        v-on="on"
        @click="getInvoiceItems({customerId, invoiceId}), getInvoiceById(invoiceId)"
      >
        <v-icon>mdi-eye-plus-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog2 = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Invoice</v-toolbar-title>
        <div class="flex-grow-1"></div>
        <v-toolbar-items>
          <v-btn dark text>
            <download-csv :data="exportCsv" name="Invoice.Csv">Export To Csv</download-csv>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-row justify="center" align="center">
        <v-card class="mt-10" width="60%" outlined>
          <v-row justify="center" align="center">
            <v-card-title>INVOICE</v-card-title>
          </v-row>
          <v-row justify="center" class="ma-4">
            <v-col>
              <v-card class="pa-2" flat tile>
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="headline mb-1">Future Link TechNologies</v-list-item-title>
                    <v-list-item-subtitle>P.O BOX 75408,</v-list-item-subtitle>
                    <v-list-item-subtitle>Kampala Uganda</v-list-item-subtitle>
                    <v-list-item-subtitle>Tel: +256(0) 414 695974</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>

            <div class="flex-grow-1"></div>

            <v-col>
              <v-card class="pa-2" flat tile>
                <v-row class="pa-2" align="center" justify="center">
                  <v-img
                    src="https://picsum.photos/id/11/500/300"
                    lazy-src="https://picsum.photos/id/11/10/6"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    max-width="150"
                    max-height="50"
                  ></v-img>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-row justify="center" class="ma-4">
            <v-col>
              <v-card class="pa-2" flat tile>
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="headline mb-1">{{getCustomer.name}}</v-list-item-title>
                    <v-list-item-subtitle>Address: {{getCustomer.address}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>

            <div class="flex-grow-1"></div>

            <v-col>
              <v-card class="pa-2" flat tile>
                <v-list-item three-line>
                  <v-list-item-content class="text-justify">
                    <v-list-item-subtitle>Invoice Number: {{invoiceById.invoice_no}}</v-list-item-subtitle>
                    <v-list-item-subtitle>Date: {{invoiceById.due_date}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>

          <!-- data table -->
          <v-row justify="center" class="ma-6">
            <v-data-table
              :headers="headers"
              :items="AllItems"
              sort-by="calories"
              class="elevation-0"
              hide-default-footer
            >
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <div class="flex-grow-1"></div>
                  <v-dialog v-model="dialog3" max-width="500px">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-on="on"
                        @click="getAllProducts()"
                        x-small
                        outlined
                      >Add Product</v-btn>
                    </template>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-card>
                        <v-card-title>
                          <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12">
                                <p>Product</p>
                                <v-overflow-btn
                                  class="my-2"
                                  :items="getProduct"
                                  editable
                                  item-value="text"
                                  v-model="editedItem.item_name"
                                ></v-overflow-btn>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  :rules="costRules"
                                  label="Price"
                                  :value="productPrice"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  :rules="qtyRules"
                                  v-model="editedItem.quantity"
                                  label="Quantity"
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
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.action="{ item }">
                <v-icon small @click="deleteItem(item)">mdi-close</v-icon>
              </template>
            </v-data-table>
          </v-row>
          <v-row justify="end" class="ma-6">
            <v-col>
              <v-card class="pa-2" flat tile></v-card>
            </v-col>

            <div class="flex-grow-1"></div>

            <v-col>
              <v-card class="pa-2" flat tile>
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-subtitle>Total: {{invoiceCost}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-row>
    </v-card>
    <v-snackbar bottom right v-model="snackbar" :timeout="timeout">{{ text }}</v-snackbar>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "InvoiceItems",
  props: ["customerId", "invoiceId"],
  data() {
    return {
      dialog2: false,
      notifications: false,
      sound: true,
      widgets: false,
      dialog3: false,
      snackbar: false,
      text: "",
      timeout: 2000,
      valid: true,
      qtyRules: [
        v => !!v || "Field is required",
        v => /^\d+$/.test(v) || "Field must be a number"
      ],
      costRules: [
        v => !!v || "Field is required",
        v => /^-?\d*(\.\d+)?$/.test(v) || "Field must be a number"
      ],
      headers: [
        {
          text: "Invoice Items",
          align: "left",
          sortable: false,
          value: "item_name",
          width: 300
        },
        { text: "Quantity", sortable: false, value: "quantity" },
        { text: "Unit Price", sortable: false, value: "item_price" },
        { text: "Price", sortable: false, value: "price" },
        { text: "", value: "action", sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        quantity: "",
        item_price: "",
        item_name: ""
      },
      defaultItem: {
        quantity: "",
        item_price: "",
        item_name: ""
      }
    };
  },
  computed: {
    ...mapGetters(["AllItems", "invoiceById", "getCustomer", "allProducts"]),
    formTitle() {
      return this.editedIndex === -1 ? "Add Product" : "Edit Item";
    },
    getProduct() {
      return this.allProducts.map(val => val.product_name);
    },
    productPrice() {
      return (this.editedItem.item_price =
        this.editedItem.item_name !== ""
          ? this.allProducts.find(
              val => val.product_name === this.editedItem.item_name
            ).product_price
          : this.editedItem.item_price);
    },
    invoiceCost() {
      return this.AllItems.reduce((val, currVal) => val + currVal.price * 1, 0);
    },

    exportCsv() {
      // Downloadable csv obj
      return [
        {
          customer: { ...this.getCustomer },
          invoice: { ...this.invoiceById, invoiceItems: [...this.AllItems] }
        }
      ];
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    ...mapActions([
      "getInvoiceItems",
      "getInvoiceById",
      "deleteInvoiceItem",
      "getAllProducts",
      "addInvoiceItem"
    ]),

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.deleteInvoiceItem({
          customerId: this.customerId,
          invoiceId: this.invoiceId,
          id: item.id
        });
    },

    close() {
      this.dialog3 = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          Object.assign(this.invoiceItems[this.editedIndex], this.editedItem);
          const product = Object.assign(this.editedItem, {
            invoiceId: this.invoiceId
          });
        } else {
          const product = Object.assign(this.editedItem, {
            invoiceId: this.invoiceId
          });
          this.addInvoiceItem({ product, customerId: this.customerId });
          this.snackbar = true;
          this.text = "Invoice Item Successfully Saved";
        }
        this.close();
      }
    }
  },
  created() {
    // this.getInvoiceItems({
    //   customerId: this.customerId,
    //   invoiceId: this.invoiceId
    // });
  }
};
</script>