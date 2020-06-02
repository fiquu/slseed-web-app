<template lang="pug">
router-link.link.item(
  :class="linkClass"
  :to="to"
  )

  i.icon(:class="icon")
  slot
</template>

<script lang="ts">
import Vue from 'vue';

interface Props {
  icon: string;
  to: string;
}

interface Computed {
  linkClass: {
    active: boolean;
  };
}

export default Vue.extend<unknown, unknown, Computed, Props>({
  props: {
    to: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  },

  computed: {
    linkClass() {
      return {
        active: this.$route.path === this.to
      };
    }
  }
});
</script>
