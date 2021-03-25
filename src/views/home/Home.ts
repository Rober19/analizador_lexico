import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import userModule from '@/store/modules/user';

// import HelloWorld from '@/components/HelloWorld.vue';
import MonacoEditor from '@/components/MonacoEditor.vue';
import { GET_LOCALE } from '@/store/root/actions';
// import MonacoEditor from 'monaco-editor-vue';
// import MonacoEditor from 'vue-monaco-editor'

const UserModule = namespace(userModule.vuexName);

@Component({
    components: {
        // HelloWorld,
        MonacoEditor
    }
})
export default class Home extends Vue {

    public opts: any = {
        value: '',
        autoIndent: true,
        roundedSelection: true
    }

    public declaraciones_vars_array: any = []

    public default_code = `
Inicio
    declare a,1b entero;
    declare x real;
    declare i real;
    recibe(x);
    a = 5;
    b = 2;
    si x >= (b + 1c) entonces
        # a = a +1
        envia ("HOLA MUNDO");
    sino
        envia ("ESTO ES UNA PRUEBA");
    finsi;
Fin    
    `

    public items: any = [
        {
            id: 1,
            name: 'Declaracion de Variables :',
            icon: 'mdi-package-variant',
            children: []
        }
    ];

    public tree_keywords: any = [
        {
            id: 1,
            name: 'Palabras Reservadas :',
            icon: 'mdi-script-text-key-outline',
            children: []
        }
    ];



    ValidationVariables(str: string) {

        const regex_variable_general = /(declare\s+)((.|\s)*?)(?:(entero|cadena|logico|fecha|real)\s*);/gm;

        let m: any = {};
        let counter = 0;
        this.declaraciones_vars_array = [];

        while ((m = regex_variable_general.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex_variable_general.lastIndex) {
                regex_variable_general.lastIndex++;
            }

            counter++;

            // console.log(`\n MATCH ${counter} \n`);

            const [
                entire_string,
                declare,
                segmento_variable, ,
                data_type
            ]: any = m;

            // console.log({
            //     declare,
            //     segmento_variable,
            //     data_type,
            // });

            this.declaraciones_vars_array.push(
                this.checkVariableMetadata({ segmento_variable, data_type, counter })
            )

        }

        // cargar variables al arbol
        this.items[0].children = this.declaraciones_vars_array;





    }

    mounted() {
        this.check(this.default_code)
    }

    checkVariableMetadata({ counter, segmento_variable, data_type }: any) {


        const checkVariableName = (name_dirty: string | any) => {

            //clean name
            const name = name_dirty.replace(/^\s+|\s+$/g, '')

            const filterProcessor = [
                {
                    regex: new RegExp(/^[a-zA-Z](.*)/g),
                    error: 'Debe iniciar con un letra'
                },
                {
                    regex: new RegExp(/^[a-zA-Z][\W\w]*$/g),
                    error: 'No debe tener espacios'
                },
                {
                    regex: new RegExp(/^[a-zA-Z][\w]*$/g),
                    error: 'No debe incluir caracteres especiales'
                },
                {
                    regex: new RegExp(/^[a-zA-Z][_0-9a-zA-Z]{0,15}$/g),
                    error: 'No debe sobrepasar el limite establecido de 15 caracteres'
                },
            ]

            for (const filter of filterProcessor) {
                if (!filter.regex.test(name)) {

                    console.log({
                        name,
                        error: filter.error
                    })

                    return filter.error;
                }
            }

            return false;

        }

        if (segmento_variable.includes(',')) {

            const sub_variables: any = [];

            (segmento_variable.split(/[,]+/)).forEach((name: any, id: any) => {

                const errorsOnName = checkVariableName(name);

                sub_variables.push({
                    name,
                    id,
                    icon: (errorsOnName) ? 'mdi-alert-outline' : 'mdi-check-bold',
                    icon_color: (errorsOnName) ? 'red' : 'green',
                    ...((() => {
                        if (errorsOnName) return {
                            children: [
                                {
                                    id: 0,
                                    name: `ESTADO: ${(errorsOnName) ? errorsOnName : 'Correcto'}`,
                                    icon_color: (errorsOnName) ? 'red' : 'green',
                                    icon: (errorsOnName) ? 'mdi-alert-outline' : 'mdi-check-bold'
                                }
                            ]
                        }
                        else return {}
                    })())
                })
            });

            const errorOnSubVars = sub_variables.some((sub_var: any) => sub_var.icon_color === 'red')

            return {
                id: counter,
                name: `${segmento_variable}`,
                icon: (errorOnSubVars) ? 'mdi-alert-outline' : 'mdi-check-bold',
                icon_color: (errorOnSubVars) ? 'red' : 'green',
                children: [
                    {
                        id: 1,
                        name: `Varibles:`,
                        children: sub_variables,
                        icon: 'mdi-cube-outline'
                    },
                    {
                        id: 2,
                        name: `Tipo de Dato: ${data_type}`,
                        icon: 'mdi-timeline-text-outline'
                    }
                ]
            }


        } else {

            const errorsOnName = checkVariableName(segmento_variable);

            const status: any = () => {
                if (errorsOnName) return [{
                    id: 2,
                    name: `ESTADO: ${(errorsOnName) ? errorsOnName : 'Correcto'}`,
                    icon: (errorsOnName) ? 'mdi-alert-outline' : 'mdi-check-bold',
                    icon_color: (errorsOnName) ? 'red' : 'green',
                }]
                return []
            }

            return {
                id: counter,
                name: `${segmento_variable}`,
                icon: (errorsOnName) ? 'mdi-alert-outline' : 'mdi-check-bold',
                icon_color: (errorsOnName) ? 'red' : 'green',
                children: [
                    {
                        id: 1,
                        name: `Tipo de Dato: ${data_type}`,
                        icon: 'mdi-timeline-text-outline',
                        icon_color: '',
                    },
                    ...status()
                ]
            }
        }





    }

    ValidationPalabrasReservadas(text: any) {

        const arrayOfLines = text.split(/\n/g);

        // Mayusculas y minusculas
        const match_regex = /(?<![\w\d])(inicio|si|entonces|sino|finsi|mq|finmq|para|finpara|haga|declare|envia|recibe|llamar|fin|entero|real|cadena|fecha|logico|Inicio|Si|Entonces|Sino|FinSi|MQ|FinMQ|Para|FinPara|Haga|Declare|Envia|Recibe|Llamar|Fin|Entero|Real|Cadena|Fecha|Logico)(?![\w\d])/gm

        // Solo mayusculas
        // const matchs = text.match(/(?<![\w\d])(Inicio|Si|Entonces|Sino|FinSi|MQ|FinMQ|Para|FinPara|Haga|Declare|Envia|Recibe|Llamar|Fin|Entero|Real|Cadena|Fecha|Logico)(?![\w\d])/gm)

        // Solo minusculas
        // const matchs = text.match(/(?<![\w\d])(inicio|si|entonces|sino|finsi|mq|finmq|para|finpara|haga|declare|envia|recibe|llamar|fin|entero|real|cadena|fecha|logico|)(?![\w\d])/gm)

        const keywordsFound: any = []

        arrayOfLines.forEach((line_string: string, index: any) => {

            const isComment = /#.*/g.test(line_string);
            if (isComment) return;

            const matched = line_string.match(match_regex)

            const buildTreeKeyword = (word: string) => {
                const IndexFound = keywordsFound.findIndex((sub_keyword: any) => sub_keyword.name === word)

                if (IndexFound > -1) {
                    const id_s = keywordsFound[IndexFound].children.length;
                    keywordsFound[IndexFound].children.push({
                        id: id_s,
                        name: `Linea: ${index + 1}`
                    })
                } else {
                    keywordsFound.push({
                        id: keywordsFound.length,
                        name: `${word}`,
                        icon: 'mdi-alpha-w-box',
                        children: [
                            {
                                id: 0,
                                name: `Linea: ${index + 1}`
                            }
                        ]
                    })
                }
            }

            if (matched) {

                // 
                if (Array.isArray(matched))
                    matched.forEach((word: string) => buildTreeKeyword(word))
                else
                    buildTreeKeyword(matched)


            }


        });



        this.tree_keywords[0].children = keywordsFound;

    }


    check(text: any) {
        this.ValidationVariables(text)
        this.ValidationPalabrasReservadas(text)
        console.log(this.declaraciones_vars_array)
    }


    changeValue(val: any) {
        //     
        this.default_code = val;
        //
        this.check(this.default_code)

    }

}
