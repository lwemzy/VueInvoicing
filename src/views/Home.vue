<template>
  <v-container fluid id="create">
    <v-row>
      <v-col cols="4">
        <v-card class="ma-3 pa-6" outlined tile>
          <!-- list items -->
          <ListItems :paginatedData="paginatedData" @ListItemClicked="getCustomerById"></ListItems>
          <!-- end of listItems -->
          <v-row justify="end">
            <div class="text-center pa-2 ma-2">
              <v-pagination
                @next="nextPage"
                @previous="prevPage"
                v-model="page"
                :length="paginatedPageCount"
                :total-visible="4"
                circle
              ></v-pagination>
            </div>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-row align="center" justify="center">
                <v-avatar size="400" class="mb-4">
                  <router-link :to="'/customer/'+getCustomer.id+'/invoice'">
                    <v-tooltip right>
                      <template v-slot:activator="{ on }">
                        <v-btn color="grey lighten-1" v-on="on" dark absolute top right fab>
                          <v-icon>mdi-eye-plus-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>Add Invoice</span>
                    </v-tooltip>
                  </router-link>
                  <v-img :src="getCustomer.avatar" alt="avatar"></v-img>
                </v-avatar>
              </v-row>

              <v-card class="mx-auto" max-width="450" outlined tile dark color="grey darken-2">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-center">{{getCustomer.name}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-center">Address: {{getCustomer.address}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <!-- modal -->
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="450px">
        <!-- form -->
        <Form
          :formTitle="formTitle"
          :editedCustomer="editedCustomer"
          @cancle="close"
          @submitForm="save"
        ></Form>
        <!-- end of form -->
      </v-dialog>
    </v-row>
    <!-- speed dial -->
    <SpeedDial
      :dialog="dialog"
      @displayDialog="displayForm"
      :getCustomer="getCustomer"
      @editCustomer="editItem"
      @deleteItem="deleteCustomer"
    ></SpeedDial>
    <!-- speed dial -->
    <v-snackbar bottom right v-model="snackbar" :timeout="timeout">{{ text }}</v-snackbar>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ListItems from "@/components/ListItems";
import SpeedDial from "@/components/SpeedDial";
import Form from "@/components/Form";

export default {
  components: {
    ListItems,
    SpeedDial,
    Form
  },
  data() {
    return {
      dialog: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 8,
      editedIndex: -1,
      snackbar: false,
      text: "",
      timeout: 2000,
      editedCustomer: {
        name: "",
        address: "",
        avatar: ""
      },
      defaultCustomer: {
        name: "",
        address: "",
        avatar: ""
      }
    };
  },

  computed: {
    ...mapGetters(["allCustomers", "getCustomer", "isLoaded"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Customer" : "Edit Customer";
    },
    paginatedData() {
      const start = this.pageCount * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      if (this.allCustomers.items && this.allCustomers.items.length)
        return this.allCustomers.items.slice(start, end);
    },
    paginatedPageCount() {
      if (this.isLoaded) {
        let l = this.allCustomers.items.length;
        let s = this.itemsPerPage;
        return Math.ceil(l / s);
      }
      return 0;
    }
  },

  methods: {
    ...mapActions([
      "getAllCustomer",
      "getCustomerById",
      "deleteCustomer",
      "newCustomer",
      "editCustomer"
    ]),
    editItem(item) {
      this.editedIndex = this.allCustomers.items.findIndex(
        item => item.id === item.id
      );
      this.editedCustomer = Object.assign({}, item);
      this.dialog = true;
    },
    close(form) {
      this.dialog = false;
      setTimeout(() => {
        // clear modal on close
        form.reset();
        this.editedCustomer = Object.assign({}, this.defaultCustomer);
        this.editedIndex = -1;
      }, 300);
    },

    save(form) {
      if (this.editedIndex > -1) {
        // edited customer
        this.editCustomer(this.editedCustomer);
        this.snackbar = true;
        this.text = "Customer Successfully Edited";
      } else {
        // new customer
        this.newCustomer(this.editedCustomer);
        this.snackbar = true;
        this.text = "Customer Successfully Saved";
      }
      this.close(form);
    },

    nextPage() {
      this.pageCount++;
    },
    prevPage() {
      this.pageCount--;
    },

    displayForm() {
      this.dialog = true;
    }
  },

  created() {
    this.getAllCustomer();
  }
};
</script>

<style scoped>
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
</style>