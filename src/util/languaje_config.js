/* eslint-disable no-useless-escape */
export default {
  tokenizer: {
    root: [
      [/"(?:[^\\]|\\.)*?(?:"|$)/, 'string'],
      [/'(?:[^\\]|\\.)*?(?:'|$)/, 'string'],
      [/(?:function|Inicio|Fin|si|entonces|sino|finsi)\b/, 'reservada'],
      [/(?:declare|entero|real|recibe|envia)\b/, 'declarators'],
      [/[-+\/*=<>!]+/, 'operator'],
      [/#.*/, 'comment'],
    ],

    common: [],

    whitespace: [],

    comment: [],

    jsdoc: [],

    regexp: [],

    regexrange: [],

    string_double: [],

    string_single: [],

    string_backtick: [],

    bracketCounting: [],
  },
};
