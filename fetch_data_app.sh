# bin/bash

rm -rf html
rm -rf xslt
rm -rf build_app
rm aad-app-dev.zip
rm -rf aad-app-dev
wget https://github.com/auden-in-austria-digital/aad-app/archive/refs/heads/dev.zip
unzip dev
mv aad-app-dev/*.* ./
mv aad-app-dev/xslt/ ./xslt
mv aad-app-dev/html/ ./html
mv aad-app-dev/build_app/ ./build_app
rm -rf aad-app-dev
rm dev.zip
