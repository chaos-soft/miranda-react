#!/bin/bash
rm -r dist
npm run build
sed -i 's/\/assets/assets/' dist/index.html
ssh polina 'rm -r ~/python/velvet/store/miranda'
scp -pr dist/* polina:~/python/velvet/store/miranda
