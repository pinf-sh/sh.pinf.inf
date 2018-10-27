
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

                const command = inf.options._[0] || "open";

                if (
                    !config.commands ||
                    !config.commands[command]
                ) {
                    throw new Error(`'commands.${command}' property not set for 'genesis.inception' pointer!`);
                }

                const path = inf.LIB.PATH.join(value.baseDir, `.~sh.pinf.inf~ginseng.genesis~${command}.sh`);

                await inf.LIB.FS.outputFileAsync(path, `#!/usr/bin/env bash\n${config.commands[command]}`, "utf8");
                await inf.LIB.FS.chmodAsync(path, '0755');

                inf.LIB.CHILD_PROCESS.spawn(path, [], {
                    stdio: 'inherit',
                    cwd: value.baseDir
                });

                return true;
            }
        }
    };
}
