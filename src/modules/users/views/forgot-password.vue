<i18n>
en:
  TITLE: Reset Password
  SUBTITLE: Enter your email to reset your password.
  HAVE_PASSWORD: I have my password
  HAVE_CODE: I already have a recovery code
  FORM:
    EMAIL:
      PLACEHOLDER: Enter your email...
      LABEL: Email
    SUBMIT: Request a recovery code
  MESSAGES:
    INFO: 'If you already have a recovery code, enter your email and press "I already have a recovery code".'
    ERRORS:
      LIMIT_EXCEEDED: Please wait a while before retrying.
      USER_NOT_FOUND: Check your email is right.
      NOT_AUTHORIZED: Please contact your account administrator.
      UNKNOWN: "Couldn't fulfill the request."
</i18n>

<template lang="pug">
section.view
  .ui.centered.grid.container
    .doubling.two.column.row
      .column
        .ui.basic.vertical.segment
          .ui.center.aligned.primary.segment
            h3.ui.primary.icon.header
              i.circular.asterisk.icon
              .content {{ $t('TITLE') }}
                .sub.header {{ $t('SUBTITLE') }}

          .ui.info.icon.message
            i.info.circle.icon
            p.content {{ $t('MESSAGES.INFO') }}

          validation-observer.ui.form(
            @submit.prevent="submit()"
            v-slot="{ invalid }"
            ref="form"
            tag="form"
            )

            .ui.negative.icon.message(v-if="error")
              i.exclamation.triangle.icon
              .content
                .header {{ $t('FORM.ERROR.MESSAGE.TITLE') }}
                p {{ $t('FORM.ERROR.MESSAGE.BODY') }}

            email-input.required.field(
              :disabled="submitting"
              v-model="data.email"
              :class="fieldClass"
              )

            button.ui.primary.fluid.right.labeled.icon.submit.button(
              :disabled="invalid || submitting"
              :class="buttonClass"
              type="submit"
              )

              | {{ $t('FORM.SUBMIT') }}
              i.chevron.right.icon

            .ui.basic.vertical.segment
              button.ui.fluid.basic.button(
                :disabled="invalid || submitting"
                @click="onSubmitSuccess()"
                type="button"
                )

                | {{ $t('HAVE_CODE') }}

            .ui.center.aligned.basic.vertical.segment
              router-link.ui.link(to="/users/sign-in")
                | {{ $t('HAVE_PASSWORD') }}

  reset-modal(
    :email="data.email"
    ref="modal"
    )
</template>

<script lang="ts">
import Vue from 'vue';

import ResetModal from '../components/forgot-password/reset-modal.vue';
import EmailInput from '../components/email-input.vue';

interface SubmitError extends Error {
  code: string;
}

interface ComponentData {
  submitting: boolean;
  error: boolean;
  data: {
    password: string;
    email: string;
    code: string;
  };
}

export default Vue.extend({
  components: {
    ResetModal,
    EmailInput
  },

  data(): ComponentData {
    return {
      submitting: false,
      error: false,
      data: {
        password: '',
        email: '',
        code: ''
      }
    };
  },

  computed: {
    fieldClass(): object {
      return {
        disabled: this.submitting
      };
    },

    buttonClass(): object {
      return {
        disabled: this.submitting
      };
    }
  },

  beforeCreate() {
    if (this.$session.signedIn) {
      this.$router.push('/');
    }
  },

  methods: {
    /**
     * Input verification code callback.
     */
    onSubmitSuccess(): void {
      const $modal: any = this.$refs.modal;

      $modal.show();
    },

    /**
     * After error callback.
     */
    afterError(): void {
      this.submitting = false;
    },

    /**
     * Submit error callback.
     *
     * @param {object} err HTTP response object.
     */
    onSubmitError(err: SubmitError): void {
      console.error(err);

      switch (err.code) {
        case 'LimitExceededException':
          this.$toast.error(this.$t('MESSAGES.ERRORS.LIMIT_EXCEEDED'));
          setTimeout(() => this.afterError(), 30000);
          break;

        case 'UserNotFoundException':
          this.$toast.error(this.$t('MESSAGES.ERRORS.USER_NOT_FOUND'));
          setTimeout(() => this.afterError(), 3000);
          break;

        case 'NotAuthorizedException':
          this.$toast.warning(this.$t('MESSAGES.ERRORS.NOT_AUTHORIZED'));
          this.$router.push('/');
          break;

        default:
          this.$toast.error(this.$t('MESSAGES.ERRORS.UNKNOWN'));
          setTimeout(() => this.afterError(), 3000);
      }
    },

    /**
     * Sends the recovery code.
     */
    async submit(): Promise<void> {
      this.submitting = true;

      try {
        await this.$auth.forgotPassword(this.data.email);

        this.onSubmitSuccess();
      } catch (err) {
        console.error(err);
        this.onSubmitError(err);
      }

      this.submitting = false;
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
