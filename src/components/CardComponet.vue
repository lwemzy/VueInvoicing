<template>
  <v-card elevation="elevation" outlined>
    <slot name="haeder"></slot>
    <v-card-title>
      <slot name="title"></slot>
    </v-card-title>
    <v-card-subtitle>
      <slot name="subtitle"></slot>
    </v-card-subtitle>
    <v-card-text>
      <slot name="body"></slot>
    </v-card-text>
    <v-card-actions>
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "card-component",
  props: {
    elevation: {
      type: Number,
      default: 0
    }
  }
};
</script>