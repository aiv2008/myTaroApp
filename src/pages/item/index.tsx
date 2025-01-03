import { View, Text, Button, Input, Image } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'
import { useEffect, useState } from 'react'
import { AtInput, AtButton,AtMessage} from 'taro-ui'
import Taro from '@tarojs/taro'
import {data as ddd} from './data'

export default function Item () {

  const getRandom = (n, m) => {
    return Math.floor(Math.random() * (m - n + 1)) + n;
  }
  
  //随机生成数字
  function randomlyGeneratedChineseCharacters(num: number, result: Array<string>) {
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
      // console.log(`answIndexArr: ${JSON.stringify(arr)}`);
    return arr;
    // let chinese = arr.join("")
    // console.log(`chinese: ${chinese}`);
    // return chinese
  }


  const [answ , setAnsw] = useState([]);
  const [index, setIndex] = useState(0);
  // const [result, setResult] = useState(['身','体','健','康']);
  const [imgPath ,setImgPath] = useState('1');

  const [pageIndex, setPageIndex] = useState(0);

  // const [data, setData] = useState(randomlyGeneratedChineseCharacters(20, ['身','体','健','康']));
  // const [data, setData] = useState(randomlyGeneratedChineseCharacters(20, ddd[pageIndex].data));
  const [result, setResult] = useState(ddd[pageIndex].data);
  const [data, setData] = useState([]);
  // const [result, setResult] = useState([]);
  useLoad(() => {
    console.log('Page loaded.')
    // data = randomlyGeneratedChineseCharacters(20, ['身','体','健','康']);
    init(index);
  })

  useEffect(()=>{
    
  })

  //重置页面
  const init = (index: number) => {//重置
    setAnsw([]);
    setIndex(0);
    setImgPath(ddd[index].index.toString());
    // const [index, setIndex] = useState(0);
    // const [imgPath ,setImgPath] = useState('1');
    setPageIndex(index);
    // const [pageIndex, setPageIndex] = useState(0);

    // const [data, setData] = useState(randomlyGeneratedChineseCharacters(20, ['身','体','健','康']));
    setData(randomlyGeneratedChineseCharacters(20, ddd[index].data));
    // const [data, setData] = useState(randomlyGeneratedChineseCharacters(20, ddd[pageIndex].data));
    setResult(ddd[index].data);
    // const [result, setResult] = useState(ddd[pageIndex].data);
  }

  const handleClick = (internalIndex: number, e)=>{
    // console.log(`index: ${internalIndex},e=${JSON.stringify(e)}`);
    if( index < 4 ){
      // console.log(`index: ${index}`);
      answ[index] = e._relatedInfo.anchorRelatedText;
      // console.log(`answ.index = ${answ[index]}`);
      // console.log(`data: ${JSON.stringify( data[internalIndex])}`);
      data[internalIndex].disabled = true;
      // setItems(data);
      setAnsw(answ);
      setIndex(index+1);
      console.log(`index222: ${index}`);
      if(index == 3){
        handleInputChange();
      }
    }
  }

  const handleInputChange = () =>{
    console.log(`index: ${index}`);
    if(index >= 3){// 最后一题,跳到下一张图片
      answ.map((v, i)=>{
        if(v == result[i]){
          Taro.atMessage({
            'message': '回答正确',
            'type': 'success',
          })
          if(pageIndex == ddd.length - 1){// 提示是最后一题了
            Taro.atMessage({
              'message': '已经是最后一题',
              'type': 'warning',
            })
          }else{
            init(pageIndex+1);
          }
        }else{
          Taro.atMessage({
            'message': '回答错误',
            'type': 'error',
          })
        }
      });
    }
  }
  
  const alInputs = [0,1,2,3];

  return (
    <>
    <View className='components-page'>
        <AtMessage />
        <View className='flex-wrp' style='flex-direction:column;'>
          <View className='flex-item flex-item-V demo-text-1'>    
            <Image src={require(`../public/${imgPath}.png`)} style='margin:0 auto;display:block;' />
            {/* <View style={`background: url('1.png')`}  ></View> */}
            <View className='at-input__container'>
              {/* <Input value='1111'/> */}
            
              {
                alInputs.map( (v, i)=>
                  <AtInput
                    name='value'
                    title=''
                    type='text'
                    placeholder=''
                    value={answ[i]}
                    // onChange={handleInputChange}
                    editable = {false}
                  />
                )
              }
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
