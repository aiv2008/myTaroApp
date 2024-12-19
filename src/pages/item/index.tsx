import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Item () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='item'>
      <Text>Hello world!</Text>
    </View>
  )
}
