const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const resolve = ( ...file ) => path.resolve(__dirname, ...file);
const log = message => console.log(chalk.green(`${ message }`));
const successLog = message => console.log(chalk.blue(`${ message }`));
const errorLog = error => console.log(chalk.red(`${ error }`));
log('请输入提交备注');
let componentName = '';
process.stdin.on('data', async chunk => {
  const inputName = String(chunk).trim().toString();
  log('正在添加文件...');
  shell.exec('git add -A');
  log('正在提交文件...');
  shell.exec(`git commit -m ${ inputName }`);
  log('正在获取远程最新代码...');
  if (shell.exec('git pull').code !== 0) {
    errorLog('远程拉取错误，请手动解决冲突后重试！');
    shell.exit(1);
  }
  log('正在向远程推送...');
  shell.exec('git push');
  log('正在获取远程最新代码...');
  shell.exec('git pull -r');
  process.stdin.emit('end');
});
process.stdin.on('end', () => {
  log('完成');
  process.exit();
});

