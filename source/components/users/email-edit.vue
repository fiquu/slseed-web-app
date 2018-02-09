<i18n>
{
  "en": {
    "MESSAGES": {
      "SUBMIT": {
        "ERROR": "Couldn't update email."
      }
    }
  }
}
</i18n>

<template lang="pug">
.field(
  v-if='user'
  :class=`{
    error: errors.any()
  }`
  )

  .ui.fluid.action.input
    input(
      :disabled='!isEditing || isSubmitting'
      v-validate.initial=`'required|email'`
      @change='onValueChanged()'
      @input='onValueChanged()'
      :readonly='!isEditing'
      v-model='data.email'
      name='data-email'
      minlength='5'
      type='email'
      )

    button.ui.icon.button(
      :disabled=`isSubmitting`
      @click='toggleEditing()'
      :class=`{
        negative: errors.any()
      }`
      )

      i.notched.circle.loading.icon(v-if='isSubmitting')
      i.cancel.icon(v-else-if=`errors.any() || isEditing && !isModified`)
      i.save.icon(v-else-if=`!errors.any() && isEditing && isModified`)
      i.edit.icon(v-else-if='!isEditing')
</template>

<script>
import AWS from 'aws-sdk';

const { toastr } = window;

export default {
  name: 'user-email-edit',

  props: ['params', 'user'],

  data() {
    return {
      isSubmitting: false,
      isModified: false,
      isEditing: false,

      cognito: new AWS.CognitoIdentityServiceProvider(),

      data: {
        email: String(this.user.email)
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
          if (this.errors.any()) {
            this.data.email = String(this.user.email);
            this.isModified = false;
          } else {
            this.submit();
          }
        }
      } else {
        this.isEditing = true;
      }
    },

    /**
     * On value modified callback.
     */
    onValueChanged() {
      this.isModified = this.data.email !== this.user.email;
    },

    /**
     * Attribute update callback.
     */
    onSubmit(err) {
      if (err) {
        toastr.error(this.$t('MESSAGES.SUBMIT.ERROR'));
        this.isEditing = true;
      } else {
        this.user.email = String(this.data.email);
      }

      this.isSubmitting = false;
      this.isModified = !!err;
    },

    /**
     * Submits the new attribute data.
     */
    submit() {
      this.isSubmitting = true;
      this.isEditing = false;

      this.params.Username = this.user.sub;
      this.params.UserAttributes = [
        {
          Name: 'email',
          Value: this.data.email
        }
      ];

      this.cognito.adminUpdateUserAttributes(this.params, this.onSubmit);
    }
  }
};
</script>
