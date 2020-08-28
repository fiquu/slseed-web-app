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

  MESSAGES:
    SUCCESS: Nice to have you back!
    USER_NOT_CONFIRMED_EXCEPTION: Please verify your account first.
    PASSWORD_RESET_REQUIRED_EXCEPTION: Please reset your password.
    NOT_AUTHORIZED_EXCEPTION: Please verify that your email and password are correct.
    UNKNOWN_ERROR: Please check input values and internet connection.
</i18n>

<template lang="pug">
el-main
  el-row(justify="center", type="flex")
    el-col(:sm="14", :md="10", :lg="8", :xl="4")
      el-card
        template(#header)
          .text-center
            i.el-icon-user.text-4xl.mb-3
            h3.font-bold {{ $t('TITLE') }}
            small {{ $t('SUBTITLE') }}

        el-form(ref="form", :model="model", :disabled="submitting")
          email-input(v-model="model.email", :model="model")

          password-input(v-model="model.password", :model="model")

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
            :model="model"
          )

          el-button.w-full(
            :disabled="!isFormValid",
            :loading="submitting",
            @click="submit()",
            type="primary"
          )
            | {{ $t('FORM.SUBMIT') }}
            i.el-icon-arrow-right

      p.text-center.mt-4
        router-link.el-link.el-link--primary(to="/users/forgot-password")
          .el-link--inner {{ $t('FORGOT_PASSWORD') }}
</template>

<script lang="ts">
import Vue from 'vue';

import FormValid from '@/modules/core/mixins/form/valid.vue';

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
    newPassword: string;
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

  mixins: [FormValid],

  data() {
    return {
      newPasswordRequired: false,
      submitting: false,
      model: {
        newPassword: '',
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
      this.$message.success(this.$t('MESSAGES.SUCCESS').toString());
      this.$router.replace('/');
    },

    onSubmitError(err) {
      switch (err.code) {
        case 'UserNotConfirmedException':
          this.$message.error(this.$t('MESSAGES.USER_NOT_CONFIRMED_EXCEPTION').toString());
          break;

        case 'PasswordResetRequiredException':
          this.$message.error(this.$t('MESSAGES.PASSWORD_RESET_REQUIRED_EXCEPTION').toString());
          break;

        case 'NotAuthorizedException':
        case 'UserNotFoundException':
          this.$message.error(this.$t('MESSAGES.NOT_AUTHORIZED_EXCEPTION').toString());
          break;

        default:
          this.$message.error(this.$t('MESSAGES.UNKNOWN_ERROR').toString());
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
