<i18n>
{
  "en": {
    "TITLE": "Disable account",
    "CONFIRM": {
      "MESSAGE": "By disabling this account the user will no longer be able to sign in.",
      "LABEL": "Confirm account disabling."
    },
    "MESSAGES": {
      "SUCCESS": "Account disabled."
    },
    "DISABLE": "Disable"
  }
}
</i18n>

<template lang="pug">
.ui.orange.left.aligned.segment
  h4.ui.orange.header(v-t=`'TITLE'`)

  p(v-t=`'CONFIRM.MESSAGE'`)

  .ui.basic.vertical.segment
    label.ui.fluid.labeled.basic.icon.button(
      :disabled='isDisabling'
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

  button.ui.fluid.labeled.orange.icon.button(
    :disabled='!data.confirm || isDisabling'
    @click='disableUser()'
    type='button'
    :class=`{
      loading: isDisabling
    }`
    )

    i.ban.icon
    span(v-t=`'DISABLE'`)

</template>

<script>
import AWS from 'aws-sdk';

export default {
  name: 'user-disable',

  props: ['params', 'user'],

  data() {
    return {
      isDisabling: false,

      cognito: new AWS.CognitoIdentityServiceProvider(),

      data: {
        confirm: false
      }
    };
  },

  methods: {
    onDisableUser(err) {
      if (err) {
        console.error(err);
        return;
      }

      this.user.enabled = false;

      this.$toastr.success(this.$t('MESSAGES.SUCCESS'));

      this.isDisabling = false;
    },

    /**
     * Disables the account.
     */
    disableUser() {
      this.data.confirm = false;
      this.isDisabling = true;

      this.cognito.adminDisableUser(this.params, this.onDisableUser);
    }
  }
};
</script>
