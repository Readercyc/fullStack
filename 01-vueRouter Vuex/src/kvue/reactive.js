// 1. 实现响应式
// 设置obj的key ，拦截它，初始值val
function defineReactive(obj,key,val){
    //如果val是对象
    observe(val)
    Object.defineProperty(obj,key,{
        get(){
            console.log('get',key)
            return val;
        },
        set(v){
            if(v !== val){
                val = v;
                console.log('set',key);
                update() //触发更新器更新视图
            }
        }

    })
}
//循环obj的所有key，添加拦截器
const obj = {
    foo:'foo',
    bar:'bar',
    //嵌套不行,要递归
    baz:{
        a:1
    },
    arr:[1,2,3]
};
function observe(obj){
    if(typeof obj !== Object){
        return 
    }
    Object.keys(obj).forEach(key => defineReactive(obj,key,obj[key]));
}
observe(obj)


defineReactive(obj,'foo','hello-world');
//拦截器完成
// 更新器(实现编译器的话就不要这个),全量更新
function update(){
    app.innerHTML = obj.foo;
    //虚拟dom法 const vdom = 
    
 
    //
}
obj.baz.a
obj.foo

// 覆盖数据7个方法






