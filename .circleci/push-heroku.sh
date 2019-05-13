#!/usr/bin/env bash

set -e
set -u

docker_registry='registry.heroku.com'
docker_repo="${docker_registry}/${HEROKU_APP}/web"

if [[ "${CIRCLE_BRANCH:-master}" == 'master' ]]; then
  docker login -u _ -p $HEROKU_TOKEN $docker_registry
  docker tag $APP_NAME $docker_repo
  docker push $docker_repo
  echo
  echo "> Pushed ${docker_repo}"
  echo
fi
