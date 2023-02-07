import React, { forwardRef, useEffect, useState } from 'react'
import { Modal, Form, Input, Select } from 'antd'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const UserFrom = forwardRef((props, ref)=>{
    const [isDisabled, setIsDisabled] = useState(false)
    useEffect(() => {
        setIsDisabled(props.isUpdateDisabled)
       
    }, [props.isUpdateDisabled])
    
    NProgress.start()
    useEffect(() => {
        NProgress.done()
    })

    const { roleId, region } = JSON.parse(localStorage.getItem("token"))
    const roleObj = {
        "1": "superadmin",
        "2": "admin",
        "3": "editor"
    }
    const checkRegionDisabled = (item) => {
        if (props.isUpdate) {
            if (roleObj[roleId] === "superadmin") {
                return false
            } else {
                return true
            }
        } else {
            if (roleObj[roleId] === "superadmin") {
                return false
            } else {
                return item.value !== region
            }
        }
    }
    const checkRoleDisabled = (item) => {
        if (props.isUpdate) {
            if (roleObj[roleId] === "superadmin") {
                return false
            } else {
                return true
            }
        } else {
            if (roleObj[roleId] === "superadmin") {
                return false
            } else {
                return roleObj[item.id] !== "editor"
            }
        }
    }
    // 控制角色能否显示
    const handlerRoleList = () => { 
          props.roleList.map(item => 
             item.disabled = checkRoleDisabled(item)
        )
        console.log(`output->props.roleList`, props.roleList)
        return props.roleList
    }
    // 控制区域能否显示
    const handerRegionList = () => { 
        props.regionList.map(item =>
            item.disabled = checkRegionDisabled(item)
        )
        console.log(`output->`, props.regionList)
        return props.regionList
    }
  return (


      <Form
          ref={ref}
              layout="vertical"
              name="form_in_modal"
              initialValues={{
                  modifier: 'public',
              }}
          >
              <Form.Item
                  name="username"
                  label="用户名"
                  rules={[
                      {
                          required: true,
                          message: 'Please input the title of collection!',
                      },
                  ]}
              >
                  <Input />
              </Form.Item>
              <Form.Item
                  name="password"
                  label="密码"
                  rules={[
                      {
                          required: true,
                          message: 'Please input the title of collection!',
                      },
                  ]}
              >
                  <Input.Password />
          </Form.Item>
          

                                <Form.Item
                  name="roleId"
                  label="角色"
                  rules={[
                      {
                          required: true,
                          message: 'Please input the title of collection!',
                      },
                  ]}
              >
                  <Select
                      // defaultValue="lucy"
                      // style={{
                      //   width: 120,
                      // }}
                  onChange={val => val === 1 ? (setIsDisabled(true), ref.current.setFieldsValue({ region: '' })) : setIsDisabled(false)
                //       (value) => {
                //       // console.log(value)
                //       if (value === 1) {
                //           setIsDisabled(true)
                //           //ref 改别表单中的内容
                //           ref.current.setFieldsValue({
                //               region: ""
                //           })
                //       } else {
                //           setIsDisabled(false)
                //       }
                //   }
                  }
                      allowClear
                  options={handlerRoleList()}
                  />
              </Form.Item>



              <Form.Item
                  name="region"
                  label="区域"
                  rules={isDisabled?[]:[
                      {
                          required: true,
                          message: 'Please input the title of collection!',
                      },
                  ]}
              >
                  <Select
                  allowClear
                  options={handerRegionList()}
                  disabled={ isDisabled }
                  />
              </Form.Item>


          </Form>
  )
})
export default UserFrom
