# Node.js App Skeleton

[![npm](https://img.shields.io/npm/v/@makenew/nodejs-app.svg)](https://www.npmjs.com/package/@makenew/nodejs-app)
[![Docker](https://img.shields.io/docker/pulls/makenew/nodejs-app.svg)](https://hub.docker.com/r/makenew/nodejs-app)
[![Codecov](https://img.shields.io/codecov/c/github/makenew/nodejs-app.svg)](https://codecov.io/gh/makenew/nodejs-app)
[![CircleCI](https://img.shields.io/circleci/project/github/makenew/nodejs-app.svg)](https://circleci.com/gh/makenew/nodejs-app)

Package skeleton for a Node.js app.

## Description

Bootstrap a new Node.js app in five minutes or less.

### Features

- [Node.js]'s [npm] package structure.
- Fast, reliable, and secure dependency management with [Yarn].
- [Alpine Linux] based multi-stage [Docker] builds for optimized production images.
- Images tagged using package version and commit checksum.
- Images pushed to [Docker Hub], [Heroku], [Bintray] and the [Amazon EC2 Container Registry (ECR)].
- Configurable application lifecycle and middleware suite with [mlabs-koa].
- Standardized JSON logging with [mlabs-logger].
- Hierarchical application configuration with [confit].
- Centralized dependency injection with [Awilix].
- Health monitoring with [mlabs-health].
- Next generation JavaScript with [Babel].
- Examples with configurable options and arguments powered by [examplr].
- Linting with the [JavaScript Standard Style] and [JSON Lint].
- [Prettier] code.
- Automatically lint on changes with [gulp].
- Futuristic debuggable unit testing with [AVA].
- Code coverage reporting with [Istanbul], [nyc], and [Codecov].
- Continuous unit and smoke testing and deployment with [CircleCI].
- Profiling with [0x].
- [Keep a CHANGELOG].
- Consistent coding with [EditorConfig].
- Badges from [Shields.io].

[0x]: https://github.com/davidmarkclements/0x
[AVA]: https://github.com/avajs/ava
[Alpine Linux]: https://alpinelinux.org/
[Amazon EC2 Container Registry (ECR)]: https://aws.amazon.com/ecr/
[Awilix]: https://github.com/jeffijoe/awilix
[Babel]: https://babeljs.io/
[Bintray]: https://bintray.com/
[CircleCI]: https://circleci.com/
[Codecov]: https://codecov.io/
[Docker]: https://www.docker.com/
[Docker Hub]: https://hub.docker.com/
[EditorConfig]: https://editorconfig.org/
[Heroku]: https://www.heroku.com/
[Istanbul]: https://istanbul.js.org/
[JSON Lint]: https://github.com/zaach/jsonlint
[JavaScript Standard Style]: https://standardjs.com/
[Keep a CHANGELOG]: https://keepachangelog.com/
[Node.js]: https://nodejs.org/
[Prettier]: https://prettier.io/
[Shields.io]: https://shields.io/
[Yarn]: https://yarnpkg.com/
[confit]: https://github.com/krakenjs/confit
[gulp]: https://gulpjs.com/
[mlabs-health]: https://github.com/meltwater/mlabs-health
[mlabs-koa]: https://github.com/meltwater/mlabs-koa
[mlabs-logger]: https://github.com/meltwater/mlabs-logger
[npm]: https://www.npmjs.com/
[nyc]: https://github.com/istanbuljs/nyc

### Bootstrapping a new project

1. Create an empty (**non-initialized**) repository on GitHub.
2. Clone the master branch of this repository with
   ```
   $ git clone --single-branch git@github.com:makenew/nodejs-app.git <new-node-service>
   $ cd <new-node-service>
   ```
   Optionally, reset to the latest version with
   ```
   $ git reset --hard <version-tag>
   ```
3. Run
   ```
   $ ./makenew.sh
   ```
   This will replace the boilerplate, delete itself,
   remove the git remote, remove upstream tags,
   and stage changes for commit.
4. Create the required CircleCI environment variables with
   ```
   $ .circleci/envvars.sh
   ```
5. Review, commit, and push the changes to GitHub with
   ```
   $ git diff --cached
   $ git commit -m "Replace makenew boilerplate"
   $ git remote add origin git@github.com:<user>/<new-node-service>.git
   $ git push -u origin master
   ```
6. Ensure the CircleCI build passes,
   then publish the initial version of the package with
   ```
   $ nvm install
   $ yarn install
   $ npm version patch
   ```

### Updating from this skeleton

If you want to pull in future updates from this skeleton,
you can fetch and merge in changes from this repository.

Add this as a new remote with

```
$ git remote add upstream git@github.com:makenew/nodejs-app.git
```

You can then fetch and merge changes with

```
$ git fetch --no-tags upstream
$ git merge upstream/master
```

#### Changelog for this skeleton

Note that `CHANGELOG.md` is just a template for this skeleton.
The actual changes for this project are documented in the commit history
and summarized under [Releases].

[Releases]: https://github.com/makenew/nodejs-app/releases

## Usage

### Docker container

The service is distributed as a Docker container on Docker Hub.
To run locally, add configuration to `config/local.json`,
then pull and run the image with

```
$ docker run --read-only --init --publish 8080:8080 \
  --volume "$(pwd)/config/local.json:/usr/src/app/config/local.json" \
  makenew/nodejs-app
```

### Configuration

All available configuration options and their defaults are
defined in `config/default.json`.
Additionally, all configuration options
provided by [mlabs-koa][mlabs-koa config] are supported.

#### Config files

Configuration is loaded using [confit]
and available in `lib/dependencies.js` via `confit.get('foo:bar')`.
All static configuration is defined under `config`
and dynamic configuration in `server/config.js`.

The files `config/env.json` and `config/local.json`,
and the paths `config/env.d` and `config/local.d`
are excluded from version control.
The load order is `env.d/*.json`, `env.json`, `local.d/*.json`, and `local.json`.
Hidden files (dotfiles) are ignored.
In development, use these for local overrides and secrets.
In production, mount these inside the container to inject configuration.

#### Secrets

The (whitespace-trimmed) contents of each file in `config/secret.d` is
added to the config under the property `secret`
with a key equal to the filename.
Filenames should not contain a `.` and
hidden files (dotfiles) are ignored.

For example, to use the secret in `config/secret.d/foobar`,
reference it from another property like

```json
{
  "api": {
    "key": "config:secret.foobar"
  }
}
```

#### Environment variables

File-based configuration should always be preferred over environment variables,
however all environment variables are loaded into the config.

The only officially supported environment variables are
`LOG_ENV`, `LOG_SYSTEM`, `LOG_SERVICE`, and `LOG_LEVEL`.

[confit]: https://github.com/krakenjs/confit
[mlabs-koa config]: https://github.com/meltwater/mlabs-koa/tree/master/docs#config-and-middleware

## Installation

This app is also published as a package on [npm].

Add this as a dependency to your project using [npm] with

```
$ npm install @makenew/nodejs-app
```

or using [Yarn] with

```
$ yarn add @makenew/nodejs-app
```

[npm]: https://www.npmjs.com/
[Yarn]: https://yarnpkg.com/

## Development and Testing

### Quickstart

```
$ git clone https://github.com/makenew/nodejs-app.git
$ cd nodejs-app
$ nvm install
$ yarn install
```

Run each command below in a separate terminal window:

```
$ yarn run lint:watch
$ yarn run test:watch
$ yarn run server:watch
```

Primary development tasks are defined under `scripts` in `package.json`
and available via `yarn run`.
View them with

```
$ yarn run
```

### Source code

The [source code] is hosted on GitHub.
Clone the project with

```
$ git clone git@github.com:makenew/nodejs-app.git
```

[source code]: https://github.com/makenew/nodejs-app

### Requirements

You will need [Node.js] with [npm], [Yarn], and a [Node.js debugging] client.

Be sure that all commands run under the correct Node version, e.g.,
if using [nvm], install the correct version with

```
$ nvm install
```

Set the active version for each shell session with

```
$ nvm use
```

Install the development dependencies with

```
$ yarn install
```

[Node.js]: https://nodejs.org/
[Node.js debugging]: https://nodejs.org/en/docs/guides/debugging-getting-started/
[npm]: https://www.npmjs.com/
[nvm]: https://github.com/creationix/nvm
[Yarn]: https://yarnpkg.com/

#### CircleCI

_CircleCI should already be configured: this section is for reference only._

The following environment variables must be set on [CircleCI].
These may be set manually or by running the script `./circleci/envvars.sh`.

##### npm

- `NPM_TOKEN`: npm token for installing and publishing packages.
- `NPM_TEAM`: npm team to grant read-only package access
  (format `org:team`, optional).

##### Codecov

If set, [CircleCI] will send code coverage reports to [Codecov].

- `CODECOV_TOKEN`: Codecov token for uploading coverage reports.

##### Docker Hub

If set, [CircleCI] will build, tag, and push images to [Docker Hub].

- `DOCKERHUB_REPOSITORY`: Docker Hub repository name.
- `DOCKERHUB_USERNAME`: Docker Hub username.
- `DOCKERHUB_PASSWORD`: Docker Hub password.

##### Bintray

If set, [CircleCI] will build, tag, and push images to [Bintray].

- `BINTRAY_REGISTRY`: Bintray registry name.
- `BINTRAY_REPOSITORY`: Bintray repository name.
- `BINTRAY_USERNAME`: Bintray username.
- `BINTRAY_PASSWORD`: Bintray password (your API key).

##### Amazon EC2 Container Registry (ECR)

If set, [CircleCI] will build, tag, and push images to [Amazon ECR].

- `AWS_ECR_REPOSITORY`: Amazon ECR repository name.
- `AWS_ACCOUNT_ID`: Amazon account ID.
- `AWS_DEFAULT_REGION`: AWS region.
- `AWS_ACCESS_KEY_ID`: AWS access key ID.
- `AWS_SECRET_ACCESS_KEY`: AWS secret access key.

##### Heroku

If set, [CircleCI] will deploy images built from master directly to [Heroku].

- `HEROKU_APP`: Heroku application name.
- `HEROKU_TOKEN`: Heroku authentication token.

[Amazon ECR]: https://aws.amazon.com/ecr/
[Bintray]: https://bintray.com/
[CircleCI]: https://circleci.com/
[Codecov]: https://codecov.io/
[Docker Hub]: https://hub.docker.com/
[Heroku]: https://www.heroku.com/

#### GitHub Actions

*GitHub Actions should already be configured: this section is for reference only.*

The following secrets must be set on the GitHub repo.

- `GPG_PRIVATE_KEY`: The [GPG private key].
- `GPG_PASSPHRASE`: The GPG key passphrase.
- `GIT_USER_NAME`: The name to set for Git commits.
- `GIT_USER_EMAIL`: The email to set for Git commits.

[GPG private key]: https://github.com/marketplace/actions/import-gpg#prerequisites

### Development tasks

Primary development tasks are defined under `scripts` in `package.json`
and available via `yarn run`.
View them with

```
$ yarn run
```

#### Production build

Lint, test, and transpile the production build to `dist` with

```
$ yarn run dist
```

##### Publishing a new release

Release a new version using [`npm version`][npm version].
This will run all tests, update the version number,
create and push a tagged commit,
trigger CircleCI to publish the new version to npm,
and build and push a tagged container to all configured registries.

New versions are released when the commit message is a valid version number,
and versions are only published on release branches:
`master` branch or any branch matching `ver/*`.

Publishing may be triggered using on the web
using a [workflow_dispatch on GitHub Actions].

[npm version]: https://docs.npmjs.com/cli/version
[workflow_dispatch on GitHub Actions]: https://github.com/makenew/nodejs-app/actions?query=workflow%3Aversion

#### Server

Run the server locally with

```
$ yarn run server
```

Run a server that will restart on changes with

```
$ yarn run server:watch
```

##### Development logging

Logging output may be configured according to the
[`log` config](https://github.com/meltwater/mlabs-koa/tree/master/docs#log)
and [koa `logger` config](https://github.com/meltwater/mlabs-koa/tree/master/docs#logger).

- Use `koa.logger.useDev` to toggle between the simple Koa development logger
  and the more verbose Koa production logger.
- Use `log.outputMode` and `log.filter` to control log output.
  Override using `LOG_OUTPUT_MODE` and `LOG_FILTER`.
- Define additional log filters in `server/filters.js`.

For example, this config will provide more verbose logging while
hiding all lifecycle events:

```json
{
  "log": {
    "level": "debug",
    "filter": "noLifecycle",
    "outputMode": "long"
  },
  "koa": {
    "logger": {
      "useDev": false
    }
  }
}
```

##### Debugging the server

Start a debuggable server with

```
$ yarn run server:inspect
```

Run a debuggable server that will restart on changes with

```
$ yarn run server:inspect:watch
```

#### Examples

**See the [full documentation on using examples](./examples).**

View all examples with

```
$ yarn run example
```

#### Linting

Linting against the [JavaScript Standard Style] and [JSON Lint]
is handled by [gulp].

View available commands with

```
$ yarn run gulp --tasks
```

Run all linters with

```
$ yarn run lint
```

In a separate window, use gulp to watch for changes
and lint JavaScript and JSON files with

```
$ yarn run watch
```

Automatically fix most JavaScript formatting errors with

```
$ yarn run format
```

[gulp]: https://gulpjs.com/
[JavaScript Standard Style]: https://standardjs.com/
[JSON Lint]: https://github.com/zaach/jsonlint

#### Tests

Unit and integration testing is handled by [AVA]
and coverage is reported by [Istanbul] and uploaded to [Codecov].

- Test files end in `.spec.js`.
- Unit tests are placed under `lib` alongside the tested module.
- Integration tests are placed in `test`.
- Smoke tests are placed in `test` and end in `.test.js`.
- Static files used in tests are placed in `fixtures`.

Watch and run tests on changes with

```
$ yarn run test:watch
```

If using [AVA snapshot testing], update snapshots with

```
$ yarn run test:update
```

Generate a coverage report with

```
$ yarn run report
```

An HTML version will be saved in `coverage`.

##### Debugging tests

Create a breakpoint by adding the statement `debugger` to the test
and start a debug session with, e.g.,

```
$ yarn run test:inspect test/server.spec.js
```

Watch and restart the debugging session on changes with

```
$ yarn run test:inspect:watch test/server.spec.js
```

##### Smoke tests

Smoke tests make network requests directly against the service
(running with `NODE_ENV=test`).
On CircleCI, the tests run against the built container.

To run smoke tests locally, start a test server with

```
$ yarn run server:test
```

and run the tests with

```
$ yarn run test:smoke
```

or update the test snapshots with

```
$ yarn run test:smoke:update
```

Refer to the full list of scripts for additional watch and debug modes.

[AVA]: https://github.com/avajs/ava
[AVA snapshot testing]: https://github.com/avajs/ava#snapshot-testing
[Codecov]: https://codecov.io/
[Istanbul]: https://istanbul.js.org/

### Docker

The production Docker image is built on CircleCI from `.circleci/Dockerfile`:
this Dockerfile can only be used with the CircleCI workflow.

In rare cases, building an equivalent container locally may be useful.
First, export a valid `NPM_TOKEN` in your environment,
then build and run this local container with

```
$ docker build --build-arg=NPM_TOKEN=$NPM_TOKEN -t makenew/nodejs-app .
$ docker run --read-only --init --publish 80:8080 makenew/nodejs-app
```

## Contributing

Please submit and comment on bug reports and feature requests.

To submit a patch:

1. Fork it (https://github.com/makenew/nodejs-app/fork).
2. Create your feature branch (`git checkout -b my-new-feature`).
3. Make changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin my-new-feature`).
6. Create a new Pull Request.

## License

This service is licensed under the MIT license.

## Warranty

This software is provided by the copyright holders and contributors "as is" and
any express or implied warranties, including, but not limited to, the implied
warranties of merchantability and fitness for a particular purpose are
disclaimed. In no event shall the copyright holder or contributors be liable for
any direct, indirect, incidental, special, exemplary, or consequential damages
(including, but not limited to, procurement of substitute goods or services;
loss of use, data, or profits; or business interruption) however caused and on
any theory of liability, whether in contract, strict liability, or tort
(including negligence or otherwise) arising in any way out of the use of this
software, even if advised of the possibility of such damage.
