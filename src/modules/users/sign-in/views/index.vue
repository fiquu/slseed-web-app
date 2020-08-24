<i18n>
en:
  TITLE: Welcome
  SUBTITLE: Please sign in with your credentials.
  FORGOT_PASSWORD: I forgot my password

  FORM:
    NEW_PASSWORD:
      MESSAGE:
        TITLE: "That's a temporary password!"
        BODY: You must create a new password.
    SUBMIT: Sign in

  ERRORS:
    TITLE: There's a problem...
    USER_NOT_CONFIRMED_EXCEPTION: Please verify your account first.
    PASSWORD_RESET_REQUIRED_EXCEPTION: Please reset your password.
    NOT_AUTHORIZED_EXCEPTION: Please verify that your email and password are correct.
    UNKNOWN: Please check input values and internet connection.
</i18n>

<template lang="pug">
section.p-grid.p-justify-center.p-nogutter.p-p-3
  .p-col.p-md-8.p-lg-6.p-xl-2
    .p-card.p-text-center.p-mb-3
      .p-card-title
        i.pi.pi-user.p-mt-4(style={ fontSize: '2rem' })
        .p-mt-3 {{ $t('TITLE') }}

      .p-card-body
        | {{ $t('SUBTITLE') }}

    .p-card
      .p-card-body
        validation-observer.p-fluid(
          v-slot="{ classes, invalid }",
          @submit.prevent="signIn()",
          ref="form",
          tag="form"
        )
          email-input(v-model="input.email", :disabled="submitting")
          password-input(v-model="input.password", :disabled="submitting")

          .ui.info.icon.message.visible(v-if="newPasswordRequired")
            i.exclamation.circle.icon
            .content
              .header {{ $t('FORM.NEW_PASSWORD.MESSAGE.TITLE') }}
              p {{ $t('FORM.NEW_PASSWORD.MESSAGE.BODY') }}

          .p-field(v-if="newPasswordRequired")
            new-password-input(
              v-model="input.newPassword",
              :disabled="submitting"
            )

          p-button(
            :icon="submitting ? 'pi pi-spin pi-spinner' : 'pi pi-sign-in'",
            :disabled="invalid || submitting",
            :label="$t('FORM.SUBMIT')",
            icon-pos="right",
            type="submit"
          )

    .p-text-center.p-m-4
      router-link.p-button.p-button-link(to="/users/forgot-password")
        | {{ $t('FORGOT_PASSWORD') }}
</template>

<script lang="ts">
import Vue from 'vue';

import NewPasswordInput from '../../core/components/inputs/new-password.vue';
import PasswordInput from '../../core/components/inputs/password.vue';
import EmailInput from '../../core/components/inputs/email.vue';

interface SignInError extends Error {
  code: string;
}

interface Data {
  newPasswordRequired: boolean;
  submitting: boolean;
  input: {
    newPassword?: string;
    password: string;
    email: string;
  };
}

interface Methods {
  onSignInError(err: SignInError): void;
  onSignInSuccess(): void;
  signIn(): Promise<void>;
}

export default Vue.extend<Data, Methods, unknown>({
  components: {
    NewPasswordInput,
    PasswordInput,
    EmailInput
  },

  data() {
    return {
      newPasswordRequired: false,
      submitting: false,
      input: {
        password: '',
        email: ''
      }
    };
  },

  beforeCreate() {
    if (this.$session.signedIn) {
      this.$router.replace('/');
    }
  },

  methods: {
    onSignInSuccess() {
      this.$router.replace('/');
    },

    onSignInError(err) {
      switch (err.code) {
        case 'UserNotConfirmedException':
          this.$toast.add({
            summary: this.$t('ERRORS.TITLE'),
            detail: this.$t('ERRORS.USER_NOT_CONFIRMED_EXCEPTION'),
            severity: 'error',
            life: 5000
          });
          break;

        case 'PasswordResetRequiredException':
          this.$toast.add({
            summary: this.$t('ERRORS.TITLE'),
            detail: this.$t('ERRORS.PASSWORD_RESET_REQUIRED_EXCEPTION'),
            severity: 'error',
            life: 5000
          });
          break;

        case 'NotAuthorizedException':
        case 'UserNotFoundException':
          this.$toast.add({
            summary: this.$t('ERRORS.TITLE'),
            detail: this.$t('ERRORS.NOT_AUTHORIZED_EXCEPTION'),
            severity: 'error',
            life: 5000
          });
          break;

        default:
          this.$toast.add({
            summary: this.$t('ERRORS.TITLE'),
            detail: this.$t('ERRORS.UNKNOWN'),
            severity: 'error',
            life: 5000
          });
      }
    },

    /**
     * Signs the user in.
     */
    async signIn() {
      this.submitting = true;

      const { email, password, newPassword } = this.input;

      try {
        const user = await this.$auth.signIn(email, password);

        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          this.newPasswordRequired = true;

          if (this.newPasswordRequired && newPassword) {
            await this.$auth.completeNewPassword(user, newPassword, {});

            this.onSignInSuccess();

            return;
          }

          this.submitting = false;

          return;
        }

        this.onSignInSuccess();
      } catch (err) {
        this.onSignInError(err);
      }

      this.submitting = false;
    }
  }
});
</script>
