import React, { useEffect, useState, useRef } from 'react'
import { Row,Col ,Steps, Button, Form, Input, Select, message, notification } from 'antd'
import { PageHeader } from '@ant-design/pro-layout'
import NewsEditor from '../../../components/news-manage/NewsEditor'

import style from './News.module.css'
import axios from 'axios'
import UserFrom from '../../../components/user-manage/UserFrom'
const { Step } = Steps;
const { Option } = Select;




export default function NewsAdd(props) {
  const [current, setCurrent]=useState(0)
  const [categoryList, setCategoryList] = useState([])
  const [formInfo, setformInfo] = useState({})
  const [content, setContent] = useState("")

  useEffect(() => { 
    axios.get('/categories').then((result) => {
      // console.log(result.data)
      setCategoryList(result.data)
    }).catch((err) => {
      console.log(`output categories->err`,err)
    });
  },[])


  const User = JSON.stringify(localStorage.getItem('token'))
    
  const handleSave = (auditState) => { 
    axios.post('/news', {
      ...formInfo,
      "content": content,
      "region": User.region ? UserFrom.region : "全球",
      "author": User.username,
      "roleId": User.roleId,
      "auditState": auditState,
      "publishState": 0,
      "createTime": Date.now(),
      "star": 0,
      "view":0

    }).then(res => { 
      // console.log(`output->res`,res)
      props.history.push(auditState===0?"/news-manage/draft":"/audit-manage/list")
    })
  }
  const handleNext = () => {
    if (current === 0) {
      NewsFrom.current.validateFields().then(res => {
        setformInfo(res)
        setCurrent(1)
      }).catch(err => { console.log(err) })
    } else { 
      if (content === "" || content.trim() === "<p></p>") {
        message.error("新闻内容不能为空")
      } else {
        setCurrent(current + 1)
      }
    }
  }

  const handlePrevious = () => { 
    // console.log("Previous", current)
    setCurrent(current - 1)
  }

  const NewsFrom=useRef(null)

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }
  const onFinish = (values) => {
    // console.log(values);
  };

   // 校验 todo
  // const validateMessages = {
  //   required: '${label} is required!',
  //   types: {
  //     email: '${label} is not a valid email!',
  //     number: '${label} is not a valid number!',
  //   },
  //   number: {
  //     range: '${label} must be between ${min} and ${max}',
  //   },
  // };
  const [setItems] = useState([
    {
      title: "基本信息",
      description:"新闻标题，新闻分类"
    }, {
      title: "新闻内容", description:"新闻主体内容"
    },
    {title:"新闻提交", description : "保存草稿或者提交审核"}
  ])
  return (
    <>
      <Row style={{ flexDirection: "column", height: "100%" }}> 
        {/* 标题 */}
        <Col flex={1}>
          <PageHeader
            className="site-page-header"
            title="撰写新闻"
            subTitle="This is a subtitle"
          />
        </Col>
        {/* 步骤 */}
        <Col flex={1}>
          <Steps current={current} items={setItems} />
        </Col>
        {/* 中部 */}
        <Col flex={7}>
          <div style={{ marginTop: "50px" }}>
            <div className={current === 0 ? "" : style.active}>
              <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                ref={NewsFrom}
                style={{
                  maxWidth: 450,
                  margin: "auto"
                }}
              // 校验 todo
              // validateMessages={validateMessages}
              >
                <Form.Item
                  name='title'
                  label="新闻标题"
                  rules={[
                    {
                      required: true, message: 'Please input your username!'
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name='categoryId'
                  label="新闻分类"
                  rules={[
                    {
                      required: true, message: 'Please input your username!'
                    },
                  ]}
                >
                  <Select
                    // defaultValue="lucy"
                    // style={{ width: 120 }}
                    allowClear
                    options={categoryList}
                  />
                </Form.Item>

              </Form>
            </div>
            <div className={current === 1 ? "1" : style.active}>
              <NewsEditor getContent={(value) => {
                // console.log(value)
                setContent(value)
              }}></NewsEditor>
            </div>
            <div className={current === 2 ? "1" : style.active}>

            </div>
          </div>
        </Col>
        {/* 按钮 */}
        <Col flex={1}>
          <div className={style.handleBtn}>
            {
              current === 2 && <span>
                <Button type='primary' style={{ marginRight: "20px" }} onClick={() => handleSave(0)}>保存草稿箱</Button>
                <Button danger style={{ marginRight: "20px" }} onClick={() => handleSave(1)}>提交审核</Button>
              </span>
            }{
              current > 0 && <Button type='primary' style={{ marginRight: "20px" }} onClick={ handlePrevious}>上一步</Button>

            }
            {
              current < 2 && <Button type='primary' style={{ marginRight: "20px" }} onClick={handleNext}>下一步</Button>

            }

          </div>
        </Col>
      </Row>
      {/* <Row style={{flexDirection:"column",height:"100%"}}>
        <Col flex={1}>
          <PageHeader
            className="site-page-header"
            title="撰写新闻"
            subTitle="This is a subtitle"
          />
        </Col>
        <Col flex={1}>
          <Steps current={current} items={setItems} />
        </Col>
         <Col span={2}>
          <div style={{ marginTop: "50px" }}>
            <div className={current === 0 ? "" : style.active}>
              <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                ref={NewsFrom}
                style={{
                  maxWidth: 450,
                  margin: "auto"
                }}
              // 校验 todo
              // validateMessages={validateMessages}
              >
                <Form.Item
                  name='title'
                  label="新闻标题"
                  rules={[
                    {
                      required: true, message: 'Please input your username!'
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name='categoryId'
                  label="新闻分类"
                  rules={[
                    {
                      required: true, message: 'Please input your username!'
                    },
                  ]}
                >
                  <Select
                    // defaultValue="lucy"
                    // style={{ width: 120 }}
                    allowClear
                    options={categoryList}
                  />
                </Form.Item>

              </Form>
            </div>
            <div className={current === 1 ? "1" : style.active}>
              <NewsEditor getContent={(value) => {
                console.log(value)
                setContent(value)
              }}></NewsEditor>
            </div>
            <div className={current === 2 ? "1" : style.active}>

            </div>
          </div>
         </Col>
          
        <Col flex={1}>
          <div className={style.handleBtn}>
            {
              current === 2 && <span>
                <Button type='primary' style={{ marginRight: "20px" }} onClick={() => handleSave(0)}>保存草稿箱</Button>
                <Button danger style={{ marginRight: "20px" }} onClick={() => handleSave(1)}>提交审核</Button>
              </span>
            }{
              current > 0 && <Button type='primary' style={{ marginRight: "20px" }} onClick={() => handlePrevious}>上一步</Button>

            }
            {
              current < 2 && <Button type='primary' style={{ marginRight: "20px" }} onClick={handleNext}>下一步</Button>

            }

          </div>
        </Col>
      </Row> */}
    
    </>
  )
}
