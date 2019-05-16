import {UIComponent} from "@webfruits/core";
import {Signal} from "@webfruits/core/dist/signal/Signal";

/******************************************************************
 * YoutubeVideo
 *
 * https://developers.google.com/youtube/iframe_api_reference
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class YoutubeVideo extends UIComponent {

	/******************************************************************
	 * Properties
	 *****************************************************************/

	public static readonly DEFAULT_PLAYER_VARS: {} = {
		autoplay: 0,
		controls: 1,
		rel: 0,
		fs: 1,
		disablekb: 0,
		showinfo: 0,
		modestbranding: 1,
		playsinline: 1
	};

	private _ytpAPI: any;
	private _playerVars: any;
	private _iframeContainer: UIComponent;

	public onVideoCompletedSignal = new Signal();
	public onVideoPlayingSignal = new Signal();
	public onVideoPausedSignal = new Signal();
	public onYTPAPIAvailableSignal = new Signal();
	public onYTPAPIDestroyedSignal = new Signal();

	/******************************************************************
	 * Constructor
	 *****************************************************************/

	constructor(private _youtubeID: string, playerVars = YoutubeVideo.DEFAULT_PLAYER_VARS) {
		super("youtube-video");
		this._playerVars = Object.assign(YoutubeVideo.DEFAULT_PLAYER_VARS, playerVars);
		this.initIFrameContainer();
	}

	/******************************************************************
	 * Public Methodes
	 *****************************************************************/

	get ytpAPI(): any {
		return this._ytpAPI;
	}

	public destroy() {
		super.destroy();
		this.onVideoCompletedSignal.removeAll();
		this.onVideoPlayingSignal.removeAll();
		this.onVideoPausedSignal.removeAll();
		window['onYouTubeIframeAPIReady'] = null;
		this.destroyYTPlayer();
	}

	public updateStyles() {
		this._iframeContainer.applyStyle({
			position: "relative",
			top: 0,
			width: "100%",
			height: "100%",
			fontSize: 0,
			lineHeight: 0,
			backgroundColor: "black"
		});
	}

	public load() {
        this.loadYouTubeAPI();
    }

	public play() {
		this.loadYouTubeAPI(true);
	}

	public stop() {
		this.stopVideo();
	}

	/******************************************************************
	 * Private Methodes
	 *****************************************************************/

	private initIFrameContainer() {
		this._iframeContainer = new UIComponent("yt-iframe-container");
		this.addChild(this._iframeContainer);
	}

	private loadYouTubeAPI(playIt: boolean = false) {
		if (window['YT'] && window['YT'].Player) {
			this.initYTElement(playIt);
			return;
		}
		if (document.getElementById("yt-iframe-api")) {
			this.initYTElement(playIt);
			return;
		}
		let scriptElement = document.createElement('script');
		scriptElement.src = "https://www.youtube.com/iframe_api";
		scriptElement.id = "yt-iframe-api";
		window['onYouTubeIframeAPIReady'] = () => {
			this.initYTElement(playIt);
		};
		document.body.appendChild(scriptElement);
	}

	private initYTElement(playIt: boolean = false) {
		if (this._ytpAPI) {
			this.destroyYTPlayer();
		}
		this._iframeContainer.removeAllChildren();
		let ytElement = new UIComponent("yt-player");
		ytElement.view.id = "youtube_" + this._youtubeID + "_" + Math.random().toString().replace(".", "");
		ytElement.onAddedToStageSignal.addOnce(() => {
			this.initYTPlayer(playIt);
		});
		this._iframeContainer.addChild(ytElement);
	}

	private initYTPlayer(playIt: boolean = false) {
		this._ytpAPI = new window['YT'].Player(this._iframeContainer.children[0].view.id, {
			videoId: this._youtubeID,
			width: "100%",
			height: "100%",
			playerVars: this._playerVars,
			events: {
				'onReady': () => this.onPlayerReady(playIt),
				'onStateChange': () => this.onPlayerStateChanged()
			}
		});
	}

	private playVideo() {
		if (!this._ytpAPI) return;
		this._ytpAPI.playVideo();
	}

	private stopVideo() {
		if (!this._ytpAPI) return;
		this._ytpAPI.pauseVideo();
	}

	private destroyYTPlayer() {
		if (!this._ytpAPI) return;
		this._ytpAPI.stopVideo();
		this._ytpAPI.clearVideo();
		this._ytpAPI.destroy();
		this._ytpAPI = null;
		this._iframeContainer.removeAllChildren();
		this.onYTPAPIDestroyedSignal.dispatch();
	}

	/******************************************************************
	 * Events
	 *****************************************************************/

	private onPlayerReady(playIt: boolean) {
	    if (this._playerVars.autoplay || playIt) {
            this.playVideo();
        }
        this.onYTPAPIAvailableSignal.dispatch();
	}

	private onPlayerStateChanged() {
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
	}

}
