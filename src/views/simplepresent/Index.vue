<template>
  <v-container>
    <v-container>
      <br />
      <h1>English grammar (Time: Present)</h1>
      <br />
    </v-container>
    <!-- LIST -->
    <v-row
      v-show="showSentencesList"
      v-for="(text, index) in text_to_test"
      :key="index"
      style="border: solid 2px gray; margin-bottom: 10px; border-radius: 5px;"
    >
      <v-col cols="12" sm="6" md="6">
        <v-card class="mx-auto" outlined>
          <v-card-title>
            <v-icon left>
              mdi-text-recognition
            </v-icon>
            <span class="text-h6 mb4 font-weight-light">Sentence: # {{index+1}} </span>
          </v-card-title>
          <v-card-text class="text-h6 font-weight-regular"> " {{ text }} " </v-card-text>
        </v-card>
        <br />
        <div>
          <v-chip class="ma-2" v-for="(item, index2) in logs_by_text[index].data" :key="index2">
            {{ item.content }}
            <v-chip class="ma-2" :color="colors[index2]" small>
              {{ item.type }}
            </v-chip>
          </v-chip>
        </div>
        <v-row style="margin-top: 85px">
          <v-col cols="auto" class="mr-auto">
            <div>
              <v-btn @click="hideList(index)" outlined>
                Hide list
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <pre
          >{{ logs_by_text[index].current_log }}
        </pre>
        <div>
          Grammar:
          <!-- prettier-ignore -->
          <v-chip
            class="ma-2"
            :color="logs_by_text[index].validation_result ? 'green' : (logs_by_text[index].validation_result == undefined ) ? 'blue' : 'red'"
            small
          >
            {{ logs_by_text[index].validation_result ? 'Ok' : (logs_by_text[index].validation_result == undefined ) ? 'Unknown' : 'Bad' }}
          </v-chip>
        </div>
      </v-col>
    </v-row>
    <!-- ONE ITEM -->
    <v-row
      v-show="!showSentencesList"
      style="border: solid 2px gray; margin-bottom: 10px; border-radius: 5px;"
    >
      <v-col cols="12" sm="6" md="6">
        <v-card class="mx-auto" outlined>
          <v-card-title>
            <v-icon left>
              mdi-text-recognition
            </v-icon>
            <span class="text-h6 mb4 font-weight-light">Sentence </span>
          </v-card-title>
          <v-card-text class="text-h6 font-weight-regular">
            " {{ text_to_test[indexSelected] }} "
          </v-card-text>
        </v-card>
        <br />
        <div>
          <v-chip
            class="ma-2"
            v-for="(item, index2) in logs_by_text[indexSelected].data"
            :key="index2"
          >
            {{ item.content }}
            <v-chip class="ma-2" :color="colors[index2]" small>
              {{ item.type }}
            </v-chip>
          </v-chip>
        </div>
        <v-row style="margin-top: 85px">
          <v-col>
            <div>
              <v-btn @click="showList()" outlined>
                Show list
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <pre
          >{{ logs_by_text[indexSelected].current_log }}
        </pre>
        <div>
          Grammar:
          <!-- prettier-ignore -->
          <v-chip
            class="ma-2"
            :color="logs_by_text[indexSelected].validation_result ? 'green' : (logs_by_text[indexSelected].validation_result == undefined ) ? 'blue' : 'red'"
            small
          >
            {{ logs_by_text[indexSelected].validation_result ? 'Ok' : (logs_by_text[indexSelected].validation_result == undefined ) ? 'Unknown' : 'Bad' }}
          </v-chip>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" src="./Index.ts"></script>
<style lang="scss" scoped src="./Index.scss"></style>
