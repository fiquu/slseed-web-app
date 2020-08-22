<i18n>
en:
  TITLE: Reset Password
  SUBTITLE: Enter your email to reset your password.
  HAVE_PASSWORD: I have my password
  HAVE_CODE: I already have a recovery code
  FORM:
    SUBMIT: Request a recovery code
  MESSAGES:
    INFO:
      TEXT: "If you already have a recovery code, enter your email and press: {link}."
    ERRORS:
      LIMIT_EXCEEDED: Please wait a while before retrying.
      USER_NOT_FOUND: Check your email is right.
      NOT_AUTHORIZED: Please contact your account administrator.
      UNKNOWN: "Couldn't fulfill the request."
</i18n>

<template lang="pug">
section.p-grid.p-justify-center.p-nogutter.p-p-3
  .p-col.p-md-8.p-lg-6.p-xl-2
    p-card.p-mb-4.p-text-center
      template(#header)
        i.pi.pi-key.p-mt-4(style={ fontSize: '2rem' })

      template(#title)
        | {{ $t('TITLE') }}

      template(#content)
        | {{ $t('SUBTITLE') }}

    .p-card
      .p-card-body
        p-message(:closable="false")
          i18n(path="MESSAGES.INFO.TEXT", tag="div")
            template(#link)
              strong {{ $t('HAVE_CODE') }}

        validation-observer.p-fluid(
          @submit.prevent="submit()",
          v-slot="{ invalid }",
          ref="form",
          tag="form"
        )
          email-input.p-field(
            :disabled="submitting",
            v-model="data.email",
          )

          p-button(
            :icon="submitting ? 'pi pi-spin pi-spinner' : 'pi pi-sign-in'",
            :disabled="invalid || submitting",
            :label="$t('FORM.SUBMIT')",
            icon-pos="right",
            type="submit"
          )

          p-button.p-button.p-button-link.p-mt-2(
            :disabled="invalid || submitting",
            @click="onSubmitSuccess()",
            :label="$t('HAVE_CODE')",
            type="button"
          )

    .p-text-center.p-m-4
      router-link.p-button.p-button-link(to="/users/sign-in")
        | {{ $t('HAVE_PASSWORD') }}

  reset-modal(:email="data.email", ref="modal", display="showModal")
</template>

<script lang="ts">
import Vue from 'vue';

import EmailInput from '../../core/components/inputs/email.vue';
import ResetModal from '../components/reset-modal.vue';

interface SubmitError extends Error {
  code: string;
}

interface Data {
  submitting: boolean;
  data: {
    password: string;
    email: string;
    code: string;
  };
}

interface Methods {
  onSubmitError(err: SubmitError): void;
  onSubmitSuccess(): void;
  submit(): Promise<void>;
  afterError(): void;
}

export default Vue.extend<Data, Methods, unknown>({
  components: {
    EmailInput,
    ResetModal
  },

  data() {
    return {
      submitting: false,
      showModal: false,
      data: {
        password: '',
        email: '',
        code: ''
      }
    };
  },

  beforeCreate() {
    if (this.$session.signedIn) {
      this.$router.push('/');
    }
  },

  methods: {
    onSubmitSuccess() {
      const $modal: any = this.$refs.modal; // eslint-disable-line @typescript-eslint/no-explicit-any

      $modal.show();
    },

    afterError() {
      this.submitting = false;
    },

    onSubmitError(err) {
      const timeout = setTimeout(() => this.afterError(), 30000);

      switch (err.code) {
        case 'NotAuthorizedException':
          clearTimeout(timeout);
          this.$router.push('/');
          this.$toast.add({
            detail: this.$t('MESSAGES.ERRORS.NOT_AUTHORIZED'),
            severity: 'warn'
          });
          break;

        case 'LimitExceededException':
          this.$toast.add({
            detail: this.$t('MESSAGES.ERRORS.LIMIT_EXCEEDED'),
            severity: 'error'
          });
          break;

        case 'UserNotFoundException':
          this.$toast.add({
            detail: this.$t('MESSAGES.ERRORS.USER_NOT_FOUND'),
            severity: 'error'
          });
          break;

        default:
          this.$toast.add({
            detail: this.$t('MESSAGES.ERRORS.UNKNOWN'),
            severity: 'error'
          });
      }
    },

    async submit() {
      this.submitting = true;

      try {
        await this.$auth.forgotPassword(this.data.email);

        this.onSubmitSuccess();
      } catch (err) {
        console.error(err);
        this.onSubmitError(err);
      }

      this.submitting = false;
    }
  }
});
</script>

<style lang="sass" scoped>
.ui.centered.grid.container
  .doubling.two.column.row
    .column
      padding: 0
</style>
