<template>
  <v-container fluid id="create">
    <v-row>
      <v-col cols="2">
        <!-- customer card -->
        <v-card class="mx-auto" max-width="250">
          <v-img class="white--text" height="250px" :src="getCustomer.avatar"></v-img>

          <v-card-text class="text-center">
            <span>{{getCustomer.name}}</span>
          </v-card-text>

          <v-card-actions>
            <v-list-item>
              <v-row align="center" justify="end">
                <!-- create invoice modal -->
                <v-dialog v-model="dialog" persistent max-width="450px">
                  <template v-slot:activator="{ on }">
                    <v-btn text color="primary" x-small v-on="on">Create Invoice</v-btn>
                  </template>
                  <!-- invoice card -->
                  <InvoiceCard
                    :editedInvoice="editedInvoice"
                    :formTitle="formTitle"
                    :invoiceRules="invoiceRules"
                    :valid="valid"
                    :menu="menu"
                    @close="close"
                    @save="save"
                  ></InvoiceCard>
                  <!-- invoice card -->
                </v-dialog>
                <!-- end create invoice modal -->
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="10">
        <v-container>
          <v-row>
            <v-col cols="3" v-for="invoice in paginatedData" :key="invoice.id">
              <v-card max-width="200" class="mx-auto pa-2">
                <v-card-title class="subtitle-1">Invoice No: {{invoice.invoice_no}}</v-card-title>
                <v-card-text>
                  Created At: {{invoice.createdAt | formatDate}}
                  <br />
                  Due Date: {{invoice.due_date | formatDate}}
                </v-card-text>
                <v-card-actions>
                  <v-row align="center" justify="center">
                    <!-- invoice items modal -->
                    <InvoiceItems :customerId="id" :invoiceId="invoice.id"></InvoiceItems>
                    <!-- invoice items modal -->
                    <v-btn class="ma-1" outlined small fab color="grey" @click="editItem(invoice)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      class="ma-1"
                      outlined
                      small
                      fab
                      color="grey"
                      @click="deleteInvoice({customerId: id, id:invoice.id})"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-row justify="end">
      <div class="text-center pa-2 ma-2">
        <v-pagination
          @next="nextPage"
          @previous="prevPage"
          v-model="page"
          :length="paginatedPageCount"
          circle
        ></v-pagination>
      </div>
    </v-row>
    <v-snackbar bottom right v-model="snackbar" :timeout="timeout">{{ text }}</v-snackbar>
  </v-container>
</template>

<script>
import format from "date-fns/format";

import { mapActions, mapGetters } from "vuex";
import InvoiceItems from "../components/InvoiceItems";
import InvoiceCard from "../components/InvoiceCard";

export default {
  name: "Invoice",
  props: ["id"],
  components: {
    InvoiceItems,
    InvoiceCard
  },
  data() {
    return {
      snackbar: false,
      text: "",
      timeout: 2000,
      valid: true,
      invoiceRules: [
        v => !!v || "Address is required",
        v => /^\d+$/.test(v) || "Numbe a number"
      ],
      page: 1,
      pageCount: 0,
      itemsPerPage: 20,
      dialog: false,
      dialog2: false,
      dialog3: false,
      menu: false,
      editedIndex: -1,
      editedInvoice: {
        due_date: new Date().toISOString().substr(0, 10),
        invoice_no: ""
      },
      defaultInvoice: {
        due_date: new Date().toISOString().substr(0, 10),
        invoice_no: ""
      }
    };
  },
  computed: {
    ...mapGetters(["getCustomer", "allInvoices"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Invoice" : "Edit Invoice";
    },
    paginatedData() {
      const start = this.pageCount * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.allInvoices.slice(start, end);
    },
    paginatedPageCount() {
      let l = this.allInvoices.length;
      let s = this.itemsPerPage;
      return Math.ceil(l / s);
    }
  },
  methods: {
    ...mapActions([
      "customer",
      "getInvoices",
      "newInvoice",
      "deleteInvoice",
      "editInvoice"
    ]),
    editItem(item) {
      this.editedIndex = this.allInvoices.findIndex(val => val.id === item.id);
      this.editedInvoice = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        // clear modal on close
        this.editedInvoice = Object.assign({}, this.defaultInvoice);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        // edited customer
        const editedInvoice = Object.assign(this.editedInvoice, {
          customerId: this.id
        });
        this.editInvoice(editedInvoice);
        this.snackbar = true;
        this.text = "Invoice Successfully Edited";
      } else {
        // new invoice
        const invoice = Object.assign(this.editedInvoice, {
          customerId: this.id
        });
        this.newInvoice(invoice);
        this.snackbar = true;
        this.text = "Invoice Successfully Saved";
      }
      this.close();
    },

    nextPage() {
      this.pageCount++;
    },
    prevPage() {
      this.pageCount--;
    }
  },
  filters: {
    formatDate(date) {
      return format(new Date(date), "yyyy-MM-dd");
    }
  },
  created() {
    this.customer(this.id);
    this.getInvoices(this.id);
  }
};
</script>