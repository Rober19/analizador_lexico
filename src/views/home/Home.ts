import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action, namespace } from 'vuex-class';

import { LOCALE } from '@/store/root/getters';
import userModule from '@/store/modules/user';
import { SIGN_IN } from '@/store/modules/user/actions';

import HelloWorld from '@/components/HelloWorld.vue';
import { GET_LOCALE } from '@/store/root/actions';
// import MonacoEditor from 'monaco-editor-vue';
import MonacoEditor from 'vue-monaco-editor'

const UserModule = namespace(userModule.vuexName);

@Component({
    components: {
        HelloWorld,
        MonacoEditor
    }
})
export default class Home extends Vue {

    public options: any = {

    }

    @Getter(LOCALE)
    public locale: string;

    @Action(GET_LOCALE)
    public getLocale: () => void;

    @UserModule.Action(SIGN_IN)
    public signIn: () => void;

    public created() {
        this.getLocale();
        this.signIn();
    }

    onChange(value: any) {
        // console.log(value);
      }
}
