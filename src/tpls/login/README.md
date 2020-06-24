# 使用说明

## 使用步骤

1. 将`login`模块放入`src/tpl`目录下。

2. 在`taro-redux-app/src/app.tsx`中的`config.pages`加入需要引入的页面组件。
3. 根据项目实际需求修改配置文件，配置文件路径为`tpls/login/config.ts`。

## 目录结构

├── README.md
├── config.ts
├── index.ts
├── model.ts
├── pages
│   ├── login
│   │   ├── index.tsx
│   │   └── style.module.less
│   ├── regist
│   │   └── index.tsx
│   └── setPassword
│       └── index.tsx
├── plugin
│   └── slideVerification
│       ├── index.less
│       └── index.tsx
└── types
    ├── login.d.ts
    └── regist.ts

## 配置文件说明

### config 说明

| 配置项      | 配置说明                      |
| ----------- | ----------------------------- |
| login       | `login`登陆页面的相关配置     |
| regist      | `regist`注册页面的相关配置    |
| setPassword | `setPassword`设置密码相关配置 |

### `config.login`配置项

| 配置项             | 配置说明                                                     |
| ------------------ | ------------------------------------------------------------ |
| loginType          | 默认的登陆方式，可选值为`phone`、`username`分别代表手机验证码登陆和账号密码登陆。 |
| multipl            | 是否允许同时存在多种登陆方式，`true`表示允许切换登陆方式，`false`表示仅允许一种登陆方式。 |
| api                | 用来设置服务端api接口，api协议，api参数。以及api请求成功后数据存储的`model`值映射关系。里面的每一个`key`表示一种业务场景。 |
| api.userNameLogin  | 账号密码登陆设置。                                           |
| api.phoneCodeLogin | 短信验证码登陆设置。                                         |
| api.key.service    | `service`设置后端api接口所需的协议参数等。                   |
| api.key.model      | 可选参数，设置后端的api响应数据的存储位置。                  |

### `config.commonAPi`

设置模块内公用API的参数等。

## 如何拿到模块内数据进行存取？

### 如何存？

#### 自动存

例如登陆后需要存`token`，在`api`中的登陆配置项中设置`model`的值为`token`。完整路径为`config.login.api.userNameLogin.model='token'`。那么当后端数据返回时会自动存储到模块中。

#### 手动存

当想要在其他模块中修改目标模块的值时，导入目标模块的`setData()`方法。使用示例：`setData('name','张三')`。

### 如何取数据？

模块会暴露`getData`方法，当需要取数据时，导入目标模块的`getData`方法。使用示例：`getData('name')`。

## END

