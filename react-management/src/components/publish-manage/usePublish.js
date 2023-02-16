import { useEffect, useState } from 'react'
import axios from 'axios'
import { notification } from 'antd'


 function usePublish(type) {
    const { username}=JSON.parse(localStorage.getItem('token'))
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        axios.get(`/news?author=${username}&publishState=${type}&_expand=category`).then(res => {
           
            setDataSource(res.data)
        })
    }, [username, type])
    const handlePublish = (id) => { 
        setDataSource(dataSource.filter(item=>item.id !== id))
        axios.patch(`/news/${id}`, { "publishState": 2, "publishTime": Date.now() }).then(res => { 
            notification.info({
                message: '通知',
                description: '您可以到发布管理中查看您的新闻',
                placement:'bottomRight'
            })
        })
    }
    const handleSunset = (id) => {
        setDataSource(dataSource.filter(item => item.id !== id))
        axios.patch(`/news/${id}`, { "publishState": 2}).then(res => {
            notification.info({
                message: '通知',
                description: '您可以到发布管理中查看您的新闻',
                placement: 'bottomRight'
            })
        })

    }
    const handleDelete = (id) => {
        setDataSource(dataSource.filter(item => item.id !== id))
        axios.delete(`/news/${id}`).then(res => {
            notification.info({
                message: '通知',
                description: '您已经删除了已下线的新闻',
                placement: 'bottomRight'
            })
        })
    }

     return {
         dataSource,
         handlePublish,
         handleSunset,
         handleDelete
     }
}
export default usePublish