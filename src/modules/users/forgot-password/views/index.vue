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
      TEXT: "If you already have a recovery code, enter your email and activate the {link} action."
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
          .text-center
            i.el-icon-key.text-4xl.mb-3
            h3.font-bold {{ $t('TITLE') }}
            small {{ $t('SUBTITLE') }}

        el-alert(:closable="false", show-icon)
          i18n(path="MESSAGES.INFO.TEXT")
            template(#link)
              strong {{ $t('HAVE_CODE') }}

        el-form(
          :disabled="submitting || showModal",
          @validate="onValidate",
          :model="model",
          status-icon,
          ref="form"
        )
          email-input.p-field(, v-model="model.email")

          el-button.w-full(
            :disabled="!isFormValid",
            :loading="submitting",
            @click="submit()",
            type="primary"
          )
            | {{ $t('FORM.SUBMIT') }}
            i.el-icon-arrow-right

          .pt-4
            el-button.w-full(
              @click="onSubmitSuccess()",
              :disabled="!isFormValid",
              type="text"
            )
              | {{ $t('HAVE_CODE') }}

      p.text-center.pt-4
        router-link.el-link.el-link--primary(to="/users/sign-in")
          .el-link--inner {{ $t('HAVE_PASSWORD') }}

  reset-modal(
    @hide="showModal = false",
    :email="model.email",
    :show="showModal"
  )
</template>

<script lang="ts">
import { Form } from 'element-ui';
import Vue from 'vue';

import FormValid from '@/modules/core/mixins/form/valid.vue';

import EmailInput from '../../core/components/inputs/email.vue';
import ResetModal from '../components/reset-modal.vue';

interface SubmitError extends Error {
  code: string;
}

interface Data {
  submitting: boolean;
  showModal: boolean;
  model: {
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

  mixins: [FormValid],

  data() {
    return {
      submitting: false,
      showModal: false,
      model: {
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
          this.$message.warning(this.$t('MESSAGES.ERRORS.NOT_AUTHORIZED').toString());
          this.$router.push('/');

          clearTimeout(timeout);
          break;

        case 'LimitExceededException':
          this.$message.error(this.$t('MESSAGES.ERRORS.LIMIT_EXCEEDED').toString());
          break;

        case 'UserNotFoundException':
          this.$message.error(this.$t('MESSAGES.ERRORS.USER_NOT_FOUND').toString());
          break;

        default:
          this.$message.error(this.$t('MESSAGES.ERRORS.UNKNOWN').toString());
      }
    },

    async submit() {
      if (!(await (this.$refs.form as Form).validate())) {
        return;
      }

      this.submitting = true;

      try {
        await this.$auth.forgotPassword(this.model.email);

        this.onSubmitSuccess();
      } catch (err) {
        this.onSubmitError(err);
      }

      this.submitting = false;
    }
  }
});
</script>
