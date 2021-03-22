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

    public defaul_code = `
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
            children: [
                // { id: 2, name: 'Calendar : app' },
                // { id: 3, name: 'Chrome : app' },
                // { id: 4, name: 'Webstorm : app' },
            ],
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

            console.log(`\n MATCH ${counter} \n`);

            const [
                entire_string,
                declare,
                segmento_variable, ,
                data_type
            ]: any = m;

            console.log({
                declare,
                segmento_variable,
                data_type,
            });

            this.declaraciones_vars_array.push(
                {
                    id: counter,
                    name: `Declaración: ${entire_string}`,
                    children: [
                        {
                            id: 1,
                            name: `Segmento Varible: ${segmento_variable}`,
                        },
                        {
                            id: 2,
                            name: `Tipo de Dato: ${data_type}`,
                        }
                    ]
                }
            )

        }

        this.items[0].children = this.declaraciones_vars_array;
        console.log(this.items[0])

        const validation2 = str.match(/[a-zA-Z][_0-9a-zA-Z]{0,15}/gm);

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
        this.defaul_code = val;
        // console.log(val)
    }

}
