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
    ERRORS:
      USER_NOT_CONFIRMED_EXCEPTION: Please verify your account first.
      PASSWORD_RESET_REQUIRED_EXCEPTION: Please reset your password.
      NOT_AUTHORIZED_EXCEPTION: Please verify that your email and password are correct.
      UNKNOWN: Please check input values and internet connection.
    SUBMIT: Sign in
</i18n>

<template lang="pug">
section.ui.basic.segment
  .ui.text.container
    .ui.basic.vertical.segment
      .ui.center.aligned.primary.segment
        h3.ui.primary.icon.header
          i.circular.id.badge.icon
          .content {{ $t('TITLE') }}
            .sub.header {{ $t('SUBTITLE') }}

      validation-observer.ui.form(
        v-slot="{ classes, invalid }"
        @submit.prevent="signIn()"
        ref="form"
        tag="form"
        )

        email-input.required.field(
          :disabled="signingIn"
          v-model="data.email"
          :class="fieldClass"
          )

        password-input.required.field(
          v-model="data.password"
          :disabled="signingIn"
          :class="fieldClass"
          )

        .ui.info.icon.message.visible(v-if="newPasswordRequired")
          i.exclamation.circle.icon
          .content
            .header {{ $t('FORM.NEW_PASSWORD.MESSAGE.TITLE') }}
            p {{ $t('FORM.NEW_PASSWORD.MESSAGE.BODY') }}

        .required.field(
          :class="[classes, fieldClass]"
          v-if="newPasswordRequired"
          )

          new-password-input.required.field(
            v-model="data.newPassword"
            :disabled="signingIn"
            :class="fieldClass"
            )

        button.ui.primary.fluid.right.labeled.icon.submit.button(
          :disabled="invalid || signingIn"
          :class="submitClass"
          type="submit"
          )

          | {{ $t('FORM.SUBMIT') }}
          i.sign.in.icon

        .ui.center.aligned.vertical.segment
          router-link.ui.link(to="/users/forgot-password")
            | {{ $t('FORGOT_PASSWORD') }}
</template>

<script lang="ts">
import Vue from 'vue';

import NewPasswordInput from '../../core/components/inputs/new-password.vue';
import PasswordInput from '../../core/components/inputs/password.vue';
import EmailInput from '../../core/components/inputs/email.vue';

interface ComponentData {
  newPasswordRequired: boolean;
  signingIn: boolean;
  data: {
    newPassword?: string;
    password: string;
    email: string;
  };
}

interface SignInError extends Error {
  code: string;
}

export default Vue.extend({
  components: {
    NewPasswordInput,
    PasswordInput,
    EmailInput
  },

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

<style lang="sass" scoped>
.ui.centered.grid.container
  .doubling.two.column.row
    .column
      padding: 0
</style>
