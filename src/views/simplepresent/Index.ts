import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import userModule from '@/store/modules/user';
import { Dictionary } from 'vue-router/types/router';

import { resourses_gramar } from './extras/resourses'
import { regex_validator } from './extras/extractor'

@Component({
  components: {
  }
})
export default class Home extends Vue {

  public text_to_test = [
    'the car is red',
    'the car is red & fast',
    'a car is red',
    'the cars are red',
    'those cars are blue',
    'those cars is green',
    'these cars are beautiful',
    'a cars are red',
    'an car is red',
    'an elephant is huge',
    'the elephant is huge',
    'the elephant are huge',
    'You are hungry',
    'You are hungry and tired',
    'You\'re hungry',
    'You is hungry',
    'You are an elephant hungry',
    'his car is blue',
    'their house is ugly',
    'hungry you are',
    'Cartagena is a beautiful city',
    'ann runs',
    'Cartagena city is a beautiful place',
    'Cartagena city is a beautiful city',
    'This phone is broken',
    'I like pizza',
    'I like coffee',
    'he eats',
    'he runs',
    'she does like to run',
    'I do like to eat',
    'I don\'t like to eat',
    'I do not like to eat',
    'they like to talk',
    'this city is the worst',
    'these cities are huge',
    'I was',
    'He was',
    'I am old',
    'I\'m old',
    'they jump',
    'they are old',
    'they\'re old',
    'she is beautiful',
    'he is huge',
    'he\'s huge',
    'he is really huge',
    'he\'s really huge',
    'Juan runs',
    'Michael likes to run',
    'Michael does not like to run',
    'Michael doesn\'t like to run',

  ]

  public colors = [
    'green accent-2',
    'blue lighten-3',
    'yellow accent-2',
    'pink lighten-3',
    'purple lighten-3',
    'indigo lighten-3',
    'teal lighten-3',
    'cyan lighten-3',
    'light-green accent-1'
  ]

  public logs_by_text = [];

  public resourses_gramar = resourses_gramar;

  created() {

    console.log('=============== Initial ===================')

    this.test();
  }

  mounted() {

  }


  test() {

    // console.log(regex_validator)

    const local_logs: any = []

    this.text_to_test.forEach((tence: string, index: number) => {
      tence = tence.toLowerCase();
      /**
       * 
       * 
       */
      // console.log(index)
      const current_item = {};
      let current_log = '';

      regex_validator.forEach(({ regex, type, post_regex }) => {

        if (regex.test(tence)) {

          const match_entire: any = tence.match(regex)
          const [all_match]: any = match_entire

          // console.log(tence, [type])
          current_log += `analysis: ${all_match} (${type})\n\n`

          if (!post_regex) {
            Object.assign(current_item, { validation_result: true })
          }

          let extra: any = {};

          post_regex?.some(func => {
            const res = func(match_entire, tence, extra)
            // console.log(res)
            extra = res;
            current_log += `analysis: ${res.message}\n\n`
            Object.assign(current_item, { data: res.data, validation_result: res.validation_result })

            return !res.validation_result;
          })
        }


      })

      Object.assign(current_item, { current_log })

      local_logs.push(current_item)

    });

    this.logs_by_text = local_logs;

  }

  other() {
    const negativeWords = [
      "no", "not", "never", "neither", "nobody", "none", "nor",
      "nothing", "nowhere", "few", "hardly", "little", "rarely",
      "scarcely", "seldom", "hadn’t", "don’t", "doesn’t",
      "didn’t", "couldn’t", "can’t", "wouldn’t", "haven’t", "aren’t",
      "hasn’t", "won’t", "shouldn’t", "isn’t", "wasn’t", "weren’t"
    ];
  }

}
