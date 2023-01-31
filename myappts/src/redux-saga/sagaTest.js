function* test() {
    console.log("111111")
    var input1 = yield "111-输出";
    console.log("22222", input1)
    var input2 = yield "222-输出";
    console.log("333333", input2)
    var input3 = yield "333-输出";
    console.log("444444", input3)
}

var  mgltest = test()

var res1 =  mgltest.next()
console.log(res1)
var res2 =  mgltest.next('aaaa')
console.log(res2)
var res3 =  mgltest.next('bbbb')
console.log(res3)
var res4 =  mgltest.next('ccccc')

console.log(res4)


// async function  A(){
//     var res1 =await fetch()
//     var res2 =await fetch()
//     var res3 =await fetch()

//   console.log(res3)
// }


function* test1() {

    setTimeout(() => {
        console.log("11111-success")
         mgltest1.next()
    }, 1000)

    yield;
    setTimeout(() => {
        console.log("222222-success")

         mgltest1.next()
    }, 1000)
    yield;
    setTimeout(() => {
        console.log("3333-success")
    }, 1000)
    yield;
}

var  mgltest1 = test1()

 mgltest1.next()


function getData1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("data1")
        }, 1000)
    })
}
function getData2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("data2")
        }, 1000)
    })
}

function getData3() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("data3")
        }, 1000)
    })
}

function* gen() {
    var f1 = yield getData1();
    console.log(f1)
    var f2 = yield getData2(f1);
    console.log(f2)
    var f3 = yield getData3(f2)

    console.log(f3)
}

function run(fn) {

    var g = fn()

    function next(data) {
        var result = g.next(data);

        if (result.done) {
            return result.value
        }

        result.value.then(res => {
            next(res)
        })
    }
    next()
    // g.next()
}

run(gen)
