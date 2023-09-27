import './style.css';

class Meeting {
  constructor() {
    this.streamButton = document.querySelector('#stream-button');
    this.videoButton = document.querySelector('#video-button');
    this.audioButton = document.querySelector('#audio-button');
    this.mainVideo = document.querySelector('#main-video');

    this.isVideoEnabled = true;
    this.isAudioEnabled = true;

    this.videoTracks = [];
    this.audioTracks = [];

    this.streamButton.addEventListener('click', this.toggleStream.bind(this));
    this.videoButton.addEventListener('click', this.toggleVideo.bind(this));
    this.audioButton.addEventListener('click', this.toggleAudio.bind(this));
  }

  async toggleStream() {
    let stream = this.mainVideo.srcObject;

    this.streamButton.textContent = stream ? '開始' : '結束';

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      this.mainVideo.srcObject = null;
      return;
    }

    stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: { ideal: 4096 }, height: { ideal: 2160 } },
    });

    this.videoTracks = stream.getVideoTracks();
    this.audioTracks = stream.getAudioTracks();

    this.videoTracks[0].enabled = this.isVideoEnabled;
    this.audioTracks[0].enabled = this.isAudioEnabled;

    this.mainVideo.srcObject = stream;
  }

  toggleVideo() {
    this.isVideoEnabled = !this.isVideoEnabled;
    this.videoButton.textContent = this.isVideoEnabled ? '關閉視訊' : '開啟視訊';

    if (this.videoTracks.length > 0) {
      this.videoTracks[0].enabled = this.isVideoEnabled;
    }
  }

  toggleAudio() {
    this.isAudioEnabled = !this.isAudioEnabled;
    this.audioButton.textContent = this.isAudioEnabled ? '關閉音訊' : '開啟音訊';

    if (this.audioTracks.length > 0) {
      this.audioTracks[0].enabled = this.isAudioEnabled;
    }
  }
}

new Meeting();
