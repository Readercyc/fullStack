let Vue;
class VueRouter {
    constructor(options) {
        //1. 保存路由选项
        
        this.$options = options;
        //2. 监控hash的变化

        this.current = window.location.hash.slice(1) || '/';
        Vue.util.defineReactive(
            this, 
            'current', 
            window.location.hash.slice(1) || '/'
        )
        window.addEventListener('hashchange', () => {
            this.current = window.location.hash.slice(1);
            console.log(this.current)
        })

    }
}

//参数1：Vue的构造函数,用于扩展
//调用use时的Vue实例会传入这里。
VueRouter.install = function (_Vue) {
    Vue = _Vue;
    //1.注册$router
    //延迟执行，延迟到router和Vue实例创建之后才能执行，所以可以用到mixin,
    //Vue.prototype.$router = this.$options.router; 直接这样的话，由于VueRouter还未被实例化，会拿不到router的值，所以不能现在执行。
    Vue.mixin({
        beforeCreate() {
            //在每个Vue实例创建后都添加这段代码。
            if (this.$options.router) {
                //创建之后Vue
                Vue.prototype.$router = this.$options.router; //文档点
            }
        },
    })

    //2. 注册全局组件
    //router-link to="/about">About</router-link>
    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                required: true
            }
        },
        //等同createElement,返回vdom,有的环境JSX
        render(h) { //文档点
            return h('a', {
                attrs: {
                    href: `#${this.to}`
                }
            }, this.$slots.default) //文档点
        },
    });
    Vue.component('router-view', {
        render(h) {
            let component = null;
            //1. 获取URL的hash值
            console.log(this.$router.current)
            //2. 根据hash的部分，从路由表中获取对应的组件。
            const route = this.$router.$options.routes.find((route) => route.path === this.$router.current);
            if (route) {
                component = route.component;
            }
            console.log(component)
            return h(component)
        },
    });
}


export default VueRouter;