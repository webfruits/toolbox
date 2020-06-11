import {UIComponent} from "@webfruits/core";
import {Signal} from "@webfruits/core/dist/signal/Signal";
import {NativeVideoConfig} from "./NativeVideoConfig";
import { NativeVideoSource } from "./NativeVideoSource";

/******************************************************************
 * NativeVideo
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class NativeVideo extends UIComponent {

    /******************************************************************
     * Properties
     *****************************************************************/

    public static readonly CONFIG_DEFAULTS: NativeVideoConfig = {
        muted: false,
        preload: false,
        loop: false,
        controls: true,
        autoplay: false
    };
    private _config: NativeVideoConfig;
    private _video: UIComponent<HTMLVideoElement>;

    public onMetaDataSignal = new Signal();
    public onCompletedSignal = new Signal();
    public onCanPlaySignal = new Signal();
    public onStopSignal = new Signal();
    public onTimeUpdateSignal = new Signal();
    public onErrorSignal = new Signal();

    /******************************************************************
     * Constructor
     *****************************************************************/

    constructor(private _videoSources: NativeVideoSource[], config?: NativeVideoConfig) {
        super("native-video");
        this._config = Object.assign(NativeVideo.CONFIG_DEFAULTS, config ?? {});
        this.initVideo();
    }

    /******************************************************************
     * Public Methodes
     *****************************************************************/

    get currentTime(): number {
        return this._video.view.currentTime;
    }

    public async play() {
        await this._video.view.play();
    }

    public stop() {
        this._video.view.pause();
    }

    public updateStyles(): void {
        this._video.applyStyle({
            width: "100%",
            height: "100%"
        })
    }

    /******************************************************************
     * Private Methodes
     *****************************************************************/

    private initVideo() {
        this._video = new UIComponent<HTMLVideoElement>("video");
        this._video.view.setAttribute("playsinline", "playsinline");
        this._video.view.muted = this._config.muted;
        this._video.view.preload = this._config.preload ? "auto" : "none";
        this._video.view.loop = this._config.loop;
        this._video.view.controls = this._config.controls;
        this._video.view.autoplay = this._config.autoplay;
        this._video.addNativeListener("loadedmetadata", () => this.onMetaData());
        this._video.addNativeListener("canplay", () => this.onVideoCanPlay());
        this._video.addNativeListener("ended", () => this.onVideoComplete());
        this._video.addNativeListener("timeupdate", () => this.onVideoTimeUpdate());
        this._videoSources.forEach((videoSource: NativeVideoSource) => {
            let source = new UIComponent<HTMLSourceElement>("source");
            source.addNativeListener("error", () => this.onVideoError());
            source.view.src = videoSource.videoURL;
            if (videoSource.videoType) {
                source.view.type = videoSource.videoType;
            }
            this._video.addChild(source);
        });
        this.addChild(this._video);
    }

    /******************************************************************
     * Events
     *****************************************************************/

    private onMetaData() {
        this.onMetaDataSignal.dispatch();
    }

    private onVideoCanPlay() {
        this.onCanPlaySignal.dispatch();
    }

    private onVideoError() {
        this.onErrorSignal.dispatch();
    }

    private onVideoComplete() {
        this.onCompletedSignal.dispatch();
    }

    private onVideoTimeUpdate() {
        this.onTimeUpdateSignal.dispatch();
    }
}
