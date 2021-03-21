declare module 'vee-validate';
declare module 'vee-validate/dist/types';
declare module 'vee-validate/*';

interface IVeeValidateMixinsData {
    emailRules: any[];
    urlRules: any[];
    urlRules2: any[];
    nameRules: any[];
    FieldTxtRules: any[];
    FieldNumberCustom1Rules: any[]; //required|decimal|between:0,1000000 (need to work on this one later)
    selectRules: any[];
    radioRules: any[];
    checkboxRules: any[];
}
