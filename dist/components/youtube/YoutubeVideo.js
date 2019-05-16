"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@webfruits/core");
var Signal_1 = require("@webfruits/core/dist/signal/Signal");
/******************************************************************
 * YoutubeVideo
 *
 * https://developers.google.com/youtube/iframe_api_reference
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
var YoutubeVideo = /** @class */ (function (_super) {
    __extends(YoutubeVideo, _super);
    /******************************************************************
     * Constructor
     *****************************************************************/
    function YoutubeVideo(_youtubeID, playerVars) {
        if (playerVars === void 0) { playerVars = YoutubeVideo.DEFAULT_PLAYER_VARS; }
        var _this = _super.call(this, "youtube-video") || this;
        _this._youtubeID = _youtubeID;
        _this.onVideoCompletedSignal = new Signal_1.Signal();
        _this.onVideoPlayingSignal = new Signal_1.Signal();
        _this.onVideoPausedSignal = new Signal_1.Signal();
        _this.onYTPAPIAvailableSignal = new Signal_1.Signal();
        _this.onYTPAPIDestroyedSignal = new Signal_1.Signal();
        _this._playerVars = Object.assign(YoutubeVideo.DEFAULT_PLAYER_VARS, playerVars);
        _this.initIFrameContainer();
        return _this;
    }
    Object.defineProperty(YoutubeVideo.prototype, "ytpAPI", {
        /******************************************************************
         * Public Methodes
         *****************************************************************/
        get: function () {
            return this._ytpAPI;
        },
        enumerable: true,
        configurable: true
    });
    YoutubeVideo.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.onVideoCompletedSignal.removeAll();
        this.onVideoPlayingSignal.removeAll();
        this.onVideoPausedSignal.removeAll();
        window['onYouTubeIframeAPIReady'] = null;
        this.destroyYTPlayer();
    };
    YoutubeVideo.prototype.updateStyles = function () {
        this._iframeContainer.applyStyle({
            position: "relative",
            top: 0,
            width: "100%",
            height: "100%",
            fontSize: 0,
            lineHeight: 0,
            backgroundColor: "black"
        });
    };
    YoutubeVideo.prototype.load = function () {
        this.loadYouTubeAPI();
    };
    YoutubeVideo.prototype.play = function () {
        this.loadYouTubeAPI(true);
    };
    YoutubeVideo.prototype.stop = function () {
        this.stopVideo();
    };
    /******************************************************************
     * Private Methodes
     *****************************************************************/
    YoutubeVideo.prototype.initIFrameContainer = function () {
        this._iframeContainer = new core_1.UIComponent("yt-iframe-container");
        this.addChild(this._iframeContainer);
    };
    YoutubeVideo.prototype.loadYouTubeAPI = function (playIt) {
        var _this = this;
        if (playIt === void 0) { playIt = false; }
        if (window['YT'] && window['YT'].Player) {
            this.initYTElement(playIt);
            return;
        }
        if (document.getElementById("yt-iframe-api")) {
            this.initYTElement(playIt);
            return;
        }
        var scriptElement = document.createElement('script');
        scriptElement.src = "https://www.youtube.com/iframe_api";
        scriptElement.id = "yt-iframe-api";
        window['onYouTubeIframeAPIReady'] = function () {
            _this.initYTElement(playIt);
        };
        document.body.appendChild(scriptElement);
    };
    YoutubeVideo.prototype.initYTElement = function (playIt) {
        var _this = this;
        if (playIt === void 0) { playIt = false; }
        if (this._ytpAPI) {
            this.destroyYTPlayer();
        }
        this._iframeContainer.removeAllChildren();
        var ytElement = new core_1.UIComponent("yt-player");
        ytElement.view.id = "youtube_" + this._youtubeID + "_" + Math.random().toString().replace(".", "");
        ytElement.onAddedToStageSignal.addOnce(function () {
            _this.initYTPlayer(playIt);
        });
        this._iframeContainer.addChild(ytElement);
    };
    YoutubeVideo.prototype.initYTPlayer = function (playIt) {
        var _this = this;
        if (playIt === void 0) { playIt = false; }
        this._ytpAPI = new window['YT'].Player(this._iframeContainer.children[0].view.id, {
            videoId: this._youtubeID,
            width: "100%",
            height: "100%",
            playerVars: this._playerVars,
            events: {
                'onReady': function () { return _this.onPlayerReady(playIt); },
                'onStateChange': function () { return _this.onPlayerStateChanged(); }
            }
        });
    };
    YoutubeVideo.prototype.playVideo = function () {
        if (!this._ytpAPI)
            return;
        this._ytpAPI.playVideo();
    };
    YoutubeVideo.prototype.stopVideo = function () {
        if (!this._ytpAPI)
            return;
        this._ytpAPI.pauseVideo();
    };
    YoutubeVideo.prototype.destroyYTPlayer = function () {
        if (!this._ytpAPI)
            return;
        this._ytpAPI.stopVideo();
        this._ytpAPI.clearVideo();
        this._ytpAPI.destroy();
        this._ytpAPI = null;
        this._iframeContainer.removeAllChildren();
        this.onYTPAPIDestroyedSignal.dispatch();
    };
    /******************************************************************
     * Events
     *****************************************************************/
    YoutubeVideo.prototype.onPlayerReady = function (playIt) {
        if (this._playerVars.autoplay || playIt) {
            this.playVideo();
        }
        this.onYTPAPIAvailableSignal.dispatch();
    };
    YoutubeVideo.prototype.onPlayerStateChanged = function () {
        switch (this._ytpAPI.getPlayerState()) {
            case 0:
                this.onVideoCompletedSignal.dispatch();
                break;
            case 1:
                this.onVideoPlayingSignal.dispatch();
                break;
            case 2:
                this.onVideoPausedSignal.dispatch();
                break;
        }
    };
    /******************************************************************
     * Properties
     *****************************************************************/
    YoutubeVideo.DEFAULT_PLAYER_VARS = {
        autoplay: 0,
        controls: 1,
        rel: 0,
        fs: 1,
        disablekb: 0,
        showinfo: 0,
        modestbranding: 1,
        playsinline: 1
    };
    return YoutubeVideo;
}(core_1.UIComponent));
exports.YoutubeVideo = YoutubeVideo;
