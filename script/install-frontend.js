'use strict';

const path       = require('path');
const cwd        = process.cwd();
const fs         = require('fs');
const folderPath = path.join(cwd, 'web');
const exec       = require('child_process').exec;

const CMD_CLONE   = 'git clone git@github.com:zephyr-mo/socket-react-portal-web.git web';
const CMD_INSTALL = 'yarn';
const CMD_BUILD   = 'yarn build';

if (fs.existsSync(folderPath)) {
    console.info(`[sync] Package Exists . [${folderPath}]`);
    __install();
} else {
    console.info(`[sync] Package NOT exists [${folderPath}].`);
    console.info(`[sync] Start Clone from github`);
    console.info(`[sync] Running "${CMD_CLONE}"`);
    exec(CMD_CLONE, (err, stdout, stderr) => {
        if (err) {
            console.error(`[sync] ERROR: Clone . ${stderr}`);
        } else {
            console.log(`[sync] DONE: Clone . ${stdout}`);
        }
    })
}

function __install() {
    console.info(`[sycn] Start install Package...`);
    console.info(`[sync] Running "${CMD_INSTALL}"`);

    exec(`cd ${folderPath} && ${CMD_INSTALL} && ${CMD_BUILD}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`[sync] ERROR: install [${folderPath}]. ${stderr}`);
        } else {
            console.log(`[sync] DONE: install [${folderPath}]. ${stdout}`);
        }
    });
}