import React, { useState } from 'react'

interface Props {

}

function FnTs(props?: Props) {
    // const {} = props
    const [list, setList] = useState<string[]>([])

    const [name, setName] = useState<string>("mgl")
    const mytext = React.createRef<HTMLInputElement>()
    const [isShow, setisShow] = useState(true)
    return (
        <div>
            app- {name.substring(0, 1).toUpperCase() + name.substring(1)}
            <button onClick={() => {
                setName("mkc")
            }}>click</button>
            <input ref={mytext} />

            <button onClick={() => {
                if (mytext.current!.value === "") return
                console.log((mytext.current as HTMLInputElement).value)

                setList([...list, (mytext.current as HTMLInputElement).value])
                mytext.current!.value = ""
            }}>添加</button>

            {
                list.map(item =>
                    <li key={item}>{item}</li>
                )
            }
            <Child name="aa" />
            <Navbar cb={() => {
                console.log("11111")
                setisShow(!isShow)
            }} />
            {isShow && <Sidebar />}
        </div>
    )
}
interface Iprop{ 
    name:string;
}
// const Child: React.FC<IProps> = (props) => {
//     return <div>child-{props.name}</div>
// }
function Child(prop: Iprop) { 
    return <div>
        child-{prop.name}
    </div>
}
interface MProps {
    title?: string, //可选
    cb: () => void
}
function Navbar(props: MProps) {
    return <div>
        navbar-<button onClick={() => {
            props.cb()
        }}>click</button>
    </div>
}

function Sidebar() {
    return <div>
        sidebar
    </div>
}

export default FnTs
