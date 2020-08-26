<i18n>
en:
  TITLE: Welcome
  SUBTITLE: Please sign in with your credentials.
  FORGOT_PASSWORD: I forgot my password

  FORM:
    NEW_PASSWORD:
      TITLE: That's a temporary password!
      DESCRIPTION: You must create a new one to sign in.
    SUBMIT: Sign in

  ERRORS:
    USER_NOT_CONFIRMED_EXCEPTION: Please verify your account first.
    PASSWORD_RESET_REQUIRED_EXCEPTION: Please reset your password.
    NOT_AUTHORIZED_EXCEPTION: Please verify that your email and password are correct.
    UNKNOWN: Please check input values and internet connection.
</i18n>

<template lang="pug">
el-main
  el-row
    el-col
      el-card
        template(#header)
          i.el-icon-user

        h3 {{ $t('TITLE') }}
        | {{ $t('SUBTITLE') }}

    el-card
      el-form(ref="form", :model="model", @submit.prevent="submit()")
        email-input(
          :disabled="submitting",
          v-model="model.email",
          :model="model"
        )

        password-input(
          v-model="model.password",
          :disabled="submitting",
          :model="model"
        )

        el-alert(
          :description="$t('FORM.NEW_PASSWORD.DESCRIPTION')",
          :title="$t('FORM.NEW_PASSWORD.TITLE')",
          v-if="newPasswordRequired",
          :closable="false",
          type="warning",
          show-icon
        )

        new-password-input(
          v-model="model.newPassword",
          v-if="newPasswordRequired",
          :disabled="submitting",
          :model="model"
        )

        el-button(
          :disabled="submitting",
          :loading="submitting",
          native-type="submit",
          type="primary"
        )
          | {{ $t('FORM.SUBMIT') }}
          i.el-icon-arrow-right

  router-link.el-link.el-link--primary(to="/users/forgot-password")
    .el-link--inner {{ $t('FORGOT_PASSWORD') }}
</template>

<script lang="ts">
import Vue from 'vue';

import NewPasswordInput from '../../core/components/inputs/new-password.vue';
import PasswordInput from '../../core/components/inputs/password.vue';
import EmailInput from '../../core/components/inputs/email.vue';

interface SubmitError extends Error {
  code: string;
}

interface Data {
  newPasswordRequired: boolean;
  submitting: boolean;
  model: {
    newPassword?: string;
    password: string;
    email: string;
  };
}

interface Methods {
  onSubmitError(err: SubmitError): void;
  onSubmitSuccess(): void;
  submit(): Promise<void>;
}

export default Vue.extend<Data, Methods, unknown>({
  components: {
    NewPasswordInput,
    PasswordInput,
    EmailInput
  },

  data() {
    return {
      newPasswordRequired: true,
      submitting: false,
      model: {
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
    onSubmitSuccess() {
      this.$router.replace('/');
    },

    onSubmitError(err) {
      switch (err.code) {
        case 'UserNotConfirmedException':
          this.$message.error(String(this.$t('ERRORS.USER_NOT_CONFIRMED_EXCEPTION')));
          break;

        case 'PasswordResetRequiredException':
          this.$message.error(String(this.$t('ERRORS.PASSWORD_RESET_REQUIRED_EXCEPTION')));
          break;

        case 'NotAuthorizedException':
        case 'UserNotFoundException':
          this.$message.error(String(this.$t('ERRORS.NOT_AUTHORIZED_EXCEPTION')));
          break;

        default:
          this.$message.error(String(this.$t('ERRORS.UNKNOWN')));
      }
    },

    /**
     * Signs the user in.
     */
    async submit() {
      this.submitting = true;

      const { email, password, newPassword } = this.model;

      try {
        const user = await this.$auth.signIn(email, password);

        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          this.newPasswordRequired = true;

          if (this.newPasswordRequired && newPassword) {
            await this.$auth.completeNewPassword(user, newPassword, {});

            this.onSubmitSuccess();

            return;
          }

          this.submitting = false;

          return;
        }

        this.onSubmitSuccess();
      } catch (err) {
        this.onSubmitError(err);
      }

      this.submitting = false;
    }
  }
});
</script>
