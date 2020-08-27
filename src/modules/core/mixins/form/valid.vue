<script lang="ts">
import { Form } from 'element-ui';
import Vue from 'vue';

interface Data {
  valid: boolean;
}

export default Vue.extend<Data, unknown, unknown>({
  data() {
    return {
      valid: false
    };
  },

  watch: {
    model: {
      deep: true,
      async handler() {
        try {
          this.valid = await (this.$refs.form as Form).validate();
        } catch (err) {
          this.valid = false;
        }
      }
    }
  }
});
</script>
