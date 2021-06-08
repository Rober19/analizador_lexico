import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import userModule from '@/store/modules/user';

@Component({
  components: {
  }
})
export default class Home extends Vue {

  public text_to_test = [
    'the car is red',
    'a car is red',
    'an car is red',
    'You are hungry',
    'hungry you are',
    'Cartagena is a beautiful city',
    'Cartagena city is a beautiful place',
    'Cartagena city is a beautiful city',
    'This phone is broken',
    'I like pizza',
    'I like coffee',
    'he eats',
    'he runs',
    'she does like to run',
    'I do like to eat',
    'they like to talk',
    'this city is the worst',
    'these cities are huge'
  ]

  public resourses_gramar = {
    articles: ['a', 'an', 'the'],
    nouns: {
      propers: [
        'cartagena', 'ann', 'michael', 'charles'
      ],
      common: {
        singular: [
          'car', 'table', 'person', 'pencil', 'children', 'city'
        ],
        plural: []
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
        singular: ['i', 'me', 'myself', 'mine', 'my'],
        plural: ['we', 'us', 'ourselves', 'ourself', 'ours', 'our']
      },
      second_p: {
        singular: ['you', 'yourself', 'yours', 'your'],
        plural: ['you', 'you', 'yourselves', 'yours', 'your']
      },
      third_p: {
        singular: [
          'he', 'him', 'himself', 'his',
          'she', 'her', 'herself', 'hers',
          'it', 'itself', 'its',
          'they', 'them', 'themselves', 'theirs', 'their'
        ],
        plural: []
      }
    },
    verbs: {
      to_be: {
        singular: ['is', 'am'],
        plural: ['are'],
        present: ['running', 'eating']
      },
      main: {
        singular: ['eat', 'like', 'talk'],
        plural: ['eats', 'likes', 'talks'],
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

    const regex_validator_subject = [
      {
        type: 'article + common/proper noun (singular)',
        regex: new RegExp(`(^(${out_content.articles.join('|')})\\b)( *)(${out_content.nouns.common.singular.join('|')})`, 'g'),
        post_regex: [
          ([result]: any, tence: string) => {

            if (!(/(an)\b/.test(result))) return { validation_result: true, message: 'perfect' }

            // `an` solo se puede usar cuando viene una palabra con inicial vocal
            const validator = new RegExp(`(^(an)\\b)( *)([aeiou])`, 'g').test(tence)

            return { validation_result: validator, message: `Use of 'an' article is ${(validator) ? 'good' : 'bad'}` }

          }
        ]
      },
      {
        type: 'possessive noun + common noun',
        regex: / () /
      },
      {
        type: 'personal noun (1st Person) + verb (singular)', // I Like pizza, I Run
        regex: / () /
      },
      {
        type: 'personal noun (2nd Person) + verb (plural)', // He eats, He runs
        regex: / () /
      },
      {
        type: 'personal noun (1st Person) + aux verb + verb (singular)', // I Like pizza, I Run
        regex: / () /
      },
      {
        type: 'personal noun (2nd Person) + aux verb + verb (singular)', // He does eat, He does run
        regex: / () /
      },
      {
        type: 'demostrative pronoun (singular) + common noun', // this city, these cities 
        regex: / () /
      },
    ]

    this.text_to_test.forEach((tence: string) => {
      tence = tence.toLowerCase();
      /**
       * 
       * 
       */
      // console.log(tence)

      regex_validator_subject.forEach(({ regex, type, post_regex }) => {

        if (regex.test(tence)) {
          console.log(tence, [type])
          console.log(tence.match(regex))

          post_regex?.forEach(func => {
            const res = func(tence.match(regex), tence)
            console.log(res)
          })
        }


      })


    });


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
