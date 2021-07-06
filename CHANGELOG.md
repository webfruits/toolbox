<img src="https://webfruits.io/assets/wf-small-toolbox-logo.svg" alt="wf core logo" height="50px">

#Changelog

## v1.0.9
* Added: `SVGComponent.svgRoot` getter

## v1.0.8
* Fixed: `DOMUtils.calcElementHeight` returns NaN at Firefox on undefined css properties

## v1.0.7
* Added: `TextField` get an easy and better semantic to create text specific components
* Added: `JSONUtils` with many helper functions to get and check json values
* Added: `DOMUtils.calcElementHeight` to get computed element height with margin, padding and border
* Added: `PromisedDelay.waitUntilValid` waits until a validationMethode returns true
* Added: `StateValue.isValue` to easily check state values 

## v1.0.6
* Fixed: `RequestUtils.getPromisedData` missing "?" for default requestType

## v1.0.5
* Fixed: added TextArea check for `DOMUtils.isTextInputElementActive()`

## v1.0.4
* Added: `QueryStylesController.to()` now supports priorityLevel
* Fixed: `QueryStylesController.to()` to make use of INativeStyleDeclaration
* Update: package.json webfruits/core version to v1.0.3

## v1.0.3
* Added: `DOMUtils.isTextInputElementActive`
* Added: `DateUtils` with methodes like `getFormattedDayTime`, `isToday`, `isTomorrow`, `isSameDay`, `isYesterday`, `isWithinLastDays`)
* Added: `MathUtils.roundToEven`
* Update: package.json webfruits/core version to v1.0.2

## v1.0.2
* Update: package.json webfruits/core version to v1.0.1
* Fixed: SwipeController not resetting when onTouchEnd not dispatchable anymore

## v1.0.1
* Fixed: package.json webfruits/core dependency

## v1.0.0
* Added: `GradientUtils` to create smooth gradients without visible steps
* Added: `ArrayUtils` cause of missing native array methodes
* Added: `StateValue` to easily create states objects where you can listen to
* Added: `FontDetector` to check if font via name and weight is avaiable
* Added: `ValidationUtils` to check mail, password (configable), date, phone
* Added: `ScrollBox` to get child scrolling with features like scrollTo, iOS-Fix or hiding scrollbar
* Added: `NativeVideo`
* Added: `PromisedDelay` to easily insert timeouts during methode executions

## v0.2.2
* Fixed: increased `RequestUtils.isErrorStatus` to 500er

## v0.2.1
* Added: optional param for `URLUtils.getParams(url?: string)` to get params from an url-string

## v0.2.0
#### Breaking Changes:
* Refactored: renamed `RequestErrorInfo` into `RequestResult` in `RequestUtils` and added `responseText` as additional info to it.
* `RequestUtils.getURL.resultListener` and `RequestUtils.getURL.errorListener` sharing both `RequestResult` as argument type
* Please update the success result type from `any` to `RequestResult` on `getURL().resultListener` or `getPromisedData().then` and use `RequestResult.responseText` to get the content as in previous versions
* Please update the error result type from `RequestErrorInfo` to `RequestResult` on `getURL().errorListener` or `getPromisedData().catch` 
* Refactored: `getURL(config.usePost)` into `getURL(config.responseType: ReponseType)` which can be "GET" | "POST" | "DELETE" | "PATCH" | "PUT" | "HEAD"

## v0.1.25
* Added: error response and `RequestErrorInfo` to `RequestUtils`

## v0.1.25
* Added: error response and `RequestErrorInfo` to `RequestUtils`

## v0.1.24
* Readded: more concret error message for `RequestUtils`

## v0.1.23
#### Breaking Changes:
You can ignore this if you have used `< v0.1.17`  
If you have used `v0.1.18` to `v0.1.22`, you have to rename `RequestUtils.getData` to `RequestUtils.getUrl` and set `url` as config parameter (not as first argument)
* Fixed: Now `RequestUtils.getUrl` is available again, instead of `RequestUtil.getData`

## v0.1.22
* Updated: core dependency to v0.1.19

## v0.1.21
* Improved: `URLUtils.downloadURL` to have optional targetBlank and filename 

## v0.1.20
* Updated: core dependency to v0.1.18

## v0.1.19
* Updated: core dependency to v0.1.17
* Updated: TypeScript to v3.7.5

## v0.1.18
* Added: `QueryStylesController` to select and style one or multiple HTMLElements
* Added: `RequestUtils.getPromisedData`
* Updated: core dependency to v0.1.14

#### Breaking Changes:
_**Breaking Changes up to v0.1.22.  
Solution: use v0.1.23 at least**_
* Refactored: `RequestUtils.getData` so that `url` is first argument (again)

## v0.1.17
* Updated: core dependency to v0.1.13

## v0.1.16
* Added: `errorListener` for `RequestUtils.getURL`

## v0.1.15
* Added: `SVGUtils.getElementsByID` to get all SVGElements with the same id

## v0.1.14
* Added: `URLUtils.getUrlParam(paraName, defaultValue)` to access a paramete from an URL

## v0.1.13
* Added: `URLUtils.getUrlParams` to get access all parametes from an URL

## v0.1.12
* Fixed: `YoutubeVideo` throwing errors if not detached to dom anymore 

## v0.1.11
* Improved: `YoutubeVideo` – added load(), which only loads YTPlayer, but doesn't playback it if playerVars.autoplay is set to false

## v0.1.10
* Fixed: swiping gets abort when using higher values for `swipeDetectThreshold` in `SwipeController`

## v0.1.9
* Fixed: use latest @webfruits/core 

## v0.1.8
* Added: `swipeDetectThreshold` property for `SwipeController` 

## v0.1.7
* Optimized: `YoutubeVideo`

## v0.1.6
* Added: `YoutubeVideo` – an easy way to playback and control videos from Youtube

## v0.1.5
* Fixed: `RequestUtils.getURL` option arguement object not optional anymore 

## v0.1.4
* Optimized: `RequestUtils.getURL` to use only a flexible options argument object 
