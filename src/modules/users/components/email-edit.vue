<i18n>
en:
  MESSAGES:
    SUBMIT:
      ERROR: "Couldn't update email."
</i18n>

<template lang="pug">
validation-provider.ui.fluid.action.input(
  rules="required|min:5"
  v-slot="{ invalid, classes }"
  ref="validator"
  slim
  )

  .field(:class="classes")
    .ui.fluid.action.input
      input(
        :disabled="!editing || submitting"
        @change="onValueChanged"
        @input="onValueChanged"
        :readonly="!editing"
        v-model="data.value"
        name="data-email"
        minlength="5"
        type="email"
        )

      button.ui.icon.button(
        :class="{ negative: invalid }"
        :disabled="submitting"
        @click="toggleEditing"
        )

        i.notched.circle.loading.icon(v-if="submitting")
        i.cancel.icon(v-else-if="errors.any() || editing && !modified")
        i.save.icon(v-else-if="!errors.any() && editing && modified")
        i.edit.icon(v-else-if="!editing")
</template>

<script lang="ts">
import FieldEdit from '../mixins/field-edit.vue';

export default FieldEdit.extend({
  name: 'UserEmailEdit',

  created() {
    this.key = 'email';
  }
});
</script>
