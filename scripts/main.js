/* UNITY Canvas & Loader variables */
const maxPixelRatioMobile = 2.0;
const maxPixelRatioDesktop = 1.5;

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
var maxDevicePixelRatio = isMobile ? maxPixelRatioMobile : maxPixelRatioDesktop;
var pixelRatio = Math.min(window.devicePixelRatio, maxDevicePixelRatio);

var buildUrl = "Build";
var loaderUrl = buildUrl + "/v0.1.loader.js";
var config = {
  dataUrl: buildUrl + "/v0.1.data.unityweb",
  frameworkUrl: buildUrl + "/v0.1.framework.js.unityweb",
  codeUrl: buildUrl + "/v0.1.wasm.unityweb",
  streamingAssetsUrl: "StreamingAssets",
  companyName: "Fenikkel",
  productName: "WebPorfolio",
  productVersion: "0.1",
  devicePixelRatio: pixelRatio
};


/* Get the references to the elements of the HTML body */
var canvas = document.querySelector("#unity-canvas");
var loadingBar = document.querySelector("#unity-loading-bar");
var progressBar = document.querySelector("#unity-progress-bar");
var secondaryTextDiv = document.querySelector("#secondary-text-div");

var script = document.createElement("script"); // It creates a <script></script> element
script.src = loaderUrl; // It adds the path to the script <script src=loaderUrl></script>


/* Add behaviours on load UNITY */
script.onload = function ()
{
  createUnityInstance(canvas, config, function (progress) // Every time the progress is updated...
  {
    progressBar.style.width = 100 * progress + "%";
  })
  .then(function (unityInstance) // Once the load has finished...
  { 
    /* Fade out loading bar*/
    loadingBar.style.opacity = "opacity: 1";
    loadingBar.style.animation = "fadeOut 0.75s";

    /* Fade out secondary text */
    secondaryTextDiv.style.opacity = "opacity: 1";
    secondaryTextDiv.style.animation = "fadeOut 0.75s";

    /* Fade in canvas */
    canvas.style.animation = "fadeIn 0.75s";
  })
  .catch(function (message) // In case there are errors
  {
    alert(message);
  });
};


/* ANIMATION EVENTS*/

/* Triggered when the animation ends */
loadingBar.addEventListener('animationend', () => 
{
  /*The animations doesn't override the values, so we need to change it after the animation ends*/
  loadingBar.style.opacity = Math.abs(loadingBar.style.opacity - 1); // We get the final value of the animation (the inverted opacity)

  if (loadingBar.style.opacity === 0) // Ended fade out
  {
    loadingBar.style.display = "none";
  }
  else{} // Ended fade in
});


secondaryTextDiv.addEventListener('animationend', () => 
{
  secondaryTextDiv.style.opacity = Math.abs(secondaryTextDiv.style.opacity - 1);

  if (secondaryTextDiv.style.opacity === 0)
  {
    secondaryTextDiv.style.display = "none";
  }
});

canvas.addEventListener('animationend', () => 
{
  canvas.style.opacity = Math.abs(canvas.style.opacity - 1); // It should result as 1
});

// Add the appName.loader.js script at the end of the HTML body so it can start the load with all the listeners
document.body.appendChild(script);