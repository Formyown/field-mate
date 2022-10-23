<template>
  <div class="background">
    <div class="title-bar">
      <div class="item w-100">
        <t-select v-model="language" :options="languages" />
      </div>
      <div class="item w-100">
        <t-button @click="onParse" theme="default">Show AST</t-button>
      </div>
      <div class="item" style="margin-left: auto;">
        <t-button @click="onSettingOpen" shape="square" variant="dashed">
          <icon name="setting" />
        </t-button>
      </div>

    </div>
    <div id="editor" ref="editor">
    </div>
    <div class="status-bar">
      <span><icon name="check-circle-filled" v-if="className != ''" />{{className}}</span>
      
    </div>

    <t-dialog :visible.sync="settingModelVisible" mode="modeless" draggable
      :onConfirm="() => (settingModelVisible = false)" style="z-index: 100000;">
      <div slot="header">
        <icon name="setting" size="18px" /><span>Settings</span>
      </div>
      <div slot="body">
        <t-form>
          <t-form-item label="Theme">
            <t-radio-group v-model="colorMode" variant="default-filled">
              <t-radio-button value="vs-dark">Dark theme</t-radio-button>
              <t-radio-button value="vs-light">Light theme</t-radio-button>
            </t-radio-group>
          </t-form-item>

          <t-form-item label="Font size(px)" initialData="16">
            <t-input placeholder="px" v-model="fontSize" />
          </t-form-item>
        </t-form>
      </div>
    </t-dialog>

  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from "vue-property-decorator";
import { editor } from 'monaco-editor';
import { Icon } from 'tdesign-icons-vue';

import 'monaco-editor/esm/vs/editor/editor.worker.js';
import 'monaco-editor/esm/vs/language/json/json.worker';

import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import 'monaco-editor/esm/vs/basic-languages/java/java.contribution';

import { parse } from "java-parser";

@Component({ components: { Icon } })
export default class HomeView extends Vue {
  @Ref("editor")
  private editorEl!: HTMLElement;
  public originalText: string | null = null;
  public language: string = "java";
  public languages = [
    { label: 'Java', value: 'java' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'Json', value: 'json' }
  ];
  public text = "import";
  public editor!: editor.IStandaloneCodeEditor;
  public options = {
    selectOnLineNumbers: true
  }

  public settingModelVisible = false;
  public colorMode = "vs-dark";
  public fontSize = 20;

  public className = "";

  public mounted() {
    this.editor = editor.create(this.editorEl!, {
      value: '',
      language: 'java',
      automaticLayout: true,
      theme: 'vs-dark',
      fontSize: this.fontSize,
      foldingStrategy: 'indentation'
    });
  }

  @Watch("language")
  private langChanged() {
    console.log(this.language)
    editor.setModelLanguage(this.editor.getModel()!, this.language);
  }

  @Watch("colorMode")
  private colorModeChanged() {
    this.editor.updateOptions({ theme: this.colorMode });
    switch (this.colorMode) {
      case "vs-light": {
        document.documentElement.setAttribute('theme-mode', 'light');
        break;
      }
      case "vs-dark": {
        document.documentElement.setAttribute('theme-mode', 'dark');
        break;
      }
    }
  }

  @Watch("fontSize")
  public fontSizeChanged() {
    this.editor.updateOptions({fontSize: this.fontSize});
  }

  public onParse() {
    switch (this.language) {
      case "java": {
        const cstRoot = parse(this.editor.getValue()) as any;
        console.log(cstRoot);
        try {
          this.className = cstRoot.children.ordinaryCompilationUnit[0].children.typeDeclaration[0].children.classDeclaration[0].children.normalClassDeclaration[0].children.typeIdentifier[0].children.Identifier[0].image;
        }
        catch {
          this.className = "";
        }
        
      }
    }
  }

  public onSettingOpen() {
    this.settingModelVisible = true;
  }

  private selectChanged() {

  }

}
</script>
<style>
.background {
  height: 100vh;
  background: var(--td-bg-color-container);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.title-bar {
  padding: 4px;
  display: flex;
  gap: 12px;
}

.status-bar {
  height: 25px;
  line-height: 25px;
  padding: 0 10px 0 10px;
  background-color: blueviolet;
  font-size: 14px;

  vertical-align: middle;
  color: var(--td-text-color-anti);
}

.title-bar item {
  height: 30px;
  padding: 0 10px 0 10px;
}
.w-100 {
  width: 100px;
}
#editor {
  flex: 1;
}
</style>
