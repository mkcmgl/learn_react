


var myName: string = "mgl"
myName.substring(0, 1)

var myAge: number = 100
myAge.toFixed(1)

var myShow: boolean = true
myShow = false
console.log(myShow)

var my: string | number = "mgl"
my = 100
console.log(my)
var myAny: any = 100

myAny = "dwada"
console.log(myAny)

var list1: string[] = ["1", "2", "3"]
list1.push("daa")
// list.push(4)

var list2: number[] = [1, 2, 3]
list2.push(5)

var list3: (number | string)[] = [1, 2, "aa", "bbb"]
list3.push("aaaa")


//---------------------------------------------

var myList1: Array<string> = ["aa", "bb", "cc"]
myList1.push("dw")

var myList2: Array<string | number> = [1, 2, "aaa"]
myList2.push(3)
//---------------------------------------------

interface IObj {
    name: string,
    age: number,
    location?: string, //可选属性
    [propName: string]: any
}


var obj1: IObj = {
    name: "mgl",
    age: 100,
    location: "重庆",
    grade: "7.7",
    isPresale: true,
    isSale: false,
    item: { name: "4D", type: 13 },
}

console.log(obj1.location)
//---------------------------------


function test1(a: string, b: string, c?: number): string {
    console.log(a.substring(0, 1) + b.substring(0, 1))

    return a.substring(0, 1) + b.substring(0, 1)
}

var myname: string = test1("aaa", "bbb", 100)
console.log(myname)

//---------------------------------


interface IFunc {
    (a: string, b: string, c?: number): string
}

var myfunc2: IFunc = function test1(a: string, b: string, c?: number): string {
    console.log(a.substring(0, 1) + b.substring(0, 1))

    return a.substring(0, 1) + b.substring(0, 1)
}


interface Iobj {
    name: string,
    age: number,
    getName: (name: string) => string
}

var obj: Iobj = {
    name: "mgl",
    age: 100,
    getName: (name: string) => {
        return name
    }
}

var name: string = obj.getName("aaaa")
console.log(name)


//---------------------------------
class Bus {
    public name = "mgl" //共有属性
    private _list: any = [] //私有变量

    protected age = 100
    public subscribe(cb: any) {
        this._list.push(cb)
    }

    public dispatch() {
        this._list.forEach((cb: any) => {
            cb && cb()
        })
    }
}


class Child extends Bus {

    aaa() {
        console.log(this.name, this.age)
    }
}

var obj2 = new Bus()
obj2.subscribe(() => {

})

console.log(obj2.name)
//  obj._list = []
//  console.log(obj._list)

//---------------------------------

interface Ifunc {
    getName: () => string,
    getAge: () => number
}

class A implements Ifunc {
    getAge() {
        return 100
    }
    a1() {

    }

    a2() {

    }

    getName() {
        return "AAA"
    }
}

class B implements Ifunc {
    getAge() {
        return 100
    }
    b1() {

    }

    b2() {

    }

    getName() {
        return "CCC"
    }
}

class C implements Ifunc {
    getAge() {
        return 100
    }
    getName() {
        return "CCC"
    }
}

function init(obj: Ifunc) {
    obj.getName()
    obj.getAge()
}
var objA = new A()
var objB = new B()
var objC = new C()

init(objA)
init(objB)
init(objC)

//---------------------------------

export default {}
