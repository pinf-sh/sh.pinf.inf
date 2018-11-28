sh.pinf.inf
===========

> The commandment that starts it all.

A **CLI** to call into the [org.pinf.genesis.inception](https://github.com/pinf/org.pinf.genesis.inception) toolchain.


Usage
-----

    nvm use 10
    npm install -g pinf

    echo '#!/usr/bin/env inf
    {
        "pinf @ sh.pinf.0 # genesis.inception": {
            "on": {
                "open": "echo 'Hello World!'"
            }
        }
    }' > _#_org.pinf_#_0_.inf.json

    pinf
