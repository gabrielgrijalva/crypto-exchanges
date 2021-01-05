# Changelog
All notable changes to this project will be documented in this file.

## [5.7.0] - 2021-01-04
### Changed
- Added new function to bitflyer rest api.

## [5.6.0] - 2020-12-07
### Changed
- Updated bybit endpoints.

## [5.5.0] - 2020-11-03
### Changed
- Corrected enpoint to huobi rest api.

## [5.4.0] - 2020-10-14
### Changed
- Added new enpoint to okex rest api.

## [5.3.0] - 2020-10-14
### Changed
- Added new enpoint to okex rest api.

## [5.2.0] - 2020-10-13
### Changed
- Corrected error in okex websocket api.

## [5.1.0] - 2020-10-02
### Changed
- Corrected error in bybit websocket api.

## [5.0.0] - 2020-10-02
### Added
- Added bybit api to index export module.

## [4.9.0] - 2020-10-02
### Changed
- Corrected error in bybit websocket api.

## [4.8.0] - 2020-10-02
### Added
- Implemented Bybit rest and websocket apis.

## [4.7.0] - 2020-10-02
### Changed
- Corrected error in kraken websocket api.

## [4.6.0] - 2020-10-01
### Changed
- Added extra endpoints to okex rest api.

## [4.5.0] - 2020-09-24
### Changed
- Corrected error in kraken futures.

## [4.4.0] - 2020-09-23
### Changed
- Corrected error in kraken futures.

## [4.3.0] - 2020-09-23
### Added
- Implemented kraken futures rest and websocket apis.

## [4.2.0] - 2020-09-18
### Changed
- Corrected error in binance coin futures websocket.

## [4.1.0] - 2020-09-14
### Changed
- Added binance coin futures api to main module exports.

## [4.0.0] - 2020-09-14
### Changed
- Added binance coin futures api wrapper.

## [3.9.0] - 2020-09-14
### Changed
- Added endpoint to huobi dm swap api.

## [3.8.0] - 2020-06-26
### Changed
- Added endpoint to huobi dm swap api.

## [3.7.0] - 2020-06-26
### Changed
- Changed bitmex rest api request to work with out api keys for public endpoints.

## [3.6.0] - 2020-05-18
### Changed
- Corrected error in binance ws when making user private connections.

## [3.5.0] - 2020-04-29
### Added
- Changed implementation for binance spot and futures websocket 
  connection to private account push messages.

## [3.4.1] - 2020-04-28
### Added
- Added binance futures rest and websocket modules to exportable index.

## [3.4.0] - 2020-04-28
### Added
- Added binance futures rest and websocket modules.

## [3.3.0] - 2020-04-17
### Added
- Added huobi dm swap rest and websocket modules.

## [3.2.0] - 2020-01-30
### Added
- Added bitstamp to exportable module.

## [3.1.1] - 2020-01-30
### Changed
- Corrected typo on exportable module.

## [3.1.0] - 2020-01-30
### Changed
- Added kraken public websocket api to exportable module.

## [3.0.0] - 2020-01-30
### Changed
- Implemented kraken public websocket api.
- Implemented bitstamp public websocket api.
- Implemented coinbase public websocket api.
- Implemented bitfinex public websocket api.

## [2.9.0] - 2020-01-30
### Changed
- Implemented binance websocket api.
- Corrected error in bitflyer websocket api comment.

## [2.8.0] - 2020-01-27
### Changed
- Corrected implementation errors in bitflyer websocket api.

## [2.7.0] - 2020-01-27
### Added 
- Changed bitflyer websocket api to optionally connect with authentication.

## [2.6.0] - 2020-01-07
### Added 
- Added operational functions to websocket client api.
- Added authentication functionality to websocket client api.

## [2.5.0] - 2019-11-27
### Added 
- Added remove event functions from bitmex websocket client.

### Changed
- When adding new functions to websocket events in bitmex websocket client, functions are also added
  to the connected websocket client.

## [2.4.4] - 2019-11-11
### Changed
- Changed public requests to authenticated requests in bitmex api to increase api rate limit.

## [2.4.3] - 2019-10-10
### Changed
- Changed api url endpoint for one forge module.

## [2.4.2] - 2019-10-01
### Changed
- Corrected Okex WS API path in export main module.

## [2.4.1] - 2019-10-01
### Added
- Added Okex WS API to export module.

## [2.4.0] - 2019-09-30
### Added
- Officially added OKEX REST API to the exchanges libraries and corrected existing errors.

## [2.3.0] - 2019-09-10
### Added
- Added OKEX REST API to the exchanges libraries.

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
