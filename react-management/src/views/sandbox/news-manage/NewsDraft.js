import React, { useState,useEffect} from 'react'
import { Button, Table, Modal, notification } from 'antd'
import axios from 'axios'
export default function NewsDraft() {
  const [ dataSource, setDataSource ] = useState([])
  const { username } = JSON.parse(localStorage.getItem("token"))
  useEffect(() => { 
    axios.get(`/news?author=${username}&auditState=0&_expand=category`).then((response) => {
      console.log(`output->response`, response)
      const list = response.data
      setDataSource(list)
     })
  }, [username])

  const columns = [
    {
      title: 'ID',
      dataIndex: "id",
      render: (id) => { 
        return <b>{ id}</b>
      }
    }, {
      
    }
  ]
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}
