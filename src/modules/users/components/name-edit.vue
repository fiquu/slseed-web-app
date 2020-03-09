<i18n>
en:
  MESSAGES:
    SUBMIT:
      ERROR: "Couldn't update name."
</i18n>

<template lang="pug">
validation-provider.ui.fluid.action.input(
  rules="required|min:3"
  v-slot="{ classes }"
  ref="validator"
  slim
  )

  .field(:class="classes")
    input(
      :disabled="!editing || submitting"
      @change="onValueChanged"
      @input="onValueChanged"
      :readonly="!editing"
      v-model="data.value"
      minlength="3"
      name="value"
      type="text"
      )

  button.ui.icon.button(
    :class="{ negative: invalid }"
    :disabled="submitting"
    @click="toggleEditing"
    )

    i.notched.circle.loading.icon(v-if="submitting")
    i.cancel.icon(v-else-if="errors.has('value') || editing && !modified")
    i.save.icon(v-else-if="!errors.has('value') && editing && modified")
    i.edit.icon(v-else-if="!editing")
</template>

<script lang="ts">
import FieldEdit from '../mixins/field-edit.vue';

export default FieldEdit.extend({
  name: 'UserEmailEdit',

  created() {
    this.key = 'name';
  }
});
</script>
