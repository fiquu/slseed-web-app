<i18n>
en:
  TITLE: 'Attention!'
  BODY: 'Follow these instructions to reset your password:'
  INSTRUCTIONS:
    - Don't close this window.
    - Go to your email inbox.
    - Open the message we've sent you.
    - Search the recovery code and copy it.
    - Come back to this window and paste the recovery code.
    - Enter your new password.
    - Confirm the modification.
    - Done!
  FORM:
    CONFIRM: Confirm
    CANCEL: Cancel
  MESSAGES:
    SUBMIT:
      SUCCESS: Please sign in with your new password.
    ERRORS:
      LIMIT_EXCEEDED: Please wait a while before retrying.
      USER_NOT_FOUND: Check your email is right.
      INVALID_CODE: That recovery code is not valid.
      EXPIRED_CODE: Please request a new recovery code.
      NOT_AUTHORIZED: Please contact your account administrator.
      UNKNOWN: "Couldn't fulfill the request."
</i18n>

<template lang="pug">
el-dialog(:visible.sync="show", :modal="true", :closable="false")
  template(#title) {{ $t('TITLE') }}

  template
    el-form(autocomplete="off", :model="model", ref="form", status-icon)
      strong {{ $t('BODY') }}

      ol.list-decimal.list-inside
        li {{ $t('INSTRUCTIONS.0') }}
        li {{ $t('INSTRUCTIONS.1') }}
        li {{ $t('INSTRUCTIONS.2') }}
        li {{ $t('INSTRUCTIONS.3') }}
        li {{ $t('INSTRUCTIONS.4') }}
        li {{ $t('INSTRUCTIONS.5') }}
        li {{ $t('INSTRUCTIONS.6') }}
        li {{ $t('INSTRUCTIONS.7') }}

      el-divider

      code-input(:disabled="submitting", v-model="model.code", autofocus)
      new-password-input(:disabled="submitting", v-model="model.newPassword")

      el-button.w-full(
        icon="pi pi-chevron-circle-right",
        :disabled="!valid || submitting",
        :loading="submitting",
        @click="submit()",
        type="primary"
      )
        | {{ $t('FORM.CONFIRM') }}

      .pt-3

      el-button.w-full(:disabled="submitting", @click="cancel()", type="text")
        | {{ $t('FORM.CANCEL') }}
</template>

<script lang="ts">
import Vue from 'vue';

import FormValid from '@/modules/core/mixins/form/valid.vue';

import NewPasswordInput from '../../core/components/inputs/new-password.vue';
import CodeInput from '../../core/components/inputs/code.vue';

interface SubmitError extends Error {
  code: string;
}

interface Data {
  submitting: boolean;
  model: {
    newPassword: string;
    code: string;
  };
}

interface Methods {
  onSubmitError(err: SubmitError): void;
  onSubmitSuccess(): void;
  submit(): Promise<void>;
  afterError(): void;
  cancel(): void;
}

interface Props {
  show: boolean;
  email: string;
}

export default Vue.extend<Data, Methods, unknown, Props>({
  components: {
    NewPasswordInput,
    CodeInput
  },

  mixins: [FormValid],

  props: {
    show: {
      type: Boolean
    },
    email: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      submitting: false,
      model: {
        newPassword: '',
        code: ''
      }
    };
  },

  methods: {
    afterError() {
      this.submitting = false;
    },

    onSubmitError(err) {
      switch (err.code) {
        case 'LimitExceededException':
          this.$message.error(this.$t('MESSAGES.ERRORS.LIMIT_EXCEEDED').toString());
          break;

        case 'UserNotFoundException':
          this.$message.error(this.$t('MESSAGES.ERRORS.USER_NOT_FOUND').toString());
          break;

        case 'CodeMismatchException':
          this.$message.error(this.$t('MESSAGES.ERRORS.INVALID_CODE').toString());
          break;

        case 'ExpiredCodeException':
          this.$message.warning(this.$t('MESSAGES.ERRORS.EXPIRED_CODE').toString());
          break;

        case 'NotAuthorizedException':
          this.$message.warning(this.$t('MESSAGES.ERRORS.NOT_AUTHORIZED').toString());
          break;

        default:
          this.$message.error(this.$t('MESSAGES.ERRORS.UNKNOWN').toString());
      }
    },

    onSubmitSuccess() {
      this.$message.success(this.$t('MESSAGES.SUBMIT.SUCCESS').toString());
      this.$router.replace('/users/sign-in');
    },

    async submit() {
      this.submitting = true;

      const { code, newPassword } = this.model;

      try {
        await this.$auth.forgotPasswordSubmit(this.email, code, newPassword);

        this.onSubmitSuccess();
      } catch (err) {
        this.onSubmitError(err);
      }

      this.submitting = false;
    },

    cancel() {
      this.model.newPassword = '';
      this.model.code = '';

      this.$emit('hide');
    }
  }
});
</script>
