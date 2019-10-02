<template>
  <v-card :class="elevation">
    <slot name="title"></slot>
    <slot name="body"></slot>
    <slot name="actions"></slot>
    <slot></slot>
    <!-- <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field label="Login" name="login" prepend-icon="mdi-account" type="text"></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary">Login</v-btn>
    </v-card-actions>-->
  </v-card>
</template>

<script>
export default {
  props: ["elevation"]
};
</script>