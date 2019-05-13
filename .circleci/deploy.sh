#!/usr/bin/env bash

set -e
set -u

pkg_name=$(jq -r '.name' package.json)
pkg_version=$(jq -r '.version' package.json)

if [[ "$(git log -1 --pretty='%s')" == "${pkg_version}" ]]; then
  deploy_target="${pkg_name}:${pkg_version}"
  echo "TODO: deploy $deploy_target"
fi
