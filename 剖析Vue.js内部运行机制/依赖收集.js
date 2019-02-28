class Dep {
    constructor() {
        /* 用来存放Watcher对象的数组 */
        this.subs = []
    }
    /* 在subs中添加一个Watcher对象 */
    addSub(sub) {
        this.subs.push(sub);
    }
    /* 通知所有Watcher对象更新视图 */
    notify() {
        this.subs.forEach((sub) => {
            sub.update();
        })
    }
}

class Watcher {
    constructor() {
        Dep.target = this
    }
    update() {
        console.log("视图更新啦～")
    }
}

Dep.target = null

function defineReactive(obj, key, val) {
    const dep = new Dep();
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            dep.addSub(Dep.target)
            return val
        },
        set: function reactiveSetter(newVal) {
            if (newVal === val) {
                return
            }
            dep.notify()
        }
    })
}

function observer(value) {
    if (!value || (typeof value !== 'object')) {
        return
    }
    Object.keys(value).forEach((key) => {
        defineReactive(value, key, value[key])
    })
}

class Vue {
    /* Vue构造类 */
    constructor(options) {
        this._data = options.data;
        observer(this._data);
        new Watcher();
        console.log('render~', this._data.test);
    }
}

let o = new Vue({
    data: {
        test: "I am test."
    }
})
o._data.test = "hello,world." //视图更新啦～