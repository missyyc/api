#!/bin/bash

package=`date '+fox-%Y-%m-%d--%H-%M.tar.gz'`
echo $package

git -C $TRAVIS_BUILD_DIR log -10 > build/_version
echo "$package" > build/_pack
echo "$package"


cp -R front/web build/

mkdir build/_bin
cp -R portal/conf build/_bin/
mv build/_bin/conf/app.prod.conf build/_bin/conf/app.conf
cp $GOPATH/bin/portal build/_bin/

echo -n 'tar ...'
tar czvf $package build
echo ' [done]'


ls -lh build/
ls -lh $package

echo -n 'upload ...'
curl -T $package -e 'upload-57d6ce1e-e41e-4bc1-afe4-f6413159cd74' -H 'Host: om-deploy.sh1a.qingstor.com' 'http://hk.opsmind.com/'
echo ' [done]'

rm -rf _bin
