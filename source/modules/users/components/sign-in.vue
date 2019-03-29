<i18n>
en:
  TITLE: Welcome
  SUBTITLE: Please sign in with your credentials.
  FORGOT_PASSWORD: I forgot my password
  FORM:
    EMAIL:
      PLACEHOLDER: Enter your email...
      LABEL: Email
    PASSWORD:
      PLACEHOLDER: Enter your password...
      LABEL: Password
    NAME:
      PLACEHOLDER: Enter your full name...
      LABEL: Full Name
    NEW_PASSWORD:
      MESSAGE:
        TITLE: "That's a temporary password!"
        BODY: You must create a new password.
      PLACEHOLDER: Create your password...
      LABEL: New Password
    ERROR:
      MESSAGE:
        TITLE: "Couldn't sign you in..."
        BODY: Please verify that your email and password are correct.
    SUBMIT: Sign in
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
              .content {{ $t('TITLE') }}
                .sub.header {{ $t('SUBTITLE') }}

          form.ui.form(@submit.prevent="signIn")
            .ui.negative.icon.message(v-if="state.errored")
              i.exclamation.triangle.icon
              .content
                .header {{ $t('FORM.ERROR.MESSAGE.TITLE') }}
                p {{ $t('FORM.ERROR.MESSAGE.BODY') }}

            .required.field(:class="formEmailFieldClass")
              label(for="email-input")
                | {{ $t('FORM.EMAIL.LABEL') }}

              input#email-input(
                :placeholder="$t('FORM.EMAIL.PLACEHOLDER')"
                v-validate.initial="'required|email'"
                :disabled="state.signingIn"
                v-model="data.email"
                name="email"
                type="email"
                required
                )

            .required.field(:class="formPasswordFieldClass")
              label(for="password-input")
                | {{ $t('FORM.PASSWORD.LABEL') }}

              input#password-input(
                :placeholder="$t('FORM.PASSWORD.PLACEHOLDER')"
                v-validate.initial="'required|min:8'"
                :disabled="state.signingIn"
                v-model="data.password"
                name="password"
                type="password"
                minlength="8"
                required
                )

            .field(
              :class="formNewPasswordFieldClass"
              v-if="state.newPasswordRequired"
              )

              .ui.primary.icon.message
                i.exclamation.circle.icon
                .content
                  .header {{ $t('FORM.NEW_PASSWORD.MESSAGE.TITLE') }}
                  p {{ $t('FORM.NEW_PASSWORD.MESSAGE.BODY') }}

              label(for="new-password-input")
                | {{ $t('FORM.NEW_PASSWORD.LABEL') }}

              input#new-password-input(
                :placeholder="$t('FORM.NEW_PASSWORD.PLACEHOLDER')"
                v-validate.initial="'required|min:8'"
                :disabled="state.signingIn"
                v-model="data.newPassword"
                name="newpassword"
                type="password"
                minlength="8"
                required
                )

            button.ui.primary.fluid.right.labeled.icon.submit.button(
              :disabled="errors.any() || state.signingIn"
              :class="formSubmitClass"
              type="submit"
              )

              | {{ $t('FORM.SUBMIT') }}
              i.sign.in.icon

            .ui.center.aligned.vertical.segment
              router-link.ui.link(to="/users/password")
                | {{ $t('FORGOT_PASSWORD') }}
</template>

<script>
export default {
  computed: {
    formEmailFieldClass() {
      return {
        error: this.fields.email && this.fields.email.dirty && this.errors.has('email'),
        disabled: this.state.signingIn
      };
    },

    formPasswordFieldClass() {
      return {
        error: this.fields.password && this.fields.password.dirty && this.errors.has('password'),
        disabled: this.state.signingIn
      };
    },

    formNewPasswordFieldClass() {
      return {
        error: this.fields.newpassword && this.fields.newpassword.dirty && this.errors.has('newpassword'),
        disabled: this.state.signingIn
      };
    },

    formSubmitClass() {
      return {
        loading: this.state.signingIn
      };
    }
  },

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

      this.cognitoUser.completeNewPasswordChallenge(pwd, data, {
        onSuccess: () => {
          this.state.newPasswordRequired = false;

          this.$auth.signOut(true);

          this.data.password = this.data.newPassword;

          this.signIn();
        },
        onFailure: err => this.onSignInError(err)
      });
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

<style lang="sass" scoped>
.ui.centered.grid.container
  .doubling.two.column.row
    .column
      padding: 0
</style>
