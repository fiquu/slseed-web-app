<template lang="pug">
router-link.link.item(
  :class="linkClass"
  :to="to"
  )

  i.icon(:class="icon")
  | {{ text }}
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    to: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  },

  computed: {
    linkClass(): object {
      return {
        active: this.$route.path === this.to
      };
    }
  }
});
</script>
