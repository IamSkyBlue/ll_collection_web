@echo off
set NODE_OPTIONS=--openssl-legacy-provider&&cd dist&&git init&&git add -A&&git commit -m 'deploy'&&git push -f https://github.com/IamSkyBlue/ll_collection_web.git master:gh-pages&&cd ..