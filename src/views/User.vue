<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <CardComponet :elevation="elevation">
          <div slot="title">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
          </div>
          <div slot="body">
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="user.username"
                  label="Login"
                  name="login"
                  prepend-icon="mdi-account"
                  type="text"
                ></v-text-field>

                <v-text-field
                  v-model="user.password"
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
          </div>
          <div name="actions">
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="primary" @click="OnSubmit">Login</v-btn>
            </v-card-actions>
          </div>
        </CardComponet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import CardComponet from '@/components/CardComponent'
export default {
  components: {
    CardComponet: () => import("../components/CardComponet")
  },
  data: () => ({
    drawer: null,
    elevation: "elevation-12",
    user: {
      username: null,
      password: null
    }
  }),

  methods: {
    OnSubmit(evt) {
      evt.preventDefault();
      console.log(this.user);
    }
  }
};
</script>