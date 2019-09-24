<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-card width="500px" flat tile>
        <v-card-title class="info white--text subheading">
          <span>Oops</span>
          <div class="flex-grow-1"></div>
          <v-btn text dark to="/">
            <v-icon left v-text="'mdi-arrow-left'" />Back
          </v-btn>
        </v-card-title>
        <v-card-text class>
          <v-row class="ma-4" justify="center" align="center">
            <p class="display-4">404</p>
            <p class="display-1">No page</p>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "404"
};
</script>