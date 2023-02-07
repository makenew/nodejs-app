# Node.js App Skeleton

[![npm](https://img.shields.io/npm/v/@makenew/nodejs-app.svg)](https://www.npmjs.com/package/@makenew/nodejs-app)
[![GitHub Actions](https://github.com/makenew/nodejs-app/actions/workflows/check.yml/badge.svg)](https://github.com/makenew/nodejs-app/actions/workflows/check.yml)

Package skeleton for a Node.js app.

## Description

Bootstrap a new Node.js app in five minutes or less.

### Features

- [Node.js] native [ECMAScript module] with [npm] package structure.
- Package management with [npm].
- [Alpine Linux] based multi-stage [Docker] builds for optimized production images.
- Images tagged using package version and commit checksum.
- Images pushed to [GitHub Container Registry].
- Configurable application lifecycle and middleware suite with [mlabs-koa].
- Standardized JSON logging with [mlabs-logger].
- Hierarchical application configuration with [confit].
- Centralized dependency injection with [Awilix].
- Health monitoring with [mlabs-health].
- Examples with configurable options and arguments powered by [examplr].
- Linting with the [JavaScript Standard Style] using [ESLint].
- [Prettier] code.
- Futuristic debuggable unit testing with [AVA].
- Code coverage reporting with [Istanbul] and [c8].
- Continuous testing and package publishing with [GitHub Actions].
- [Keep a CHANGELOG].
- Consistent coding with [EditorConfig].
- Badges from [Shields.io].

[AVA]: https://github.com/avajs/ava
[Alpine Linux]: https://alpinelinux.org/
[Awilix]: https://github.com/jeffijoe/awilix
[Docker]: https://www.docker.com/
[ECMAScript module]: https://nodejs.org/api/esm.html
[ESLint]: https://eslint.org/
[EditorConfig]: https://editorconfig.org/
[GitHub Actions]: https://github.com/features/actions
[GitHub Container Registry]: https://github.com/features/packages
[Istanbul]: https://istanbul.js.org/
[JavaScript Standard Style]: https://standardjs.com/
[Keep a CHANGELOG]: https://keepachangelog.com/
[Node.js]: https://nodejs.org/
[Prettier]: https://prettier.io/
[Shields.io]: https://shields.io/
[c8]: https://github.com/bcoe/c8
[confit]: https://github.com/krakenjs/confit
[examplr]: https://github.com/meltwater/node-examplr
[mlabs-health]: https://github.com/meltwater/mlabs-health
[mlabs-koa]: https://github.com/meltwater/mlabs-koa
[mlabs-logger]: https://github.com/meltwater/mlabs-logger
[npm]: https://www.npmjs.com/

### Bootstrapping a new project

1. Create an empty (**non-initialized**) repository on GitHub.
2. Clone the main branch of this repository with
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
4. Create the required GitHub repository secrets
5. Review, commit, and push the changes to GitHub with
   ```
   $ git diff --cached
   $ git commit -m "Replace makenew boilerplate"
   $ git remote add origin git@github.com:<user>/<new-node-service>.git
   $ git push -u origin main
   ```
6. Ensure the GitHub action passes,
   then publish the initial version of the package with
   ```
   $ nvm install
   $ npm install
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
$ git merge upstream/main
```

#### Changelog for this skeleton

Note that `CHANGELOG.md` is just a template for this skeleton.
The actual changes for this project are documented in the commit history
and summarized under [Releases].

[Releases]: https://github.com/makenew/nodejs-app/releases

## Usage

### Docker container

The service is distributed as a Docker container on GitHub Container Registry.
To run locally, add configuration to `config/local.json`,
then pull and run the image with

```
$ docker run --read-only --init --publish 8080:8080 \
  --volume "$(pwd)/config/local.json:/usr/src/app/config/local.json" \
  ghcr.io/makenew/nodejs-app
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
[mlabs-koa config]: https://github.com/meltwater/mlabs-koa/tree/main/docs#config-and-middleware

## Installation

This app is also published as a package on [npm].

Add this as a dependency to your project using [npm] with

```
$ npm install @makenew/nodejs-app
```

[npm]: https://www.npmjs.com/

## Development and Testing

### Quickstart

```
$ git clone https://github.com/makenew/nodejs-app.git
$ cd nodejs-app
$ nvm install
$ npm install
```

Run each command below in a separate terminal window:

```
$ npm run test:watch
$ npm run server:watch
```

Primary development tasks are defined under `scripts` in `package.json`
and available via `npm run`.
View them with

```
$ npm run
```

### Source code

The [source code] is hosted on GitHub.
Clone the project with

```
$ git clone git@github.com:makenew/nodejs-app.git
```

[source code]: https://github.com/makenew/nodejs-app

### Requirements

You will need [Node.js] with [npm], and a [Node.js debugging] client.

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
$ npm install
```

[Node.js]: https://nodejs.org/
[Node.js debugging]: https://nodejs.org/en/docs/guides/debugging-getting-started/
[npm]: https://www.npmjs.com/
[nvm]: https://github.com/creationix/nvm

### Publishing

Use the [`npm version`][npm-version] command to release a new version.
This will push a new git tag which will trigger a GitHub action.

Publishing may be triggered using a [workflow_dispatch on GitHub Actions].

[npm-version]: https://docs.npmjs.com/cli/version
[workflow_dispatch on GitHub Actions]: https://github.com/makenew/nodejs-app/actions?query=workflow%3Aversion

## GitHub Actions

_GitHub Actions should already be configured: this section is for reference only._

The following repository secrets must be set on [GitHub Actions]:

- `NPM_TOKEN`: npm token for installing and publishing packages.
- `GH_USER`: The GitHub user's username to pull and push containers.
- `GH_TOKEN`: A personal access token for the user to pull and push containers.

These must be set manually.

### Secrets for Optional GitHub Actions

The version and format GitHub actions
require a user with write access to the repository
including access to read and write packages.
Set these additional secrets to enable the action:

- `GH_TOKEN`: A personal access token for the user.
- `GIT_USER_NAME`: The GitHub user's real name.
- `GIT_USER_EMAIL`: The GitHub user's email.
- `GPG_PRIVATE_KEY`: The GitHub user's [GPG private key].
- `GPG_PASSPHRASE`: The GitHub user's GPG passphrase.

[GitHub Actions]: https://github.com/features/actions
[GPG private key]: https://github.com/marketplace/actions/import-gpg#prerequisites

#### Server

Run the server locally with

```
$ npm run server
```

Run a server that will restart on changes with

```
$ npm run server:watch
```

##### Development logging

Logging output may be configured according to the
[`log` config](https://github.com/meltwater/mlabs-koa/tree/main/docs#log)
and [koa `logger` config](https://github.com/meltwater/mlabs-koa/tree/main/docs#logger).

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
$ npm run server:inspect
```

Run a debuggable server that will restart on changes with

```
$ npm run server:inspect:watch
```

#### Examples

**See the [full documentation on using examples](./examples).**

View all examples with

```
$ npm run example
```

#### Linting

Linting is against the [JavaScript Standard Style] and [JSON Lint].

Run all linters with

```
$ npm run lint
```

Automatically fix most JavaScript formatting errors with

```
$ npm run format
```

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
$ npm run test:watch
```

If using [AVA snapshot testing], update snapshots with

```
$ npm run test:update
```

Generate a coverage report with

```
$ npm run report
```

An HTML version will be saved in `coverage`.

##### Debugging tests

Create a breakpoint by adding the statement `debugger` to the test
and start a debug session with, e.g.,

```
$ npm run test:inspect test/server.spec.js
```

Watch and restart the debugging session on changes with

```
$ npm run test:inspect:watch test/server.spec.js
```

##### Smoke tests

Smoke tests make network requests directly against the service
(running with `NODE_ENV=test`).
On GitHub Actions, the tests run against the built container.

To run smoke tests locally, start a test server with

```
$ npm run server:test
```

and run the tests with

```
$ npm run test:smoke
```

or update the test snapshots with

```
$ npm run test:smoke:update
```

Refer to the full list of scripts for additional watch and debug modes.

[AVA]: https://github.com/avajs/ava
[AVA snapshot testing]: https://github.com/avajs/ava#snapshot-testing
[Codecov]: https://codecov.io/
[Istanbul]: https://istanbul.js.org/

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
