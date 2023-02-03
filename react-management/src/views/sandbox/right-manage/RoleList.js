import { Table, Button, Modal, Tree } from 'antd'
import React, { useState,useEffect} from 'react'
import axios from 'axios'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
const { confirm } = Modal

export default function RoleList() {
  const [dataSource, setDataSource] = useState([])
  const [rightList, setRightList] = useState([])
  const [currentRights, setcurrentRights] = useState([])
  const [currentId, setcurrentId] = useState(0)
  const [isModalVisible, setisModalVisible] = useState(false)
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      // key: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '角色名称',
      // key: 'roleName',
      dataIndex: 'roleName'
    },
    {
      title: "操作",
      // key:'roleType',
      render: (item) => {
        return <div>
          <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)} />
          <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => {
            setisModalVisible(true)
            setcurrentRights(item.rights)
            setcurrentId(item.id)
          }} />
        </div>
      }
    }
  ]
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
  const deleteMethod = (item) => { 
    // console.log(item)
    setDataSource(dataSource.filter(data => data.id !== item.id))
    axios.delete(`http://localhost:5000/roles/${item.id}`)
  }
  const handleOk = () => {
    console.log(currentRights, currentId)
    setisModalVisible(false)
    //同步datasource
    setDataSource(dataSource.map(item => {
      if (item.id === currentId) {
        return {
          ...item,
          rights: currentRights
        }
      }
      return item
    }))
    //patch

    axios.patch(`http://localhost:5000/roles/${currentId}`, {
      rights: currentRights
    })
  }

  const handleCancel = () => {
    setisModalVisible(false)
  }
  const onCheck = (checkKeys) => {
    // console.log(checkKeys)
    setcurrentRights(checkKeys.checked)
  }
  useEffect(() => {
    axios.get("http://localhost:5000/roles").then(res => {
      console.log(res.data)
      setDataSource(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then(res => {
      console.log(res.data)
      setRightList(res.data)
    })
  }, [])

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey={(item) => item.id} ></Table>
      <Modal title="权限分配" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Tree
          checkable
          checkedKeys={currentRights}
          onCheck={onCheck}
          checkStrictly={true}
          treeData={rightList}
        />

      </Modal>
    </div>
  )
}
