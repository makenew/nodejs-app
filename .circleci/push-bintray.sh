#!/usr/bin/env bash

set -e
set -u

docker_registry="${BINTRAY_REGISTRY}.bintray.io"
docker_repo="${docker_registry}/${BINTRAY_REPOSITORY}"

docker login -u $BINTRAY_USERNAME -p $BINTRAY_PASSWORD $docker_registry

. $(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/push.sh $docker_repo
