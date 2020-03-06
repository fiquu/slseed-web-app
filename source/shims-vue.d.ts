declare module '*.vue' {
  import Vue from 'vue'

  export type ImportedVueComponent = typeof import('*.vue');

  export default Vue
}
