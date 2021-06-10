
export const resourses_gramar = {
  articles: {
    singular: ['a', 'an', 'the'],
    plural: ['the']
  },
  nouns: {
    propers: [
      'cartagena', 'cartagena city', 'mary', 'juan', 'ann', 'michael', 'charles'
    ],
    common: {
      singular: [
        'car', 'cat', 'table', 'person', 'pencil', 'children', 'city', 'house', 'phone', 'elephant'
      ],
      /**
       * 
       * Palabras plurales de todas las categorias
       * 
       */
      plural: ['cities', 'tables', 'people', 'cars', 'houses', 'phones', 'elephants']
    },
    possessive: [
      'his', 'her', 'its', 'their', 'my', 'our', 'your'
    ], 
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
      contractions: {
        present: {
          singular: ['i\'m'],
          plural: ['we\'re']
        }
      }
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
      contractions: {
        present: {
          singular: ['you\'re'],
          plural: ['you\'re']
        }
      }
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
      contractions: {
        present: {
          singular: ['he\'s', 'she\'s', 'it\'s'],
          plural: ['they\'re']
        }
      }
    }
  },
  verbs: {
    to_be: {
      present: {
        singular_1st: ['am'],
        singular_3rd: ['is'],
        plural: ['are'],
      },
      past: {
        singular: ['was'],
        plural: ['were'],
      },
      progressive: ['running', 'eating', 'shining']
    },
    main: {
      singular: ['eat', 'like', 'talk', 'run', 'jump', 'shine'],
      plural: ['eats', 'likes', 'talks', 'runs', 'jumps', 'shines'],
    }
  },
  adjetives: {
    singular: ['beautiful', 'french', 'old', 'huge', 'small', 'little'],
    plural: ['beautiful',],
  }
}