<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <CardComponet :elevation="elevation">
          <template #title>
            <v-toolbar color="primary subheading" dark flat>
              <span>Oops</span>
              <div class="flex-grow-1"></div>
              <v-btn text dark to="/">
                <v-icon left v-text="'mdi-arrow-left'" />Back
              </v-btn>
            </v-toolbar>
          </template>
          <template #body>
            <v-row class="ma-4" justify="center" align="center">
              <p class="display-4">404</p>
              <p class="display-1">No page</p>
            </v-row>
          </template>
        </CardComponet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {
    CardComponet: () => import("../components/CardComponet")
  },
  name: "404"
};
</script>