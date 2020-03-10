<i18n>
en:
  TITLE: Welcome
  SUBTITLE: Please sign in with your credentials.
  FORGOT_PASSWORD: I forgot my password
  FORM:
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
    ERRORS:
      USER_NOT_CONFIRMED_EXCEPTION: Please verify your account first.
      PASSWORD_RESET_REQUIRED_EXCEPTION: Please reset your password.
      NOT_AUTHORIZED_EXCEPTION: Please verify that your email and password are correct.
      UNKNOWN: Please check input values and internet connection.
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

          validation-observer.ui.form(
            @submit.prevent="signIn()"
            v-slot="{ classes }"
            ref="form"
            tag="form"
            )

            validation-provider(
              rules="required|email"
              v-slot="{ classes }"
              slim
              )

              email-input.required.field(
                :class="[classes, fieldClass]"
                :disabled="signingIn"
                v-model="data.email"
                required
                )

            validation-provider(
              rules="required|min:8"
              v-slot="{ classes }"
              slim
              )

              .required.field(:class="[classes, fieldClass]")
                label(for="password-input")
                  | {{ $t('FORM.PASSWORD.LABEL') }}

                input#password-input(
                  :placeholder="$t('FORM.PASSWORD.PLACEHOLDER')"
                  v-validate.initial="'required|min:8'"
                  :disabled="signingIn"
                  v-model="data.password"
                  name="password"
                  type="password"
                  minlength="8"
                  required
                  )

            validation-provider(
              v-if="newPasswordRequired"
              rules="required|min:8"
              v-slot="{ classes }"
              slim
              )

              .required.field(:class="[classes, fieldClass]")
                .ui.primary.icon.message
                  i.exclamation.circle.icon
                  .content
                    .header {{ $t('FORM.NEW_PASSWORD.MESSAGE.TITLE') }}
                    p {{ $t('FORM.NEW_PASSWORD.MESSAGE.BODY') }}

                label(for="new-password-input")
                  | {{ $t('FORM.NEW_PASSWORD.LABEL') }}

                input#new-password-input(
                  :placeholder="$t('FORM.NEW_PASSWORD.PLACEHOLDER')"
                  v-model="data.newPassword"
                  :disabled="signingIn"
                  name="new-password"
                  type="password"
                  minlength="8"
                  required
                  )

            button.ui.primary.fluid.right.labeled.icon.submit.button(
              :disabled="invalid || signingIn"
              :class="submitClass"
              type="submit"
              )

              | {{ $t('FORM.SUBMIT') }}
              i.sign.in.icon

            .ui.center.aligned.vertical.segment
              router-link.ui.link(to="/users/password")
                | {{ $t('FORGOT_PASSWORD') }}
</template>

<script lang="ts">
import Vue from 'vue';

interface ComponentData {
  /**
   * Whether a new password is required.
   */
  newPasswordRequired: boolean;

  /**
   * Whether it's signing in (busy).
   */
  signingIn: boolean;

  /**
   * Form data.
   */
  data: {
    /**
     * The new password value.
     */
    newPassword?: string;

    /**
     * The password value.
     */
    password: string;

    /**
     * The email value.
     */
    email: string;
  };
}

interface SignInError extends Error {
  code: string;
}

export default Vue.extend({
  data(): ComponentData {
    return {
      newPasswordRequired: false,
      signingIn: false,

      data: {
        password: '',
        email: ''
      }
    };
  },

  computed: {
    fieldClass(): object {
      return {
        disabled: this.signingIn
      };
    },

    submitClass(): object {
      return {
        loading: this.signingIn
      };
    }
  },

  beforeCreate() {
    if (this.$session.signedIn) {
      this.$router.replace('/');
    }
  },

  methods: {
    /**
     * Sign in success callback.
     */
    onSignInSuccess(): void {
      this.$router.replace('/');
    },

    /**
     * Sign in error callback.
     *
     * @param {any} err The error to handle.
     */
    onSignInError(err: SignInError): void {
      switch (err.code) {
        case 'UserNotConfirmedException':
          this.$toast.error(this.$t('ERRORS.USER_NOT_CONFIRMED_EXCEPTION'));
          break;

        case 'PasswordResetRequiredException':
          this.$t('ERRORS.PASSWORD_RESET_REQUIRED_EXCEPTION');
          break;

        case 'NotAuthorizedException':
        case 'UserNotFoundException':
          this.$toast.error(this.$t('ERRORS.NOT_AUTHORIZED_EXCEPTION'));
          break;

        default:
          this.$toast.error(this.$t('ERRORS.UNKNOWN'));
          console.error(err);
      }
    },

    /**
     * Signs the user in.
     */
    async signIn(): Promise<void> {
      this.signingIn = true;

      const { email, password, newPassword } = this.data;

      try {
        if (this.newPasswordRequired && newPassword) {
          await this.$auth.completeNewPassword(email, newPassword, { email });
        } else {
          const user = await this.$auth.signIn(email, password);

          if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
            this.newPasswordRequired = true;
            return;
          }
        }

        this.onSignInSuccess();
      } catch (err) {
        this.onSignInError(err);
      }

      this.signingIn = false;
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
