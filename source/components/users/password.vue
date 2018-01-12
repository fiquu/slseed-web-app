<i18n>
{
  "es": {
    "TITLE": "Reestablecer Clave",
    "SUBTITLE": "Ingresa tu correo para reestablecer tu clave.",
    "HAVE_PASSWORD": "Ya tengo mi clave",
    "HAVE_CODE": "Ya tengo un código",
    "FORM": {
      "EMAIL": {
        "PLACEHOLDER": "Ingresa tu email...",
        "LABEL": "Email"
      },
      "CODE": {
        "PLACEHOLDER": "Ingresa el código...",
        "LABEL": "Código"
      },
      "PASSWORD": {
        "PLACEHOLDER": "Ingresa tu nueva clave...",
        "LABEL": "Nueva Clave"
      },
      "SUBMIT": "Solicitar código"
    },
    "RESET": {
      "TITLE": "¡Atención!",
      "BODY": "Sigue estas instrucciones para reestablecer tu clave:",
      "INSTRUCTIONS": {
        "1": "No cierres esta ventana.",
        "2": "Ve a la bandeja de entrada de tu correo.",
        "3": "Abre el mensaje que te hemos enviado.",
        "4": "Busca el código y cópialo.",
        "5": "Vuelve a esta página y pega el código.",
        "6": "Ingresa tu nueva clave.",
        "7": "Confirma el cambio.",
        "8": "¡Listo!"
      },
      "CONFIRM": "Confirmar",
      "CANCEL": "Cancelar"
    },
    "MESSAGES": {
      "INFO": {
        "BODY": "Si ya tienes un código, ingresa tu correo y presiona el botón \"Ya tengo un código\"."
      },
      "SUCCESS": {
        "TITLE": "¡Listo!",
        "BODY": "Ingresa con tu nueva clave."
      },
      "LIMIT_EXCEEDED": {
        "BODY": "Por favor espera un momento antes de reintentar."
      },
      "USER_NOT_FOUND": {
        "BODY": "Comprueba que el correo sea el correcto."
      },
      "INVALID_CODE": {
        "BODY": "El codigo es inválido."
      },
      "EXPIRED_CODE": {
        "BODY": "Por favor pide un nuevo código."
      },
      "NOT_AUTHORIZED": {
        "BODY": "Por favor ponte en contacto con tu administrador."
      },
      "ERROR": {
        "BODY": "No se pudo realizar la solicitud."
      }
    }
  }
}
</i18n>

<template lang="pug">
section.view
  .ui.centered.grid.container
    .doubling.two.column.row
      .column
        .ui.basic.vertical.segment
          .ui.center.aligned.primary.segment
            h3.ui.primary.icon.header
              i.circular.asterisk.icon
              .content
                span(v-t=`'TITLE'`)
                .sub.header(v-t=`'SUBTITLE'`)

          form.ui.form(@submit.prevent='submit()')
            .ui.negative.icon.message(v-if='isErrored')
              i.exclamation.triangle.icon
              .content
                .header(v-t=`'FORM.ERROR.MESSAGE.TITLE'`)
                p(v-t=`'FORM.ERROR.MESSAGE.BODY'`)

            .ui.info.icon.message
              i.info.circle.icon
              .content(v-t=`'MESSAGES.INFO.BODY'`)

            .required.field(
              :class=`{
                error: fields.email && fields.email.dirty && errors.has('email'),
                disabled: isSubmitting
              }`
              )

              label(
                v-t=`'FORM.EMAIL.LABEL'`
                for='email-input'
                )

              input#email-input(
                :placeholder=`$t('FORM.EMAIL.PLACEHOLDER')`
                v-validate.initial=`'required|email'`
                :disabled='isSubmitting'
                v-model='data.email'
                name='email'
                type='email'
                required
                )

            button.ui.primary.fluid.right.labeled.icon.submit.button(
              :disabled=`errors.has('email') || isSubmitting`
              type='submit'
              :class=`{
                loading: isSubmitting
              }`
              )

              span(v-t=`'FORM.SUBMIT'`)
              i.chevron.right.icon

            .ui.basic.vertical.segment
              button.ui.fluid.basic.button(
                :disabled=`errors.has('email') || isSubmitting`
                @click='onInputVerificationCode()'
                v-t=`'HAVE_CODE'`
                type='button'
                )

            .ui.center.aligned.basic.vertical.segment
              a.ui.link(
                href='#/'
                v-t=`'HAVE_PASSWORD'`
                )

  .ui.mini.modal(ref='resetPasswordModal')
    .header(v-t=`'RESET.TITLE'`)
    .content
      p
        strong(v-t=`'RESET.BODY'`)

      ol.ui.list
        li(v-t=`'RESET.INSTRUCTIONS.1'`)
        li(v-t=`'RESET.INSTRUCTIONS.2'`)
        li(v-t=`'RESET.INSTRUCTIONS.3'`)
        li(v-t=`'RESET.INSTRUCTIONS.4'`)
        li(v-t=`'RESET.INSTRUCTIONS.5'`)
        li(v-t=`'RESET.INSTRUCTIONS.6'`)
        li(v-t=`'RESET.INSTRUCTIONS.7'`)
        li(v-t=`'RESET.INSTRUCTIONS.8'`)

      .ui.divider

      form.ui.form(@submit.prevent='')
        .required.field(
          :class=`{
            error: fields.code && fields.code.dirty && errors.has('code'),
            disabled: isConfirming
          }`
          )

          label(
            v-t=`'FORM.CODE.LABEL'`
            for='code-input'
            )

          input#code-input(
            :placeholder=`$t('FORM.CODE.PLACEHOLDER')`
            v-validate.initial=`'required|min:1'`
            :disabled='isConfirming'
            v-model='data.code'
            type='number'
            name='code'
            required
            )

        .required.field(
          :class=`{
            error: fields.password && fields.password.dirty && errors.has('password'),
            disabled: isConfirming
          }`
          )

          label(
            v-t=`'FORM.PASSWORD.LABEL'`
            for='password-input'
            )

          input#password-input(
            :placeholder=`$t('FORM.PASSWORD.PLACEHOLDER')`
            v-validate.initial=`'required|min:8'`
            :disabled='isConfirming'
            v-model='data.password'
            type='password'
            name='password'
            required
            )

    .actions
      button.ui.cancel.basic.button(
        :disabled='isConfirming'
        v-t=`'RESET.CANCEL'`
        type='button'
        )

      button.ui.primary.button(
        :disabled=`errors.has('code') || errors.has('password') || isConfirming`
        v-t=`'RESET.CONFIRM'`
        @click='confirm()'
        type='button'
        :class=`{
          loading: isConfirming
        }`
        )
</template>

<script>
const { $, toastr } = window;

export default {
  data() {
    return {
      isSubmitting: false,
      isConfirming: false,
      isCodeSent: false,
      isErrored: false,

      data: {
        email: null
      }
    };
  },

  beforeCreate() {
    if (this.$auth.isSignedIn()) {
      this.$router.push('dashboard');
    }
  },

  mounted() {
    $(this.$refs.resetPasswordModal).modal({
      onApprove: this.confirm,
      onDeny: this.cancel,
      closable: false
    });
  },

  methods: {
    /**
     * Input verification code callback.
     */
    onInputVerificationCode() {
      $(this.$refs.resetPasswordModal).modal('show');
    },

    /**
     * Confirm success callback.
     */
    onConfirmSuccess() {
      this.isConfirming = false;

      toastr.success(this.$t('MESSAGES.SUCCESS.BODY'), this.$t('MESSAGES.SUCCESS.TITLE'));

      $(this.$refs.resetPasswordModal).modal('hide');

      this.$router.push('/');
    },

    /**
     * Confirms new password.
     */
    confirm() {
      this.isConfirming = true;

      this.$auth.confirmPassword(this.data, {
        onSuccess: res => this.onConfirmSuccess(res),
        onFailure: err => this.onError(err)
      });
    },

    /**
     * Cancels password confirm modal.
     */
    cancel() {
      this.isSubmitting = false;
      this.isCodeSent = false;
    },

    /**
     * Submit success callback.
     */
    onSubmitSuccess() {
      this.isSubmitting = false;
      this.isCodeSent = true;

      this.data.password = null;
      this.data.code = null;
    },

    /**
     * After error callback.
     */
    afterError() {
      this.isSubmitting = false;
      this.isConfirming = false;
      this.isCodeSent = false;
    },

    /**
     * Submit error callback.
     *
     * @param {Object} err HTTP response object.
     */
    onError(err) {
      console.error(err);
      console.dir(err);

      $(this.$refs.resetPasswordModal).modal('hide');

      switch (err.code) {
        case 'LimitExceededException':
          toastr.error(this.$t('MESSAGES.LIMIT_EXCEEDED.BODY'));
          setTimeout(() => this.afterError(), 30000);
          break;

        case 'UserNotFoundException':
          toastr.error(this.$t('MESSAGES.USER_NOT_FOUND.BODY'));
          setTimeout(() => this.afterError(), 3000);
          break;

        case 'CodeMismatchException':
          toastr.error(this.$t('MESSAGES.INVALID_CODE.BODY'));
          setTimeout(() => this.afterError(), 3000);
          break;

        case 'ExpiredCodeException':
          toastr.warning(this.$t('MESSAGES.EXPIRED_CODE.BODY'));
          setTimeout(() => this.afterError(), 3000);
          break;

        case 'NotAuthorizedException':
          toastr.warning(this.$t('MESSAGES.NOT_AUTHORIZED.BODY'));
          this.$router.push('/');
          break;

        default:
          toastr.error(this.$t('MESSAGES.ERROR.BODY'));
          setTimeout(() => this.afterError(), 3000);
      }
    },

    /**
     * Signs the user in.
     */
    submit() {
      this.isCodeSent = false;
      this.isErrored = false;

      this.$validator.validate('email').then(valid => {
        if (!valid) {
          return;
        }

        this.isSubmitting = true;

        this.cognitoUser = this.$auth.forgotPassword(this.data, {
          inputVerificationCode: () => this.onInputVerificationCode(),
          onSuccess: res => this.onSubmitSuccess(res),
          onFailure: err => this.onError(err)
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.ui.centered.grid.container {
  .doubling.two.column.row {
    .column {
      padding: 0;
    }
  }
}
</style>
