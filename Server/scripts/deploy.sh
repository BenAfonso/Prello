#!/bin/sh

if [ $# -gt 0 ]
then ROOTDIR=$1 && cd $ROOTDIR
fi
echo "======================="
echo "Deploying server app"
echo "======================="
GIT=`which git`
${GIT} add --all .
${GIT} commit -m "deploy"
${GIT} push dokku master
