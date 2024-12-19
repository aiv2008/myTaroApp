import CryptoJS from 'crypto-js';
// import triplesec from 'triplesec';

// import {encrypt} from 'triplesec';

// import JsEncrypt from 'jsencrypt';


//定义key和iv
const key = 'abcdef0123456789';
const iv = '0123456789abcdef';

// const publickey = 'abcdef0123456789';
// const privatekey = '0123456789abcdef';

//定义加密方法
export function aesEncrypt( data: string){
    //创建加密对象：三个参数（加密算法，加密的key和iv）
    // const cipher = crypto.createCipheriv('aes-128-cbc', key ,iv);
    // let crypted = cipher.update(data , 'binary', 'hex');
    // //加密结束：结尾加上cipher.final('hex')表示结束
    // crypted += cipher.final('hex');
    // return crypted;

    const akey = CryptoJS.enc.Utf8.parse(key);
    const aiv = CryptoJS.enc.Utf8.parse(iv);

    //   const srcs = CryptoJS.enc.Utf8.parse(data);
      const encrypted = CryptoJS.AES.encrypt(data, akey, {
        iv: aiv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      console.log(`encrypted :${encrypted}`);
      return encrypted.ciphertext.toString();
}