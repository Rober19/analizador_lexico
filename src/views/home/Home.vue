<template>
  <div class="home">
    <MonacoEditor
      width="800"
      height="500"
      theme="vs-light"
      original="..."
      value="declare"
      :options="options"
      @change="onChange"
    />
  </div>
</template>

<script lang="ts" src="./Home.ts"></script>
<style lang="scss" scoped src="./home.scss"></style>
