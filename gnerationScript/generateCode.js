const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const resolve = ( ...file ) => path.resolve(__dirname, ...file);
const log = message => console.log(chalk.yellow(`${ message }`));
const successLog = message => console.log(chalk.green(`${ message }`));
const errorLog = error => console.log(chalk.red(`${ error }`));
//引入组件生成的目标路径
const component = require('./path');
//引入js模板
const jsTemp = require('./template/jsTemplate');
const vueTemp = require('./template/vueTemplate');

//代码生成工具函数
const vueTemplate = ( compoenntName, tempName = 'Init' ) => {
  if (vueTemp[ tempName ]) {
    return vueTemp[ tempName ](compoenntName)
  } else {
    errorLog("未找到" + tempName + "对应的Vue模板");
    return false;
  }
};

const jsTemplate = ( compoenntName, tempName = 'Init' ) => {
  if (jsTemp[ tempName ](compoenntName)) {
    return jsTemp[ tempName ](compoenntName)
  } else {
    errorLog("未找到" + tempName + "对应的Js模板");
    return false;
  }
};

const lessTemplate = compoenntName => {
  return `.${ compoenntName } {
  
}
`
};

const generateFile = ( path, data ) => {
  if (fs.existsSync(path)) {
    errorLog(`${ path }文件已存在`);
    return
  }
  return new Promise(( resolve, reject ) => {
    fs.writeFile(path, data, 'utf8', err => {
      if (err) {
        errorLog(err.message);
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
};

log('请输入要生成的组件名称，例如：codeList$Init');
let componentName = '';
process.stdin.on('data', async chunk => {
  const name = String(chunk).trim().toString();
  const nameArr = name.split('$');
  if (name.indexOf('$') == '-1') {
    errorLog("未指定生成模板，请输入正确格式的名称");
    process.stdin.emit('end')
  }
  if (nameArr.length - 1 != '1') {
    errorLog("生成组件名称中不能带有$符号，请输入正确格式的名称");
    process.stdin.emit('end')
  }
  const inputName = nameArr[ 0 ];
  const tempName = nameArr[ 1 ];
  if (!vueTemp[ tempName ]) {
    errorLog(tempName + "Vue模版未定义");
    process.stdin.emit('end')
  }
  if (!jsTemp[ tempName ]) {
    errorLog(tempName + "Js模版未定义");
    process.stdin.emit('end')
  }
  //公共组件路径
  const componentDirectory = resolve(component, inputName);
  //生成vue模板
  const componentVueName = resolve(componentDirectory, `${ inputName }.vue`);
  //生成js
  const entryComponentName = resolve(componentDirectory, `${ inputName }.js`);
  //生成less
  const componentStyleName = resolve(componentDirectory, `${ inputName }.less`);

  const hasComponentDirectory = fs.existsSync(componentDirectory);
  if (hasComponentDirectory) {
    errorLog(`${ inputName }组件目录已存在，请重新输入`);
    return
  } else {
    log(`正在生成 component 目录 ${ componentDirectory }`);
    await dotExistDirectoryCreate(componentDirectory)
  }
  try {
    if (inputName.includes('/')) {
      const inputArr = inputName.split('/');
      componentName = inputArr[ inputArr.length - 1 ];
    } else {
      componentName = inputName;
    }
    log(`正在生成 vue 文件 ${ componentVueName }`);
    await generateFile(componentVueName, vueTemplate(componentName, tempName));
    log(`正在生成 js 文件 ${ entryComponentName }`);
    await generateFile(entryComponentName, jsTemplate(componentName, tempName));
    log(`正在生成 less 文件 ${ componentStyleName }`);
    await generateFile(componentStyleName, lessTemplate(componentName));
    successLog('模板创建完成！请前往对应目录进行开发...');
  } catch (e) {
    errorLog(e.message)
  }
  process.stdin.emit('end')
});
process.stdin.on('end', () => {
  process.exit()
});

function dotExistDirectoryCreate( directory ){
  return new Promise(( resolve ) => {
    mkdirs(directory, function (){
      resolve(true)
    })
  })
}

// 递归创建目录
function mkdirs( directory, callback ){
  var exists = fs.existsSync(directory);
  if (exists) {
    callback()
  } else {
    mkdirs(path.dirname(directory), function (){
      fs.mkdirSync(directory);
      callback();
    })
  }
}
