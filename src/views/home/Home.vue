<template>
  <div class="home">
    <v-layout row wrap>
      <v-flex xs12 md6>
        <MonacoEditor
          ref="monaco"
          @change="changeValue"
          :opts="opts"
          :height="400"
          :width="800"
          :value_editor="default_code"
        />
      </v-flex>

      <v-flex xs12 md12 >
        <!-- <br />

          <v-btn @click="check(default_code)">Analizar</v-btn> -->

        <br />
        <br />
        <br />

        <v-treeview open-all :items="items">
          <template v-slot:prepend="{ item }">
            <v-icon v-text="`${item.icon || ''}`" :color="`${item.icon_color || ''}`"></v-icon>
          </template>
        </v-treeview>
      </v-flex>
      <v-flex xs12 md3 >
      
        
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts" src="./Home.ts"></script>
<style lang="scss" scoped src="./home.scss"></style>
