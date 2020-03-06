<i18n>
en:
  TITLE: Enable account
  CONFIRM:
    MESSAGE: By enabling this account the user will be able to sign in.
    LABEL: Confirm account enabling.
  MESSAGES:
    SUCCESS: Account enabled.
  ENABLE: Enable
</i18n>

<template lang="pug">
.ui.olive.left.aligned.segment
  h4.ui.olive.header
    | {{ $t('TITLE') }}

  p {{ $t('CONFIRM.MESSAGE') }}

  .ui.basic.vertical.segment
    label.ui.fluid.labeled.basic.icon.button(
      :disabled="enabling"
      role="button"
      )

      input(
        v-model="data.confirm"
        type="checkbox"
        v-show="false"
        )

      i.icon(:class="iconClass")
      | {{ $t('LABEL') }}

  button.ui.fluid.labeled.olive.icon.button(
    :disabled="!data.confirm || enabling"
    :class="buttonClass"
    @click="enableUser"
    type="button"
    )

    i.check.circle.icon
    | {{ $t('ENABLE') }}

</template>

<script lang="ts">
import AWS from 'aws-sdk';
import Vue from 'vue';

interface ComponentData {
  cognito: AWS.CognitoIdentityServiceProvider;
  enabling: boolean;
  data: {
    confirm: boolean;
  };
}

export default Vue.extend({
  name: 'UserEnable',

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

  data(): ComponentData {
    return {
      cognito: new AWS.CognitoIdentityServiceProvider(),
      enabling: false,
      data: {
        confirm: false
      }
    };
  },

  computed: {
    iconClass(): any {
      return {
        'square outline': !this.data.confirm,
        'checkmark box': this.data.confirm
      };
    },

    buttonClass(): any {
      return {
        loading: this.enabling
      };
    }
  },

  methods: {
    onEnableUser(err: Error): void {
      if (err) {
        console.error(err);
        return;
      }

      this.user.enabled = true;

      this.$toast.success(this.$t('MESSAGES.SUCCESS'));

      this.enabling = false;
    },

    enableUser(): void {
      this.data.confirm = false;
      this.enabling = true;

      this.cognito.adminEnableUser(this.params, this.onEnableUser);
    }
  }
});
</script>

