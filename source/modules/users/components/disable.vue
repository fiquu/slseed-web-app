<i18n>
en:
  TITLE: Disable account
  CONFIRM:
    MESSAGE: By disabling this account the user will no longer be able to sign in.
    LABEL: Confirm account disabling.
  MESSAGES:
    SUCCESS: Account disabled.
  DISABLE: Disable
</i18n>

<template lang="pug">
.ui.orange.left.aligned.segment
  h4.ui.orange.header
    | {{ $t('TITLE') }}

  p {{ $t('CONFIRM.MESSAGE') }}

  .ui.basic.vertical.segment
    label.ui.fluid.labeled.basic.icon.button(
      :disabled="isDisabling"
      role="button"
      )

      input(
        v-model="data.confirm"
        type="checkbox"
        v-show="false"
        )

      i.icon(:class="iconClass")
      | {{ $t('CONFIRM.LABEL') }}

  button.ui.fluid.labeled.orange.icon.button(
    :disabled="!data.confirm || disabling"
    @click="disableUser"
    :class="buttonClass"
    type="button"
    )

    i.ban.icon
    | {{ $t('DISABLE') }}

</template>

<script lang="ts">
import AWS from 'aws-sdk';
import Vue from 'vue';

export default Vue.extend({
  name: 'UserDisable',

  props: {
    params: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      disabling: false,

      cognito: new AWS.CognitoIdentityServiceProvider(),

      data: {
        confirm: false
      }
    };
  },

  computed: {
    iconClass() {
      return {
        'square outline': !this.data.confirm,
        'checkmark box': this.data.confirm
      };
    },

    buttonClass() {
      return {
        loading: this.disabling
      };
    }
  },

  methods: {
    onDisableUser(err) {
      if (err) {
        console.error(err);
        return;
      }

      this.user.enabled = false;

      this.$toast.success(this.$t('MESSAGES.SUCCESS'));

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
});
</script>
