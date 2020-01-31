import { UIComponent } from "@webfruits/core";
import { Signal } from "@webfruits/core/dist/signal/Signal";
/******************************************************************
 * YoutubeVideo
 *
 * https://developers.google.com/youtube/iframe_api_reference
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class YoutubeVideo extends UIComponent {
    private _youtubeID;
    /******************************************************************
     * Properties
     *****************************************************************/
    static readonly DEFAULT_PLAYER_VARS: {};
    private _ytpAPI;
    private _playerVars;
    private _iframeContainer;
    onVideoCompletedSignal: Signal<void>;
    onVideoPlayingSignal: Signal<void>;
    onVideoPausedSignal: Signal<void>;
    onYTPAPIAvailableSignal: Signal<void>;
    onYTPAPIDestroyedSignal: Signal<void>;
    /******************************************************************
     * Constructor
     *****************************************************************/
    constructor(_youtubeID: string, playerVars?: {});
    /******************************************************************
     * Public Methodes
     *****************************************************************/
    get ytpAPI(): any;
    destroy(): void;
    updateStyles(): void;
    load(): void;
    play(): void;
    stop(): void;
    /******************************************************************
     * Private Methodes
     *****************************************************************/
    private initIFrameContainer;
    private loadYouTubeAPI;
    private initYTElement;
    private initYTPlayer;
    private playVideo;
    private stopVideo;
    private destroyYTPlayer;
    /******************************************************************
     * Events
     *****************************************************************/
    private onPlayerReady;
    private onPlayerStateChanged;
}
