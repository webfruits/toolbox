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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@webfruits/core");
var Signal_1 = require("@webfruits/core/dist/signal/Signal");
/******************************************************************
 * NativeVideo
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
var NativeVideo = /** @class */ (function (_super) {
    __extends(NativeVideo, _super);
    /******************************************************************
     * Constructor
     *****************************************************************/
    function NativeVideo(_videoSources, config) {
        var _this = _super.call(this, "native-video") || this;
        _this._videoSources = _videoSources;
        _this.onMetaDataSignal = new Signal_1.Signal();
        _this.onCompletedSignal = new Signal_1.Signal();
        _this.onCanPlaySignal = new Signal_1.Signal();
        _this.onStopSignal = new Signal_1.Signal();
        _this.onTimeUpdateSignal = new Signal_1.Signal();
        _this.onErrorSignal = new Signal_1.Signal();
        _this._config = Object.assign(NativeVideo.CONFIG_DEFAULTS, (config !== null && config !== void 0 ? config : {}));
        _this.initVideo();
        return _this;
    }
    Object.defineProperty(NativeVideo.prototype, "currentTime", {
        /******************************************************************
         * Public Methodes
         *****************************************************************/
        get: function () {
            return this._video.view.currentTime;
        },
        enumerable: true,
        configurable: true
    });
    NativeVideo.prototype.play = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._video.view.play()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NativeVideo.prototype.stop = function () {
        this._video.view.pause();
    };
    NativeVideo.prototype.updateStyles = function () {
        this._video.applyStyle({
            width: "100%",
            height: "100%"
        });
    };
    /******************************************************************
     * Private Methodes
     *****************************************************************/
    NativeVideo.prototype.initVideo = function () {
        var _this = this;
        this._video = new core_1.UIComponent("video");
        this._video.view.setAttribute("playsinline", "playsinline");
        this._video.view.muted = this._config.muted;
        this._video.view.preload = this._config.preload ? "auto" : "none";
        this._video.view.loop = this._config.loop;
        this._video.view.controls = this._config.controls;
        this._video.view.autoplay = this._config.autoplay;
        this._video.addNativeListener("loadedmetadata", function () { return _this.onMetaData(); });
        this._video.addNativeListener("canplay", function () { return _this.onVideoCanPlay(); });
        this._video.addNativeListener("ended", function () { return _this.onVideoComplete(); });
        this._video.addNativeListener("timeupdate", function () { return _this.onVideoTimeUpdate(); });
        this._videoSources.forEach(function (videoSource) {
            var source = new core_1.UIComponent("source");
            source.addNativeListener("error", function () { return _this.onVideoError(); });
            source.view.src = videoSource.videoURL;
            if (videoSource.videoType) {
                source.view.type = videoSource.videoType;
            }
            _this._video.addChild(source);
        });
        this.addChild(this._video);
    };
    /******************************************************************
     * Events
     *****************************************************************/
    NativeVideo.prototype.onMetaData = function () {
        this.onMetaDataSignal.dispatch();
    };
    NativeVideo.prototype.onVideoCanPlay = function () {
        this.onCanPlaySignal.dispatch();
    };
    NativeVideo.prototype.onVideoError = function () {
        this.onErrorSignal.dispatch();
    };
    NativeVideo.prototype.onVideoComplete = function () {
        this.onCompletedSignal.dispatch();
    };
    NativeVideo.prototype.onVideoTimeUpdate = function () {
        this.onTimeUpdateSignal.dispatch();
    };
    /******************************************************************
     * Properties
     *****************************************************************/
    NativeVideo.CONFIG_DEFAULTS = {
        muted: false,
        preload: false,
        loop: false,
        controls: true,
        autoplay: false
    };
    return NativeVideo;
}(core_1.UIComponent));
exports.NativeVideo = NativeVideo;
