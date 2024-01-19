#!/bin/bash

### Publish script for debugee-web to deploy .tar.gz to server
# BEFORE USE: dependencies required: jq
#
###

#save current path
ROOT_WORK_DIR=$(pwd)
PACKAGE_VERSION=$(jq -r .version package.json)

echo "Full path is $ROOT_WORK_DIR"
echo "Package version: $PACKAGE_VERSION"

#goto dist
echo "Changing work directory to 'dist'"
cd dist || echo "Missing 'dist', build project with package manager!"
pwd
ls

#tar
echo "Taring 'dist'..."
tar -czvf web-debugee.tar.gz debugee-web || echo "Failed to tar"
ls

#scp
scp web-debugee.tar.gz hrvoje@20.82.136.123:~/.web-deploy || echo "Failed to scp"

#run remote deployment script
# TODO: nohup java -jar -Dspring.profiles.active=prod backend-0.0.1-SNAPSHOT.jar > be.log 2>&1 &
ssh hrvoje@20.82.136.123 "/home/hrvoje/web-deploy.sh"


#delete local tar
rm web-debugee.tar.gz
cd "$ROOT_WORK_DIR" || echo "This really should not have failed..."
