<script lang="ts">
import Vue from 'vue';

interface Data {
  isFormValid: boolean;
}

interface Methods {
  onValidate(): void;
}

export default Vue.extend<Data, unknown, unknown>({
  data() {
    return {
      isFormValid: false
    };
  },

  methods: {
    onValidate() {
      this.isFormValid = (this.$refs.form as HTMLFormElement).fields
        .every(({ validateState }) => validateState === 'success');
    }
  }
});
</script>
