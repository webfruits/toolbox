<img src="https://webfruits.io/assets/wf-small-toolbox-logo.svg" alt="wf core logo" height="50px">

#Changelog

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
