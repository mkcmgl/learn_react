
import React from 'react'
import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from '../../../components/publish-manage/usePublish'
import { Button } from 'antd'
export default function Unpublished() {
  const { dataSource, handleSunset } = usePublish(1)
  return (
    <div>
      <NewsPublish dataSource={dataSource} button={(id) =>
        <Button danger onClick={() => handleSunset(id)} >
          发布
        </Button>}>

      </NewsPublish>
    </div>
  )
}

