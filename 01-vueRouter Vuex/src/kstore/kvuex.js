let Vue;

class Store {
    constructor(options) {
        console.log(options)
        this.$options = options;
        Vue.util.defineReactive(this,'state',this.$options.state);//文档
        /*可能还是被外界访问：this.state = new Vue({
            data(){
                return options.state
            },
        })*/
       
        //
    }
    //文档点
   
};

function install(_Vue) {
    Vue = _Vue;
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                //文档点
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}



//导出的对象是Vuex
export default {
    Store,
    install
}
