import { Dictionary } from "vue-router/types/router";

import { resourses_gramar } from './resourses';


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


export const regex_validator: IValidator[] = [
  {
    type: 'article + common noun (singular 3rd Person) + verb ( to be (singular) ) + complement ([a-zA-Z]+) ',
    regex: new RegExp(`^(${resourses_gramar.articles.singular.join('|')})\\b( *)(${resourses_gramar.nouns.common.singular.join('|')})\\b( *)(${resourses_gramar.verbs.to_be.present.singular_3rd.join('|')})\\b( *)([a-zA-Z]+)`),
    post_regex: [
      (matchs: any, tence: string) => {
        matchs = matchs.filter((element: string) => element.trim());

        // console.log(tence)

        const [entire, artcl, subj, verb, compl] = matchs;

        console.log(matchs)

        const extracted_data = [
          { content: artcl, type: 'article' },
          { content: subj, type: 'common noun' },
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
    ]
  },
  {
    type: 'article + common noun (singular 3rd Person) + verb ( to be (singular) ) + complement (.*) ',
    regex: new RegExp(`^(${resourses_gramar.articles.singular.join('|')})\\b( *)(${resourses_gramar.nouns.common.singular.join('|')})\\b( *)(${resourses_gramar.verbs.to_be.present.singular_3rd.join('|')})\\b( *)(.*)`),
    post_regex: [
      (matchs: any, tence: string) => {
        matchs = matchs.filter((element: string) => element.trim());

        // console.log(tence)

        const [entire, artcl, subj, verb, compl] = matchs;

        console.log(matchs)

        const extracted_data = [
          { content: artcl, type: 'article' },
          { content: subj, type: 'common noun' },
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

    ]
  },
  {
    type: 'article + common noun (plural) + verb ( to be (singular) ) + complement (.*) ',
    regex: new RegExp(`^(${resourses_gramar.articles.plural.join('|')})\\b( *)(${resourses_gramar.nouns.common.plural.join('|')})\\b( *)(${resourses_gramar.verbs.to_be.present.plural.join('|')})\\b( *)(.*)`),
    post_regex: [
      (matchs: any, tence: string) => {
        matchs = matchs.filter((element: string) => element.trim());

        // console.log(tence)

        const [entire, artcl, subj, verb, compl] = matchs;

        console.log(matchs)

        const extracted_data = [
          { content: artcl, type: 'article' },
          { content: subj, type: 'common noun' },
          { content: verb, type: 'verb' },
          { content: compl, type: 'complement' },
        ]

        // if doesn't include 'an'
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

    ]
  },
  {
    type: 'possessive noun + common noun (singular) + verb + complement',
    regex: new RegExp(`^(${resourses_gramar.nouns.possessive.join('|')})\\b( *)(${[
      ...resourses_gramar.nouns.common.singular,
      // ...resourses_gramar.nouns.common.plural
    ].join('|')})\\b( *)(${[
      ...resourses_gramar.verbs.to_be.present.singular_3rd,
      // ...resourses_gramar.nouns.common.plural
    ].join('|')})\\b( *)(.*)`),
    post_regex: [
      (matchs: any, tence: string) => {
        matchs = matchs.filter((element: string) => element.trim());

        const [entire, possesive, noun,  verb, complement] = matchs;

        console.log(matchs)
        // if (!(/(an)\b/.test(result)))

        return {
          matchs,
          tence,
          data: [
            { type: 'possessive noun', content: possesive },
            { type: 'common noun', content: noun },
            { type: 'verb', content: verb },
        
            // // { type: 'auxiliar', content: aux },
            // { type: 'verb', content: verb },
            { type: 'complement', content: complement },
          ],
          validation_result: true,
          message: 'it\'s correct'
        }

      }
    ]
  },

  {
    type: 'personal noun (1st Person) + verb (main (singular) )', // I Like pizza, I Run
    regex: new RegExp(`^(${[
      ...resourses_gramar.nouns.first_p.singular.subjetive,
      // ...resourses_gramar.nouns.third_p.plural.subjetive,
    ].join('|')})\\b( *)(${[
      ...resourses_gramar.verbs.main.singular
    ].join('|')})\\b`)
  },
  {
    type: 'personal noun (1st Person) + verb (to be (singular) )', // I am old
    regex: new RegExp(`^(${[
      ...resourses_gramar.nouns.first_p.singular.subjetive,
      // ...resourses_gramar.nouns.third_p.plural.subjetive,
    ].join('|')})\\b( *)(${[
      ...resourses_gramar.verbs.to_be.present.singular_1st
    ].join('|')})\\b`)
  },
  {
    type: '[using contraction]  personal noun (1st Person) + verb (to be (singular) )', // I'm old
    regex: new RegExp(`^(${[
      ...resourses_gramar.nouns.first_p.contractions.present.singular
    ].join('|')})\\b`)
  },
  {
    type: 'personal noun (3rd Singular Person) + verb (plural)', // He eats, He runs
    regex: new RegExp(`^(${[
      ...resourses_gramar.nouns.third_p.singular.subjetive,
    ].join('|')})\\b( *)(${[
      ...resourses_gramar.verbs.main.plural
    ].join('|')})\\b`)
  },
  {
    type: 'personal noun (3rd Plural Person) + verb (singular)', // He eats, He runs
    regex: new RegExp(`^(${[
      ...resourses_gramar.nouns.third_p.plural.subjetive,
    ].join('|')})\\b( *)(${[
      ...resourses_gramar.verbs.main.singular
    ].join('|')})\\b`)
  },
  {
    type: 'personal noun (2nd Person) + verb ( to be (plural) ) + complement (.*) ', // You are, They are
    regex: new RegExp(`^(${[
      ...resourses_gramar.nouns.second_p.singular.subjetive,
      // ...resourses_gramar.nouns.third_p.plural.subjetive,
    ].join('|')})\\b( *)(${[
      ...resourses_gramar.verbs.to_be.present.plural
    ].join('|')})\\b( *)(.*)`),
    post_regex: [
      (matchs: any, tence: string) => {

        matchs = matchs.filter((element: string) => element.trim());

        const [entire, subj, verb, complement] = matchs;

        console.log(matchs)
        // if (!(/(an)\b/.test(result)))

        return {
          matchs,
          tence,
          data: [
            { type: 'personal noun', content: subj },
            { type: 'verb', content: verb },
            { type: 'complement', content: complement },
          ],
          validation_result: true,
          message: 'it\'s correct'
        }

      }
    ]
  },
  {
    type: '[using contraction] personal noun (2nd Person) + verb ( to be (plural) )', // You're, They're
    regex: new RegExp(`^(${[
      ...resourses_gramar.nouns.second_p.contractions.present.singular,
      // ...resourses_gramar.nouns.third_p.plural.subjetive,
    ].join('|')})\\b(.*)`),
    post_regex: [
      (matchs: any, tence: string) => {

        matchs = matchs.filter((element: string) => element.trim());

        const [entire, subj, comp] = matchs;

        console.log(matchs)
        // if (!(/(an)\b/.test(result)))

        return {
          matchs,
          tence,
          data: [
            { type: 'personal noun + verb (to be)', content: subj },
            { type: 'complement', content: comp },
            // { type: 'verb', content: verb },
          ],
          validation_result: true,
          message: 'it\'s correct'
        }

      }
    ]
  },
  {
    type: '[at the end] personal noun (2nd Person) + verb ( to be (plural) )', // You are, They are
    regex: new RegExp(`((${[
      ...resourses_gramar.nouns.second_p.singular.subjetive,
      // ...resourses_gramar.nouns.third_p.plural.subjetive,
    ].join('|')})\\b( *)(${[
      ...resourses_gramar.verbs.to_be.present.plural
    ].join('|')})\\b)$`)
  },
  {
    type: 'personal noun (1st Person) + aux verb + verb (singular)', // I do like pizza, I do run
    regex: new RegExp(`^(${[
      ...resourses_gramar.nouns.first_p.singular.subjetive,
      // ...resourses_gramar.nouns.third_p.plural.subjetive,
    ].join('|')})\\b( *)(do|don't|do not)( *)(${[
      ...resourses_gramar.verbs.main.singular
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
            { type: 'personal noun', content: subj },
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
      ...resourses_gramar.nouns.third_p.singular.subjetive,
    ].join('|')})\\b( *)(does|doesn't|does not)( *)(${[
      ...resourses_gramar.verbs.main.singular
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
            { type: 'personal noun', content: subj },
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
    type: 'personal noun (3rd Person) + verb (to be) + complement ', // He does eat, He does run, She does like
    regex: new RegExp(`^(${[
      ...resourses_gramar.nouns.third_p.singular.subjetive,
    ].join('|')})\\b( *)( *)(${[
      ...resourses_gramar.verbs.to_be.present.singular_3rd
    ].join('|')})\\b( *)(.*)`),
    post_regex: [
      (matchs: any, tence: string) => {



        matchs = matchs.filter((element: string) => element.trim());

          const [entire, subj, verb, complement] = matchs;

        // console.log(matchs)

        // if (!(/(an)\b/.test(result)))

        return {
          matchs,
          tence,
          data: [
            { type: 'personal noun', content: subj },
            { type: 'verb', content: verb },
            { type: 'complement', content: complement },
            // { type: 'verb', content: verb },
          ],
          validation_result: true,
          message: 'it\'s correct'
        }

      }
    ]
  },
  {
    type: 'demostrative pronoun (singular 3rd Person) + common noun + verb (to be (singular)) + complement (.*)', // this city, these cities 
    regex: new RegExp(`^(${resourses_gramar.nouns.demostrative_pronouns.singular.join('|')})\\b( *)(${[
      ...resourses_gramar.nouns.common.singular,
    ].join('|')})\\b( *)(${[
      ...resourses_gramar.verbs.to_be.present.singular_3rd,
    ].join('|')})\\b( *)(.*)`),
    post_regex: [
      (matchs: any, tence: string) => {
        matchs = matchs.filter((element: string) => element.trim());

        const [entire, dem_pron, subj, verb, complement] = matchs;

        console.log(matchs)

        // if (!(/(an)\b/.test(result)))

        return {
          matchs,
          tence,
          data: [
            { type: 'demostrative pronoun', content: dem_pron },
            { type: 'common noun', content: subj },
            // { type: 'auxiliar', content: aux },
            { type: 'verb', content: verb },
            { type: 'complement', content: complement },
          ],
          validation_result: true,
          message: 'it\'s correct'
        }

      }
    ]

  },
  {
    type: 'demostrative pronoun (plural) + common noun + verb (to be (plural) ) + complement (.*)', // this city, these cities 
    regex: new RegExp(`^(${resourses_gramar.nouns.demostrative_pronouns.plural.join('|')})\\b( *)(${[
      ...resourses_gramar.nouns.common.plural,
    ].join('|')})\\b( *)(${[
      ...resourses_gramar.verbs.to_be.present.plural,
    ].join('|')})\\b( *)(.*)`),
    post_regex: [
      (matchs: any, tence: string) => {
        matchs = matchs.filter((element: string) => element.trim());

        const [entire, dem_pron, subj, verb, complement] = matchs;

        console.log(matchs)

        // if (!(/(an)\b/.test(result)))

        return {
          matchs,
          tence,
          data: [
            { type: 'demostrative pronoun', content: dem_pron },
            { type: 'common noun', content: subj },
            // { type: 'auxiliar', content: aux },
            { type: 'verb', content: verb },
            { type: 'complement', content: complement },
          ],
          validation_result: true,
          message: 'it\'s correct'
        }

      }
    ]
  },
  {
    type: 'proper noun + verb (plural)', // Juan runs, Colombia runs
    regex: new RegExp(`^(${resourses_gramar.nouns.propers.join('|')})\\b( *)(${[
      ...resourses_gramar.verbs.main.plural,
    ].join('|')})\\b`),
    post_regex: [
      (matchs: any, tence: string) => {
        matchs = matchs.filter((element: string) => element.trim());

        const [entire, noun, verb] = matchs;

        console.log(matchs)

        // if (!(/(an)\b/.test(result)))

        return {
          matchs,
          tence,
          data: [
            { type: 'proper noun', content: noun },
            { type: 'verb', content: verb },
          ],
          validation_result: true,
          message: 'it\'s correct'
        }

      }
    ]
  },
  {
    type: 'proper noun (3rd Person) + verb (to be) + complement (.*)', // Cartagena is, Juan is
    regex: new RegExp(`^(${resourses_gramar.nouns.propers.join('|')})\\b( *)(${[
      ...resourses_gramar.verbs.to_be.present.singular_3rd,
    ].join('|')})\\b( *)(.*)`),
    post_regex: [
      (matchs: any, tence: string) => {



        matchs = matchs.filter((element: string) => element.trim());

        const [entire, subj, verb, complement] = matchs;

        console.log(matchs)

        // if (!(/(an)\b/.test(result)))

        return {
          matchs,
          tence,
          data: [
            { type: 'proper noun', content: subj },
            // { type: 'auxiliar', content: aux },
            { type: 'verb', content: verb },
            { type: 'complement', content: complement },
          ],
          validation_result: true,
          message: 'it\'s correct'
        }

      }
    ]
  },

]