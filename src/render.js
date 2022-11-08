const { ipcRenderer } = require('electron');





const desktopCapturer = {
  getSources: (opts) => ipcRenderer.invoke('DESKTOP_CAPTURER_GET_SOURCES', opts)
}
const Menu={
    buildFromTemplate: (template)=>ipcRenderer.invoke("Menu-test", template),
    popup: ()=>ipcRenderer.invoke("Menu-popup", "hihi")
   

}
const createStream = (constraints,videoElement)=>ipcRenderer.invoke("create-stream",constraints,videoElement)



// Buttons
const videoElement = document.querySelector('video');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const videoSelectBtn = document.getElementById('videoSelectBtn');

videoSelectBtn.onclick = getVideoSources;


// Get the available video sources
async function getVideoSources(){
    const inputSources = await desktopCapturer.getSources({ types: ['window', 'screen'] });

   
    console.log(inputSources)
              const template = inputSources.map(source => {
                return ({
                  label: source.name,
                  click: () => selectSource(source.name, source.id)
                })
              })
              console.log(template)
      
      Menu.buildFromTemplate(
        template
      );
    
    
      Menu.popup();
}


// Change the videoSource window to recordcl
async function selectSource(sourceName, sourceId){
    videoSelectBtn.innerText = sourceName;
    const constraints = {
        audio:false,
        video:{
            mandatory:{
                chromeMediaSource:'desktop', 
                chromeMediaSourceId: sourceId
            }
        }
    }
    // Create a Stream
    // const stream = await navigator.mediaDevices.getUserMedia(constraints)
    createStream(constraints,videoElement)
    // Preview the source in a video element
    // videoElement.srcObject = stream;
    // videoElement.play();
}
