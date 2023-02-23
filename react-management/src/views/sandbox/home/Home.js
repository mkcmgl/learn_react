import React, { useEffect, useState, useRef } from 'react'
import { Card, Col, Row, List, Avatar, Drawer } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import axios from 'axios'
import * as Echarts from 'echarts'
import _ from 'lodash'
const { Meta}=Card


export default function Home() {
  const [viewList, setViewList] = useState([])
  const [starList, setStarList] = useState([])
  const [allList, setAllList] = useState([])
  const [visible, setvisible] = useState(false)
  const [pieChart, setpieChart] = useState(null)
  const barRef = useRef()
  const pieRef = useRef()
  useEffect(() => {
    axios.get("/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6").then(res => {

      setViewList(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get("/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6").then(res => {
      // console.log(res.data)
      setStarList(res.data)
    })
  }, [])

  useEffect(() => {

    axios.get("/news?publishState=2&_expand=category").then(res => {
      // console.log(res.data)
      // console.log()
      renderBarView(_.groupBy(res.data, item => item.category.title))

      setAllList(res.data)
    })

    return () => {
      window.onresize = null
    }
  }, [])
  const renderBarView = (obj) => {
    var myChart = Echarts.init(barRef.current);

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '新闻分类图示'
      },
      tooltip: {},
      legend: {
        data: ['数量']
      },
      xAxis: {
        data: Object.keys(obj),
        axisLabel: {
          rotate: "45",
          interval: 0
        }
      },
      yAxis: {
        minInterval: 1
      },
      series: [{
        name: '数量',
        type: 'bar',
        data: Object.values(obj).map(item => item.length)
      }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    // 跟随window框改变
    window.onresize = () => {
      // console.log("resize")
      myChart.resize()
    }
  }
  const renderPieView = (obj) => {
    //数据处理工作

    var currentList = allList.filter(item => item.author === username)
    var groupObj = _.groupBy(currentList, item => item.category.title)
    var list = []
    for (var i in groupObj) {
      list.push({
        name: i,
        value: groupObj[i].length
      })
    }
    var myChart;
    if (!pieChart) {
      myChart = Echarts.init(pieRef.current);
      setpieChart(myChart)
    } else {
      myChart = pieChart
    }
    var option;

    option = {
      title: {
        text: '当前用户新闻分类图示',
        // subtext: '纯属虚构',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: '发布数量',
          type: 'pie',
          radius: '50%',
          data: list,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    option && myChart.setOption(option);

  }

  const { username, region, role: { roleName } } = JSON.parse(localStorage.getItem("token"))
          // 取数据  get
  // const ajax = () => {
  //   // axios.get("http://localhost:8000/posts/2").then(res => {
  //   //   console.log(res.data)
  //   // })
  //           // 增  post
  //       // axios.post("http://localhost:8000/posts",{
  //       //     title:"33333",
  //       //     author:"xiaoming"
  //       // })

  //       // 更新 put

  //       // axios.put("http://localhost:8000/posts/1",{
  //       //     title:"1111-修改"
  //       // })

  //       // 更新 patch
  //       // axios.patch("http://localhost:8000/posts/1",{
  //       //     title:"1111-修改-11111"
  //       // }) 

  //       // 删除  delete
  //       // axios.delete("http://localhost:8000/posts/1")
    
  //       // _embed
  //       // axios.get("http://localhost:8000/names?_embed=comments").then(res=>{
  //       //     console.log(res.data)
  //       // })

  //       // _expand
  //   // axios.get("http://localhost:8000/comments?_expand=name").then(res=>{
  //   //         console.log(res.data)
  //   //     })
  // }
  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户最常浏览" bordered={true}>
            <List
              size="small"
              // bordered
              dataSource={viewList}
              renderItem={item => <List.Item>
                <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
              </List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户点赞最多" bordered={true}>
            <List
              size="small"
              // bordered
              dataSource={starList}
              renderItem={item => <List.Item>
                <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
              </List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" onClick={async () => {
                await   setvisible(true)

                  // init初始化
                  renderPieView()
              }} />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={username}
              description={
                <div>
                  <b>{region ? region : "全球"}</b>
                  <span style={{
                    paddingLeft: "30px"
                  }}>{roleName}</span>
                </div>
              }
            />
          </Card>
        </Col>
      </Row>
      <Drawer
        width="500px"
        title="个人新闻分类"
        placement="right"
        closable={true}
        onClose={() => {
          setvisible(false)
        }}
        open={visible}
      >
        <div ref={pieRef} style={{
          width: '100%',
          height: "400px",
          marginTop: "30px"
        }}></div>
      </Drawer>


      <div ref={barRef} style={{
        width: '100%',
        height: "400px",
        marginTop: "30px"
      }}></div>
    </div>
  )
}
