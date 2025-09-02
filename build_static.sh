#!/bin/bash
rm -r dist
npm run build

sed -i '12d' dist/index.html
sed -i 's/crossorigin href="/href="./' dist/index.html

sed -i '/<noscript>/a <script>\n<\/script>' dist/index.html
for file in dist/assets/index-*.js
do
    sed -i "/<script>/r ${file}" dist/index.html
done
