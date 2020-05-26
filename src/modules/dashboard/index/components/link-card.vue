<template lang="pug">
router-link.ui.card(:to="to")
  .center.aligned.content
    i.big.circular.icon(:class="[color, icon]")

  .center.aligned.content
    .header
      | {{ header }}

    .description
      slot
</template>

<script lang="ts">
import Vue from 'vue';

interface Props {
  header: string;
  icon: string;
  to: string;
}

export default Vue.extend<{}, {}, {}, Props>({
  props: {
    header: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: 'link'
    }
  }
});
</script>
