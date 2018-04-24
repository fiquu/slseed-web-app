<i18n>
{
  "en": {
    "TITLE": "Resend temporary password",
    "CONFIRM": {
      "MESSAGE": "This will resend the temporary password to the user.",
      "LABEL": "Confirm temporary password resend."
    },
    "MESSAGES": {
      "ERROR": "Couldn't resend temporary password.",
      "SUCCESS": "Temporary password resent."
    },
    "DISABLE": "Resend"
  }
}
</i18n>

<template lang="pug">
.ui.blue.left.aligned.segment
  h4.ui.blue.header(v-t=`'TITLE'`)

  p(v-t=`'CONFIRM.MESSAGE'`)

  .ui.basic.vertical.segment
    label.ui.fluid.labeled.basic.icon.button(
      :disabled='isResending'
      role='button'
      )

      input(
        v-model='data.confirm'
        type='checkbox'
        v-show='false'
        )

      i.icon(
        :class=`{
          'square outline': !data.confirm,
          'checkmark box': data.confirm
        }`
        )

      span(v-t=`'CONFIRM.LABEL'`)

  button.ui.fluid.right.labeled.blue.icon.button(
    :disabled='!data.confirm || isResending'
    @click='resend()'
    type='button'
    :class=`{
      loading: isResending
    }`
    )

    i.send.icon
    span(v-t=`'DISABLE'`)

</template>

<script>
import AWS from 'aws-sdk';

export default {
  name: 'user-resend',

  props: ['params', 'user'],

  data() {
    return {
      isResending: false,

      cognito: new AWS.CognitoIdentityServiceProvider(),

      data: {
        confirm: false
      }
    };
  },

  methods: {
    /**
     * Resend callback.
     *
     * @param {Object} err Error object.
     */
    onResend(err) {
      this.isResending = false;

      if (err) {
        this.$toastr.error(this.$t('MESSAGES.ERROR'));

        console.error(err);

        return;
      }

      this.$toastr.success(this.$t('MESSAGES.SUCCESS'));
    },

    /**
     * Disables the account.
     */
    resend() {
      this.data.confirm = false;
      this.isResending = true;

      const params = Object.assign({}, this.params, {
        Username: this.user.email,
        MessageAction: 'RESEND'
      });

      this.cognito.adminCreateUser(params, this.onResend);
    }
  }
};
</script>
