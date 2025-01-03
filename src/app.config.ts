export default defineAppConfig({
  pages: [
  'pages/index/index', "pages/item/index", "pages/login/index"],
  // "pages/item/index", "pages/login/index"],
  // subPackages: [
  //   {
  //     root: 'index',
  //     pages: [
  //       'pages/public',
  //     ]
  //   }
  // ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
});