<template>
  <div class="home">
    <v-layout row wrap>
      <v-flex xs12 md12>
        <MonacoEditor
          ref="monaco"
          @change="changeValue"
          :opts="opts"
          :height="300"
          :width="1200"
          :value_editor="defaul_code"
        />
      </v-flex>

      <v-flex xs12 md12>
        <v-container>
          <v-btn @click="check(defaul_code)">Check</v-btn>
          <v-treeview :items="items"></v-treeview>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts" src="./Home.ts"></script>
<style lang="scss" scoped src="./home.scss"></style>
