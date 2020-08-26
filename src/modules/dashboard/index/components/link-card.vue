<template lang="pug">
el-card
  .p-card-body
    .p-card-header.p-pb-2
      i.pi(:class="icon", style={ fontSize: '2rem' })
    .p-card-title
      strong {{ header }}
    .p-card-footer
      router-link.p-button.p-button-link(:to="to")
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
