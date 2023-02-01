  
function *test(){
    console.log("111111")
    var input1 = yield "111-输出";
    console.log("22222",input1)
    var input2 =yield "222-输出";
    console.log("333333",input2)
    var input3 =yield "333-输出";
    console.log("444444",input3)
}

var mgltest = test()

var res1 = mgltest.next()
console.log(res1)
var res2 = mgltest.next('aaaa')
console.log(res2)
var res3 = mgltest.next('bbbb')
console.log(res3)
var res4 = mgltest.next('ccccc')

console.log(res4)


// async function  A(){
//     var res1 =await fetch()
//     var res2 =await fetch()
//     var res3 =await fetch()

//   console.log(res3)
// }


function *test1(){

    setTimeout(()=>{
        console.log("11111-success")
        mgltest1.next()
    },1000)

    yield;
    setTimeout(()=>{
        console.log("222222-success")

        mgltest1.next()
    },1000)
    yield;
    setTimeout(()=>{
        console.log("3333-success")
    },1000)
    yield;
}

var mgltest1 = test1()

mgltest1.next()
