<i18n>
en:
  TITLE: Reset Password
  SUBTITLE: Enter your email to reset your password.
  HAVE_PASSWORD: I have my password
  HAVE_CODE: I already have a recovery code
  FORM:
    EMAIL:
      PLACEHOLDER: Enter your email...
      LABEL: Email
    SUBMIT: Request a recovery code
  MESSAGES:
    INFO: 'If you already have a recovery code, enter your email and press "I already have a recovery code".'
    CONFIRM:
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
section.view
  .ui.centered.grid.container
    .doubling.two.column.row
      .column
        .ui.basic.vertical.segment
          .ui.center.aligned.primary.segment
            h3.ui.primary.icon.header
              i.circular.asterisk.icon
              .content {{ $t('TITLE') }}
                .sub.header {{ $t('SUBTITLE') }}

          form.ui.form(@submit.prevent="submit")
            .ui.negative.icon.message(v-if="error")
              i.exclamation.triangle.icon
              .content
                .header {{ $t('FORM.ERROR.MESSAGE.TITLE') }}
                p {{ $t('FORM.ERROR.MESSAGE.BODY') }}

            .ui.info.icon.message
              i.info.circle.icon
              .content {{ $t('MESSAGES.INFO.BODY') }}

            .required.field(:class="fieldClass")

              label(for="email-input")
                | {{ $t('FORM.EMAIL.LABEL') }}

              input#email-input(
                :placeholder="$t('FORM.EMAIL.PLACEHOLDER')"
                v-validate.initial="'required|email'"
                :disabled="submitting"
                v-model="data.email"
                name="email"
                type="email"
                required
                )

            button.ui.primary.fluid.right.labeled.icon.submit.button(
              :disabled="errors.has('email') || submitting"
              :class="buttonClass"
              type="submit"
              )

              | {{ $t('FORM.SUBMIT') }}
              i.chevron.right.icon

            .ui.basic.vertical.segment
              button.ui.fluid.basic.button(
                :disabled="errors.has('email') || submitting"
                @click="onInputVerificationCode"
                type="button"
                )

                | {{ $t('HAVE_CODE') }}

            .ui.center.aligned.basic.vertical.segment
              router-link.ui.link(to="/")
                | {{ $t('HAVE_PASSWORD') }}

  reset-modal(ref="modal")
</template>

<script lang="ts">
import Vue from 'vue';

import ResetModal from '../components/forgot-password/reset-modal.vue';

interface PasswordError extends Error {
  code: string;
}

interface ComponentData {
  submitting: boolean;
  confirming: boolean;
  error: boolean;
  data: {
    password: string;
    email: string;
    code: string;
  };
}

export default Vue.extend({
  components: {
    ResetModal
  },

  data(): ComponentData {
    return {
      submitting: false,
      confirming: false,
      error: false,
      data: {
        password: '',
        email: '',
        code: ''
      }
    };
  },

  computed: {
    fieldClass(): object {
      return {
        disabled: this.submitting
      };
    },

    confirmClass(): object {
      return {
        loading: this.confirming
      };
    }
  },

  beforeCreate() {
    if (this.$session.signedIn) {
      this.$router.push('/');
    }
  },

  mounted() {
    const $el = this.$$(this.$refs.modal) as JQuery;

    $el.modal();
  },

  methods: {
    /**
     * Input verification code callback.
     */
    onSubmitSuccess(): void {
      const $el = this.$$(this.$refs.modal) as JQuery;

      $el.modal('show');
    },

    /**
     * Confirm success callback.
     */
    onConfirmSuccess(): void {
      this.$toast.success(this.$t('MESSAGES.CONFIRM.SUCCESS'));

      const $el = this.$$(this.$refs.modal) as JQuery;

      $el.modal('hide');

      this.$router.replace('/');
    },

    /**
     * Confirms new password.
     */
    async confirm(): Promise<void> {
      this.confirming = true;

      const { email, code, password } = this.data;

      try {
        await this.$auth.forgotPasswordSubmit(email, code, password);

        this.onConfirmSuccess();
      } catch (err) {
        console.error();
      }

      this.confirming = false;
    },

    /**
     * Cancels password confirm modal.
     */
    cancel(): void {
      this.submitting = false;
    },

    /**
     * After error callback.
     */
    afterError(): void {
      this.submitting = false;
      this.confirming = false;
    },

    /**
     * Submit error callback.
     *
     * @param {object} err HTTP response object.
     */
    onError(err: PasswordError): void {
      console.error(err);

      const $el = this.$$(this.$refs.modal) as JQuery;

      $el.modal('hide');

      switch (err.code) {
        case 'LimitExceededException':
          this.$toast.error(this.$t('MESSAGES.ERRORS.LIMIT_EXCEEDED'));
          setTimeout(() => this.afterError(), 30000);
          break;

        case 'UserNotFoundException':
          this.$toast.error(this.$t('MESSAGES.ERRORS.USER_NOT_FOUND'));
          setTimeout(() => this.afterError(), 3000);
          break;

        case 'CodeMismatchException':
          this.$toast.error(this.$t('MESSAGES.ERRORS.INVALID_CODE'));
          setTimeout(() => this.afterError(), 3000);
          break;

        case 'ExpiredCodeException':
          this.$toast.warning(this.$t('MESSAGES.ERRORS.EXPIRED_CODE'));
          setTimeout(() => this.afterError(), 3000);
          break;

        case 'NotAuthorizedException':
          this.$toast.warning(this.$t('MESSAGES.ERRORS.NOT_AUTHORIZED'));
          this.$router.push('/');
          break;

        default:
          this.$toast.error(this.$t('MESSAGES.ERRORS.UNKNOWN'));
          setTimeout(() => this.afterError(), 3000);
      }
    },

    /**
     * Sends the recovery code.
     */
    async submit(): Promise<void> {
      this.submitting = true;

      try {
        await this.$auth.forgotPassword(this.data.email);

        this.onSubmitSuccess();
      } catch (err) {
        console.error(err);
        this.onError(err);
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
