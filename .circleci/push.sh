#!/usr/bin/env bash

set -e
set -u

docker_repo=$1

pkg_version=$(jq -r '.version' package.json)

if [[ "${CIRCLE_JOB:-push}" == 'push-ci' ]]; then
  docker_tag="ci.${CIRCLE_SHA1:-latest}"
  docker tag $APP_NAME "${docker_repo}:${docker_tag}"
  docker push "${docker_repo}:${docker_tag}"
  echo
  echo "> Pushed ${docker_repo}:${docker_tag}"
  echo
fi

docker tag $APP_NAME "${docker_repo}:latest"
docker tag $APP_NAME "${docker_repo}:${pkg_version}"

if [[ "$(git log -1 --pretty='%s')" == "${pkg_version}" ]]; then
  docker push "${docker_repo}:${pkg_version}"
  echo
  echo "> Pushed ${docker_repo}:${pkg_version}"
  echo
fi

if [[ "${CIRCLE_BRANCH:-master}" == 'master' && \
      "${CIRCLE_JOB:-push}" == 'push' ]]; then
  docker push "${docker_repo}:latest"
  echo
  echo "> Pushed ${docker_repo}:latest"
  echo
fi
