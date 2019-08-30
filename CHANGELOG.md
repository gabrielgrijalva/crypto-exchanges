# Changelog
All notable changes to this project will be documented in this file.

## [2.2.2] - 2019-08-29
### Changed
- Corrected error from Huobi DM REST API, did not return corresponding body when an error occurred.

## [2.2.1] - 2019-08-29
### Added
- Added handler to bitmex REST API with a ratelimit threshold.

### Changed
- Changed makeRequest functionality to return the whole response object.

## [2.2.0] - 2019-08-15
### Changed
- Corrected accumulation function error when executing multiple times "connect" function
  from the same instance. Correction made in BITFLYER, BITMEX and HUOBI DM exchanges APIs.

## [2.1.8] - 2019-07-29
### Added
- Created 1FORGE REST API interface module.

## [2.1.7] - 2019-07-25
### Added
- Added new enpoint to BITFLYER REST API interface.

## [2.1.6] - 2019-07-23
### Added
- Created BITFLYER WS API wrapper.

### Changed
- Modified the structure of BITFLYER module.

## [2.1.5] - 2019-07-15
### Added
- Added new enpoint to BITMEX REST API to load candles history.

## [2.1.4] - 2019-07-13
### Changed
- Added pending commits from previous version fix.

## [2.1.3] - 2019-07-13
### Changed
- Changed error handling on HUOBI DM REST API. Errors were returned as a successfull responses. Now errors are thrown.

## [2.1.2] - 2019-07-12
### Changed
- Corrected error on BITMEX websocket connection that happened when "diconnect" function was executed.

## [2.1.1] - 2019-07-04
### Changed
- Modified the importing and exporting interface of all modules.

## [2.1.0] - 2019-07-04
### Changed
- Modified the importing and exporting interface of all modules.

## [2.0.1] - 2019-07-04
### Added
- New keywords to the package.json file.

### Changed
- Modified the package.json file description.

## [2.0.0] - 2019-07-04
### Added
- Created BITMEX WS API wrapper.
- Created HUOBI DM WS API wrapper.

### Changed
- Modified the structure of modules for BITMEX and HUOBI DM.
- Modified the importing interface of modules for BITMEX and HUOBI DM.

### Pending
- Create BINANCE WS API wrapper.
- Create BITFLYER WS API wrapper.

## [1.0.2] - 2019-07-03
### Added
- Created index.js file to export modules.

### Changed
- Modified the package.json file to publish to npm registry.

## [1.0.1] - 2019-07-02
### Added
- Added CHANGELOG file.

## [1.0.0] - 2019-07-02
### Added
- Created BINANCE REST API wrapper.
- Created BITFLYER REST API wrapper.
- Created BITMEX REST API wrapper.
- Created HUOBI-DM REST API wrapper.
