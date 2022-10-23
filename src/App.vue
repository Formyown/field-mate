<template>
  <t-config-provider :global-config="globalConfig">
    <div id="app">
    <nav>
    </nav>
    <router-view />
  </div>
  </t-config-provider>
  
</template>
<script lang="ts">
import merge from 'lodash/merge';
import enConfig from 'tdesign-vue/es/locale/en_US';

import { Component, Prop, Ref, Vue, Watch } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  public globalConfig = merge(enConfig, {
    calendar: {},
    table: {},
    pagination: {},
  });
}
</script>
