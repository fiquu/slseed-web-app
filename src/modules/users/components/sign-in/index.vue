<i18n>
en:
  TITLE: Welcome
  SUBTITLE: Please sign in with your credentials.
  FORGOT_PASSWORD: I forgot my password
  FORM:
    PASSWORD:
      PLACEHOLDER: Enter your password...
      LABEL: Password
    NAME:
      PLACEHOLDER: Enter your full name...
      LABEL: Full Name
    NEW_PASSWORD:
      MESSAGE:
        TITLE: "That's a temporary password!"
        BODY: You must create a new password.
      PLACEHOLDER: Create your password...
      LABEL: New Password
    ERROR:
      MESSAGE:
        TITLE: "Couldn't sign you in..."
        BODY: Please verify that your email and password are correct.
    SUBMIT: Sign in
</i18n>

<template lang="pug">
section.view
  .ui.centered.grid.container
    .doubling.two.column.row
      .column
        .ui.basic.vertical.segment
          .ui.center.aligned.primary.segment
            h3.ui.primary.icon.header
              i.circular.id.badge.icon
              .content {{ $t('TITLE') }}
                .sub.header {{ $t('SUBTITLE') }}

          validation-observer.ui.form(
            @submit.prevent="signIn()"
            v-slot="{ invalid }"
            ref="form"
            tag="form"
            )

            .ui.negative.icon.message(v-if="errored")
              i.exclamation.triangle.icon
              .content
                .header {{ $t('FORM.ERROR.MESSAGE.TITLE') }}
                p {{ $t('FORM.ERROR.MESSAGE.BODY') }}

            validation-provider(
              rules="required|email"
              v-slot="{ invalid }"
              slim
              )

              email-input.required.field(
                :class="[invalid, formEmailFieldClass]"
                :disabled="signingIn"
                v-model="data.email"
                required
                )

            validation-provider(
              rules="required|min:8"
              v-slot="{ invalid }"
              slim
              )

              .required.field(:class="[invalid, formPasswordFieldClass]")
                label(for="password-input")
                  | {{ $t('FORM.PASSWORD.LABEL') }}

                input#password-input(
                  :placeholder="$t('FORM.PASSWORD.PLACEHOLDER')"
                  v-validate.initial="'required|min:8'"
                  :disabled="signingIn"
                  v-model="data.password"
                  name="password"
                  type="password"
                  minlength="8"
                  required
                  )

            validation-provider(
              v-if="newPasswordRequired"
              rules="required|min:8"
              v-slot="{ invalid }"
              slim
              )

              .required.field(:class="[invalid, formNewPasswordFieldClass]")
                .ui.primary.icon.message
                  i.exclamation.circle.icon
                  .content
                    .header {{ $t('FORM.NEW_PASSWORD.MESSAGE.TITLE') }}
                    p {{ $t('FORM.NEW_PASSWORD.MESSAGE.BODY') }}

                label(for="new-password-input")
                  | {{ $t('FORM.NEW_PASSWORD.LABEL') }}

                input#new-password-input(
                  :placeholder="$t('FORM.NEW_PASSWORD.PLACEHOLDER')"
                  v-validate.initial="'required|min:8'"
                  :disabled="signingIn"
                  v-model="data.newPassword"
                  name="newpassword"
                  type="password"
                  minlength="8"
                  required
                  )

            button.ui.primary.fluid.right.labeled.icon.submit.button(
              :disabled="invalid || signingIn"
              :class="formSubmitClass"
              type="submit"
              )

              | {{ $t('FORM.SUBMIT') }}
              i.sign.in.icon

            .ui.center.aligned.vertical.segment
              router-link.ui.link(to="/users/password")
                | {{ $t('FORGOT_PASSWORD') }}
</template>

<script lang="ts">
import { CognitoUser, IAuthenticationCallback } from 'amazon-cognito-identity-js';
import Vue from 'vue';

interface ComponentData {
  newPasswordRequired: boolean;
  signingIn: boolean;
  errored: boolean;

  data: {
    newPassword: string;
    password: string;
    name?: string;
    email: string;
  };
}

export default Vue.extend({
  data() {
    const data: ComponentData = {
      newPasswordRequired: false,
      signingIn: false,
      errored: false,

      data: {
        newPassword: '',
        password: '',
        email: ''
      }
    };

    return data;
  },

  computed: {
    formEmailFieldClass(): any {
      return {
        disabled: this.signingIn
      };
    },

    formPasswordFieldClass(): any {
      return {
        disabled: this.signingIn
      };
    },

    formNewPasswordFieldClass(): any {
      return {
        disabled: this.signingIn
      };
    },

    formSubmitClass(): any {
      return {
        loading: this.signingIn
      };
    }
  },

  beforeCreate() {
    if (this.$auth.isSignedIn()) {
      this.$router.replace('/');
    }
  },

  methods: {
    /**
     * Sign in success callback.
     */
    async onSignInSuccess() {
      if (this.newPasswordRequired) {
        this.data.password = this.data.newPassword;
        this.newPasswordRequired = false;

        await this.signIn();

        return;
      }

      this.$router.replace('/');
    },

    /**
     * Sign in error callback.
     *
     * @param {Error} err The error to handle.
     */
    onSignInError(err: Error): void {
      console.error(err);

      this.errored = err.message !== 'New password is required.';
      this.signingIn = false;
    },

    /**
     * New password required callback.
     *
     * @param {object} user The Cognito User object.
     * @param {object} attributes The user attributes.
     */
    onNewPasswordRequired(user: CognitoUser, attributes: any): void {
      const newPassword: string = String(this.data.newPassword);
      const requiredAttributeData: any = {
        ...attributes
      };

      delete requiredAttributeData.email_verified; // The API doesn't accept this field back

      this.newPasswordRequired = true;

      /* User was signed up by an admin and must provide new
       * password and required attributes, if any, to complete
       * authentication. */

      // Required fields
      requiredAttributeData.name = this.data.name;

      user.completeNewPasswordChallenge(newPassword, requiredAttributeData, {
        onSuccess: (): void => {
          this.newPasswordRequired = false;

          this.$auth.signOut(true);

          this.data.password = this.data.newPassword;

          this.signIn();
        },

        onFailure: (err: Error): void => {
          this.onSignInError(err);
        }
      });
    },

    /**
     * Signs the user in.
     */
    async signIn(): Promise<void> {
      this.signingIn = true;
      this.errored = false;

      const callbacks: IAuthenticationCallback = {
        newPasswordRequired: (userAttributes: any) =>
          this.onNewPasswordRequired(userAttributes, null),
        onSuccess: () => this.onSignInSuccess(),
        onFailure: (err: any) => this.onSignInError(err)
      };

      await this.$auth.signIn(this.data, callbacks);
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
