<template>
  <v-card :class="elevation">
    <!-- <v-card-title> -->
    <slot name="title"></slot>
    <!-- </v-card-title> -->
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
  props: ["elevation"]
};
</script>