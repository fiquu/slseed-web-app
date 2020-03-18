<i18n>
en:
  TITLE: 'Attention!'
  BODY: 'Follow this instructions to reset your password:'
  INSTRUCTIONS:
    - "Don't close this window."
    - Go to your email inbox.
    - "Open the message we've sent you."
    - Search the recovery code and copy it.
    - Come back to this window and paste the recovery code.
    - Enter your new password.
    - Confirm the modification.
    - 'Done!'
  FORM:
    CONFIRM: Confirm
    CANCEL: Cancel
  MESSAGES:
    SUBMIT:
      SUCCESS: Please sign in with your new password.
    ERRORS:
      LIMIT_EXCEEDED: Please wait a while before retrying.
      USER_NOT_FOUND: Check your email is right.
      INVALID_CODE: That recovery code is not valid.
      EXPIRED_CODE: Please request a new recovery code.
      NOT_AUTHORIZED: Please contact your account administrator.
      UNKNOWN: "Couldn't fulfill the request."
</i18n>

<template lang="pug">
validation-observer.ui.mini.modal(
  @submit.prevent="submit()"
  v-slot="{ invalid }"
  tag="form"
  )

  .header {{ $t('TITLE') }}

  .content
    p
      strong {{ $t('BODY') }}

    ol.ui.list
      li {{ $t('INSTRUCTIONS.0') }}
      li {{ $t('INSTRUCTIONS.1') }}
      li {{ $t('INSTRUCTIONS.2') }}
      li {{ $t('INSTRUCTIONS.3') }}
      li {{ $t('INSTRUCTIONS.4') }}
      li {{ $t('INSTRUCTIONS.5') }}
      li {{ $t('INSTRUCTIONS.6') }}
      li {{ $t('INSTRUCTIONS.7') }}

    .ui.divider

    .ui.form
      code-input.required.field(
        :disabled="submitting"
        v-model="data.code"
        :class="fieldClass"
        )

      new-password-input.required.field(
        :disabled="submitting"
        v-model="data.password"
        :class="fieldClass"
        )

  .actions
    button.ui.cancel.basic.button(
      :disabled="submitting"
      type="button"
      )

      | {{ $t('FORM.CANCEL') }}

    button.ui.primary.button(
      :disabled="invalid || submitting"
      :class="confirmClass"
      type="submit"
      )

      | {{ $t('FORM.CONFIRM') }}
</template>

<script lang="ts">
import Vue from 'vue';

import NewPasswordInput from '../../core/components/inputs/new-password.vue';
import CodeInput from '../../core/components/inputs/code.vue';

interface SubmitError extends Error {
  code: string;
}

interface ComponentData {
  submitting: boolean;
  data: {
    password: string;
    code: string;
  };
}

export default Vue.extend({
  components: {
    NewPasswordInput,
    CodeInput
  },

  props: {
    email: {
      type: String,
      required: true
    }
  },

  data(): ComponentData {
    return {
      submitting: false,
      data: {
        password: '',
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

    confirmClass(): object {
      return {
        loading: this.submitting
      };
    }
  },

  mounted() {
    const $el = this.$$(this.$el) as JQuery;
    const settings: SemanticUI.ModalSettings = {
      closable: false
    };

    $el.modal(settings);
  },

  methods: {
    show(): void {
      const $el = this.$$(this.$el) as JQuery;

      $el.modal('show');
    },

    /**
     * Cancels password confirm modal.
     */
    cancel(): void {
      const $el = this.$$(this.$el) as JQuery;

      $el.modal('hide');
    },

    /**
     * After error callback.
     */
    afterError(): void {
      this.submitting = false;

      const $el = this.$$(this.$refs.modal) as JQuery;

      $el.modal('hide');
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

        case 'CodeMismatchException':
          this.$toast.error(this.$t('MESSAGES.ERRORS.INVALID_CODE'));
          setTimeout(() => this.afterError(), 3000);
          break;

        case 'ExpiredCodeException':
          this.$toast.warning(this.$t('MESSAGES.ERRORS.EXPIRED_CODE'));
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
     * Confirm success callback.
     */
    onSubmitSuccess(): void {
      this.$toast.success(this.$t('MESSAGES.SUBMIT.SUCCESS'));

      const $el = this.$$(this.$el) as JQuery;

      $el.modal('hide');

      this.$router.replace('/users/sign-in');
    },

    /**
     * Confirms new password.
     */
    async submit(): Promise<void> {
      this.submitting = true;

      const { code, password } = this.data;

      try {
        await this.$auth.forgotPasswordSubmit(this.email, code, password);

        this.onSubmitSuccess();
      } catch (err) {
        this.onSubmitError(err);
        console.error(err);
      }

      this.submitting = false;
    }
  }
});
</script>
