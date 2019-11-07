# fsadmin-cms
> 简化繁琐重复的工作，全套restful风格， 实现前端orm，关联查询，自动生成基础页面的实用，易扩展的admin-cms

#### 效果图
![img](http://pic.loveyh.com/fsadmin-demo.gif)

#### 在线地址

[http://120.55.160.92:8082](http://120.55.160.92:8082)

```
用户1：admin
密码：111111

用户2：gust
密码：111111

```

#### 服务端框架

优化中...


## 环境配置
- `vue^2.5.10` 
- `vue-cli3`
- `iview^3.2.2`

## 命令
```bash
# 下载代码
$ git clone https://github.com/beclass/fsadmin-cms.git

# 安装依赖
$ npm i  建议 cnpm i

# 开发调试
$ npm run dev

# 构建
$ npm run build
```

## 约定
- `filter.search$$title$$all` - 模糊查询title
```bash
    all：模糊查询
    > ：大于
    < ：小于
    >= ：大于等于
    <= ：小于等于
```
- `belongsTo` - 属于，{ name: 'article_type', fkey: 'article_type_id', attrs: ['name->typeName'] } },
  - name:主表名
  - fkey:外键字段，关联主表的主键
  - attrs:需要关联查询出来的字段，   ->表示取别名 


## 参考

#### 网址

- [Vue.js 中文网](https://cn.vuejs.org/)
- [iView - 一套基于 Vue.js 的高质量 UI 组件库](https://www.iviewui.com/)
- [iview-admin](https://github.com/iview/iview-admin)



未完待续...



