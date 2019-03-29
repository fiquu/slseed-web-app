<i18n>
en:
  MESSAGES:
    SUBMIT:
      ERROR: "Couldn't update name."
</i18n>

<template lang="pug">
.field(
  :class="fieldClass"
  v-if="user"
  )

  .ui.fluid.action.input
    input(
      :disabled="!editing || submitting"
      v-validate="'required|min:3'"
      @change="onValueChanged"
      @input="onValueChanged"
      :readonly="!editing"
      v-model="data.value"
      minlength="3"
      name="value"
      type="text"
      )

    button.ui.icon.button(
      @click="toggleEditing"
      :disabled="submitting"
      :class="buttonClass"
      )

      i.notched.circle.loading.icon(v-if="submitting")
      i.cancel.icon(v-else-if="errors.has('value') || editing && !modified")
      i.save.icon(v-else-if="!errors.has('value') && editing && modified")
      i.edit.icon(v-else-if="!editing")
</template>

<script>
import AWS from 'aws-sdk';

export default {
  props: ['params', 'user'],

  computed: {
    fieldClass() {
      return {
        error: this.errors.has('value')
      };
    },

    buttonClass() {
      return {
        negative: this.errors.has('value')
      };
    }
  },

  data() {
    return {
      submitting: false,
      modified: false,
      editing: false,

      data: {
        value: String(this.user.name)
      }
    };
  },

  computed: {
    /**
     * Checks if the value has been modified.
     */
    modified() {
      return this.user.name !== this.data.value;
    }
  },

  methods: {
    /**
     * Toggles editing mode.
     */
    toggleEditing() {
      if (this.editing) {
        this.editing = false;

        if (this.modified) {
          if (this.errors.has('value')) {
            this.data.value = String(this.user.value);
            this.modified = false;
          } else {
            this.submit();
          }
        }
      } else {
        this.editing = true;
      }

      this.$validator.validateAll();
    },

    /**
     * Submits the new attribute data.
     */
    async submit() {
      this.submitting = true;

      try {
        await this.$http.put('users', {
          name: this.data.value,
          _id: this.user._id
        });

        this.user.name = String(this.data.value);

        this.modified = false;
      } catch (err) {
        this.$toastr.error(this.$t('MESSAGES.SUBMIT.ERROR'));

        this.modified = true;
        this.editing = true;

        console.error(err);
      }

      this.submitting = false;
    }
  }
};
</script>
