<template lang="pug">
el-card
  template(#header)
    .text-center
      i.text-3xl.mb-3(:class="icon")
      h3.font-bold {{ header }}

  router-link.el-button.el-button--text.w-full.no-underline(:to="to")
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
