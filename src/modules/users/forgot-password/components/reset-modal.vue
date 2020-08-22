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
p-dialog(:visible="show", :modal="true")
  template(#header)
    h3 {{ $t('TITLE') }}

  template
    validation-observer(
      :name="`password-reset-${_uid}`"
      @submit.prevent="submit()",
      v-slot="{ invalid }",
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

      .p-field
        p-button(
          :disabled="invalid || submitting",
          :label="$t('FORM.CONFIRM')",
          @click="submit()"
        )

      p-button.p-button-outlined(
        :label="$t('FORM.CANCEL')",
        :disabled="submitting",
        @click="$emit('hide')",
        type="button"
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

  watch: {
    show(value) {
      console.log('Show:', value);
    }
  },

  methods: {
    afterError() {
      this.submitting = false;
    },

    onSubmitError(err) {
      switch (err.code) {
        case 'LimitExceededException':
          this.$toast.add({
            detail: this.$t('MESSAGES.ERRORS.LIMIT_EXCEEDED'),
            severity: 'error',
            life: 5000
          });
          break;

        case 'UserNotFoundException':
          this.$toast.add({
            detail: this.$t('MESSAGES.ERRORS.USER_NOT_FOUND'),
            severity: 'error',
            life: 5000
          });
          break;

        case 'CodeMismatchException':
          this.$toast.add({
            detail: this.$t('MESSAGES.ERRORS.INVALID_CODE'),
            severity: 'error',
            life: 5000
          });
          break;

        case 'ExpiredCodeException':
          this.$toast.add({
            detail: this.$t('MESSAGES.ERRORS.EXPIRED_CODE'),
            severity: 'warn',
            life: 5000
          });
          break;

        case 'NotAuthorizedException':
          this.$toast.add({
            detail: this.$t('MESSAGES.ERRORS.NOT_AUTHORIZED'),
            severity: 'warn',
            life: 5000
          });
          break;

        default:
          this.$toast.add({
            detail: this.$t('MESSAGES.ERRORS.UNKNOWN'),
            severity: 'error',
            life: 5000
          });
      }
    },

    onSubmitSuccess() {
      this.$toast.add({
        detail: this.$t('MESSAGES.SUBMIT.SUCCESS'),
        severity: 'success',
        life: 5000
      });

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
    }
  }
});
</script>
