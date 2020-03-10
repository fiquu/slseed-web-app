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
    CODE:
      PLACEHOLDER: Enter your recovery code...
      LABEL: Recovery Code
    PASSWORD:
      PLACEHOLDER: Enter your new password...
      LABEL: New Password
    CONFIRM: Confirm
    CANCEL: Cancel
</i18n>

<template lang="pug">
.ui.mini.modal
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

    form.ui.form(@submit.prevent="")
      .required.field(:class="formCodeClass")
        label(for="code-input")
          | {{ $t('FORM.CODE.LABEL') }}

        input#code-input(
          :placeholder="$t('FORM.CODE.PLACEHOLDER')"
          v-validate.initial="'required|min:1'"
          :disabled="confirming"
          v-model="data.code"
          type="number"
          name="code"
          required
          )

      .required.field(:class="fieldClass")
        label(for="password-input")
          | {{ $t('FORM.PASSWORD.LABEL') }}

        input#password-input(
          :placeholder="$t('FORM.PASSWORD.PLACEHOLDER')"
          v-validate.initial="'required|min:8'"
          :disabled="confirming"
          v-model="data.password"
          type="password"
          name="password"
          required
          )

  .actions
    button.ui.cancel.basic.button(
      :disabled="confirming"
      type="button"
      )

      | {{ $t('CANCEL') }}

    button.ui.primary.button(
      :disabled="errors.has('code') || errors.has('password') || confirming"
      :class="confirmClass"
      @click="confirm"
      type="button"
      )

      | {{ $t('CONFIRM') }}
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

});
</script>
