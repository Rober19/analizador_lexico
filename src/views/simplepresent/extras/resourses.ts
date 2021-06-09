
export const resourses_gramar = {
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
      plural: ['cities', 'tables', 'people', 'cars', 'houses', 'phones']
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
          singular: ['he\'s','she\'s','it\'s'],
          plural: ['they\'re']
        }
      }
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
      singular: ['eat', 'like', 'talk', 'run', 'jump'],
      plural: ['eats', 'likes', 'talks', 'runs', 'jumps'],
    }
  },
  adjetives: {
    singular: ['beautiful', 'french', 'old', 'huge', 'small', 'little'],
    plural: ['beautiful',],
  }
}