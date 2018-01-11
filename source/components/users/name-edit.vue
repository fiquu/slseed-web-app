<i18n>
{
  "es": {
    "MESSAGES": {
      "SUBMIT": {
        "ERROR": "No se pudo actualizar el nombre"
      }
    }
  }
}
</i18n>

<template lang="pug">
.field(
  v-if='user'
  :class=`{
    error: errors.has('data-name')
  }`
  )

  .ui.fluid.action.input
    input(
      :disabled='!isEditing || isSubmitting'
      v-validate=`'required|min:3'`
      @change='onValueChanged()'
      @input='onValueChanged()'
      :readonly='!isEditing'
      v-model='data.name'
      name='data-name'
      minlength='3'
      type='text'
      )

    button.ui.icon.button(
      :disabled=`isSubmitting`
      @click='toggleEditing()'
      :class=`{
        negative: errors.has('data-name')
      }`
      )

      i.notched.circle.loading.icon(v-if='isSubmitting')
      i.cancel.icon(v-else-if=`errors.has('data-name') || isEditing && !isModified`)
      i.save.icon(v-else-if=`!errors.has('data-name') && isEditing && isModified`)
      i.edit.icon(v-else-if='!isEditing')
</template>

<script>
import AWS from 'aws-sdk';

export default {
  name: 'user-name-edit',

  props: ['params', 'user'],

  data() {
    return {
      isSubmitting: false,
      isModified: false,
      isEditing: false,

      cognito: new AWS.CognitoIdentityServiceProvider(),

      data: {
        name: String(this.user.name)
      }
    };
  },

  methods: {
    /**
     * Toggles editing mode.
     */
    toggleEditing() {
      if (this.isEditing) {
        this.isEditing = false;

        if (this.isModified) {
          if (this.errors.has('data-name')) {
            this.data.name = String(this.user.name);
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
     * On value modified callback.
     */
    onValueChanged() {
      this.isModified = this.user.name !== this.data.name;
    },

    /**
     * Attribute update callback.
     */
    onSubmit(err) {
      if (err) {
        toastr.error(this.$t('MESSAGES.SUBMIT.ERROR'));
        this.isEditing = true;
      } else {
        this.user.name = String(this.data.name);
      }

      this.isSubmitting = false;
      this.isModified = !!err;
    },

    /**
     * Submits the new attribute data.
     */
    submit() {
      this.isSubmitting = true;

      this.params.Username = this.user.sub;
      this.params.UserAttributes = [
        {
          Name: 'name',
          Value: this.data.name
        }
      ];

      this.cognito.adminUpdateUserAttributes(this.params, this.onSubmit);
    }
  }
};
</script>

