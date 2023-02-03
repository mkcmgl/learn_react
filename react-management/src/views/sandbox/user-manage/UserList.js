import React, { useState, useEffect, useRef } from 'react'
import { Button, Table, Modal, Switch } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import "./userList.css"


const { confirm } = Modal



export default function UserList() {
  const [dataSource, setDataSource] = useState([])
  const [regionList,setRegionList]=useState([])
  const [roleList, setRoleList]=useState([])
  useEffect(() => {
    axios.get("http://localhost:5000/users?_expand=role").then(res => {
      const list = res.data
      setDataSource(list)
    })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:5000/regions").then(res => {
      const list = res.data
      setRegionList(list)
    })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:5000/roles").then(res => {
      const list = res.data
      setRoleList(list)
    })
  }, [])
  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      filters: [
        ...regionList.map(item => ({
          text: item.title,
          value: item.value
        })),
        {
          text: "全球",
          value: "全球"
        }

      ],

      onFilter: (value, item) => {
        if (value === "全球") {
          return item.region === ""
        }
        return item.region === value
      },

      render: (region) => {
        return <b>{region === "" ? '全球' : region}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (role) => {
        return role?.roleName
      }
    },
    {
      title: "用户名",
      dataIndex: 'username'
    },
    {
      title: "用户状态",
      dataIndex: 'roleState',
      render: (roleState, item) => {
        return <Switch checked={roleState} disabled={item.default} onChange={() => handleChange(item)}></Switch>
      }
    },
    {
      title: "操作",
      render: (item) => {
        return <div>
          <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() =>
            confirmMethod(item)} disabled={item.default} />

          <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.default}
            onClick={() => handleUpdate(item)} />
        </div>
      }
    }
  ]
  const handleChange = (item) => { 
    console.log(`output->item`,item)
  }
  const confirmMethod = (item) => {
    console.log(`output->item`, item)
  }
  const handleUpdate = (item) => {
    console.log(`output->item`, item)
  }
  return (
    <div>
      <Button type="primary">添加用户</Button>
      <Table dataSource={dataSource} columns={columns}
        pagination={{
          pageSize: 5
        }}
        rowKey={item => item.id}
      />
    </div>
  )
}
