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
    CODE:
      PLACEHOLDER: Enter your recovery code...
      LABEL: Recovery Code
    PASSWORD:
      PLACEHOLDER: Enter your new password...
      LABEL: New Password
    SUBMIT: Request a recovery code
  RESET:
    TITLE: 'Attention!'
    BODY: 'Follow this instructions to reset your password:'
    INSTRUCTIONS:
      - "Don't close this window."
      - Go to your email inbox.
      - "Open the message we've sent you."
      - Search the recovery code and copy it.
      - Come back to this window and paste the recovery code.
      - Enter your new password.
      - Confirm the modification.
      - 'Done!'
    CONFIRM: Confirm
    CANCEL: Cancel
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

  .ui.mini.modal(ref="resetPasswordModal")
    .header {{ $t('RESET.TITLE') }}
    .content
      p
        strong {{ $t('RESET.BODY') }}

      ol.ui.list
        li {{ $t('RESET.INSTRUCTIONS.0') }}
        li {{ $t('RESET.INSTRUCTIONS.1') }}
        li {{ $t('RESET.INSTRUCTIONS.2') }}
        li {{ $t('RESET.INSTRUCTIONS.3') }}
        li {{ $t('RESET.INSTRUCTIONS.4') }}
        li {{ $t('RESET.INSTRUCTIONS.5') }}
        li {{ $t('RESET.INSTRUCTIONS.6') }}
        li {{ $t('RESET.INSTRUCTIONS.7') }}

      .ui.divider

      form.ui.form(@submit.prevent="")
        .required.field(:class="formCodeClass")
          label(for="code-input")
            | {{ $t('FORM.CODE.LABEL') }}

          input#code-input(
            :placeholder="$t('FORM.CODE.PLACEHOLDER')"
            v-validate.initial="'required|min:1'"
            :disabled="confirming"
            v-model="data.code"
            type="number"
            name="code"
            required
            )

        .required.field(:class="fieldClass")
          label(for="password-input")
            | {{ $t('FORM.PASSWORD.LABEL') }}

          input#password-input(
            :placeholder="$t('FORM.PASSWORD.PLACEHOLDER')"
            v-validate.initial="'required|min:8'"
            :disabled="confirming"
            v-model="data.password"
            type="password"
            name="password"
            required
            )

    .actions
      button.ui.cancel.basic.button(
        :disabled="confirming"
        type="button"
        )

        | {{ $t('RESET.CANCEL') }}

      button.ui.primary.button(
        :disabled="errors.has('code') || errors.has('password') || confirming"
        :class="confirmClass"
        @click="confirm"
        type="button"
        )

        | {{ $t('RESET.CONFIRM') }}
</template>

<script lang="ts">
import Vue from 'vue';

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
  data() {
    const data: ComponentData = {
      submitting: false,
      confirming: false,
      error: false,
      data: {
        password: '',
        email: '',
        code: ''
      }
    };

    return data;
  },

  computed: {
    fieldClass(): any {
      return {
        disabled: this.submitting
      };
    },

    confirmClass(): any {
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
    const $el: any = this.$$(this.$refs.resetPasswordModal);

    $el.modal({
      onApprove: this.confirm,
      onDeny: this.cancel,
      closable: false
    });
  },

  methods: {
    /**
     * Input verification code callback.
     */
    onSubmitSuccess(): void {
      const $el: any = this.$$(this.$refs.resetPasswordModal);

      $el.modal('show');
    },

    /**
     * Confirm success callback.
     */
    onConfirmSuccess(): void {
      this.$toast.success(this.$t('MESSAGES.CONFIRM.SUCCESS'));

      const $el: any = this.$$(this.$refs.resetPasswordModal);

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
    onError(err: Error | any): void {
      console.error(err);

      const $el: any = this.$$(this.$refs.resetPasswordModal);

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
