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
section.ui.basic.segment
  .ui.text.container
    .ui.center.aligned.primary.segment
      h3.ui.primary.icon.header
        i.circular.asterisk.icon
        .content {{ $t('TITLE') }}
          .sub.header {{ $t('SUBTITLE') }}

    .ui.visible.info.icon.message
      i.info.circle.icon
      i18n.content(path="MESSAGES.INFO.TEXT", tag="div")
        template(v-slot:link)
          strong {{ $t('HAVE_CODE') }}

    validation-observer.ui.form(
      @submit.prevent="submit()",
      v-slot="{ invalid }",
      ref="form",
      tag="form"
    )
      email-input.required.field(
        :disabled="submitting",
        v-model="data.email",
        :class="fieldClass"
      )

      button.ui.primary.fluid.right.labeled.icon.submit.button(
        :disabled="invalid || submitting",
        :class="buttonClass",
        type="submit"
      )
        | {{ $t('FORM.SUBMIT') }}
        i.chevron.right.icon

      .ui.basic.vertical.segment
        button.ui.fluid.basic.button(
          :disabled="invalid || submitting",
          @click="onSubmitSuccess()",
          type="button"
        )
          | {{ $t('HAVE_CODE') }}

      .ui.center.aligned.basic.vertical.segment
        router-link.ui.link(to="/users/sign-in")
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

interface Computed {
  fieldClass: {
    disabled: boolean;
  };

  buttonClass: {
    disabled: boolean;
    loading: boolean;
  };
}

export default Vue.extend<Data, Methods, Computed>({
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

  computed: {
    fieldClass() {
      return {
        disabled: this.submitting
      };
    },

    buttonClass() {
      return {
        disabled: this.submitting,
        loading: this.submitting
      };
    }
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

      console.error(err);

      switch (err.code) {
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

        case 'NotAuthorizedException':
          clearTimeout(timeout);
          this.$router.push('/');
          this.$toast.add({
            detail: this.$t('MESSAGES.ERRORS.NOT_AUTHORIZED'),
            severity: 'warn'
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
