#!/usr/bin/env bash

set -e
set -u

pkg_name=$(jq -r '.name' package.json)
pkg_version=$(jq -r '.version' package.json)

if [[ "$(git log -1 --pretty='%s')" == "${pkg_version}" ]]; then
  if [[ -z "$(npm view ${pkg_name}@${pkg_version})" ]]; then
    npm publish --access public
    echo
    echo "> Published ${pkg_name}@${pkg_version}."
    echo
  else
    echo
    echo "> Already published ${pkg_name}@${pkg_version}."
    echo
  fi
else
  echo
  echo '> Nothing to publish: not a new version commit.'
  echo
fi
