const obj = {foo:'foo',bar:'bar',baz:{a:1}}

function defineReactive(obj,key,val){
    observe(val)
    //Object.definePropertie:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties
    Object.defineProperty(obj,key,{
        get(){
            console.log(`get ${key}:${val}`);
            return val;
        },
        set(newVal){
            if(newVal !== val){
                observe(newVal)
                val= newVal;
                update() //
            }else{
                console.log('不更新');
            }
        }
    })
}
//观察者，循环绑定所有的属性
function observe(obj){
    //处理对象
    if(typeof obj !== 'object' || obj == null){
        return 
    };
    Object.keys(obj).forEach(key => {
        defineReactive(obj,key,obj[key]);
    })
}
//defineReactive(obj,'foo','');
observe(obj);
obj.foo;
obj.foo  = "fooo";
obj.bar;
obj.bar = 'barrrrr';
obj.baz.a = 10;


function set(obj, key, val) {
    defineReactive(obj, key, val)
}
set(obj, 'dong', 'dong')
obj.dong = 'dong'
obj.dong // 并没有get信息

function update(){
    app.innerText = obj.foo;
}


// 作业，支持数组的7种变更。
