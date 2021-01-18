module.exports = {
  css: {
      loaderOptions: {
        css: {},
        postcss: {
          plugins: [
            require('postcss-px2rem')({
            // remUnit 取设计稿的1/10 ，如设计稿是375 则设置为37.5 设计稿为750 设置为75
              remUnit: 37.5
            })
          ]
        }
      }
  },
 
}