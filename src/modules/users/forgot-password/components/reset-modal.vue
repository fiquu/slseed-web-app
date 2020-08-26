<i18n>
en:
  TITLE: 'Attention!'
  BODY: 'Follow the instructions to reset your password:'
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
  template(#header)
    h3 {{ $t('TITLE') }}

  template
    el-form(
      @submit.prevent="submit()",
      autocomplete="off",
      tag="form"
    )
      strong {{ $t('BODY') }}

      ol
        li {{ $t('INSTRUCTIONS.0') }}
        li {{ $t('INSTRUCTIONS.1') }}
        li {{ $t('INSTRUCTIONS.2') }}
        li {{ $t('INSTRUCTIONS.3') }}
        li {{ $t('INSTRUCTIONS.4') }}
        li {{ $t('INSTRUCTIONS.5') }}
        li {{ $t('INSTRUCTIONS.6') }}
        li {{ $t('INSTRUCTIONS.7') }}

      .p-fluid
        code-input(:disabled="submitting", v-model="data.code", autofocus)
        new-password-input(:disabled="submitting", v-model="data.password")

        el-button(
          :disabled="invalid || submitting",
          icon="pi pi-chevron-circle-right",
          :label="$t('FORM.CONFIRM')",
          icon-pos="right",
          type="submit"
        )

        el-button(
          :label="$t('FORM.CANCEL')",
          :disabled="submitting",
          @click="cancel()",
          type="reset"
        )
</template>

<script lang="ts">
import Vue from 'vue';

import NewPasswordInput from '../../core/components/inputs/new-password.vue';
import CodeInput from '../../core/components/inputs/code.vue';

interface SubmitError extends Error {
  code: string;
}

interface Data {
  submitting: boolean;
  data: {
    password: string;
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
      data: {
        password: '',
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
          this.$message.error(String(this.$t('MESSAGES.ERRORS.LIMIT_EXCEEDED')));
          break;

        case 'UserNotFoundException':
          this.$message.error(String(this.$t('MESSAGES.ERRORS.USER_NOT_FOUND')));
          break;

        case 'CodeMismatchException':
          this.$message.error(String(this.$t('MESSAGES.ERRORS.INVALID_CODE')));
          break;

        case 'ExpiredCodeException':
          this.$message.warning(String(this.$t('MESSAGES.ERRORS.EXPIRED_CODE')));
          break;

        case 'NotAuthorizedException':
          this.$message.warning(String(this.$t('MESSAGES.ERRORS.NOT_AUTHORIZED')));
          break;

        default:
          this.$message.error(String(this.$t('MESSAGES.ERRORS.UNKNOWN')));
      }
    },

    onSubmitSuccess() {
      this.$message.success(String(this.$t('MESSAGES.SUBMIT.SUCCESS')));
      this.$router.replace('/users/sign-in');
    },

    async submit() {
      this.submitting = true;

      const { code, password } = this.data;

      try {
        await this.$auth.forgotPasswordSubmit(this.email, code, password);

        this.onSubmitSuccess();
      } catch (err) {
        this.onSubmitError(err);
      }

      this.submitting = false;
    },

    cancel() {
      this.data.password = '';
      this.data.code = '';

      this.$emit('hide');
    }
  }
});
</script>
