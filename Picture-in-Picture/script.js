const videoElement = document.getElementById("video")
const button = document.getElementById("button")
const btn = document.getElementById("PM")
// Asnyc function, prompt user to select media stream and pass to video element, then play

btn.addEventListener("click", async () => {
// async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
    } catch (error) {
        // error message 
        console.log("whoops, error here:", error)
    }
// }
})

button.addEventListener("click", async () => {
    
    
    // disable button
button.disabled = true;
// start picture in picture
await videoElement.requestPictureInPicture();
// Reset BUtton
button.disabled = false;
});
// selectMediaStream()