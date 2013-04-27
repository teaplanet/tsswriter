#!/bin/sh
tsc --out ./out/slalom-projector.js ./ts/jquery.d.ts ./ts/svg.ts ./ts/slalom.ts ./ts/slalom-projector.ts

java -jar compiler.jar --js=./out/slalom-projector.js --js_output_file=./out/slalom-projector.min.js

