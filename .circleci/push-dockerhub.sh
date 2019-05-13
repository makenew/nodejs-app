#!/usr/bin/env bash

set -e
set -u

docker_repo="${DOCKERHUB_REPOSITORY}"

docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD

. $(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/push.sh $docker_repo

