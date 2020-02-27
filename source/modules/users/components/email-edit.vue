<i18n>
en:
  MESSAGES:
    SUBMIT:
      ERROR: "Couldn't update email."
</i18n>

<template lang="pug">
.field(
  :class="fieldClass"
  v-if="user"
  )

  .ui.fluid.action.input
    input(
      v-validate.initial="'required|email'"
      :disabled="!editing || submitting"
      @change="onValueChanged"
      @input="onValueChanged"
      :readonly="!editing"
      v-model="data.email"
      name="data-email"
      minlength="5"
      type="email"
      )

    button.ui.icon.button(
      @click="toggleEditing"
      :disabled="submitting"
      :class="buttonClass"
      )

      i.notched.circle.loading.icon(v-if="submitting")
      i.cancel.icon(v-else-if="errors.any() || editing && !modified")
      i.save.icon(v-else-if="!errors.any() && editing && modified")
      i.edit.icon(v-else-if="!editing")
</template>

<script>
import AWS from 'aws-sdk';

export default {
  name: 'UserEmailEdit',

  props: {
    params: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      submitting: false,
      modified: false,
      editing: false,

      cognito: new AWS.CognitoIdentityServiceProvider(),

      data: {
        email: String(this.user.email)
      }
    };
  },

  computed: {
    fieldsClass() {
      return {
        error: errors.any()
      };
    },

    buttonClass() {
      return {
        negative: errors.any()
      };
    }
  },

  methods: {
    /**
     * Toggles editing mode.
     */
    toggleEditing() {
      if (this.editing) {
        this.editing = false;

        if (this.modified) {
          if (this.errors.any()) {
            this.data.email = String(this.user.email);
            this.modified = false;
          } else {
            this.submit();
          }
        }
      } else {
        this.editing = true;
      }
    },

    /**
     * On value modified callback.
     */
    onValueChanged() {
      this.modified = this.data.email !== this.user.email;
    },

    /**
     * Attribute update callback.
     */
    onSubmit(err) {
      if (err) {
        this.$toast.error(this.$t('MESSAGES.SUBMIT.ERROR'));
        this.editing = true;
      } else {
        this.user.email = String(this.data.email);
      }

      this.submitting = false;
      this.modified = !!err;
    },

    /**
     * Submits the new attribute data.
     */
    submit() {
      this.submitting = true;
      this.editing = false;

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
