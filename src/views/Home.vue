<template>
  <v-container fluid id="create">
    <v-row>
      <v-col cols="4">
        <div class="ml-3 mr-3">
          <CustomerList :dialog.sync="dialog"></CustomerList>
        </div>
      </v-col>
      <v-col cols="8">
        <v-container class="fill-height" fluid>
          <v-row>
            <v-col cols="12">
              <v-row justify="center" align="center">
                <!-- customer component -->
                <CustomerComponet
                  :editedCustomer.sync="editedCustomer"
                  :editedIndex.sync="editedIndex"
                  :dialog.sync="dialog"
                ></CustomerComponet>
                <!-- end of customer component -->
              </v-row>
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
          :editedIndex.sync="editedIndex"
          :editedCustomer.sync="editedCustomer"
          :formTitle="formTitle"
          :dialog.sync="dialog"
        ></Form>
        <!-- end of form -->
      </v-dialog>
    </v-row>
    <!-- speed dial -->
    <!-- <SpeedDial
      :dialog="dialog"
      @displayDialog="displayForm"
      :getCustomer="getCustomer"
      @editCustomer="editItem"
      @deleteItem="deleteCustomer"
    ></SpeedDial>-->
    <!-- speed dial -->
    <v-snackbar bottom right v-model="snackbar" :timeout="timeout">{{ text }}</v-snackbar>
  </v-container>
</template>

<script>
// import SpeedDial from "@/components/SpeedDial";
import Form from '@/components/Form';
import CustomerComponet from '@/components/CustomerView';
import CustomerList from '@/components/CustomerList';

export default {
  components: {
    // SpeedDial,
    Form,
    CustomerComponet,
    CustomerList
  },
  data() {
    return {
      dialog: false,
      pageCount: 0,
      itemsPerPage: 8,
      editedIndex: -1,
      snackbar: false,
      text: '',
      timeout: 2000,
      editedCustomer: {
        name: '',
        address: '',
        avatar: ''
      }
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Customer' : 'Edit Customer';
    }
  }
};
</script>

<style scoped>
/* #create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
} */
</style>