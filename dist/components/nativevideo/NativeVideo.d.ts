import { UIComponent } from "@webfruits/core";
import { Signal } from "@webfruits/core/dist/signal/Signal";
import { NativeVideoConfig } from "./NativeVideoConfig";
import { NativeVideoSource } from "./NativeVideoSource";
/******************************************************************
 * NativeVideo
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class NativeVideo extends UIComponent {
    private _videoSources;
    /******************************************************************
     * Properties
     *****************************************************************/
    static readonly CONFIG_DEFAULTS: NativeVideoConfig;
    private _config;
    private _video;
    onMetaDataSignal: Signal<void>;
    onCompletedSignal: Signal<void>;
    onCanPlaySignal: Signal<void>;
    onStopSignal: Signal<void>;
    onTimeUpdateSignal: Signal<void>;
    onErrorSignal: Signal<void>;
    /******************************************************************
     * Constructor
     *****************************************************************/
    constructor(_videoSources: NativeVideoSource[], config?: NativeVideoConfig);
    /******************************************************************
     * Public Methodes
     *****************************************************************/
    get currentTime(): number;
    play(): Promise<void>;
    stop(): void;
    updateStyles(): void;
    /******************************************************************
     * Private Methodes
     *****************************************************************/
    private initVideo;
    /******************************************************************
     * Events
     *****************************************************************/
    private onMetaData;
    private onVideoCanPlay;
    private onVideoError;
    private onVideoComplete;
    private onVideoTimeUpdate;
}
