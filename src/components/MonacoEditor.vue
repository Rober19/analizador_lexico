<template>
  <div ref="container" class="monaco-editor" :style="`height:${height}px;width:${width}px`"></div>
</template>

<script>
//
import * as monaco from 'monaco-editor';
import Fase1Language from '@/util/languaje_config';
import Fase1Theme from '@/util/color_theme';
export default {
  props: {
    height: {
      type: Number,
      default: 300,
    },
    width: {
      type: Number,
      default: 500,
    },
    value_editor: {
      type: String,
      default: '// code-default',
    },
    opts: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  name: 'monacoEditor',
  data() {
    return {
      editorValue: '', //
      editor: null, //
      editorOptions: null, //
      // 
      defaultOpts: {
        language: 'Aviator', //
        theme: 'Fase1Theme', //
      },
    };
  },
  watch: {
    opts: {
      handler() {
        this.initEditor();
      },
      deep: true,
    },
  },
  methods: {
    initConfig() {   
      // 
      monaco.languages.register({
        id: 'Aviator',
      });
      // 
      monaco.languages.setMonarchTokensProvider('Aviator', Fase1Language);

      // 
      monaco.editor.defineTheme('Fase1Theme', Fase1Theme);

      // 

      monaco.languages.registerCompletionItemProvider('Aviator', {
        triggerCharacters: ['.'],
      });
    },
    initEditor() {
      // 
      this.MonacoEnvironment = {
        getWorkerUrl: function() {
          return './editor.worker.bundle.js';
        },
      };
      this.initConfig();
      // 
      this.$refs.container.innerHTML = '';

      this.editorOptions = Object.assign(this.defaultOpts, this.opts);

      //   console.log('props', this.value_editor);

      // 
      this.editor = monaco.editor.create(this.$refs.container, {
        ...this.editorOptions,
        value: this.value_editor,
      });
      // 编辑器内容发生改变时触发
      this.editor.onDidChangeModelContent(() => {
        this.$emit('change', this.editor.getValue());
        this.editorValue = this.editor.getValue();
      });
    },   
    getVal() {
      return this.editor.getValue();
    },
  },
  mounted() {
    this.initEditor();
  },
  destroyed() {
    this.editor.dispose(); // 
  },
};
</script>

<style scoped></style>
