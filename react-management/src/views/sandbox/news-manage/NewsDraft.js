import React, { useState,useEffect} from 'react'
import { Button, Table, Modal, notification } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons'
import axios from 'axios'


const { confirm } = Modal

export default function NewsDraft(props) {
  const [ dataSource, setDataSource ] = useState([])
  const { username } = JSON.parse(localStorage.getItem("token"))
  useEffect(() => { 
    axios.get(`/news?author=${username}&auditState=0&_expand=category`).then((response) => {
      // response.data.map((item) => item.key = item.createTime)
      console.log(`output->list`, response.data)
      setDataSource(response.data)
    })
  }, [username])
  const getDataSouce = () => { 
    axios.get(`/news?author=${username}&auditState=0&_expand=category`).then((response) => {
      setDataSource(response.data)
    })
  }
  // 删除弹出框
  const confirmMethod = (item) => {
    confirm({
          title:"你确定删除吗？",
          icon:<ExclamationCircleOutlined/>,
      onOk: () => { 
        deleteMethod(item)
      },
      onCancel: () => { }
    })
  }
  // 删除
  const deleteMethod = (item) => { 
    axios.delete(`/news/${item.id}`)
    getDataSouce()
  }
  const handleCheck = () => { }
  const columns = [
    {
      title: 'ID',
      dataIndex: "id",
      render: (id) => { 
        return <b>{ id}</b>
      },
    }, {
      title: '新闻标题',
      dataIndex: 'title',
      render: (title, item) => {
        return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
      },
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '分类',
      dataIndex: 'categoryId',
      // render: (category) => {
      //   return category.title
      // }
    },
    {
      title: "操作",
      render: (item) => {
        return <div>
          <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)} />

          <Button shape="circle" icon={<EditOutlined />} onClick={() => {
            props.history.push(`/news-manage/update/${item.id}`)
          }} />

          <Button type="primary" shape="circle" icon={<UploadOutlined />} onClick={() => handleCheck(item.id)} />
        </div>
      },
    }
  ]
  return (
    <div>
      <Table dataSource={dataSource} columns={columns}
        pagination={{
          pageSize: 5
        }}
        rowKey={item => item.id}
      />
    </div>
  )
}
