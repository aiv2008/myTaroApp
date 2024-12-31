import { View, Text, Button, Input, Image,Label, 
  Radio
 } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'
import { fail } from 'assert'
import { useEffect, useState } from 'react'
import { AtImagePicker,AtTabs, AtTabsPane,AtGrid,AtTabBar, AtForm, AtInput, AtButton,AtMessage,AtList, AtListItem,AtSearchBar} from 'taro-ui'
import namedPng from '../../../public/2.png';

const getRandom = (n, m) => {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}

//随机生成数字
function randomlyGeneratedChineseCharacters(num: number) {
  let arr = []
  for (let i = 0; i < num; i++) {
      let str
  //汉字对应的unicode编码为u4e00-u9fa5转为10进制为19968-40869，先取随机数，再转为16进制
      str = '\\u' + (Math.floor(Math.random() * (40869 - 19968)) + 19968).toString(16)
  //在用正则操作数据后进行解码。注意：unescape() 函数在 JavaScript 1.5 版中已弃用。请使用 decodeURI() 或 decodeURIComponent() 代替。
      str = unescape(str.replace(/\\u/g, "%u"));
      // console.log(`str: ${str}`);
      const data = {name: str, disabled: false};
      // arr.push(str)
      arr.push(data);
  }

  const result = ['身','体','健','康'];
  let i = 0;
    const answIndexArr = [];
    while(i<4){
      // console.log(`i=${i}`);
      const answIndex = getRandom(0,19);
      let j = 0
      for(;j<answIndexArr.length;j++){
        if(answIndex == answIndexArr[j]){
          break;
        }
      }
      if( j == answIndexArr.length){
        answIndexArr.push(answIndex);
        i++;
      }
      // i++;
    }
    // console.log(`answIndexArr: ${JSON.stringify(answIndexArr)}`);
    for(let i=0;i<answIndexArr.length;i++){
      // console.log(`data: ${data[answIndexArr[i]].name}, result: ${result[i]}`);
      arr[answIndexArr[i]].name = result[i];
    }
    console.log(`answIndexArr: ${JSON.stringify(arr)}`);
  return arr;
  // let chinese = arr.join("")
  // console.log(`chinese: ${chinese}`);
  // return chinese
}


let data = randomlyGeneratedChineseCharacters(20);

export default function Item () {
  // const [items, setItems] = useState([]);
  const [answ , setAnsw] = useState([]);
  const [index, setIndex] = useState(0);
  useLoad(() => {
    console.log('Page loaded.')

    // let i = 0;
    // const answIndexArr = [];
    // while(i<4){
    //   // console.log(`i=${i}`);
    //   const answIndex = getRandom(0,19);
    //   let j = 0
    //   for(;j<answIndexArr.length;j++){
    //     if(answIndex == answIndexArr[j]){
    //       break;
    //     }
    //   }
    //   if( j == answIndexArr.length){
    //     answIndexArr.push(answIndex);
    //     i++;
    //   }
    //   // i++;
    // }
    // // console.log(`answIndexArr: ${JSON.stringify(answIndexArr)}`);
    // for(let i=0;i<answIndexArr.length;i++){
    //   // console.log(`data: ${data[answIndexArr[i]].name}, result: ${result[i]}`);
    //    data[answIndexArr[i]].name = result[i];
    // }
    // setData(data);
    // console.log(`answIndexArr: ${JSON.stringify(data)}`);
    
  })

  useEffect(()=>{
    
  })

  const handleClick = (internalIndex: number, e)=>{
    console.log(`index: ${internalIndex},e=${JSON.stringify(e)}`);
    if( index < 4 ){
      // console.log(`index: ${index}`);
      answ[index] = e._relatedInfo.anchorRelatedText;
      // console.log(`answ.index = ${answ[index]}`);
      // console.log(`data: ${JSON.stringify( data[internalIndex])}`);
      data[internalIndex].disabled = true;
      // setItems(data);
      setAnsw(answ);
      setIndex(index+1);
      // console.log(`index222: ${index}`);
    }
  }
  
  const [state, setState] = useState({
    files: [
    //   {
    //   url: 'https://jimczj.gitee.io/lazyrepay/aragaki1.jpeg',
    // },
    // {
    //   url: 'https://jimczj.gitee.io/lazyrepay/aragaki2.jpeg',
    // },
    // {
    //   url: 'https://jimczj.gitee.io/lazyrepay/aragaki3.png',
    // }
  ]
  });

  const handleFileChange = (files) =>{
    setState({
      files
    })
  }

  const handleFail = (mes) => {
    console.log(mes)
  }
  const handleImageClick = (index, file) => {
    console.log(index, file)
  }

  return (
    <>
    {/* <View className='components-page'>
        <Button onClick={readFile}>read file</Button>
        <Image src='http://tmp/xuA1SHcyzf73783df61b0a8c5458a8acf36ff9be9b4d.png' />
    </View> */}
    <View className='components-page'>
        <View className='flex-wrp' style='flex-direction:column;'>
          <View className='flex-item flex-item-V demo-text-1'>    
              {/* <AtImagePicker
                files={state.files}
                onChange={handleFileChange.bind(this)}
                onImageClick={handleImageClick}
                onFail={handleFail}
              />     */}
            <Image src={namedPng} style='margin:0 auto;display:block;' />
            <View className='at-input__container'>
              {/* <Input value='1111'/> */}
            {/* <Label className='at-input__overlay at-input__overlay--hidden'>标准五个字</Label> */}
            <AtInput
              name='value'
              title=''
              type='text'
              placeholder=''
              value={answ[0]}
              // disabled = {true}
              editable = {false}
            />
            <AtInput
              name='value1'
              title=''
              type='text'
              placeholder=''
              value={answ[1]}
              editable = {false}
            />
            <AtInput
              name='value1'
              title=''
              type='text'
              placeholder=''
              value={answ[2]}
              // onChange={handleInputChange}
              editable = {false}
            />
            <AtInput
              name='value1'
              title=''
              type='text'
              placeholder=''
              value={answ[3]}
              editable = {false}
            />
            </View>
          </View>
            
          <View style={'margin-top:50px'} className='flex-item flex-item-V demo-text-1'>        
            <View className='at-row at-row--wrap at-row__justify--between'>
              {
                data.map( (person, i) => 
                  <View style={'margin: 5px 5px 5px 5px'} className='at-col at-col-2'>
                    <AtButton type='secondary' disabled={person.disabled} onClick={handleClick.bind(this, i)}>{person.name}</AtButton>
                  </View>
                 )

                // items
              }
              
            </View>
          </View>
        </View>
      </View>
      </>
  )
}
