<script lang="ts">
import Vue from 'vue';

interface Data {
  isFormValid: boolean;
}

export default Vue.extend<Data, unknown, unknown>({
  data() {
    return {
      isFormValid: false
    };
  },

  watch: {
    model: {
      deep: true,
      handler() {
        console.log('is form valid...');
        this.isFormValid = this.$refs.form && (this.$refs.form as HTMLFormElement).fields.some(field =>
          field.validateState === 'error'
        );
      }
    }
  }
});
</script>
