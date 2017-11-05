#!/bin/sh

cd ..
APPDIR=$PWD
if [ $# -gt 0 ]
then APPDIR=$1 && cd $APPDIR
fi
echo "======================="
echo "Deploying"
echo "======================="
$APPDIR/Client/scripts/deploy.sh $APPDIR/Client
echo "======================="
echo "Server app"
echo "======================="
$APPDIR/Server/scripts/deploy.sh $APPDIR/Server

