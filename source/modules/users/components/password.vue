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
    INFO:
      BODY: 'If you already have a recovery code, enter your email and press "I already have a recovery code".'
    SUCCESS:
      TITLE: 'Done!'
      BODY: Please sign in with your new password.
    LIMIT_EXCEEDED:
      BODY: Please wai a while before retrying.
    USER_NOT_FOUND:
      BODY: Check your email is right.
    INVALID_CODE:
      BODY: That recovery code is not valid.
    EXPIRED_CODE:
      BODY: Please request a new recovery code.
    NOT_AUTHORIZED:
      BODY: Please contact your account administrator.
    ERROR:
      BODY: "Couldn't fulfill the request."
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
            .ui.negative.icon.message(v-if="state.error")
              i.exclamation.triangle.icon
              .content
                .header {{ $t('FORM.ERROR.MESSAGE.TITLE') }}
                p {{ $t('FORM.ERROR.MESSAGE.BODY') }}

            .ui.info.icon.message
              i.info.circle.icon
              .content {{ $t('MESSAGES.INFO.BODY') }}

            .required.field(:class="emailFieldClass")

              label(for="email-input")
                | {{ $t('FORM.EMAIL.LABEL') }}

              input#email-input(
                :placeholder="$t('FORM.EMAIL.PLACEHOLDER')"
                v-validate.initial="'required|email'"
                :disabled="state.submitting"
                v-model="data.email"
                name="email"
                type="email"
                required
                )

            button.ui.primary.fluid.right.labeled.icon.submit.button(
              :disabled="errors.has('email') || state.submitting"
              :class="buttonClass"
              type="submit"
              )

              | {{ $t('FORM.SUBMIT') }}
              i.chevron.right.icon

            .ui.basic.vertical.segment
              button.ui.fluid.basic.button(
                :disabled="errors.has('email') || state.submitting"
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
            :disabled="state.confirming"
            v-model="data.code"
            type="number"
            name="code"
            required
            )

        .required.field(:class="formPasswordClass")
          label(for="password-input")
            | {{ $t('FORM.PASSWORD.LABEL') }}

          input#password-input(
            :placeholder="$t('FORM.PASSWORD.PLACEHOLDER')"
            v-validate.initial="'required|min:8'"
            :disabled="state.confirming"
            v-model="data.password"
            type="password"
            name="password"
            required
            )

    .actions
      button.ui.cancel.basic.button(
        :disabled="state.confirming"
        type="button"
        )

        | {{ $t('RESET.CANCEL') }}

      button.ui.primary.button(
        :disabled="errors.has('code') || errors.has('password') || state.confirming"
        :class="formConfirmClass"
        @click="confirm"
        type="button"
        )

        | {{ $t('RESET.CONFIRM') }}
</template>

<script>
export default {
  computed: {
    emailFieldClass() {
      return {
        error: this.fields.email && this.fields.email.dirty && this.errors.has('email'),
        disabled: this.state.submitting
      };
    },

    buttonClass() {
      return {
        loading: this.state.submitting
      };
    },

    formCodeClass() {
      return {
        error: this.fields.code && this.fields.code.dirty && this.errors.has('code'),
        disabled: this.state.confirming
      };
    },

    formPasswordClass() {
      return {
        error: this.fields.password && this.fields.password.dirty && this.errors.has('password'),
        disabled: this.state.confirming
      };
    },

    formConfirmClass() {
      return {
        loading: this.state.confirming
      };
    }
  },

  data() {
    return {
      state: {
        submitting: false,
        confirming: false,
        codeSent: false,
        error: false
      },

      data: {
        email: null
      }
    };
  },

  beforeCreate() {
    if (this.$auth.isSignedIn()) {
      this.$router.push('/');
    }
  },

  mounted() {
    this.$$(this.$refs.resetPasswordModal).modal({
      onApprove: this.confirm,
      onDeny: this.cancel,
      closable: false
    });
  },

  methods: {
    /**
     * Input verification code callback.
     */
    onInputVerificationCode() {
      this.$$(this.$refs.resetPasswordModal).modal('show');
    },

    /**
     * Confirm success callback.
     */
    onConfirmSuccess() {
      this.state.confirming = false;

      this.$toastr.success(this.$t('MESSAGES.SUCCESS.BODY'), this.$t('MESSAGES.SUCCESS.TITLE'));

      this.$$(this.$refs.resetPasswordModal).modal('hide');

      this.$router.replace('/');
    },

    /**
     * Confirms new password.
     */
    confirm() {
      this.state.confirming = true;

      this.$auth.confirmPassword(this.data, {
        onSuccess: res => this.onConfirmSuccess(res),
        onFailure: err => this.onError(err)
      });
    },

    /**
     * Cancels password confirm modal.
     */
    cancel() {
      this.state.submitting = false;
      this.state.codeSent = false;
    },

    /**
     * Submit success callback.
     */
    onSubmitSuccess() {
      this.state.submitting = false;
      this.state.codeSent = true;

      this.data.password = null;
      this.data.code = null;
    },

    /**
     * After error callback.
     */
    afterError() {
      this.state.submitting = false;
      this.state.confirming = false;
      this.state.codeSent = false;
    },

    /**
     * Submit error callback.
     *
     * @param {Object} err HTTP response object.
     */
    onError(err) {
      console.error(err);

      this.$$(this.$refs.resetPasswordModal).modal('hide');

      switch (err.code) {
        case 'LimitExceededException':
          this.$toastr.error(this.$t('MESSAGES.LIMIT_EXCEEDED.BODY'));
          setTimeout(() => this.afterError(), 30000);
          break;

        case 'UserNotFoundException':
          this.$toastr.error(this.$t('MESSAGES.USER_NOT_FOUND.BODY'));
          setTimeout(() => this.afterError(), 3000);
          break;

        case 'CodeMismatchException':
          this.$toastr.error(this.$t('MESSAGES.INVALID_CODE.BODY'));
          setTimeout(() => this.afterError(), 3000);
          break;

        case 'ExpiredCodeException':
          this.$toastr.warning(this.$t('MESSAGES.EXPIRED_CODE.BODY'));
          setTimeout(() => this.afterError(), 3000);
          break;

        case 'NotAuthorizedException':
          this.$toastr.warning(this.$t('MESSAGES.NOT_AUTHORIZED.BODY'));
          this.$router.push('/');
          break;

        default:
          this.$toastr.error(this.$t('MESSAGES.ERROR.BODY'));
          setTimeout(() => this.afterError(), 3000);
      }
    },

    /**
     * Signs the user in.
     */
    submit() {
      this.state.codeSent = false;
      this.state.error = false;

      this.$validator.validate('email').then(valid => {
        if (!valid) {
          return;
        }

        this.state.submitting = true;

        this.cognitoUser = this.$auth.forgotPassword(this.data, {
          inputVerificationCode: () => this.onInputVerificationCode(),
          onSuccess: res => this.onSubmitSuccess(res),
          onFailure: err => this.onError(err)
        });
      });
    }
  }
};
</script>

<style lang="sass" scoped>
.ui.centered.grid.container
  .doubling.two.column.row
    .column
      padding: 0
</style>
