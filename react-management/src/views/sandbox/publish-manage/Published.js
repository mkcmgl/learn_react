import React from 'react'
import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from '../../../components/publish-manage/usePublish'
import { Button } from 'antd'
export default function Published() {
  const { dataSource, handleSunset } = usePublish(2)
  console.log(`output->res`, dataSource)

  return (
    <div>
      <NewsPublish dataSource={dataSource} button={(id) =>
        <Button danger onClick={() => handleSunset(id)} >
          下线
        </Button>}>

      </NewsPublish>
    </div>
  )
}
