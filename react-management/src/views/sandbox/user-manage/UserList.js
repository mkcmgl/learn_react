import React, { useState, useEffect, useRef } from 'react'
import { Button, Table, Modal, Switch, Form } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import "./userList.css"
import UserFrom from '../../../components/user-manage/UserFrom'

const { confirm } = Modal



export default function UserList() {
  const [dataSource, setDataSource] = useState([])
  const [regionList, setRegionList] = useState([])
  const [roleList, setRoleList] = useState([])
  const [isAddVisible, setIsAddVisible] = useState(false)
  const [isUpdateVisible, setIsUpdateVisible] = useState(false)
  const [isUpdateDisabled, setIsUpdateDisabled] = useState(false)
  const addForm = useRef(null)
  const updateForm = useRef(null)
  const [current, setCurrent] = useState(null)


  const { roleId, region, username } = JSON.parse(localStorage.getItem("token"))


  const getDataList = () => {
    const roleObj = {
      "1": "superadmin",
      "2": "admin",
      "3": "editor"
    }
    axios.get("http://localhost:5000/users?_expand=role").then(res => {
      const list = res.data
      console.log(`regions-users`, list)
      setDataSource(roleObj[roleId] === "superadmin" ? list : [
        ...list.filter(item => item.username === username),
        ...list.filter(item => item.region === region && roleObj[item.roleId] === "editor")
      ])
    })
  }
  const getReginList = () => {
    axios.get("http://localhost:5000/regions").then(res => {
      const list = res.data
      list.map(item => {
        item.label = item.title
        item.value = item.id
        return item
      })
      // console.log(`regions-list`, list)
      setRegionList(list)
    })
  }

  const getRolesList = () => {
    axios.get("http://localhost:5000/roles").then(res => {
      const list = res.data
      list.map(item => {
        item.label = item.roleName
        item.value = item.id
        return item
      })
      // console.log(`regions-roles`, list)

      setRoleList(list)
    })
  }

  useEffect(() => {

    getDataList()

    getReginList()
    getRolesList()

  }, [])


  const columns = [
    {
      title: '??????',
      dataIndex: 'region',
      filters: [
        ...regionList.map(item => ({
          text: item.title,
          value: item.value
        })),
        {
          text: "??????",
          value: "??????"
        }

      ],

      onFilter: (value, item) => {
        if (value === "??????") {
          return item.region === ""
        }
        return item.region === value
      },

      render: (region) => {
        return <b>{region === "" ? '??????' : region}</b>
      }
    },
    {
      title: '????????????',
      dataIndex: 'role',
      render: (role) => {
        return role?.roleName
      }
    },
    {
      title: "?????????",
      dataIndex: 'username'
    },
    {
      title: "????????????",
      dataIndex: 'roleState',
      render: (roleState, item) => {
        return <Switch checked={roleState} disabled={item.default} onChange={() => handleChange(item)}></Switch>
      }
    },
    {
      title: "??????",
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
    // console.log(`output->item`, item)
    item.roleState = !item.roleState
    setDataSource([...dataSource])

    axios.patch(`http://localhost:5000/users/${item.id}`, {
      roleState: item.roleState
    })
    // getDataList()
  }
  const confirmMethod = (item) => {
    confirm({
      title: '???????????????????',
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
  const handleUpdate =async (item) => {
    // setIsUpdateVisible(true)
    // setTimeout(() => {
    //   setIsUpdateVisible(true)
    //   if (item.roleId === 1) {
    //     //??????
    //     console.log('Update 1')
    //     setIsUpdateDisabled(true)

    //   } else {
    //     //????????????
    //     setIsUpdateDisabled(false)
    //     return
    //   }
    //   console.log(updateForm.current)
    //   updateForm.current.setFieldsValue(item)

    // }, 0)
    await setIsUpdateVisible(true)

    updateForm.current.setFieldsValue(item)
    if (item.roleId === 1) {
      //??????
      // console.log('Update 1')
      setIsUpdateDisabled(true)

    } else {
      //????????????
      setIsUpdateDisabled(false)
      return
    }
    setCurrent(item)
  }

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
      //post??????????????????id???????????? datasource, ??????????????????????????????
      axios.post(`http://localhost:5000/users`, {
        ...value,
        "roleState": true,
        "default": false,
      }).then(res => {
        // console.log(res.data)

        getDataList()
        // setDataSource([...dataSource, {
        //   ...res.data,
        //   role: roleList.filter(item => item.id === value.roleId)[0]
        // }])
      })
    }).catch(err => {
      console.log(err)
    }
    )
  }
  const deleteMethod = (item) => {
    axios.delete(`http://localhost:5000/users/${item.id}`).then(res => { 
      getDataList()
    })
    // setDataSource(dataSource.filter(data => data.id !== item.id))

  }
  const updateFormOK = () => {
    updateForm.current.validateFields().then(value => {
      // console.log(value)
      setIsUpdateVisible(false)

      // setDataSource(dataSource.map(item => {
      //   if (item.id === current.id) {
      //     return {
      //       ...item,
      //       ...value,
      //       role: roleList.filter(data => data.id === value.roleId)[0]
      //     }
      //   }
      //   return item
      // }))
      setIsUpdateDisabled(!isUpdateDisabled)

      axios.patch(`http://localhost:5000/users/${current.id}`, value).then(res => { 
        getDataList()
      })
      
    })
  }
  return (
    <div>
      <Button type="primary" onClick={() => { setIsAddVisible(true) }}>????????????</Button>
      <Table dataSource={dataSource} columns={columns}
        pagination={{
          pageSize: 5
        }}
        rowKey={item => item.id}
      />
      <Modal
        open={isAddVisible}
        title="????????????"
        okText="??????"
        cancelText="??????"
        onCancel={() => {
          setIsAddVisible(false)
        }}
        onOk={() => addFormOK()}
      >
        <UserFrom regionList={regionList} roleList={roleList} ref={addForm} />
      </Modal>
      <Modal
        open={isUpdateVisible}
        title="????????????"
        okText="??????"
        cancelText="??????"
        onCancel={() => {
          setIsUpdateVisible(false)
          setIsUpdateDisabled(!isUpdateDisabled)
        }}
        onOk={() => updateFormOK()}
      >
        <UserFrom regionList={regionList} roleList={roleList} ref={updateForm}
          isUpdate={true}  isUpdateDisabled={isUpdateDisabled} />
      </Modal>
    </div>
  )
}
