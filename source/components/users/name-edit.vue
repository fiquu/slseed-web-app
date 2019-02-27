<i18n>
{
  "en": {
    "MESSAGES": {
      "SUBMIT": {
        "ERROR": "Couldn't update name."
      }
    }
  }
}
</i18n>

<template lang="pug">
.field(
  v-if='user'
  :class=`{
    error: errors.has('value')
  }`
  )

  .ui.fluid.action.input
    input(
      :disabled='!isEditing || isSubmitting'
      v-validate=`'required|min:3'`
      @change='onValueChanged()'
      @input='onValueChanged()'
      :readonly='!isEditing'
      v-model='data.value'
      minlength='3'
      name='value'
      type='text'
      )

    button.ui.icon.button(
      :disabled=`isSubmitting`
      @click='toggleEditing()'
      :class=`{
        negative: errors.has('value')
      }`
      )

      i.notched.circle.loading.icon(v-if='isSubmitting')
      i.cancel.icon(v-else-if=`errors.has('value') || isEditing && !isModified`)
      i.save.icon(v-else-if=`!errors.has('value') && isEditing && isModified`)
      i.edit.icon(v-else-if='!isEditing')
</template>

<script>
import AWS from 'aws-sdk';

export default {
  props: ['params', 'user'],

  data() {
    return {
      isSubmitting: false,
      isModified: false,
      isEditing: false,

      data: {
        value: String(this.user.name)
      }
    };
  },

  computed: {
    /**
     * Checks if the value has been modified.
     */
    isModified() {
      return this.user.name !== this.data.value;
    }
  },

  methods: {
    /**
     * Toggles editing mode.
     */
    toggleEditing() {
      if (this.isEditing) {
        this.isEditing = false;

        if (this.isModified) {
          if (this.errors.has('value')) {
            this.data.value = String(this.user.value);
            this.isModified = false;
          } else {
            this.submit();
          }
        }
      } else {
        this.isEditing = true;
      }

      this.$validator.validateAll();
    },

    /**
     * Submits the new attribute data.
     */
    async submit() {
      this.isSubmitting = true;

      try {
        await this.$api.put(`users`, {
          name: this.data.value,
          _id: this.user._id
        });

        this.user.name = String(this.data.value);

        this.isModified = false;
      } catch (err) {
        this.$toastr.error(this.$t('MESSAGES.SUBMIT.ERROR'));

        this.isModified = true;
        this.isEditing = true;

        console.error(err);
      }

      this.isSubmitting = false;
    }
  }
};
</script>
