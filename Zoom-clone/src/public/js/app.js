const socket = io();
const welcome = document.getElementById("welcome")
const form = welcome.querySelector("form");
const room = document.getElementById("room");
const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");

let myStream;
let muted = false;
let cameraOff = false;
let myPeerConnection;
let roomName;
let nickName;
let myDataCannel;

room.hidden = true;

// Bring a list of cameras.
async function getCameras() {
	try{
		const devices = await navigator.mediaDevices.enumerateDevices();
		const cameras = devices.filter(device => device.kind === "videoinput");
		const currentCamera = myStream.getVideoTracks()[0];
		cameras.forEach(camera => {
			const option = document.createElement("option");
			option.value = camera.deviceId;
			option.innerText = camera.label;
			if (currentCamera.label === camera.label){
				option.selected = true;
			}
			camerasSelect.appendChild(option)
		})
	}catch(e){
		console.log(`Error : getCamera list - ${e}`)
	}
}

// Bring the Camera you are currently using.
async function getMedia(deviceId) {
	const initialConstraints = {
		audio: true,
		video: {facingMode: "user"},
	};
	const cameraConstraints = {
		audio: true,
		video: { deviceId: { exact: deviceId } },
	};
	try {
		myStream = await navigator.mediaDevices.getUserMedia(
			deviceId ? cameraConstraints : initialConstraints
		);
		myFace.srcObject = myStream;
		if (!deviceId){
			await getCameras();
		}
	} catch (e) {
		console.log(e);
	}
}

// Managing the voice
function handleMuteClick() {
	myStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
	if(!muted){
		muteBtn.innerText = "Unmute";
		muted = true;
	} else {
		muteBtn.innerText = "Mute";
		muted = false;
	}
}
// Managing the Camera.
function handleCameraClick() {
	myStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
	if(cameraOff){ // Cutoff the Camera.
		cameraBtn.innerText = "Turn Camera Off";
		cameraOff = false;
	} else { // turnOn the Camera.
		cameraBtn.innerText = "Turn Camera On";
		cameraOff = true;
	}
}

// It informs the other part of the user's camera change.
async function handleCameraChange(){
	await getMedia(camerasSelect.value);
	if (myPeerConnection) {
		const videoTrack = myStream.getVideoTracks()[0];
		const videoSender = myPeerConnection
			.getSenders()
			.find((sender) => sender.track.kind === "video");
		videoSender.replaceTrack(videoTrack);
	  }
}

// Event Listner : voice / video / CameraChange
muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
camerasSelect.addEventListener("input", handleCameraChange);

// sended the message using the Channel.
function sendMessage(msg) {
	let obj = {
	  type: "msg",
	  nick: nickName,
	  payload: msg,
	}
	myDataCannel.send(JSON.stringify(obj));
	addMessage(`you : ${msg}`);
}

// added the me message to the chat
function addMessage(message){
	const ul = room.querySelector("ul");
	const li = document.createElement("li");
	li.innerText = message;
	ul.append(li);
}

function handleMessageSubmit(event){
	event.preventDefault();
	const input = room.querySelector("#msg input");
	const value = input.value;
	sendMessage(value);
	input.value = "";
}

function handleNicknameSubmit(event) {
	event.preventDefault();
	const input = room.querySelector("#name input");
	nickName = input.value;
	socket.emit("nickname", nickName);
	input.value = "";
}

// initalize Room
async function initRoom(){
	welcome.style.display = "none";
	room.hidden = false;
	await getMedia();
	makeConnection();
	const msgForm = room.querySelector("#msg");
	const nameForm = room.querySelector("#name");
	msgForm.addEventListener("submit", handleMessageSubmit);
	nameForm.addEventListener("submit", handleNicknameSubmit);
}


async function handleRoomSubmit(event){
	event.preventDefault();
	const roomInput = form.querySelector("#room_input");
	const userInput = form.querySelector("#user_input");
	nickName =userInput.value;
	roomName = roomInput.value;
	await initRoom();
	socket.emit("enter_room", roomInput.value, nickName);
	const p = room.querySelector("p");
	p.innerText = `Room Name : ${roomName}`;
}

// Event Lintser - Create Room
form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", async (user, newCount)=> {
	myDataCannel = myPeerConnection.createDataChannel("chat");
	myDataCannel.addEventListener("message", (event) =>{
		addMessage(`${JSON.parse(event.data).nick} : ${JSON.parse(event.data).payload}`);
	});
	console.log("made data channel");
	const p = room.querySelector("p");
	p.innerText = `Room ${roomName} (${newCount})`;
	addMessage(`${user} Joined!`);
	const offer = await myPeerConnection.createOffer();
	myPeerConnection.setLocalDescription(offer);
	console.log("sent the offer");
	socket.emit("offer", offer, roomName);
})

socket.on("bye", (left, newCount) =>{
	const p = room.querySelector("p");
	p.innerText = `Room ${roomName} (${newCount})`;
	addMessage(`${left} feft!`);
})

socket.on("new_message", addMessage);

socket.on("room_change", (rooms) => {
	const roomList = welcome.querySelector("ul");
	if (rooms.length === 0){
		roomList.innerHTML = "";
		return;
	}
	rooms.forEach((room) => {
		const li = document.createElement("li");
		li.innerText = room;
		roomList.append(li);
	});
});

socket.on("offer", async (offer) => {
	myPeerConnection.addEventListener("datachannel", (event) =>{
		myDataCannel = event.channel;
		myDataCannel.addEventListener("message", (event) =>{
			addMessage(`${JSON.parse(event.data).nick} : ${JSON.parse(event.data).payload}`);
		});
	});
	console.log("received the offer");
	myPeerConnection.setRemoteDescription(offer);
	const answer = await myPeerConnection.createAnswer();
	myPeerConnection.setLocalDescription(answer);
	socket.emit("answer", answer, roomName);
	console.log("sent the answer");
});

socket.on("answer", (answer) => {
	console.log("received the answer");
	myPeerConnection.setRemoteDescription(answer);
});
  
socket.on("ice", (ice) => {
	console.log("received candidate");
	myPeerConnection.addIceCandidate(ice);
});

// RTC code

function makeConnection() {
	myPeerConnection = new RTCPeerConnection({
		iceServers: [
		  {
			urls: [
			  "stun:stun.l.google.com:19302",
			  "stun:stun1.l.google.com:19302",
			  "stun:stun2.l.google.com:19302",
			  "stun:stun3.l.google.com:19302",
			  "stun:stun4.l.google.com:19302",
			],
		  },
		],
	  });
	myPeerConnection.addEventListener("icecandidate", handleIce);
	myPeerConnection.addEventListener("addstream", handleAddStream);
	myStream
	  .getTracks()
	  .forEach((track) => myPeerConnection.addTrack(track, myStream));
}

function handleIce(data) {
	console.log("sent candidate");
	socket.emit("ice", data.candidate, roomName);
}
  
  function handleAddStream(data) {
	const peerFace = document.getElementById("peerFace");
	console.log(data.stream);
	peerFace.srcObject = data.stream;
}