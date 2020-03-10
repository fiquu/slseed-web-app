declare module '*.vue' {
  import Vue from 'vue';

  export type ImportedVueComponent = Promise<typeof import('*.vue')>;

  export default Vue;
}
