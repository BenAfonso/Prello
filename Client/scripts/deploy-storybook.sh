cd ..
ROOTDIR=$PWD
if [ $# -gt 0 ]
then ROOTDIR=$1 && cd $ROOTDIR
fi
echo "======================="
echo "Deploying storybook"
echo "======================="
cd .storybook-build
GIT=`which git`
${GIT} add --all .
${GIT} commit -m "deploy"
${GIT} push dokku master
