import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import userModule from '@/store/modules/user';
import { Dictionary } from 'vue-router/types/router';

type PostRegexProcessor = (matchs: RegExpMatchArray | any, tence: string, extra?: Dictionary<any>) => {
  matchs: RegExpMatchArray | any,
  tence: string,
  validation_result: boolean,
  message: string,
  data: Array<{ type: string, content: string }>
}

interface IValidator {
  type: string;
  regex: RegExp;
  post_regex?: PostRegexProcessor[];
}

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
    'an car is red',
    'an elephant is huge',
    'You are hungry',
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
    'they are old',
    'they\'re old',
    'she is beautiful',
    'he is huge',
    'he\'s huge',
    'he is really huge',
    'he\'s really huge',

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

  public resourses_gramar = {
    articles: {
      singular: ['a', 'an', 'the'],
      plural: ['the']
    },
    nouns: {
      propers: [
        'cartagena', 'cartagena city', 'juan', 'ann', 'michael', 'charles'
      ],
      common: {
        singular: [
          'car', 'table', 'person', 'pencil', 'children', 'city', 'house', 'phone', 'elephant'
        ],
        plural: ['cities', 'tables', 'persons']
      },
      possessive: [
        'his', 'her', 'its', 'their', 'my', 'our', 'your'
      ],
      personal: ['i', 'you', 'it', 'he', 'she', 'they'],
      demostrative_pronouns: {
        singular: ['that', 'this'],
        plural: ['those', 'these'],
      },
      first_p: {
        singular: {
          subjetive: ['i'],
          objetive: ['me'],
          possessive_determiner: ['my'],
          possessive_pronouns: ['mine'],
        },
        plural: {
          subjetive: ['we'],
          objetive: ['us'],
          possessive_determiner: ['our'],
          possessive_pronouns: ['ours'],
        },
      },
      second_p: {
        singular: {
          subjetive: ['you'],
          objetive: ['you'],
          possessive_determiner: ['your'],
          possessive_pronouns: ['yours'],
        },
        plural: {
          subjetive: ['you'],
          objetive: ['you'],
          possessive_determiner: ['your'],
          possessive_pronouns: ['yours'],
        },
      },
      third_p: {
        singular: {
          subjetive: ['he', 'she', 'it'],
          objetive: ['him', 'her', 'it'],
          possessive_determiner: ['his', 'her', 'its'],
          possessive_pronouns: ['his', 'hers', 'its'],
        },
        plural: {
          subjetive: ['they'],
          objetive: ['them'],
          possessive_determiner: ['their'],
          possessive_pronouns: ['theirs'],
        },
      }
    },
    verbs: {
      to_be: {
        present: {
          singular: ['is', 'am'],
          plural: ['are'],
        },
        past: {
          singular: ['was'],
          plural: ['were'],
        },
        progressive: ['running', 'eating']
      },
      main: {
        singular: ['eat', 'like', 'talk', 'run'],
        plural: ['eats', 'likes', 'talks', 'runs'],
      }
    },
    adjetives: {
      singular: ['beautiful', 'french', 'old', 'huge', 'small', 'little'],
      plural: ['beautiful',],
    }
  }



  created() {

    console.log('=============== Initial ===================')

    this.test();
  }

  mounted() {

  }



  test() {

    const out_content = this.resourses_gramar;

    const regex_validator: IValidator[] = [
      {
        type: 'article + common/proper noun (singular) + verb ( to be (singular) ) + complement ([a-zA-Z]+) ',
        regex: new RegExp(`^(${out_content.articles.singular.join('|')})\\b( *)(${out_content.nouns.common.singular.join('|')})\\b( *)(${out_content.verbs.to_be.present.singular.join('|')})\\b( *)([a-zA-Z]+)`),
        post_regex: [
          (matchs: any, tence: string) => {
            matchs = matchs.filter((element: string) => element.trim());

            // console.log(tence)

            const [entire, artcl, subj, verb, compl] = matchs;

            console.log(matchs)

            const extracted_data = [
              { content: artcl, type: 'article' },
              { content: subj, type: 'subject' },
              { content: verb, type: 'verb' },
              { content: compl, type: 'complement' },
            ]

            if (!(/(an)\b/.test(entire))) return {
              validation_result: true,
              message: 'it\'s correct',
              tence,
              data: extracted_data,
              matchs
            }

            // `an` solo se puede usar cuando viene una palabra con inicial vocal
            const validator = new RegExp(`^(an)\\b( *)([aeiou])`).test(tence)

            return {
              tence,
              matchs,
              data: (validator) ? extracted_data : [],
              validation_result: validator,
              message: `The use of article 'an' is ${(validator) ? 'correct' : 'wrong'}`
            }

          },
          // (matchs: any, tence: string, extra: any) => {

          //   // console.log(tence)

          //   const [entire, artcl, subj] = matchs;

          //   // console.log(`${tence + ' | ' + entire}`)
          //   const predicate = (`${tence.replace(entire, '').trimStart().trimEnd()}`)

          //   let match_inside_predicate: any = predicate.match(
          //     new RegExp(`^(${out_content.verbs.to_be.present.singular.join('|')})\\b( *)(${out_content.adjetives.singular.join('|')})\\b`)
          //   )

          //   if (Array.isArray(match_inside_predicate)) match_inside_predicate = match_inside_predicate.filter((element: string) => element.trim());

          //   console.log('match_inside_predicate', match_inside_predicate)

          //   // console.log(matchs)

          //   return extra;

          //   // `an` solo se puede usar cuando viene una palabra con inicial vocal
          //   // const validator = new RegExp(`^(an)\\b( *)([aeiou])`).test(tence)

          //   // return {
          //   //   tence,
          //   //   matchs,
          //   //   data: [],
          //   //   validation_result: validator,
          //   //   message: `The use of article 'an' is ${(validator) ? 'correct' : 'wrong'}`
          //   // }

          // }
        ]
      },
      {
        type: 'article + common/proper noun (singular) + verb ( to be (singular) ) + complement (.*) ',
        regex: new RegExp(`^(${out_content.articles.singular.join('|')})\\b( *)(${out_content.nouns.common.singular.join('|')})\\b( *)(${out_content.verbs.to_be.present.singular.join('|')})\\b( *)(.*)`),
        post_regex: [
          (matchs: any, tence: string) => {
            matchs = matchs.filter((element: string) => element.trim());

            // console.log(tence)

            const [entire, artcl, subj, verb, compl] = matchs;

            console.log(matchs)

            const extracted_data = [
              { content: artcl, type: 'article' },
              { content: subj, type: 'subject' },
              { content: verb, type: 'verb' },
              { content: compl, type: 'complement' },
            ]

            if (!(/(an)\b/.test(entire))) return {
              validation_result: true,
              message: 'it\'s correct',
              tence,
              data: extracted_data,
              matchs
            }

            // `an` solo se puede usar cuando viene una palabra con inicial vocal
            const validator = new RegExp(`^(an)\\b( *)([aeiou])`).test(tence)

            return {
              tence,
              matchs,
              data: (validator) ? extracted_data : [],
              validation_result: validator,
              message: `The use of article 'an' is ${(validator) ? 'correct' : 'wrong'}`
            }

          },
          // (matchs: any, tence: string, extra: any) => {

          //   // console.log(tence)

          //   const [entire, artcl, subj] = matchs;

          //   // console.log(`${tence + ' | ' + entire}`)
          //   const predicate = (`${tence.replace(entire, '').trimStart().trimEnd()}`)

          //   let match_inside_predicate: any = predicate.match(
          //     new RegExp(`^(${out_content.verbs.to_be.present.singular.join('|')})\\b( *)(${out_content.adjetives.singular.join('|')})\\b`)
          //   )

          //   if (Array.isArray(match_inside_predicate)) match_inside_predicate = match_inside_predicate.filter((element: string) => element.trim());

          //   console.log('match_inside_predicate', match_inside_predicate)

          //   // console.log(matchs)

          //   return extra;

          //   // `an` solo se puede usar cuando viene una palabra con inicial vocal
          //   // const validator = new RegExp(`^(an)\\b( *)([aeiou])`).test(tence)

          //   // return {
          //   //   tence,
          //   //   matchs,
          //   //   data: [],
          //   //   validation_result: validator,
          //   //   message: `The use of article 'an' is ${(validator) ? 'correct' : 'wrong'}`
          //   // }

          // }
        ]
      },
      {
        type: 'possessive noun + common noun',
        regex: new RegExp(`^(${out_content.nouns.possessive.join('|')})\\b( *)(${[
          ...out_content.nouns.common.singular,
          ...out_content.nouns.common.plural
        ].join('|')})\\b`),
      },
      {
        type: 'possessive noun + adjetive', // his anger, her beauty
        regex: / () /,
      },
      {
        type: 'personal noun (1st Person) + verb (singular)', // I Like pizza, I Run
        regex: new RegExp(`^(${[
          ...out_content.nouns.first_p.singular.subjetive,
          ...out_content.nouns.third_p.plural.subjetive,
        ].join('|')})\\b( *)(${[
          ...out_content.verbs.main.singular
        ].join('|')})\\b`)
      },
      {
        type: 'personal noun (3rd Singular Person) + verb (plural)', // He eats, He runs
        regex: new RegExp(`^(${[
          ...out_content.nouns.third_p.singular.subjetive,
        ].join('|')})\\b( *)(${[
          ...out_content.verbs.main.plural
        ].join('|')})\\b`)
      },
      {
        type: 'personal noun (2nd Person) + verb ( to be (plural) )', // You are, They are
        regex: new RegExp(`^(${[
          ...out_content.nouns.second_p.singular.subjetive,
          ...out_content.nouns.third_p.plural.subjetive,
        ].join('|')})\\b( *)(${[
          ...out_content.verbs.to_be.present.plural
        ].join('|')})\\b`)
      },
      {
        type: '[at the end] personal noun (2nd Person) + verb ( to be (plural) )', // You are, They are
        regex: new RegExp(`((${[
          ...out_content.nouns.second_p.singular.subjetive,
          ...out_content.nouns.third_p.plural.subjetive,
        ].join('|')})\\b( *)(${[
          ...out_content.verbs.to_be.present.plural
        ].join('|')})\\b)$`)
      },
      {
        type: 'personal noun (1st Person) + aux verb + verb (singular)', // I do like pizza, I do run
        regex: new RegExp(`^(${[
          ...out_content.nouns.first_p.singular.subjetive,
          ...out_content.nouns.third_p.plural.subjetive,
        ].join('|')})\\b( *)(do|don't|do not)( *)(${[
          ...out_content.verbs.main.singular
        ].join('|')})\\b`),
        post_regex: [
          (matchs: any, tence: string) => {



            matchs = matchs.filter((element: string) => element.trim());

            const [entire, subj, aux, verb] = matchs;

            // console.log(matchs)

            // if (!(/(an)\b/.test(result)))

            return {
              matchs,
              tence,
              data: [
                { type: 'subject', content: subj },
                { type: 'auxiliar', content: aux },
                { type: 'verb', content: verb },
              ],
              validation_result: true,
              message: 'it\'s correct'
            }

          }
        ]
      },
      {
        type: 'personal noun (3rd Person) + aux verb + verb (singular)', // He does eat, He does run, She does like
        regex: new RegExp(`^(${[
          ...out_content.nouns.third_p.singular.subjetive,
        ].join('|')})\\b( *)(does|doesn't|does not)( *)(${[
          ...out_content.verbs.main.singular
        ].join('|')})\\b`),
        post_regex: [
          (matchs: any, tence: string) => {



            matchs = matchs.filter((element: string) => element.trim());

            const [entire, subj, aux, verb] = matchs;

            // console.log(matchs)

            // if (!(/(an)\b/.test(result)))

            return {
              matchs,
              tence,
              data: [
                { type: 'subject', content: subj },
                { type: 'auxiliar', content: aux },
                { type: 'verb', content: verb },
              ],
              validation_result: true,
              message: 'it\'s correct'
            }

          }
        ]
      },
      {
        type: 'demostrative pronoun (singular) + common noun', // this city, these cities 
        regex: new RegExp(`^(${out_content.nouns.demostrative_pronouns.singular.join('|')})\\b( *)(${[
          ...out_content.nouns.common.singular,
        ].join('|')})\\b`),
      },
      {
        type: 'demostrative pronoun (singular) + common noun', // this city, these cities 
        regex: new RegExp(`^(${out_content.nouns.demostrative_pronouns.plural.join('|')})\\b( *)(${[
          ...out_content.nouns.common.plural,
        ].join('|')})\\b`),
      },
      {
        type: 'proper noun + verb (plural)', // Juan runs, Colombia runs
        regex: new RegExp(`^(${out_content.nouns.propers.join('|')})\\b( *)(${[
          ...out_content.verbs.main.plural,
        ].join('|')})\\b`),
      },
      {
        type: 'proper noun + verb (to be)', // Cartagena is, Juan is
        regex: new RegExp(`^(${out_content.nouns.propers.join('|')})\\b( *)(${[
          ...out_content.verbs.to_be.present.singular,
        ].join('|')})\\b`),
      },
    ]

    console.log(regex_validator)

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
