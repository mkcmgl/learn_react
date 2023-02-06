import React, { useState, useEffect, useRef } from 'react'
import { Button, Table, Modal, Switch, Form, Input, Radio, Select } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import "./userList.css"
import UserFrom from '../../../components/user-manage/UserFrom' 

const { confirm } = Modal



export default function UserList() {
  const [dataSource, setDataSource] = useState([])
  const [regionList,setRegionList]=useState([])
  const [roleList, setRoleList]=useState([])
  const [isAddVisible, setIsAddVisible] = useState([])
    const addForm = useRef(null)
  const updateForm = useRef(null)
  const [form] = Form.useForm();

  useEffect(() => {
    axios.get("http://localhost:5000/users?_expand=role").then(res => {
      const list = res.data
      console.log(`regions-users`, list)
      setDataSource(list)
    })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:5000/regions").then(res => {
      const list = res.data
      list.map(item => {
        item.label = item.title
        item.value = item.id
        return item
      })
      console.log(`regions-list`, list)
      setRegionList(list)
    })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:5000/roles").then(res => {
      const list = res.data
      list.map(item => {
        item.label = item.roleName
        item.value = item.id
        return item
      })
      console.log(`regions-roles`, list)

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

  const onCreate = (item) => { }
  const addFormOK = () => { 
    


    // addForm.current
    //   .validateFields()
    //   .then((res) => {
    //     console.log(res)
    //     form.resetFields();
    //     onCreate(res);
    //   })
    //   .catch((info) => {
    //     console.log('Validate Failed:', info);
    //   });
    addForm.current.validateFields().then(value => {
      // console.log(value)

      setIsAddVisible(false)

      addForm.current.resetFields()
      //post到后端，生成id，再设置 datasource, 方便后面的删除和更新
      axios.post(`http://localhost:5000/users`, {
        ...value,
        "roleState": true,
        "default": false,
      }).then(res => {
        console.log(res.data)
        setDataSource([...dataSource, {
          ...res.data,
          role: roleList.filter(item => item.id === value.roleId)[0]
        }])
      })
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div>
      <Button type="primary" onClick={() => { setIsAddVisible(true)}}>添加用户</Button>
      <Table dataSource={dataSource} columns={columns}
        pagination={{
          pageSize: 5
        }}
        rowKey={item => item.id}
      />
            <Modal
          open={isAddVisible}
          title="添加用户"
          okText="确定"
          cancelText="取消"
          onCancel={() => {
              setIsAddVisible(false)
          }}
        onOk={() => addFormOK()}
      >
        <UserFrom regionList={regionList} roleList={roleList} ref={addForm} />
      </Modal>
    </div>
  )
}
