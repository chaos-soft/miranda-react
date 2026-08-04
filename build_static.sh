#!/bin/bash
rm -r dist
npm run build

sed -i '12d' dist/index.html
sed -i 's/crossorigin href="/href="./' dist/index.html

sed -i '/<\/noscript>/a <script type="module">\n\n<\/script>' dist/index.html
for file in dist/assets/index-*.js
do
    sed -i "/<script type=\"module\">/r ${file}" dist/index.html
done
