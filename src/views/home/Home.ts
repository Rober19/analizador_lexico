import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action, namespace } from 'vuex-class';

import { LOCALE } from '@/store/root/getters';
import userModule from '@/store/modules/user';
import { SIGN_IN } from '@/store/modules/user/actions';

import HelloWorld from '@/components/HelloWorld.vue';
import MonacoEditor from '@/components/MonacoEditor.vue';
import { GET_LOCALE } from '@/store/root/actions';
// import MonacoEditor from 'monaco-editor-vue';
// import MonacoEditor from 'vue-monaco-editor'

const UserModule = namespace(userModule.vuexName);

@Component({
    components: {
        HelloWorld,
        MonacoEditor
    }
})
export default class Home extends Vue {

    public opts: any = {
        value: '',//编辑器初始化输入内容
        autoIndent: true,//启用自动缩进调整。默认为false。
        roundedSelection: true // 右侧不显示编辑器预览框
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

    ValidationPalabrasReservadas() {

    }


    check(text: any) {
        this.ValidationVariables(text)
        console.log(this.declaraciones_vars_array)
    }

    getValue() {
        //@ts-ignore
        this.$message.info(this.$refs.monaco.getVal())
    }
    // 编辑内容
    changeValue(val: any) {
        // eslint-disable-next-line no-console
        this.default_code = val;
        this.check(this.default_code)
        // console.log(val)
    }

}
