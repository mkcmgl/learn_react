import React, { useState, useEffect } from 'react'
import { Button, Table, Tag, Modal, Popover, Switch } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
const { confirm } = Modal
export default function RightList() {
     useEffect(() => {
       axios.get("http://localhost:5000/rights?_embed=children").then((response) => { 
      response.data.map((item) => { 
           if (item.children?.length === 0) { 
             item.children = '';
           }
           return item;
         })
         setDataSource(response.data)
       })
     }, [])
  const [dataSource, setDataSource] = useState([

])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render(key) {
        return <Tag color="orange">{key}</Tag>
      },
    },
    {
      title: '操作',
      // key: 'id',
      render: (item) => { 
        return <div>
          <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)}></Button>
          <Popover content={<div style={{ textAlign: "center" }}>
            <Switch checked={item.pagepermisson} onChange={() => switchMethod(item)}></Switch>
          </div>} title="页面配置项" trigger={item.pagepermisson === undefined ? '' : 'click'}>
            <Button type='primary' shape="circle" icon={<EditOutlined />}
              disabled={item.pagepermisson === undefined}></Button>
            </Popover>
        </div>
      }
    },
  ];

  const switchMethod = (item) => { 
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
    setDataSource([...dataSource])

    if (item.grade === 1) {
      axios.patch(`http://localhost:5000/rights/${item.id}`, {
        pagepermisson: item.pagepermisson
      })
    } else {
      axios.patch(`http://localhost:5000/children/${item.id}`, {
        pagepermisson: item.pagepermisson
      })
    }
  }

  const confirmMethod = (item) => {
    confirm({
      title: '你确定要删除?',
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      onOk() {
        //   console.log('OK');
        deleteMethod(item)
      },
      onCancel() {
        //   console.log('Cancel');
      },
    });

  }
  //删除
  const deleteMethod = (item) => {
    // console.log(item)
    // 当前页面同步状态 + 后端同步
    if (item.grade === 1) {
      setDataSource(dataSource.filter(data => data.id !== item.id))
      axios.delete(`http://localhost:5000/rights/${item.id}`)
    } else {
      let list = dataSource.filter(data => data.id === item.rightId)
      list[0].children = list[0].children.filter(data => data.id !== item.id)
      setDataSource([...dataSource])
      axios.delete(`http://localhost:5000/children/${item.id}`)
    }
  }
  return (
    <Table dataSource={dataSource} columns={columns}
      pagination={{
        pageSize: 5,
        
      }}
    />
  )
}
