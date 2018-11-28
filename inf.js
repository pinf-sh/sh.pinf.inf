
'use strict';

exports.inf = async function (inf) {

    let config = null;

    return {

        invoke: async function (pointer, value) {

            if (pointer === "genesis.inception") {

                config = value.value;

                return true;
            } else
            if (pointer === "boot()") {

                if (!config) {
                    return true;
                }

                const command = inf.options._[0] || "turn";

                if (
                    !config.on ||
                    !config.on[command]
                ) {
                    throw new Error(`'on.${command}' property not set for 'genesis.inception' pointer!`);
                }

                const path = inf.LIB.PATH.join(value.baseDir, `.~sh.pinf.inf~ginseng.genesis.inception~${command}.sh`);

                await inf.LIB.FS.outputFileAsync(path, `#!/usr/bin/env bash\n${config.on[command]}`, "utf8");
                await inf.LIB.FS.chmodAsync(path, '0755');

                await new inf.LIB.Promise(function (resolve, reject) {

                    const proc = inf.LIB.CHILD_PROCESS.spawn(path, [], {
                        stdio: 'inherit',
                        cwd: value.baseDir
                    });
                    proc.on('error', reject);
                    proc.on('close', function (code) {
                        if (code !== 0) {
                            resolve(false);
                            return;
                        }
                        resolve(true);
                    });
                });

                inf.stopProcessing();

                return true;
            }
        }
    };
}
