<i18n>
{
  "en": {
    "TITLE": "Enable account",
    "CONFIRM": {
      "MESSAGE": "By enabling this account the user will be able to sign in.",
      "LABEL": "Confirm account enabling."
    },
    "MESSAGES": {
      "SUCCESS": "Account enabled."
    },
    "DISABLE": "Enable"
  }
}
</i18n>

<template lang="pug">
.ui.olive.left.aligned.segment
  h4.ui.olive.header(v-t=`'TITLE'`)

  p(v-t=`'CONFIRM.MESSAGE'`)

  .ui.basic.vertical.segment
    label.ui.fluid.labeled.basic.icon.button(
      :disabled='isEnabling'
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

  button.ui.fluid.labeled.olive.icon.button(
    :disabled='!data.confirm || isEnabling'
    @click='enableUser()'
    type='button'
    :class=`{
      loading: isEnabling
    }`
    )

    i.ban.icon
    span(v-t=`'DISABLE'`)

</template>

<script>
import AWS from 'aws-sdk';

export default {
  name: 'user-enable',

  props: ['params', 'user'],

  data() {
    return {
      isEnabling: false,

      cognito: new AWS.CognitoIdentityServiceProvider(),

      data: {
        confirm: false
      }
    };
  },

  methods: {
    onEnableUser(err) {
      if (err) {
        console.error(err);
        return;
      }

      this.user.enabled = true;

      this.$toastr.success(this.$t('MESSAGES.SUCCESS'));

      this.isEnabling = false;
    },

    /**
     * Disables the account.
     */
    enableUser() {
      this.data.confirm = false;
      this.isEnabling = true;

      this.cognito.adminEnableUser(this.params, this.onEnableUser);
    }
  }
};
</script>

