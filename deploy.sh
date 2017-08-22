#!/bin/bash
VERSION=v7
CURRENT_DIR=`basename $PWD`
BUILD_DIR=`mktemp`
DOCKER_TAG=illusionofpresence
SERVER=http://illusionofpresence.com

rm -rf $BUILD_DIR

echo "Building to $BUILD_DIR"
meteor build --architecture=os.linux.x86_64 --server=$SERVER --directory $BUILD_DIR

cp package.json $BUILD_DIR/bundle/
cp Dockerfile $BUILD_DIR/bundle/
cp .dockerignore $BUILD_DIR/bundle/
cd $BUILD_DIR/bundle/

echo "Building Dockerfile..."
docker build -t ${DOCKER_TAG}:${VERSION} . &&
docker tag -f ${DOCKER_TAG}:${VERSION} 946848322572.dkr.ecr.us-west-2.amazonaws.com/${DOCKER_TAG}:${VERSION} &&
docker push 946848322572.dkr.ecr.us-west-2.amazonaws.com/${DOCKER_TAG}:${VERSION}
