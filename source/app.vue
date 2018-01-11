<i18n>
{
  "es": {
    "SIGN_OUT": "Salir"
  }
}
</i18n>

<template lang="pug">
main#app
  header.ui.fixed.top.compact.menu
    a.item(
      v-if=`$route.path !== '/dashboard' && $auth.isSignedIn()`
      href='#/dashboard'
      )

      i.chevron.left.icon

    .header.item
      img(src='/static/images/navbar-icon.png')
      span &ensp;Mejor Municipio

    .right.menu
      .item(v-if=`!$auth.isSignedIn()`) Gestores
      .item(v-if=`$auth.isSignedIn()`)
        | {{ $auth.get('name') }}

      a.item(
        v-if=`$auth.isSignedIn()`
        @click='$auth.signOut()'
        )

        i.sign.out.icon
        span(v-t=`'SIGN_OUT'`)

  router-view
</template>

<script>
export default {
  name: 'app'
};
</script>

<style lang="scss">
html,
body {
  background-color: #f6f6f6;
  overflow: hidden;
  height: 100%;
  width: 100%;
}

input,
textarea {
  font-family: inherit;
}

#app {
  flex-direction: column;
  display: flex;
  height: 100%;
  width: 100%;

  > header {
    position: static !important;
    flex: 0 0 auto;
    border: 0;
  }

  > section.view {
    overflow-y: auto;
    flex: 1 1 auto;
  }
}

.ui.segment {
  h4.header {
    text-transform: uppercase;
    font-size: 0.86em;
  }
}

.ui.label {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.ui.fluid.label {
  display: block;
  margin: 0;
}

.field.error .ui.action.input input:focus {
  border-color: inherit !important;
}

// Toastr styles
#toast-container {
  flex-direction: column;
  align-items: center;
  position: fixed;
  display: flex;
  padding: 0;
  margin: 0;
  bottom: 0;
  right: 0;
  left: 0;

  & > .toast {
    box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12), 0 2px 10px 0 rgba(34, 36, 38, 0.15);
    border: 1px solid rgba(34, 36, 38, 0.22);
    border-radius: 0.28571429rem;
    background-color: #f8f8f9;
    display: block;
    position: relative;
    color: rgba(0, 0, 0, 0.87);
    padding: 1em 1.5em 1em 4em;
    overflow: hidden;
    margin: 1em;
    flex: 0 0 auto;

    &:before {
      content: '';
      position: absolute;
      font-family: Icons;
      font-size: 1.6em;
      line-height: 0.9em;
      left: 0.8em;
    }

    > .toast-progress {
      background: rgba(34, 36, 38, 0.22);
      border-radius: 0.28571429rem;
      position: absolute;
      height: 1px;
      bottom: 0;
      left: 0;
    }

    &.toast-warning {
      background-color: #fffaf3;
      border-color: #c9ba9b;
      color: #573a08;

      & > .toast-progress {
        background-color: #c9ba9b;
      }

      &:before {
        content: '\f06a';
      }
    }

    &.toast-error {
      background-color: #fff6f6;
      border-color: #e0b4b4;
      color: #9f3a38;

      & > .toast-progress {
        background-color: #e0b4b4;
      }

      &:before {
        content: '\f071';
      }
    }

    &.toast-info {
      background-color: #f8ffff;
      border-color: #a9d5de;
      color: #276f86;

      & > .toast-progress {
        background-color: #a9d5de;
      }

      &:before {
        content: '\f05a';
      }
    }

    &.toast-success {
      background-color: #fcfff5;
      border-color: #a3c293;
      color: #2c662d;

      & > .toast-progress {
        background-color: #a3c293;
      }

      &:before {
        content: '\f058';
      }
    }
  }
}
</style>
