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
    p-card.p-mb-4.p-text-center
      template(#header)
        i.pi.pi-user.p-mt-4(style={ fontSize: '2rem' })

      template(#title)
        | {{ $t('TITLE') }}

      template(#content)
        p {{ $t('SUBTITLE') }}

    .p-card
      .p-card-body
        validation-observer.p-fluid(
          v-slot="{ classes, invalid }",
          @submit.prevent="signIn()",
          ref="form",
          tag="form"
        )
          email-input(v-model="input.email")
          password-input(v-model="input.password")

          .ui.info.icon.message.visible(v-if="newPasswordRequired")
            i.exclamation.circle.icon
            .content
              .header {{ $t('FORM.NEW_PASSWORD.MESSAGE.TITLE') }}
              p {{ $t('FORM.NEW_PASSWORD.MESSAGE.BODY') }}

          .required.field(
            :class="[classes, fieldClass]",
            v-if="newPasswordRequired"
          )
            new-password-input.required.field(
              v-model="input.newPassword",
              :disabled="signingIn",
              :class="fieldClass"
            )

          p-button(
            :disabled="invalid || signingIn",
            :label="$t('FORM.SUBMIT')",
            :class="submitClass",
            icon="pi pi-sign-in",
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
  signingIn: boolean;
  input: {
    newPassword?: string;
    password: string;
    email: string;
  };
}

interface Computed {
  fieldClass: {
    disabled: boolean;
  };

  submitClass: {
    loading: boolean;
  };
}

interface Methods {
  onSignInError(err: SignInError): void;
  onSignInSuccess(): void;
  signIn(): Promise<void>;
}

export default Vue.extend<Data, Methods, Computed>({
  components: {
    NewPasswordInput,
    PasswordInput,
    EmailInput
  },

  data() {
    return {
      newPasswordRequired: false,
      signingIn: false,
      input: {
        password: '',
        email: ''
      }
    };
  },

  computed: {
    fieldClass() {
      return {
        disabled: this.signingIn
      };
    },

    submitClass() {
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
      this.signingIn = true;

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

          this.signingIn = false;

          return;
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
