'use strict';

const path       = require('path');
const cwd        = process.cwd();
const fs         = require('fs');
const folderPath = path.join(cwd, 'web');
const shell      = require('shelljs');     // 执行shell
const ora        = require('ora');         // 美化输出


const CMD_CLONE   = 'git clone git@github.com:zephyr-mo/mini-react-ssr.git web';
const CMD_INSTALL = 'yarn';
const CMD_BUILD   = 'yarn build';
const spinner     = ora();

if (fs.existsSync(folderPath)) {
    spinner.start(`[sync] Package Exists . [${folderPath}]`);
    __install();
} else {
    spinner.text = `[sync] Package NOT exists [${folderPath}].`;
    spinner.text = `[sync] Start Clone from github`;
    spinner.text = `[sync] Running "${CMD_CLONE}"`;
    shell.exec(CMD_CLONE, (err, stdout, stderr) => {
        if (err) {
            spinner.fail(`[sync] ERROR: Clone . ${stderr}`);
        } else {
            spinner.succeed(`[sync] DONE: Clone . ${stdout}`);
        }
    })
}

function __install() {
    spinner.start(`[sycn] Start install Package...`);
    spinner.text = `[sync] Running "${CMD_INSTALL}"`;

    spinner.text = '';
    shell.exec(`cd ${folderPath} && ${CMD_INSTALL} && ${CMD_BUILD}`, (err, stdout, stderr) => {
        if (err) {
            spinner.fail(`[sync] ERROR: install [${folderPath}]. ${stderr}`);
        } else {
            spinner.succeed(`[sync] DONE: install [${folderPath}]. ${stdout}`);
        }
    });
}