<template lang="pug">
el-card
  template(#header)
    .text-center
      i.text-3xl(:class="icon")
      h3 {{ header }}

  router-link.el-link.el-link--primary.w-full(:to="to")
    slot
</template>

<script lang="ts">
import Vue from 'vue';

interface Props {
  header: string;
  icon: string;
  to: string;
}

export default Vue.extend<unknown, unknown, unknown, Props>({
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
