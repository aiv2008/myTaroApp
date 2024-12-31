import { View, Text ,Video, Button,Form,Switch,Input,Image} from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'
import {AtTabs, AtTabsPane,AtGrid,AtTabBar, AtForm, AtInput, AtButton,AtMessage,AtList, AtListItem,AtSearchBar} from 'taro-ui'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import { aesEncrypt} from '../../utils/cryptogram'

export default function Login () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    captcha: ''
  });

  const [usrname, setUsrname] = useState('');
  const [pwd, setPwd] = useState('');

  //验证码
  const [key, setKey] = useState('');
  const [imgUrl , setImgUrl] = useState('');
  const [captcha, setCaptcha] = useState('');

  const [searchVal, setSearchVal] = useState('');

  // const tabList = [{ title: '标签页1' }, { title: '标签页2' }, { title: '标签页3' }]

  const handleUsrnameChange = (e) => {
    // setUsrname(e);
    setFormData({username: e,password: formData.password, captcha: formData.captcha });
  }

  const handlePwdChange = (e, a) => {
    // setPwd(e);
    // setFormData({username: formData.username,password:e, captcha: formData.captcha });
    console.log(`a=${JSON.stringify(a) }`);
    setFormData({...formData, password: e});
  }

  const handleSubmit = () => {
    console.log(`username =${formData.username}, pwd: ${formData.password}`);
    const username = aesEncrypt(formData.username);
    const password = aesEncrypt(formData.password);
    console.log(`username =${username}, pwd: ${password}`);
    Taro.request({
      url : 'http://localhost:30001/auth/login',
      method: 'POST',
      data: {
        // ...formData,
        username,
        password,
        captcha: formData.captcha,
        key: key
      },
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        console.log(`res: ${JSON.stringify(res)}`);
        console.log(`token: ${res.data.data.token.token}`);
        Taro.setStorageSync('token' ,res.data.data.token.token);
      }
    });
  }

  const handleReset = (e) => {
    console.log(e);
  }

    const handleCaptcha = () => {
      Taro.request({
        url : 'http://localhost:30001/auth/captcha',
        data: {},
        header: {
          'Content-Type': 'application/json'
        },
        success (res){
          setKey(res.data.key);
          setImgUrl(res.data.value);
          // console.log(res.data);
        }
      })
      
    }

    const handleChangeCaptcha = (e) =>{
      setCaptcha(e);
    }

    const handleSearchChange = (e) => {
      console.log(`search=${e}`);
      setSearchVal(e);
    }

    // const handleSearch = (e) => {
    //   console.log(e);
    // }
    
    const handleInputChange = (e, a) => {
      // const value = e;
      // console.log(`value=${value}`);
      setFormData({...formData, [a.target.id]: e});
      // setFormData({...formData});
    }

    return (
<>
      <AtSearchBar
        value={searchVal}
        onChange={handleSearchChange}
      />
      <Form onSubmit={handleSubmit} onReset={handleReset}>
        <AtMessage />
        {/* <Input style={'marge-left:20px'} name='aaa'/> */}
      <AtInput
        name='username' 
        title='请输入邮箱'
        type='text'
        placeholder='请输入邮箱'
        value={formData.username}
        // onChange={handleUsrnameChange}
        onChange={handleInputChange}
      />
      <AtInput
        name='password'
        title='密码'
        type='password'
        placeholder='密码不能少于10位数'
        value={formData.password}
        // onChange={handlePwdChange}
        onChange={handleInputChange}
      />
      <AtInput 
        name='captcha' 
        title='验证码'
        type='text'
        placeholder='请输入验证码'
        value={formData.captcha}
        // onChange={handleChangeCaptcha}
        onChange={handleInputChange}
        >
        <Image svg={true} onClick={handleCaptcha} src={imgUrl} ></Image>
        </AtInput>
      

      
      <Button
              size='default'
              type='primary'
              loading={false}
              disabled={false}
              form-type='submit'
            >
              提交
            </Button>
      <Button formType='reset'>重置</Button>
      </Form>
      </>
    )
}
