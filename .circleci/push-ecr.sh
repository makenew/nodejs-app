#!/usr/bin/env bash

set -e
set -u

apk add --quiet --no-cache py-pip
pip install --quiet awscli

docker_registry="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
docker_repo="${docker_registry}/${AWS_ECR_REPOSITORY}"

ecr_login="$(aws ecr get-login --no-include-email)"
${ecr_login}

. $(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/push.sh $docker_repo
