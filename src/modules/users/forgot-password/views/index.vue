<i18n>
en:
  TITLE: Reset Password
  SUBTITLE: Enter your email to reset your password.
  HAVE_PASSWORD: I have my password
  HAVE_CODE: I already have a recovery code
  FORM:
    SUBMIT: Request a recovery code
  MESSAGES:
    INFO:
      TEXT: "If you already have a recovery code, enter your email and press {link}."
    ERRORS:
      LIMIT_EXCEEDED: Please wait a while before retrying.
      USER_NOT_FOUND: Check your email is right.
      NOT_AUTHORIZED: Please contact your account administrator.
      UNKNOWN: "Couldn't fulfill the request."
</i18n>

<template lang="pug">
el-main
  el-row(justify="center", type="flex")
    el-col(:sm="14", :md="10", :lg="8", :xl="4")
      el-card
        template(#header)
          i.el-icon-key
          h3 {{ $t('TITLE') }}
          | {{ $t('SUBTITLE') }}

        el-alert(:closable="false", show-icon)
          i18n(path="MESSAGES.INFO.TEXT")
            template(#link)
              strong {{ $t('HAVE_CODE') }}

        el-form(@submit.prevent="submit()", ref="form")
          email-input.p-field(
            :disabled="submitting || showModal",
            v-model="data.email"
          )

          el-button(
            :disabled="submitting || showModal",
            :loading="submitting",
            native-type="submit",
            icon-pos="right",
            type="primary"
          )
            | {{ $t('FORM.SUBMIT') }}
            i.el-icon-arrow-right

          el-divider

          el-button.p-button.p-button-link.p-mt-3(
            :disabled="submitting || showModal",
            @click="onSubmitSuccess()",
            native-type="button",
            type="text"
          )
            | {{ $t('HAVE_CODE') }}

      p
        router-link.el-link.el-link--primary(to="/users/sign-in")
          .el-link--inner {{ $t('HAVE_PASSWORD') }}

  reset-modal(
    @hide="showModal = false",
    :email="data.email",
    :show="showModal"
  )
</template>

<script lang="ts">
import Vue from 'vue';

import EmailInput from '../../core/components/inputs/email.vue';
import ResetModal from '../components/reset-modal.vue';

interface SubmitError extends Error {
  code: string;
}

interface Data {
  submitting: boolean;
  showModal: boolean;
  data: {
    password: string;
    email: string;
    code: string;
  };
}

interface Methods {
  onSubmitError(err: SubmitError): void;
  onSubmitSuccess(): void;
  submit(): Promise<void>;
  afterError(): void;
}

export default Vue.extend<Data, Methods, unknown>({
  components: {
    EmailInput,
    ResetModal
  },

  data() {
    return {
      submitting: false,
      showModal: false,
      data: {
        password: '',
        email: '',
        code: ''
      }
    };
  },

  beforeCreate() {
    if (this.$session.signedIn) {
      this.$router.push('/');
    }
  },

  methods: {
    onSubmitSuccess() {
      this.showModal = true;
    },

    afterError() {
      this.submitting = false;
    },

    onSubmitError(err) {
      const timeout = setTimeout(() => this.afterError(), 30000);

      switch (err.code) {
        case 'NotAuthorizedException':
          this.$message.warning(String(this.$t('MESSAGES.ERRORS.NOT_AUTHORIZED')));
          this.$router.push('/');

          clearTimeout(timeout);
          break;

        case 'LimitExceededException':
          this.$message.error(String(this.$t('MESSAGES.ERRORS.LIMIT_EXCEEDED')));
          break;

        case 'UserNotFoundException':
          this.$message.error(String(this.$t('MESSAGES.ERRORS.USER_NOT_FOUND')));
          break;

        default:
          this.$message.error(String(this.$t('MESSAGES.ERRORS.UNKNOWN')));
      }
    },

    async submit() {
      this.submitting = true;

      try {
        await this.$auth.forgotPassword(this.data.email);

        this.onSubmitSuccess();
      } catch (err) {
        this.onSubmitError(err);
      }

      this.submitting = false;
    }
  }
});
</script>

<style lang="sass" scoped>
.el-main
  text-align: center

  .el-card
    .el-card__header
      i
        font-size: 2em

  .el-alert
    text-align: left

  .el-button
    display: block
    width: 100%
</style>
