# code-generation

> 利用node自动生成页面代码，并自动注册路由

## Using

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# using command generation code
npm run create:code

```

## Using description

#### 1、复制`gnerationScript`文件夹到你所在项目的根路径下

#### 2、在所在项目的`package.json`文件的`scripts`中添加以下命令

```bash
"create:code": "node gnerationScript/generateCode.js",

"gitpush": "node gnerationScript/gitpush.js"
```

#### 3、在你所在的项目根路径下打开终端执行：`create:code`

```bash
npm run create:code
```

输入你要生成的组件名称后，会自动在src/views目录下创建一个该组件的文件夹和.vue、.js、.less文件。


> #### <font color=red>注意：所输入的组件名称中不能含有$字符，且必须指定一种代码生成模板，格式如下</font>

```bash
<componentName>$<templateName>

# demo
codeList$Init
```

#### 4、根据自己的项目可以在`gnerationScript/template`文件夹下去定义vue、js或者是less文件的生成模板

#### 5、根据自己项目的目录结构，可以在`gnerationScript/path/index.js`中配置生成的目标路径

#### 6、在你所在的项目根路径下打开终端执行：`gitpush`

```
npm run gitpush
```
这个命令可以一键提交代码并推送到远程，内部集成命令为：
```
git add -A
git commit -m '你输入的提交备注'
git pull
git push
git pull -r
```
> #### <font color=red>注意：如果`git pull`在拉取远程代码时出现冲突，程序会自动终止，这时候需要手动解决冲突后再次提交</font>


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
