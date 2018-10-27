#!/usr/bin/env node

const PATH = require("path");
const FS = require("fs");
const CHILD_PROCESS = require("child_process");


// TODO: Look for '_#_sh.pinf_#_.inf.json' in parent dirs.
const rootInfPath = PATH.join(process.cwd(), "_#_sh.pinf_#_.inf.json");

if (!FS.existsSync(rootInfPath)) {
    throw new Error(`No '${PATH.basename(rootInfPath)}' file found at '${PATH.dirname(rootInfPath)}'!`);
}

let infPath = null;
try {
    infPath = require.resolve("../inf/inf.js");
} catch (err) {
    infPath = require.resolve("inf/inf.js");
}

const bootInfPath = PATH.join(PATH.dirname(rootInfPath), `.~${PATH.basename(rootInfPath)}~boot.inf.json`);
FS.writeFileSync(bootInfPath, `#!/usr/bin/env inf
{
    "//": "WARNING: Do NOT edit! This file is generated by ./${PATH.relative(PATH.dirname(bootInfPath), __filename)}!",
    "#": [
        "./${PATH.relative(PATH.dirname(bootInfPath), PATH.join(__dirname, '_#_org.pinf.genesis.inception_#_sh.pinf.0_.'))}",
        "./${PATH.relative(PATH.dirname(bootInfPath), rootInfPath).replace(/\.inf\.json$/, ".")}"
    ],
    "org.pinf.genesis.inception/sh.pinf.0 # boot()": {
        "args": "%%{args}%%"
    }
}`, "utf8");

CHILD_PROCESS.spawn("node", [
    infPath,
    PATH.basename(bootInfPath)
].concat(process.argv.slice(2)), {
    stdio: 'inherit',
    cwd: PATH.dirname(bootInfPath)
});
