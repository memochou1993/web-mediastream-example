import './style.css';

const mainButton = document.querySelector('#main-button');
const videoButton = document.querySelector('#video-button');
const audioButton = document.querySelector('#audio-button');
const mainVideo = document.querySelector('#main-video');

let isVideoEnabled = true;
let isAudioEnabled = true;

let videoTracks = [];
let audioTracks = [];

mainButton.addEventListener('click', async () => {
  let stream = mainVideo.srcObject;

  mainButton.textContent = stream ? '開始' : '結束';

  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    mainVideo.srcObject = null;
    return;
  }

  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: { width: { ideal: 4096 }, height: { ideal: 2160 } },
  });
  videoTracks = stream.getVideoTracks();
  audioTracks = stream.getAudioTracks();
  videoTracks[0].enabled = isVideoEnabled;
  audioTracks[0].enabled = isAudioEnabled;
  mainVideo.srcObject = stream;
});

videoButton.addEventListener('click', () => {
  isVideoEnabled = !isVideoEnabled;
  videoButton.textContent = isVideoEnabled ? '關閉視訊' : '開啟視訊';
  if (videoTracks.length > 0) {
    videoTracks[0].enabled = isVideoEnabled;
  }
});

audioButton.addEventListener('click', () => {
  isAudioEnabled = !isAudioEnabled;
  audioButton.textContent = isAudioEnabled ? '關閉音訊' : '開啟音訊';
  if (audioTracks.length > 0) {
    audioTracks[0].enabled = isAudioEnabled;
  }
});
