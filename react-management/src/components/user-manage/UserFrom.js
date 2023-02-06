import React, { forwardRef, useEffect, useState } from 'react'
import {   Modal,Form, Input, Select } from 'antd'
const UserFrom = forwardRef((props, ref)=>{
    const [isDisabled, setIsDisabled] = useState(false)
    useEffect(() => {
        setIsDisabled(props.isUpdateDisabled)
    }, [props.isUpdateDisabled])

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
                      options={props.roleList}
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
                  options={props.regionList}
                  disabled={isDisabled }
                  />
              </Form.Item>


          </Form>
  )
})
export default UserFrom
