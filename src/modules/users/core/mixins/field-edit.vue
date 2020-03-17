
<script lang="ts">
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import Vue from 'vue';

interface ComponentData {
  cognito: CognitoIdentityServiceProvider;
  submitting: boolean;
  modified: boolean;
  editing: boolean;
  key: string;
  data: {
    value: string;
  };
}

export default Vue.extend({
  name: 'UserEmailEdit',

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
      cognito: new CognitoIdentityServiceProvider(),
      submitting: false,
      modified: false,
      editing: false,
      key: '',
      data: {
        value: this.user.email
      }
    };
  },

  methods: {
    toggleEditing() {
      if (this.editing) {
        this.editing = false;

        if (this.modified) {
          const validator: any = this.$refs.validator;

          if (!validator.validate()) {
            this.data.value = this.user[this.key];
            this.modified = false;
          } else {
            this.submit();
          }
        }
      } else {
        this.editing = true;
      }
    },

    onValueChanged() {
      this.modified = this.data.value !== this.user[this.key];
    },

    async submit() {
      this.submitting = true;
      this.editing = false;

      this.params.Username = this.user.sub;
      this.params.UserAttributes = [
        {
          Name: this.key,
          Value: this.data.value
        }
      ];

      try {
        await this.cognito.adminUpdateUserAttributes(this.params).promise();

        this.user[this.key] = this.data.value;
        this.modified = true;
      } catch (err) {
        this.$toast.error(this.$t('MESSAGES.SUBMIT.ERROR'));
        this.modified = false;
        this.editing = true;
      }

      this.submitting = false;
    }
  }
});
</script>
