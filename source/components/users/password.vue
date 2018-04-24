<i18n>
{
  "en": {
    "TITLE": "Reset Password",
    "SUBTITLE": "Enter your email to reset your password.",
    "HAVE_PASSWORD": "I have my password",
    "HAVE_CODE": "I already have a recovery code",
    "FORM": {
      "EMAIL": {
        "PLACEHOLDER": "Enter your email...",
        "LABEL": "Email"
      },
      "CODE": {
        "PLACEHOLDER": "Enter your recovery code...",
        "LABEL": "Recovery Code"
      },
      "PASSWORD": {
        "PLACEHOLDER": "Enter your new password...",
        "LABEL": "New Password"
      },
      "SUBMIT": "Request a recovery code"
    },
    "RESET": {
      "TITLE": "Attention!",
      "BODY": "Follow this instructions to reset your password:",
      "INSTRUCTIONS": {
        "1": "Don't close this window.",
        "2": "Go to your email inbox.",
        "3": "Open the message we've sent you.",
        "4": "Search the recovery code and copy it.",
        "5": "Come back to this window and paste the recovery code.",
        "6": "Enter your new password.",
        "7": "Confirm the modification.",
        "8": "Done!"
      },
      "CONFIRM": "Confirm",
      "CANCEL": "Cancel"
    },
    "MESSAGES": {
      "INFO": {
        "BODY": "If you already have a recovery code, enter your email and press \"I already have a recovery code\"."
      },
      "SUCCESS": {
        "TITLE": "Done!",
        "BODY": "Please sign in with your new password."
      },
      "LIMIT_EXCEEDED": {
        "BODY": "Please wai a while before retrying."
      },
      "USER_NOT_FOUND": {
        "BODY": "Check your email is right."
      },
      "INVALID_CODE": {
        "BODY": "That recovery code is not valid."
      },
      "EXPIRED_CODE": {
        "BODY": "Please request a new recovery code."
      },
      "NOT_AUTHORIZED": {
        "BODY": "Please contact your account administrator."
      },
      "ERROR": {
        "BODY": "Couldn't fulfill the request."
      }
    }
  }
}
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
              .content
                span(v-t=`'TITLE'`)
                .sub.header(v-t=`'SUBTITLE'`)

          form.ui.form(@submit.prevent='submit()')
            .ui.negative.icon.message(v-if='isErrored')
              i.exclamation.triangle.icon
              .content
                .header(v-t=`'FORM.ERROR.MESSAGE.TITLE'`)
                p(v-t=`'FORM.ERROR.MESSAGE.BODY'`)

            .ui.info.icon.message
              i.info.circle.icon
              .content(v-t=`'MESSAGES.INFO.BODY'`)

            .required.field(
              :class=`{
                error: fields.email && fields.email.dirty && errors.has('email'),
                disabled: isSubmitting
              }`
              )

              label(
                v-t=`'FORM.EMAIL.LABEL'`
                for='email-input'
                )

              input#email-input(
                :placeholder=`$t('FORM.EMAIL.PLACEHOLDER')`
                v-validate.initial=`'required|email'`
                :disabled='isSubmitting'
                v-model='data.email'
                name='email'
                type='email'
                required
                )

            button.ui.primary.fluid.right.labeled.icon.submit.button(
              :disabled=`errors.has('email') || isSubmitting`
              type='submit'
              :class=`{
                loading: isSubmitting
              }`
              )

              span(v-t=`'FORM.SUBMIT'`)
              i.chevron.right.icon

            .ui.basic.vertical.segment
              button.ui.fluid.basic.button(
                :disabled=`errors.has('email') || isSubmitting`
                @click='onInputVerificationCode()'
                v-t=`'HAVE_CODE'`
                type='button'
                )

            .ui.center.aligned.basic.vertical.segment
              a.ui.link(
                href='#/'
                v-t=`'HAVE_PASSWORD'`
                )

  .ui.mini.modal(ref='resetPasswordModal')
    .header(v-t=`'RESET.TITLE'`)
    .content
      p
        strong(v-t=`'RESET.BODY'`)

      ol.ui.list
        li(v-t=`'RESET.INSTRUCTIONS.1'`)
        li(v-t=`'RESET.INSTRUCTIONS.2'`)
        li(v-t=`'RESET.INSTRUCTIONS.3'`)
        li(v-t=`'RESET.INSTRUCTIONS.4'`)
        li(v-t=`'RESET.INSTRUCTIONS.5'`)
        li(v-t=`'RESET.INSTRUCTIONS.6'`)
        li(v-t=`'RESET.INSTRUCTIONS.7'`)
        li(v-t=`'RESET.INSTRUCTIONS.8'`)

      .ui.divider

      form.ui.form(@submit.prevent='')
        .required.field(
          :class=`{
            error: fields.code && fields.code.dirty && errors.has('code'),
            disabled: isConfirming
          }`
          )

          label(
            v-t=`'FORM.CODE.LABEL'`
            for='code-input'
            )

          input#code-input(
            :placeholder=`$t('FORM.CODE.PLACEHOLDER')`
            v-validate.initial=`'required|min:1'`
            :disabled='isConfirming'
            v-model='data.code'
            type='number'
            name='code'
            required
            )

        .required.field(
          :class=`{
            error: fields.password && fields.password.dirty && errors.has('password'),
            disabled: isConfirming
          }`
          )

          label(
            v-t=`'FORM.PASSWORD.LABEL'`
            for='password-input'
            )

          input#password-input(
            :placeholder=`$t('FORM.PASSWORD.PLACEHOLDER')`
            v-validate.initial=`'required|min:8'`
            :disabled='isConfirming'
            v-model='data.password'
            type='password'
            name='password'
            required
            )

    .actions
      button.ui.cancel.basic.button(
        :disabled='isConfirming'
        v-t=`'RESET.CANCEL'`
        type='button'
        )

      button.ui.primary.button(
        :disabled=`errors.has('code') || errors.has('password') || isConfirming`
        v-t=`'RESET.CONFIRM'`
        @click='confirm()'
        type='button'
        :class=`{
          loading: isConfirming
        }`
        )
</template>

<script>
export default {
  data() {
    return {
      isSubmitting: false,
      isConfirming: false,
      isCodeSent: false,
      isErrored: false,

      data: {
        email: null
      }
    };
  },

  beforeCreate() {
    if (this.$auth.isSignedIn()) {
      this.$router.push('dashboard');
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
      this.isConfirming = false;

      this.$toastr.success(this.$t('MESSAGES.SUCCESS.BODY'), this.$t('MESSAGES.SUCCESS.TITLE'));

      this.$$(this.$refs.resetPasswordModal).modal('hide');

      this.$router.push('/');
    },

    /**
     * Confirms new password.
     */
    confirm() {
      this.isConfirming = true;

      this.$auth.confirmPassword(this.data, {
        onSuccess: res => this.onConfirmSuccess(res),
        onFailure: err => this.onError(err)
      });
    },

    /**
     * Cancels password confirm modal.
     */
    cancel() {
      this.isSubmitting = false;
      this.isCodeSent = false;
    },

    /**
     * Submit success callback.
     */
    onSubmitSuccess() {
      this.isSubmitting = false;
      this.isCodeSent = true;

      this.data.password = null;
      this.data.code = null;
    },

    /**
     * After error callback.
     */
    afterError() {
      this.isSubmitting = false;
      this.isConfirming = false;
      this.isCodeSent = false;
    },

    /**
     * Submit error callback.
     *
     * @param {Object} err HTTP response object.
     */
    onError(err) {
      console.error(err);
      console.dir(err);

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
      this.isCodeSent = false;
      this.isErrored = false;

      this.$validator.validate('email').then(valid => {
        if (!valid) {
          return;
        }

        this.isSubmitting = true;

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

<style lang="scss" scoped>
.ui.centered.grid.container {
  .doubling.two.column.row {
    .column {
      padding: 0;
    }
  }
}
</style>
