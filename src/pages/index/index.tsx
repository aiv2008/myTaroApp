import { View, Text ,Video, Button,Form,Switch,Input,Image} from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'
import {AtTabs, AtTabsPane,AtGrid,AtTabBar, AtForm, AtInput, AtButton,AtMessage,AtList, AtListItem,AtSearchBar} from 'taro-ui'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import { aesEncrypt} from '../../utils/cryptogram'
import Item from '@/pages/item'

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (<Item />);
}
