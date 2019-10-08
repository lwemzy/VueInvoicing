<template>
  <v-list subheader>
    <v-list-item
      v-for="user in paginatedData"
      :key="user.id"
      @click="$emit('ListItemClicked', user.id)"
    >
      <v-list-item-avatar>
        <v-img :src="user.avatar"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="user.name"></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
  props: ["paginatedData"],
  name: "ListItems"
};
</script>