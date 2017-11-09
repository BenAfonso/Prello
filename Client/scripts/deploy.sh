#!/bin/sh

cd ..
ROOTDIR=$PWD
if [ $# -gt 0 ]
then ROOTDIR=$1 && cd $ROOTDIR
fi
echo "======================="
echo "Deploying client app"
echo "======================="
GIT=`which git`
${GIT} add --all .
${GIT} commit -m "deploy"
${GIT} push dokku master
echo "======================="
echo "Building Storybook"
echo "======================="
yarn build-storybook && $ROOTDIR/scripts/deploy-storybook.sh $ROOTDIR


