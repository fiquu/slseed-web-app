<i18n>
{
  "en": {
    "TITLE": "Welcome",
    "SUBTITLE": "Please sign in with your credentials.",
    "FORGOT_PASSWORD": "I forgot my password",
    "FORM": {
      "EMAIL": {
        "PLACEHOLDER": "Enter your email...",
        "LABEL": "Email"
      },
      "PASSWORD": {
        "PLACEHOLDER": "Enter your password...",
        "LABEL": "Password"
      },
      "NAME": {
        "PLACEHOLDER": "Enter your full name...",
        "LABEL": "Full Name"
      },
      "NEW_PASSWORD": {
        "MESSAGE": {
          "TITLE": "That's a temporary password!",
          "BODY": "You must create a new password."
        },
        "PLACEHOLDER": "Create your password...",
        "LABEL": "New Password"
      },
      "ERROR": {
        "MESSAGE": {
          "TITLE": "Couldn't sign you in...",
          "BODY": "Please verify that your email and password are correct."
        }
      },
      "SUBMIT": "Sign in"
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
              i.circular.id.badge.icon
              .content
                span(v-t=`'TITLE'`)
                .sub.header(v-t=`'SUBTITLE'`)

          form.ui.form(@submit.prevent='signIn()')
            .ui.negative.icon.message(v-if='state.errored')
              i.exclamation.triangle.icon
              .content
                .header(v-t=`'FORM.ERROR.MESSAGE.TITLE'`)
                p(v-t=`'FORM.ERROR.MESSAGE.BODY'`)

            .required.field(
              :class=`{
                error: fields.email && fields.email.dirty && errors.has('email'),
                disabled: state.signingIn
              }`
              )

              label(
                v-t=`'FORM.EMAIL.LABEL'`
                for='email-input'
                )

              input#email-input(
                :placeholder=`$t('FORM.EMAIL.PLACEHOLDER')`
                v-validate.initial=`'required|email'`
                :disabled='state.signingIn'
                v-model='data.email'
                name='email'
                type='email'
                required
                )

            .required.field(:class=`{
                error: fields.password && fields.password.dirty && errors.has('password'),
                disabled: state.signingIn
              }`
              )

              label(
                v-t=`'FORM.PASSWORD.LABEL'`
                for='password-input'
                )

              input#password-input(
                :placeholder=`$t('FORM.PASSWORD.PLACEHOLDER')`
                v-validate.initial=`'required|min:8'`
                :disabled='state.signingIn'
                v-model='data.password'
                name='password'
                type='password'
                minlength='8'
                required
                )

            .field(
              v-if=`state.newPasswordRequired`,
              :class=`{
                error: fields.newpassword && fields.newpassword.dirty && errors.has('newpassword'),
                disabled: state.signingIn
              }`
              )

              .ui.primary.icon.message
                i.exclamation.circle.icon
                .content
                  .header(v-t=`'FORM.NEW_PASSWORD.MESSAGE.TITLE'`)
                  p(v-t=`'FORM.NEW_PASSWORD.MESSAGE.BODY'`)

              label(
                v-t=`'FORM.NEW_PASSWORD.LABEL'`
                for='new-password-input'
                )

              input#new-password-input(
                :placeholder=`$t('FORM.NEW_PASSWORD.PLACEHOLDER')`
                v-validate.initial=`'required|min:8'`
                :disabled='state.signingIn'
                v-model='data.newPassword'
                name='newpassword'
                type='password'
                minlength='8'
                required
                )

            button.ui.primary.fluid.right.labeled.icon.submit.button(
              :disabled='errors.any() || state.signingIn'
              type='submit'
              :class=`{
                loading: state.signingIn
              }`
              )

              span(v-t=`'FORM.SUBMIT'`)
              i.sign.in.icon

            .ui.center.aligned.vertical.segment
              a.ui.link(
                href='#/password'
                v-t=`'FORGOT_PASSWORD'`
                )
</template>

<script>
export default {
  data() {
    return {
      cognitoUser: null,
      signInCallbacks: {
        newPasswordRequired: userAttributes => this.onNewPasswordRequired(userAttributes),
        onSuccess: res => this.onSignInSuccess(res),
        onFailure: err => this.onSignInError(err)
      },
      state: {
        newPasswordRequired: false,
        signingIn: false,
        errored: false
      },
      data: {
        newPassword: '',
        password: '',
        email: ''
      }
    };
  },

  beforeCreate() {
    if (this.$auth.isSignedIn()) {
      this.$router.push('dashboard');
    }
  },

  methods: {
    /**
     * Sign in success callback.
     */
    onSignInSuccess() {
      if (this.state.newPasswordRequired) {
        this.data.password = this.data.newPassword;
        this.state.newPasswordRequired = false;

        this.signIn();

        return;
      }

      this.$router.push('dashboard');
    },

    /**
     * Sign in error callback.
     */
    onSignInError(err) {
      this.state.errored = err.message !== 'New password is required.';
      this.state.signingIn = false;
    },

    /**
     * New password required callback.
     */
    onNewPasswordRequired(user, attributes) {
      const data = Object.assign({}, attributes);
      const pwd = this.data.newPassword;

      this.state.newPasswordRequired = true;

      /* User was signed up by an admin and must provide new
       * password and required attributes, if any, to complete
       * authentication. */

      delete data.email_verified; /* The api doesn't accept this field back */

      /* Required fields */
      data.name = this.data.name;

      this.cognitoUser.completeNewPasswordChallenge(pwd, data, this.signInCallbacks);
    },

    /**
     * Signs the user in.
     */
    signIn() {
      this.state.errored = false;

      this.$validator.validateAll().then(valid => {
        if (!valid) {
          return;
        }

        this.state.signingIn = true;

        this.cognitoUser = this.$auth.signIn(this.data, this.signInCallbacks);
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
