// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: comments;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: code-branch;
// 
// 「小件件」
// 开发环境，用于小组件调用
// https://x.im3x.cn
// https://github.com/im3x/Scriptables
// 

// 组件基础类
const RUNTIME_VERSION = 20201209

const GenshinConfig = {
  Cookie: "__COOKIE__",
  UID: "__UID__",
  server: "cn_gf01"
}

class Base {
  constructor (arg="") {
    this.arg = arg
    this._actions = {}
    this.init()
  }

  init (widgetFamily = config.widgetFamily) {
    // 组件大小：small,medium,large
    this.widgetFamily = widgetFamily
    // 系统设置的key，这里分为三个类型：
    // 1. 全局
    // 2. 不同尺寸的小组件
    // 3. 不同尺寸+小组件自定义的参数
    // 当没有key2时，获取key1，没有key1获取全局key的设置
    // this.SETTING_KEY = this.md5(Script.name()+'@'+this.widgetFamily+"@"+this.arg)
    // this.SETTING_KEY1 = this.md5(Script.name()+'@'+this.widgetFamily)
    this.SETTING_KEY = this.md5(Script.name())
    // 文件管理器
    // 提示：缓存数据不要用这个操作，这个是操作源码目录的，缓存建议存放在local temp目录中
    this.FILE_MGR = FileManager[module.filename.includes('Documents/iCloud~') ? 'iCloud' : 'local']()
    // 本地，用于存储图片等
    this.FILE_MGR_LOCAL = FileManager.local()
    this.BACKGROUND_KEY = this.FILE_MGR_LOCAL.joinPath(this.FILE_MGR_LOCAL.documentsDirectory(), `bg_${this.SETTING_KEY}.jpg`)
    // this.BACKGROUND_KEY1 = this.FILE_MGR_LOCAL.joinPath(this.FILE_MGR_LOCAL.documentsDirectory(), `bg_${this.SETTING_KEY1}.jpg`)
    // this.BACKGROUND_KEY2 = this.FILE_MGR_LOCAL.joinPath(this.FILE_MGR_LOCAL.documentsDirectory(), `bg_${this.SETTING_KEY2}.jpg`)
    // // 插件设置
    this.settings = this.getSettings()
  }

  /**
   * 注册点击操作菜单
   * @param {string} name 操作函数名
   * @param {func} func 点击后执行的函数
   */
  registerAction (name, func) {
    this._actions[name] = func.bind(this)
  }

  /**
   * 生成操作回调URL，点击后执行本脚本，并触发相应操作
   * @param {string} name 操作的名称
   * @param {string} data 传递的数据
   */
  actionUrl (name = '', data = '') {
    let u = URLScheme.forRunningScript()
    let q = `act=${encodeURIComponent(name)}&data=${encodeURIComponent(data)}&__arg=${encodeURIComponent(this.arg)}&__size=${this.widgetFamily}`
    let result = ''
    if (u.includes('run?')) {
      result = `${u}&${q}`
    } else {
      result = `${u}?${q}`
    }
    return result
  }

  /**
   * base64 编码字符串
   * @param {string} str 要编码的字符串
   */
  base64Encode (str) {
    const data = Data.fromString(str)
    return data.toBase64String()
  }

  /**
   * base64解码数据 返回字符串
   * @param {string} b64 base64编码的数据
   */
  base64Decode (b64) {
    const data = Data.fromBase64String(b64)
    return data.toRawString()
  }

  /**
   * md5 加密字符串
   * @param {string} str 要加密成md5的数据
   */
  md5 (str) {
    function d(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function f(n,t,r,e,o,u){return d((c=d(d(t,n),d(e,u)))<<(f=o)|c>>>32-f,r);var c,f}function l(n,t,r,e,o,u,c){return f(t&r|~t&e,n,t,o,u,c)}function v(n,t,r,e,o,u,c){return f(t&e|r&~e,n,t,o,u,c)}function g(n,t,r,e,o,u,c){return f(t^r^e,n,t,o,u,c)}function m(n,t,r,e,o,u,c){return f(r^(t|~e),n,t,o,u,c)}function i(n,t){var r,e,o,u;n[t>>5]|=128<<t%32,n[14+(t+64>>>9<<4)]=t;for(var c=1732584193,f=-271733879,i=-1732584194,a=271733878,h=0;h<n.length;h+=16)c=l(r=c,e=f,o=i,u=a,n[h],7,-680876936),a=l(a,c,f,i,n[h+1],12,-389564586),i=l(i,a,c,f,n[h+2],17,606105819),f=l(f,i,a,c,n[h+3],22,-1044525330),c=l(c,f,i,a,n[h+4],7,-176418897),a=l(a,c,f,i,n[h+5],12,1200080426),i=l(i,a,c,f,n[h+6],17,-1473231341),f=l(f,i,a,c,n[h+7],22,-45705983),c=l(c,f,i,a,n[h+8],7,1770035416),a=l(a,c,f,i,n[h+9],12,-1958414417),i=l(i,a,c,f,n[h+10],17,-42063),f=l(f,i,a,c,n[h+11],22,-1990404162),c=l(c,f,i,a,n[h+12],7,1804603682),a=l(a,c,f,i,n[h+13],12,-40341101),i=l(i,a,c,f,n[h+14],17,-1502002290),c=v(c,f=l(f,i,a,c,n[h+15],22,1236535329),i,a,n[h+1],5,-165796510),a=v(a,c,f,i,n[h+6],9,-1069501632),i=v(i,a,c,f,n[h+11],14,643717713),f=v(f,i,a,c,n[h],20,-373897302),c=v(c,f,i,a,n[h+5],5,-701558691),a=v(a,c,f,i,n[h+10],9,38016083),i=v(i,a,c,f,n[h+15],14,-660478335),f=v(f,i,a,c,n[h+4],20,-405537848),c=v(c,f,i,a,n[h+9],5,568446438),a=v(a,c,f,i,n[h+14],9,-1019803690),i=v(i,a,c,f,n[h+3],14,-187363961),f=v(f,i,a,c,n[h+8],20,1163531501),c=v(c,f,i,a,n[h+13],5,-1444681467),a=v(a,c,f,i,n[h+2],9,-51403784),i=v(i,a,c,f,n[h+7],14,1735328473),c=g(c,f=v(f,i,a,c,n[h+12],20,-1926607734),i,a,n[h+5],4,-378558),a=g(a,c,f,i,n[h+8],11,-2022574463),i=g(i,a,c,f,n[h+11],16,1839030562),f=g(f,i,a,c,n[h+14],23,-35309556),c=g(c,f,i,a,n[h+1],4,-1530992060),a=g(a,c,f,i,n[h+4],11,1272893353),i=g(i,a,c,f,n[h+7],16,-155497632),f=g(f,i,a,c,n[h+10],23,-1094730640),c=g(c,f,i,a,n[h+13],4,681279174),a=g(a,c,f,i,n[h],11,-358537222),i=g(i,a,c,f,n[h+3],16,-722521979),f=g(f,i,a,c,n[h+6],23,76029189),c=g(c,f,i,a,n[h+9],4,-640364487),a=g(a,c,f,i,n[h+12],11,-421815835),i=g(i,a,c,f,n[h+15],16,530742520),c=m(c,f=g(f,i,a,c,n[h+2],23,-995338651),i,a,n[h],6,-198630844),a=m(a,c,f,i,n[h+7],10,1126891415),i=m(i,a,c,f,n[h+14],15,-1416354905),f=m(f,i,a,c,n[h+5],21,-57434055),c=m(c,f,i,a,n[h+12],6,1700485571),a=m(a,c,f,i,n[h+3],10,-1894986606),i=m(i,a,c,f,n[h+10],15,-1051523),f=m(f,i,a,c,n[h+1],21,-2054922799),c=m(c,f,i,a,n[h+8],6,1873313359),a=m(a,c,f,i,n[h+15],10,-30611744),i=m(i,a,c,f,n[h+6],15,-1560198380),f=m(f,i,a,c,n[h+13],21,1309151649),c=m(c,f,i,a,n[h+4],6,-145523070),a=m(a,c,f,i,n[h+11],10,-1120210379),i=m(i,a,c,f,n[h+2],15,718787259),f=m(f,i,a,c,n[h+9],21,-343485551),c=d(c,r),f=d(f,e),i=d(i,o),a=d(a,u);return[c,f,i,a]}function a(n){for(var t="",r=32*n.length,e=0;e<r;e+=8)t+=String.fromCharCode(n[e>>5]>>>e%32&255);return t}function h(n){var t=[];for(t[(n.length>>2)-1]=void 0,e=0;e<t.length;e+=1)t[e]=0;for(var r=8*n.length,e=0;e<r;e+=8)t[e>>5]|=(255&n.charCodeAt(e/8))<<e%32;return t}function e(n){for(var t,r="0123456789abcdef",e="",o=0;o<n.length;o+=1)t=n.charCodeAt(o),e+=r.charAt(t>>>4&15)+r.charAt(15&t);return e}function r(n){return unescape(encodeURIComponent(n))}function o(n){return a(i(h(t=r(n)),8*t.length));var t}function u(n,t){return function(n,t){var r,e,o=h(n),u=[],c=[];for(u[15]=c[15]=void 0,16<o.length&&(o=i(o,8*n.length)),r=0;r<16;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(h(t)),512+8*t.length),a(i(c.concat(e),640))}(r(n),r(t))}function t(n,t,r){return t?r?u(t,n):e(u(t,n)):r?o(n):e(o(n))}
    return t(str)
  }


  /**
   * HTTP 请求接口
   * @param {string} url 请求的url
   * @param {bool} json 返回数据是否为 json，默认 true
   * @param {bool} useCache 是否采用离线缓存（请求失败后获取上一次结果），
   * @return {string | json | null}
   */
  async httpGet (url, json = true, useCache = false) {
    let data = null
    const cacheKey = this.md5(url)
    if (useCache && Keychain.contains(cacheKey)) {
      let cache = Keychain.get(cacheKey)
      return json ? JSON.parse(cache) : cache
    }
    try {
      let req = new Request(url)
      data = await (json ? req.loadJSON() : req.loadString())
    } catch (e) {}
    // 判断数据是否为空（加载失败）
    if (!data && Keychain.contains(cacheKey)) {
      // 判断是否有缓存
      let cache = Keychain.get(cacheKey)
      return json ? JSON.parse(cache) : cache
    }
    // 存储缓存
    Keychain.set(cacheKey, json ? JSON.stringify(data) : data)
    return data
  }

  async httpPost (url, data) {}

  /**
   * 获取远程图片内容
   * @param {string} url 图片地址
   * @param {bool} useCache 是否使用缓存（请求失败时获取本地缓存）
   */
  async getImageByUrl (url, useCache = true) {
    const cacheKey = this.md5(url)
    const cacheFile = FileManager.local().joinPath(FileManager.local().temporaryDirectory(), cacheKey)
    // 判断是否有缓存
    if (useCache && FileManager.local().fileExists(cacheFile)) {
      return Image.fromFile(cacheFile)
    }
    try {
      const req = new Request(url)
      const img = await req.loadImage()
      // 存储到缓存
      FileManager.local().writeImage(cacheFile, img)
      return img
    } catch (e) {
      // 没有缓存+失败情况下，返回自定义的绘制图片（红色背景）
      let ctx = new DrawContext()
      ctx.size = new Size(100, 100)
      ctx.setFillColor(Color.red())
      ctx.fillRect(new Rect(0, 0, 100, 100))
      return await ctx.getImage()
    }
  }

  /**
   * 渲染标题内容
   * @param {object} widget 组件对象
   * @param {string} icon 图标地址
   * @param {string} title 标题内容
   * @param {bool|color} color 字体的颜色（自定义背景时使用，默认系统）
   */
  async renderHeader (widget, icon, title, color = false) {
    widget.addSpacer(10)
    let header = widget.addStack()
    header.centerAlignContent()
    let _icon = header.addImage(await this.getImageByUrl(icon))
    _icon.imageSize = new Size(14, 14)
    _icon.cornerRadius = 4
    header.addSpacer(10)
    let _title = header.addText(title)
    if (color) _title.textColor = color
    _title.textOpacity = 0.7
    _title.font = Font.boldSystemFont(12)
    widget.addSpacer(10)
    return widget
  }

  /**
   * 获取截图中的组件剪裁图
   * 可用作透明背景
   * 返回图片image对象
   * 代码改自：https://gist.github.com/mzeryck/3a97ccd1e059b3afa3c6666d27a496c9
   * @param {string} title 开始处理前提示用户截图的信息，可选（适合用在组件自定义透明背景时提示）
   */
  async getWidgetScreenShot (title = null) {
    // Generate an alert with the provided array of options.
    async function generateAlert(message,options) {
      
      let alert = new Alert()
      alert.message = message
      
      for (const option of options) {
        alert.addAction(option)
      }
      
      let response = await alert.presentAlert()
      return response
    }

    // Crop an image into the specified rect.
    function cropImage(img,rect) {
      
      let draw = new DrawContext()
      draw.size = new Size(rect.width, rect.height)
      
      draw.drawImageAtPoint(img,new Point(-rect.x, -rect.y))  
      return draw.getImage()
    }

    async function blurImage(img,style) {
      const blur = 150
      const js = `
var mul_table=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259];var shg_table=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24];function stackBlurCanvasRGB(id,top_x,top_y,width,height,radius){if(isNaN(radius)||radius<1)return;radius|=0;var canvas=document.getElementById(id);var context=canvas.getContext("2d");var imageData;try{try{imageData=context.getImageData(top_x,top_y,width,height)}catch(e){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");imageData=context.getImageData(top_x,top_y,width,height)}catch(e){alert("Cannot access local image");throw new Error("unable to access local image data: "+e);return}}}catch(e){alert("Cannot access image");throw new Error("unable to access image data: "+e);}var pixels=imageData.data;var x,y,i,p,yp,yi,yw,r_sum,g_sum,b_sum,r_out_sum,g_out_sum,b_out_sum,r_in_sum,g_in_sum,b_in_sum,pr,pg,pb,rbs;var div=radius+radius+1;var w4=width<<2;var widthMinus1=width-1;var heightMinus1=height-1;var radiusPlus1=radius+1;var sumFactor=radiusPlus1*(radiusPlus1+1)/2;var stackStart=new BlurStack();var stack=stackStart;for(i=1;i<div;i++){stack=stack.next=new BlurStack();if(i==radiusPlus1)var stackEnd=stack}stack.next=stackStart;var stackIn=null;var stackOut=null;yw=yi=0;var mul_sum=mul_table[radius];var shg_sum=shg_table[radius];for(y=0;y<height;y++){r_in_sum=g_in_sum=b_in_sum=r_sum=g_sum=b_sum=0;r_out_sum=radiusPlus1*(pr=pixels[yi]);g_out_sum=radiusPlus1*(pg=pixels[yi+1]);b_out_sum=radiusPlus1*(pb=pixels[yi+2]);r_sum+=sumFactor*pr;g_sum+=sumFactor*pg;b_sum+=sumFactor*pb;stack=stackStart;for(i=0;i<radiusPlus1;i++){stack.r=pr;stack.g=pg;stack.b=pb;stack=stack.next}for(i=1;i<radiusPlus1;i++){p=yi+((widthMinus1<i?widthMinus1:i)<<2);r_sum+=(stack.r=(pr=pixels[p]))*(rbs=radiusPlus1-i);g_sum+=(stack.g=(pg=pixels[p+1]))*rbs;b_sum+=(stack.b=(pb=pixels[p+2]))*rbs;r_in_sum+=pr;g_in_sum+=pg;b_in_sum+=pb;stack=stack.next}stackIn=stackStart;stackOut=stackEnd;for(x=0;x<width;x++){pixels[yi]=(r_sum*mul_sum)>>shg_sum;pixels[yi+1]=(g_sum*mul_sum)>>shg_sum;pixels[yi+2]=(b_sum*mul_sum)>>shg_sum;r_sum-=r_out_sum;g_sum-=g_out_sum;b_sum-=b_out_sum;r_out_sum-=stackIn.r;g_out_sum-=stackIn.g;b_out_sum-=stackIn.b;p=(yw+((p=x+radius+1)<widthMinus1?p:widthMinus1))<<2;r_in_sum+=(stackIn.r=pixels[p]);g_in_sum+=(stackIn.g=pixels[p+1]);b_in_sum+=(stackIn.b=pixels[p+2]);r_sum+=r_in_sum;g_sum+=g_in_sum;b_sum+=b_in_sum;stackIn=stackIn.next;r_out_sum+=(pr=stackOut.r);g_out_sum+=(pg=stackOut.g);b_out_sum+=(pb=stackOut.b);r_in_sum-=pr;g_in_sum-=pg;b_in_sum-=pb;stackOut=stackOut.next;yi+=4}yw+=width}for(x=0;x<width;x++){g_in_sum=b_in_sum=r_in_sum=g_sum=b_sum=r_sum=0;yi=x<<2;r_out_sum=radiusPlus1*(pr=pixels[yi]);g_out_sum=radiusPlus1*(pg=pixels[yi+1]);b_out_sum=radiusPlus1*(pb=pixels[yi+2]);r_sum+=sumFactor*pr;g_sum+=sumFactor*pg;b_sum+=sumFactor*pb;stack=stackStart;for(i=0;i<radiusPlus1;i++){stack.r=pr;stack.g=pg;stack.b=pb;stack=stack.next}yp=width;for(i=1;i<=radius;i++){yi=(yp+x)<<2;r_sum+=(stack.r=(pr=pixels[yi]))*(rbs=radiusPlus1-i);g_sum+=(stack.g=(pg=pixels[yi+1]))*rbs;b_sum+=(stack.b=(pb=pixels[yi+2]))*rbs;r_in_sum+=pr;g_in_sum+=pg;b_in_sum+=pb;stack=stack.next;if(i<heightMinus1){yp+=width}}yi=x;stackIn=stackStart;stackOut=stackEnd;for(y=0;y<height;y++){p=yi<<2;pixels[p]=(r_sum*mul_sum)>>shg_sum;pixels[p+1]=(g_sum*mul_sum)>>shg_sum;pixels[p+2]=(b_sum*mul_sum)>>shg_sum;r_sum-=r_out_sum;g_sum-=g_out_sum;b_sum-=b_out_sum;r_out_sum-=stackIn.r;g_out_sum-=stackIn.g;b_out_sum-=stackIn.b;p=(x+(((p=y+radiusPlus1)<heightMinus1?p:heightMinus1)*width))<<2;r_sum+=(r_in_sum+=(stackIn.r=pixels[p]));g_sum+=(g_in_sum+=(stackIn.g=pixels[p+1]));b_sum+=(b_in_sum+=(stackIn.b=pixels[p+2]));stackIn=stackIn.next;r_out_sum+=(pr=stackOut.r);g_out_sum+=(pg=stackOut.g);b_out_sum+=(pb=stackOut.b);r_in_sum-=pr;g_in_sum-=pg;b_in_sum-=pb;stackOut=stackOut.next;yi+=width}}context.putImageData(imageData,top_x,top_y)}function BlurStack(){this.r=0;this.g=0;this.b=0;this.a=0;this.next=null}
      // https://gist.github.com/mjackson/5311256
    
      function rgbToHsl(r, g, b){
          r /= 255, g /= 255, b /= 255;
          var max = Math.max(r, g, b), min = Math.min(r, g, b);
          var h, s, l = (max + min) / 2;
    
          if(max == min){
              h = s = 0; // achromatic
          }else{
              var d = max - min;
              s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
              switch(max){
                  case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                  case g: h = (b - r) / d + 2; break;
                  case b: h = (r - g) / d + 4; break;
              }
              h /= 6;
          }
    
          return [h, s, l];
      }
    
      function hslToRgb(h, s, l){
          var r, g, b;
    
          if(s == 0){
              r = g = b = l; // achromatic
          }else{
              var hue2rgb = function hue2rgb(p, q, t){
                  if(t < 0) t += 1;
                  if(t > 1) t -= 1;
                  if(t < 1/6) return p + (q - p) * 6 * t;
                  if(t < 1/2) return q;
                  if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                  return p;
              }
    
              var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
              var p = 2 * l - q;
              r = hue2rgb(p, q, h + 1/3);
              g = hue2rgb(p, q, h);
              b = hue2rgb(p, q, h - 1/3);
          }
    
          return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
      }
      
      function lightBlur(hsl) {
      
        // Adjust the luminance.
        let lumCalc = 0.35 + (0.3 / hsl[2]);
        if (lumCalc < 1) { lumCalc = 1; }
        else if (lumCalc > 3.3) { lumCalc = 3.3; }
        const l = hsl[2] * lumCalc;
        
        // Adjust the saturation. 
        const colorful = 2 * hsl[1] * l;
        const s = hsl[1] * colorful * 1.5;
        
        return [hsl[0],s,l];
        
      }
      
      function darkBlur(hsl) {
    
        // Adjust the saturation. 
        const colorful = 2 * hsl[1] * hsl[2];
        const s = hsl[1] * (1 - hsl[2]) * 3;
        
        return [hsl[0],s,hsl[2]];
        
      }
    
      // Set up the canvas.
      const img = document.getElementById("blurImg");
      const canvas = document.getElementById("mainCanvas");
    
      const w = img.naturalWidth;
      const h = img.naturalHeight;
    
      canvas.style.width  = w + "px";
      canvas.style.height = h + "px";
      canvas.width = w;
      canvas.height = h;
    
      const context = canvas.getContext("2d");
      context.clearRect( 0, 0, w, h );
      context.drawImage( img, 0, 0 );
      
      // Get the image data from the context.
      var imageData = context.getImageData(0,0,w,h);
      var pix = imageData.data;
      
      var isDark = "${style}" == "dark";
      var imageFunc = isDark ? darkBlur : lightBlur;
    
      for (let i=0; i < pix.length; i+=4) {
    
        // Convert to HSL.
        let hsl = rgbToHsl(pix[i],pix[i+1],pix[i+2]);
        
        // Apply the image function.
        hsl = imageFunc(hsl);
      
        // Convert back to RGB.
        const rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
      
        // Put the values back into the data.
        pix[i] = rgb[0];
        pix[i+1] = rgb[1];
        pix[i+2] = rgb[2];
    
      }
    
      // Draw over the old image.
      context.putImageData(imageData,0,0);
    
      // Blur the image.
      stackBlurCanvasRGB("mainCanvas", 0, 0, w, h, ${blur});
      
      // Perform the additional processing for dark images.
      if (isDark) {
      
        // Draw the hard light box over it.
        context.globalCompositeOperation = "hard-light";
        context.fillStyle = "rgba(55,55,55,0.2)";
        context.fillRect(0, 0, w, h);
    
        // Draw the soft light box over it.
        context.globalCompositeOperation = "soft-light";
        context.fillStyle = "rgba(55,55,55,1)";
        context.fillRect(0, 0, w, h);
    
        // Draw the regular box over it.
        context.globalCompositeOperation = "source-over";
        context.fillStyle = "rgba(55,55,55,0.4)";
        context.fillRect(0, 0, w, h);
      
      // Otherwise process light images.
      } else {
        context.fillStyle = "rgba(255,255,255,0.4)";
        context.fillRect(0, 0, w, h);
      }
    
      // Return a base64 representation.
      canvas.toDataURL(); 
      `
      
      // Convert the images and create the HTML.
      let blurImgData = Data.fromPNG(img).toBase64String()
      let html = `
      <img id="blurImg" src="data:image/png;base64,${blurImgData}" />
      <canvas id="mainCanvas" />
      `
      
      // Make the web view and get its return value.
      let view = new WebView()
      await view.loadHTML(html)
      let returnValue = await view.evaluateJavaScript(js)
      
      // Remove the data type from the string and convert to data.
      let imageDataString = returnValue.slice(22)
      let imageData = Data.fromBase64String(imageDataString)
      
      // Convert to image and crop before returning.
      let imageFromData = Image.fromData(imageData)
      // return cropImage(imageFromData)
      return imageFromData
    }


    // Pixel sizes and positions for widgets on all supported phones.
    function phoneSizes() {
      let phones = {
        // 12 and 12 Pro
        "2532": {
          small:  474,
          medium: 1014,
          large:  1062,
          left:  78,
          right: 618,
          top:    231,
          middle: 819,
          bottom: 1407
        },
      
        // 11 Pro Max, XS Max
        "2688": {
          small:  507,
          medium: 1080,
          large:  1137,
          left:  81,
          right: 654,
          top:    228,
          middle: 858,
          bottom: 1488
        },
      
        // 11, XR
        "1792": {
          small:  338,
          medium: 720,
          large:  758,
          left:  54,
          right: 436,
          top:    160,
          middle: 580,
          bottom: 1000
        },
        
        
        // 11 Pro, XS, X
        "2436": {
          small:  465,
          medium: 987,
          large:  1035,
          left:  69,
          right: 591,
          top:    213,
          middle: 783,
          bottom: 1353
        },
      
        // Plus phones
        "2208": {
          small:  471,
          medium: 1044,
          large:  1071,
          left:  99,
          right: 672,
          top:    114,
          middle: 696,
          bottom: 1278
        },
        
        // SE2 and 6/6S/7/8
        "1334": {
          small:  296,
          medium: 642,
          large:  648,
          left:  54,
          right: 400,
          top:    60,
          middle: 412,
          bottom: 764
        },
        
        
        // SE1
        "1136": {
          small:  282,
          medium: 584,
          large:  622,
          left: 30,
          right: 332,
          top:  59,
          middle: 399,
          bottom: 399
        },
        
        // 11 and XR in Display Zoom mode
        "1624": {
          small: 310,
          medium: 658,
          large: 690,
          left: 46,
          right: 394,
          top: 142,
          middle: 522,
          bottom: 902 
        },
        
        // Plus in Display Zoom mode
        "2001" : {
          small: 444,
          medium: 963,
          large: 972,
          left: 81,
          right: 600,
          top: 90,
          middle: 618,
          bottom: 1146
        }
      }
      return phones
    }

    var message
    message = title || "开始之前，请先前往桌面,截取空白界面的截图。然后回来继续"
    let exitOptions = ["我已截图","前去截图 >"]
    let shouldExit = await generateAlert(message,exitOptions)
    if (shouldExit) return

    // Get screenshot and determine phone size.
    let img = await Photos.fromLibrary()
    let height = img.size.height
    let phone = phoneSizes()[height]
    if (!phone) {
      message = "好像您选择的照片不是正确的截图，或者您的机型我们暂时不支持。点击确定前往社区讨论"
      let _id = await generateAlert(message,["帮助", "取消"])
      if (_id===0) Safari.openInApp('https://support.qq.com/products/287371', false)
      return
    }

    // Prompt for widget size and position.
    message = "截图中要设置透明背景组件的尺寸类型是？"
    let sizes = ["小尺寸","中尺寸","大尺寸"]
    let size = await generateAlert(message,sizes)
    let widgetSize = sizes[size]

    message = "要设置透明背景的小组件在哪个位置？"
    message += (height == 1136 ? " （备注：当前设备只支持两行小组件，所以下边选项中的「中间」和「底部」的选项是一致的）" : "")

    // Determine image crop based on phone size.
    let crop = { w: "", h: "", x: "", y: "" }
    if (widgetSize == "小尺寸") {
      crop.w = phone.small
      crop.h = phone.small
      let positions = ["左上角","右上角","中间左","中间右","左下角","右下角"]
      let _posotions = ["Top left","Top right","Middle left","Middle right","Bottom left","Bottom right"]
      let position = await generateAlert(message,positions)
      
      // Convert the two words into two keys for the phone size dictionary.
      let keys = _posotions[position].toLowerCase().split(' ')
      crop.y = phone[keys[0]]
      crop.x = phone[keys[1]]
      
    } else if (widgetSize == "中尺寸") {
      crop.w = phone.medium
      crop.h = phone.small
      
      // Medium and large widgets have a fixed x-value.
      crop.x = phone.left
      let positions = ["顶部","中间","底部"]
      let _positions = ["Top","Middle","Bottom"]
      let position = await generateAlert(message,positions)
      let key = _positions[position].toLowerCase()
      crop.y = phone[key]
      
    } else if(widgetSize == "大尺寸") {
      crop.w = phone.medium
      crop.h = phone.large
      crop.x = phone.left
      let positions = ["顶部","底部"]
      let position = await generateAlert(message,positions)
      
      // Large widgets at the bottom have the "middle" y-value.
      crop.y = position ? phone.middle : phone.top
    }

    // 透明/模糊选项
    message = "需要给背景图片加什么显示效果？"
    let blurOptions = ["透明", "白色 模糊", "黑色 模糊"]
    let blurred = await generateAlert(message, blurOptions)

    // Crop image and finalize the widget.
    if (blurred) {
      const style = (blurred === 1) ? 'light' : 'dark'
      img = await blurImage(img, style)
    }
    let imgCrop = cropImage(img, new Rect(crop.x,crop.y,crop.w,crop.h))


    return imgCrop

  }

  /**
   * 弹出一个通知
   * @param {string} title 通知标题
   * @param {string} body 通知内容
   * @param {string} url 点击后打开的URL
   */
  async notify (title, body, url, opts = {}) {
    let n = new Notification()
    n = Object.assign(n, opts);
    n.title = title
    n.body = body
    if (url) n.openURL = url
    return await n.schedule()
  }


  /**
   * 给图片加一层半透明遮罩
   * @param {Image} img 要处理的图片
   * @param {string} color 遮罩背景颜色
   * @param {float} opacity 透明度
   */
  async shadowImage (img, color = '#000000', opacity = 0.7) {
    let ctx = new DrawContext()
    // 获取图片的尺寸
    ctx.size = img.size
    
    ctx.drawImageInRect(img, new Rect(0, 0, img.size['width'], img.size['height']))
    ctx.setFillColor(new Color(color, opacity))
    ctx.fillRect(new Rect(0, 0, img.size['width'], img.size['height']))
    
    let res = await ctx.getImage()
    return res
  }
  
  /**
   * 获取当前插件的设置
   * @param {boolean} json 是否为json格式
   */
  getSettings(json=true){
    let res=json?{}:""
    let cache=""
    // if (global && Keychain.contains(this.SETTING_KEY2)) {
    //   cache = Keychain.get(this.SETTING_KEY2)
    // } else if (Keychain.contains(this.SETTING_KEY)) {
    //   cache = Keychain.get(this.SETTING_KEY)
    // } else if (Keychain.contains(this.SETTING_KEY1)) {
    //   cache = Keychain.get(this.SETTING_KEY1)
    // } else if (Keychain.contains(this.SETTING_KEY2)){
    if (Keychain.contains(this.SETTING_KEY)) {
      cache= Keychain.get(this.SETTING_KEY)
    }
      if (json){
        try {
          res=JSON.parse(cache)
        } catch (e) {}
      }else{
        res=cache
      }
    
    return res
  }

  /**
   * 存储当前设置
   * @param {bool} notify 是否通知提示
   */
  saveSettings(notify=true){
    let res= (typeof this.settings==="object")?JSON.stringify(this.settings):String(this.settings)
    Keychain.set(this.SETTING_KEY, res)
    if (notify) this.notify("设置成功","桌面组件稍后将自动刷新")
  }

  /**
   * 获取当前插件是否有自定义背景图片
   * @reutrn img | false
   */
  getBackgroundImage () {
    // 如果有KEY则优先加载，key>key1>key2
    // key2是全局
    let result = null
    if (this.FILE_MGR_LOCAL.fileExists(this.BACKGROUND_KEY)) {
      result = Image.fromFile(this.BACKGROUND_KEY)
    // } else if (this.FILE_MGR_LOCAL.fileExists(this.BACKGROUND_KEY1)) {
    //   result = Image.fromFile(this.BACKGROUND_KEY1)
    // } else if (this.FILE_MGR_LOCAL.fileExists(this.BACKGROUND_KEY2)) {
    //   result = Image.fromFile(this.BACKGROUND_KEY2)
    }
    return result
  }

  /**
   * 设置当前组件的背景图片
   * @param {image} img 
   */
  setBackgroundImage (img, notify = true) {
    if (!img) {
      // 移除背景
      if (this.FILE_MGR_LOCAL.fileExists(this.BACKGROUND_KEY)) {
        this.FILE_MGR_LOCAL.remove(this.BACKGROUND_KEY)
      // } else if (this.FILE_MGR_LOCAL.fileExists(this.BACKGROUND_KEY1)) {
      //   this.FILE_MGR_LOCAL.remove(this.BACKGROUND_KEY1)
      // } else if (this.FILE_MGR_LOCAL.fileExists(this.BACKGROUND_KEY2)) {
      //   this.FILE_MGR_LOCAL.remove(this.BACKGROUND_KEY2)
      }
      if (notify) this.notify("移除成功", "小组件背景图片已移除，稍后刷新生效")
    } else {
      // 设置背景
      // 全部设置一遍，
      this.FILE_MGR_LOCAL.writeImage(this.BACKGROUND_KEY, img)
      // this.FILE_MGR_LOCAL.writeImage(this.BACKGROUND_KEY1, img)
      // this.FILE_MGR_LOCAL.writeImage(this.BACKGROUND_KEY2, img)
      if (notify) this.notify("设置成功", "小组件背景图片已设置！稍后刷新生效")
    }
  }
  
}
// @base.end
// 运行环境
// @running.start
const Running = async (Widget, default_args = "") => {
  let M = null
  // 判断hash是否和当前设备匹配
  if (config.runsInWidget) {
    M = new Widget(args.widgetParameter || '')
    const W = await M.render()
    Script.setWidget(W)
    Script.complete()
  } else {
    let { act, data, __arg, __size } = args.queryParameters
    M = new Widget(__arg || default_args || '')
    if (__size) M.init(__size)
    if (!act || !M['_actions']) {
      // 弹出选择菜单
      const actions = M['_actions']
      const _actions = [
        async () => {
          Safari.openInApp("https://support.qq.com/products/287371", false)
        }
      ]
      const alert = new Alert()
      alert.title = M.name
      alert.message = M.desc
      alert.addAction("反馈交流")
      for (let _ in actions) {
        alert.addAction(_)
        _actions.push(actions[_])
      }
      alert.addCancelAction("取消操作")
      const idx = await alert.presentSheet()
      if (_actions[idx]) {
        const func = _actions[idx]
        await func()
      }
      return
    }
    let _tmp = act.split('-').map(_ => _[0].toUpperCase() + _.substr(1)).join('')
    let _act = `action${_tmp}`
    if (M[_act] && typeof M[_act] === 'function') {
      const func = M[_act].bind(M)
      await func(data)
    }
  }
}

class Widget extends Base {
  /**
   * 传递给组件的参数，可以是桌面 Parameter 数据，也可以是外部如 URLScheme 等传递的数据
   * @param {string} arg 自定义参数
   */
  constructor(arg) {
    super(arg)
    this.name = '原神每日摘要'
    this.desc = '每日摘要'

    this.API_ARGS = {
      API_APP_INFO_VERSION: "2.12.1",
      API_APP_SIGN_VERSION: "2.3.0",
      API_INFO_SALT: "xV8v4Qu54lUKrEYFZkJhB8cuOh9Asafs",
      API_SIGN_SALT: "h8w582wxwgqvahcdkpvdhbh2w9casgfl"
    }

    this.GenshinConfig = GenshinConfig

    this.logo_url = "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp3-bcy.byteimg.com%2Fimg%2Fbanciyuan%2F7865d3e3ae4744d7bca730765cad6dd8~tplv-banciyuan-2X2.image&refer=http%3A%2F%2Fp3-bcy.byteimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651910656&t=6bde033b3aa0e5ee2f4ccb23ff27ad60"
  }

  /**
   * 渲染函数，函数名固定
   * 可以根据 this.widgetFamily 来判断小组件尺寸，以返回不同大小的内容
   */
  async render() {
    const data = await this.getDailyNoteData()
    switch (this.widgetFamily) {
      case 'large':
        return await this.renderLarge(data.content['data'])
      case 'medium':
        return await this.renderMedium(data.content['data'])
      default:
        return await this.renderSmall(data.content['data'])
    }
  }

  /**
   * 渲染小尺寸组件
   */
  async renderSmall(data) {
    let w = new ListWidget()
    // await this.renderHeader(w, data['logo'], data['title'])
    const t = w.addText(data['content'])
    t.font = Font.lightSystemFont(16)
    w.addSpacer()
    w.url = this.actionUrl('open-url', data['url'])
    return w
  }

  /**
   * 渲染中尺寸组件
   */
  async renderMedium(data) {
    let w = new ListWidget()
    // w.backgroundImage = await this.getImageByUrl("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F17%2F20210617213349_41f2a.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651910169&t=76f9ce4ae3a8bf5539f2c7780d52541d")

    await this.renderHeader(w, this.logo_url, this.name)

    {
      let largeCell = w.addStack()
      await this.makeResinCell(largeCell.addStack(), data);
      largeCell.addSpacer()
      await this.makeDailyTask(largeCell.addStack(), data);
      largeCell.addSpacer()
      await this.makeWeekBoss(largeCell.addStack(), data);
      largeCell.centerAlignContent();
      w.addSpacer(10)
    }


    await this.makeHomeCoinCell(w.addStack(), data)
    w.addSpacer(5);
    await this.makeTransformer(w.addStack(), data)
    w.addSpacer(5);
    await this.makeWeeklyMaterial(w.addStack())

    w.addSpacer()
    return w
  }

  /**
   * 渲染大尺寸组件
   */
  async renderLarge(data) {
    return await this.renderMedium(data, 10)
  }

  /**
   * 构造DS
   * @param {*} q
   * @param {*} b
   * @returns
   */
  async getDS(q = "", b = "") {
    // let MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}

    let timestamp = Math.floor(Date.now() / 1000);
    let randomStr = Math.random().toString(10).slice(-6);
    let s = "salt=" + this.API_ARGS.API_INFO_SALT + "&t=" + timestamp + "&r=" + randomStr + "&b=" + b + "&q=" + q;
    let check = this.md5(s);
    return timestamp + "," + randomStr + "," + check;
  }

  /**
   * 获取米游社每日数据
   * @returns
   */
  async getDailyNoteData() {
    let data;
    try {
      let base_url = "https://api-takumi.mihoyo.com/game_record/app/genshin/api/dailyNote"
      let headers = {
        "Host": "api-takumi-record.mihoyo.com",
        "x-rpc-client_type": "5",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Accept": "application/json, text/plain, */*",
        "Origin": "https://webstatic.mihoyo.com",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) miHoYoBBS/" + this.API_ARGS.API_APP_INFO_VERSION,
        "Connection": "keep-alive",
        "x-rpc-app_version": this.API_ARGS.API_APP_INFO_VERSION,
        "Referer": "https://webstatic.mihoyo.com/"
      }
      let query = "role_id=" + this.GenshinConfig.UID + "&server=" + this.GenshinConfig.server;
      let url = base_url + "?" + query
      headers['Cookie'] = this.GenshinConfig.Cookie;
      headers['DS'] = await this.getDS(query);

      this.httpGet()
      let req = new Request(url);
      req.headers = headers;
      req.timeoutInterval = 20;

      let json = await req.loadJSON();
      data = {
        content: json,
        last_check: new Date().getTime()
      };
      // cache.write("data", data);
    } catch (error) {
      console.log(error);
      // data = await cache.read('data');
    }
    return data;
  }

  async getWeeklyMaterialData(){
    const RegionAbbr = {"MD": "蒙德", "LY": "璃月", "DQ": "稻妻"};
    const AvatarMaterial = new Map([
      ["自由",{day: [1,4], loc: "MD"}],
      ["繁荣",{day: [1,4], loc: "LY"}],
      ["浮世",{day: [1,4], loc: "DQ"}],

      ["抗争",{day: [2,5], loc: "MD"}],
      ["勤劳",{day: [2,5], loc: "LY"}],
      ["风雅",{day: [2,5], loc: "DQ"}],

      ["诗文",{day: [3,6], loc: "MD"}],
      ["黄金",{day: [3,6], loc: "LY"}],
      ["天光",{day: [3,6], loc: "DQ"}]
    ])  // Start from 1: monday

    const WeaponsMaterial = new Map([
      ["高塔孤王", {day: [1,4], loc: "MD", icon: "https://patchwiki.biligame.com/images/ys/thumb/a/ae/ril3957ally2n06x63okj5u4xlgxkat.png/60px-%E9%AB%98%E5%A1%94%E5%AD%A4%E7%8E%8B%E7%9A%84%E7%A2%8E%E6%A2%A6.png"}],
      ["孤云寒林", {day: [1,4], loc: "LY", icon: "https://patchwiki.biligame.com/images/ys/thumb/a/a3/1tu23zexvw3rzspu1srih6obhzvis7n.png/60px-%E5%AD%A4%E4%BA%91%E5%AF%92%E6%9E%97%E7%9A%84%E7%A5%9E%E4%BD%93.png"}],
      ["远海夷地", {day: [1,4], loc: "DQ", icon: "https://patchwiki.biligame.com/images/ys/thumb/e/ee/sb5eljgxovf5ai76kdiky1nc8sofixq.png/60px-%E8%BF%9C%E6%B5%B7%E5%A4%B7%E5%9C%B0%E7%9A%84%E9%87%91%E6%9E%9D.png"}],

      ["凛风奔狼", {day: [2,5], loc: "MD", icon: "https://patchwiki.biligame.com/images/ys/thumb/8/87/9pms7n56y93l3pubhkf50f0ve26xeay.png/60px-%E5%87%9B%E9%A3%8E%E5%A5%94%E7%8B%BC%E7%9A%84%E6%80%80%E4%B9%A1.png"}],
      ["雾海云间", {day: [2,5], loc: "LY", icon: "https://patchwiki.biligame.com/images/ys/thumb/5/50/4pyz2quwtyekg7q9nz7uwvvk8u0lp1r.png/60px-%E9%9B%BE%E6%B5%B7%E4%BA%91%E9%97%B4%E7%9A%84%E8%BD%AC%E8%BF%98.png"}],
      ["鸣神御灵", {day: [2,5], loc: "DQ", icon: "https://patchwiki.biligame.com/images/ys/thumb/a/a7/8c1i8vpz8xtfkhq2ql02htt2jhqjer8.png/60px-%E9%B8%A3%E7%A5%9E%E5%BE%A1%E7%81%B5%E7%9A%84%E5%8B%87%E6%AD%A6.png"}],

      ["狮牙斗士", {day: [3,6], loc: "MD", icon: "https://patchwiki.biligame.com/images/ys/thumb/3/39/nev6qh0704ntykkzomnpfmy61b8jo6t.png/60px-%E7%8B%AE%E7%89%99%E6%96%97%E5%A3%AB%E7%9A%84%E7%90%86%E6%83%B3.png"}],
      ["漆黑陨铁", {day: [3,6], loc: "LY", icon: "https://patchwiki.biligame.com/images/ys/thumb/a/a5/ondpda6fqcktdngxx59hjx0x86eifeu.png/60px-%E6%BC%86%E9%BB%91%E9%99%A8%E9%93%81%E7%9A%84%E4%B8%80%E5%9D%97.png"}],
      ["今昔剧画", {day: [3,6], loc: "DQ", icon: "https://patchwiki.biligame.com/images/ys/thumb/e/e1/2io89qzgybi350jsqrpm0p6efnh16yb.png/60px-%E4%BB%8A%E6%98%94%E5%89%A7%E7%94%BB%E7%9A%84%E9%AC%BC%E4%BA%BA.png"}]
    ]);

    for(let [key, value] of AvatarMaterial.entries()){
      value.loc = RegionAbbr[value.loc];
    }

    for(let [key, value] of WeaponsMaterial.entries()){
      value.loc = RegionAbbr[value.loc];
    }


    return [AvatarMaterial, WeaponsMaterial]
  }

  async makeWeeklyMaterial(cell){
    cell.layoutVertically()
    let currentDay = new Date()
    if(currentDay.getHours() < 4){
      currentDay.setDate(currentDay.getDate() - 1);
    }
    let [avatarMaterials, weaponsMaterials] = await this.getWeeklyMaterialData();
    let avatarsMcell = cell.addStack();
    {
      avatarsMcell.bottomAlignContent()
      let header = avatarsMcell.addText("角色突破：")
      header.font = Font.boldSystemFont(12)
      if(currentDay.getDay() === 0){
        avatarsMcell.addText("全部素材").font = Font.lightSystemFont(12)
      }else{
        let day = currentDay.getDay()
        let added = false;
        for(let [key, value] of avatarMaterials.entries()){
          if(value.day.indexOf(day) !== -1){
            if(added){
              avatarsMcell.addText("，").font = Font.lightSystemFont(12)
            }

            let m = avatarsMcell.addText(`${key}`)
            m.font= Font.lightSystemFont(12)
            m = avatarsMcell.addText(`(${value.loc})`)
            m.font= Font.lightSystemFont(10)
            m.textColor = Color.gray();
            added = true;
          }

        }
      }
    }

    cell.addSpacer(5)

    let weaponsMcell = cell.addStack();
    {
      weaponsMcell.layoutHorizontally()
      weaponsMcell.bottomAlignContent()
      let header = weaponsMcell.addText("武器突破：")
      header.font = Font.boldSystemFont(12)
      let content;
      if(currentDay.getDay() === 0){
        avatarsMcell.addText("全部素材").font = Font.lightSystemFont(12)
      }else{
        let day = currentDay.getDay()
        let materials = []
        let txt = ""
        let added = false;
        for(let [key, value] of weaponsMaterials.entries()){
          if(value.day.indexOf(day) !== -1){
            if(added){
              weaponsMcell.addText("，").font = Font.lightSystemFont(12)
            }
            let icon = weaponsMcell.addImage(await this.getImageByUrl(value.icon))
            icon.imageSize = new Size(16, 16)
            let loc = weaponsMcell.addText(`(${value.loc})`)
            loc.font = Font.lightSystemFont(10)
            loc.textColor = Color.gray();
            added = true;
            // materials.push(`${key}(${value.loc})`)
          }
        }
      }
    }
  }

  /**
   * 分析体力数据
   * @param data
   * @returns {Promise<string[]>}
   */
  async parseResin(data) {
    let current_resin = data['current_resin']
    let max_resin = data['max_resin']
    let resin_txt = `${current_resin} / ${max_resin}`
    let recovery_txt = "";
    if (current_resin !== max_resin) {
      let resin_recovery_second = parseInt(data['resin_recovery_time'])
      recovery_txt += await this.beautifyTimeDelta(resin_recovery_second);
      recovery_txt += "恢复"
    } else {
      recovery_txt = "树脂已满"
    }

    return [current_resin === max_resin, resin_txt, recovery_txt]
  }

  /**
   * 渲染树脂块
   * @param cell
   * @param data
   * @returns {Promise<void>}
   */
  async makeResinCell(cell, data) {
    const [full, resin, recovery] = await this.parseResin(data);

    let resign_t = await this.centerTextInStack(cell, resin)
    resign_t.font = Font.boldSystemFont(18);
    if(full){
      resign_t.textColor = Color.green();
    }

    let recovery_t = await this.centerTextInStack(cell, recovery)
    recovery_t.font = Font.lightSystemFont(10);
    recovery_t.textColor = Color.gray();

    cell.centerAlignContent();
    cell.layoutVertically()
  }

  /**
   * 分析每日任务
   * @param data
   * @returns {Promise<(string|string)[]>}
   */
  async parseDailyTask(data){
    let finished_task = data['finished_task_num']
    let total_task = data['total_task_num']
    let extra_reward = data['is_extra_task_reward_received']

    let task_txt = `${finished_task} / ${total_task}`
    let extra_txt = extra_reward? "额外奖励已领取": "额外奖励未领取";
    return [task_txt, extra_txt]
  }

  /**
   * 渲染每日任务
   * @param cell
   * @param data
   * @returns {Promise<void>}
   */
  async makeDailyTask(cell, data){
    let [task, extra] = await this.parseDailyTask(data);

    let task_cnt = await this.centerTextInStack(cell, task)
    task_cnt.font = Font.boldSystemFont(18);

    let extra_t = await this.centerTextInStack(cell, extra);
    extra_t.font = Font.lightSystemFont(10);
    extra_t.textColor = Color.gray();
    cell.layoutVertically();
    cell.centerAlignContent();
  }

  /**
   * 分析周本
   * @param data
   * @returns {Promise<(string|string)[]>}
   */
  async parseWeekBoss(data){
    let undefeated_boss = data['remain_resin_discount_num']
    let total_boss = data['resin_discount_num_limit']

    let boss_txt = `${undefeated_boss} / ${total_boss}`
    return [undefeated_boss !==0, boss_txt]
  }

  /**
   * 渲染周本
   * @param cell
   * @param data
   * @returns {Promise<void>}
   */
  async makeWeekBoss(cell, data){
    let [available, boss] = await this.parseWeekBoss(data);

    let boss_cnt = await this.centerTextInStack(cell, boss)
    boss_cnt.font = Font.boldSystemFont(18);
    if(available){
      boss_cnt.textColor = Color.green()
    }

    let extra_t = await this.centerTextInStack(cell, "周本体力减半");
    extra_t.font = Font.lightSystemFont(10);
    extra_t.textColor = Color.gray();
    cell.layoutVertically();
    cell.centerAlignContent();
  }

  /**
   * 分析洞天宝钱
   * @param data
   * @returns {Promise<string[]>}
   */
  async parseHomeCoin(data) {
    let current_coin = data['current_home_coin']
    let max_coin = data['max_home_coin']
    let coin_txt = `${current_coin} / ${max_coin}`

    let recovery_txt = "";
    if (current_coin !== max_coin) {
      let coin_recovery_second = parseInt(data['home_coin_recovery_time'])
      recovery_txt = await this.beautifyTimeDelta(coin_recovery_second);
      recovery_txt += " 恢复"
    } else {
      recovery_txt = "宝钱已满"
    }

    return [current_coin === max_coin, coin_txt, recovery_txt]
  }

  /**
   * 渲染洞天宝钱
   * @param cell
   * @param data
   * @returns {Promise<void>}
   */
  async makeHomeCoinCell(cell, data) {
    const [full, coin, recovery] = await this.parseHomeCoin(data);
    let coin_header = cell.addText("洞天宝钱：");
    coin_header.font =  Font.boldSystemFont(12);
    let coin_cnt = cell.addText(coin);
    coin_cnt.font =  Font.lightSystemFont(12);
    if(full){
      coin_cnt.textColor = Color.green()
    }
    // let coin_t = cell.addText(coin);
    // coin_t.font = Font.boldSystemFont(12);
    cell.addSpacer()
    let recovery_t = cell.addText(recovery);
    recovery_t.font = Font.lightSystemFont(10);
    recovery_t.textColor = Color.gray();
    // cell.addSpacer();
    cell.bottomAlignContent();
  }

  /**
   * 分析参量质变仪
   * @param data
   * @returns {Promise<void>}
   */
  async parseTransformer(data){
    let transformer = data['transformer']
    let transformer_txt = transformer['obtained']? "冷却中": "可用";
    let recovery_txt = "";
    if(!transformer['obtained']){
      recovery_txt = "冷却已结束";
    }else{
      let recovery_time = transformer['recovery_time'];
      let delta = 0;
      delta += recovery_time['Day'];
      delta = delta * 24 + recovery_time['Hour'];
      delta = delta * 60 + recovery_time['Minute'];
      recovery_txt = await this.beautifyTimeDelta(delta * 60);
      recovery_txt += " 恢复"
    }
    return [!transformer['obtained'], transformer_txt, recovery_txt];
  }

  async makeTransformer(cell, data){
    const [ready, obtained, recovery] = await this.parseTransformer(data);
    let transformer_header = cell.addText("参量质变：");
    transformer_header.font =  Font.boldSystemFont(12);
    let transformer_state = cell.addText(obtained);
    transformer_state.font =  Font.lightSystemFont(12);
    if(ready){
      transformer_state.textColor = Color.green();
    }
    // let coin_t = cell.addText(coin);
    // coin_t.font = Font.boldSystemFont(12);
    cell.addSpacer()
    let transformer_t = cell.addText(recovery);
    transformer_t.font = Font.lightSystemFont(10);
    transformer_t.textColor = Color.gray();
    // cell.addSpacer();
    cell.bottomAlignContent();
  }

  async centerTextInStack(parent, txt){
    let sub_cell = parent.addStack();
    sub_cell.addSpacer()
    let extra_t = sub_cell.addText(txt);
    sub_cell.addSpacer()
    return extra_t;
  }
  /**
   * 自定义注册点击事件，用 actionUrl 生成一个触发链接，点击后会执行下方对应的 action
   * @param {string} url 打开的链接
   */
  async actionOpenUrl(url) {
    Safari.openInApp(url, false)
  }

  async beautifyTimeDelta(delta_seconds) {
    let txt = "";
    let current = new Date();
    let current_d = new Date(current)
    current_d.setHours(0, 0, 0, 0);
    let tomorrow_d = new Date(current_d)
    tomorrow_d.setDate(tomorrow_d.getDate() + 1)
    let recovery = new Date(current.getTime() + delta_seconds * 1000);
    let recovery_d = new Date(recovery);
    recovery_d.setHours(0, 0, 0, 0);
    if (current_d.getTime() === recovery_d.getTime()) {
      txt = ""
    } else if (recovery_d.getTime() === tomorrow_d.getTime()) {
      txt = "明天"
    } else {
      let days = ['日','一','二','三','四','五','六'];
      // const date_formatter = new DateFormatter();
      // date_formatter.useShortDateStyle();
      // date_formatter.useNoTimeStyle();
      //
      // txt = date_formatter.string(recovery_d) + " "
      txt = `周${days[recovery_d.getDay()]}`
    }

    const time_formatter = new DateFormatter();
    time_formatter.useNoDateStyle();
    time_formatter.useShortTimeStyle();
    txt += time_formatter.string(recovery);

    return txt;
  }
}

await Running(Widget)