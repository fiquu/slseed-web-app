<template lang="pug">
router-link.ui.card(
  :class="color"
  :to="to"
  )

  .center.aligned.content
    i.big.circular.icon(:class="[color, icon]")

  .center.aligned.content
    .header
      | {{ header }}

    .description
      | {{ description }}
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    header: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: "link"
    },
    color: {
      type: String,
      default: "grey"
    }
  }
});
</script>
