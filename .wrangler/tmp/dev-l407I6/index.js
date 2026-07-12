var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-bNsHaO/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL, "checkURL");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// src/index.js
var LANDING_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Cool the text you meant to send - before you send it.">
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Paste Drops" />
  <meta property="og:title" content="Paste Drops" />
  <meta property="og:description" content="Cool the text you meant to send - before you send it." />
  <meta property="og:url" content="https://pastedrops.com/" />
  <meta property="og:image" content="https://pastedrops.com/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Paste Drops" />
  <meta name="twitter:description" content="Cool the text you meant to send - before you send it." />
  <meta name="twitter:image" content="https://pastedrops.com/og-image.png" />
  <title>Paste Drops - Cools down your angry texts</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: #141317;
      color: #FCFBF9;
      font-family: 'Space Grotesk', system-ui, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow-x: hidden;
      padding: 2rem 1rem;
    }

    .hero-container {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 480px;
      padding: 2rem 1.5rem;
      z-index: 1;
      text-align: center;
    }

    .glow-orb {
      position: absolute;
      top: 25%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 320px;
      height: 320px;
      background: radial-gradient(circle, rgba(45, 84, 232, 0.22) 0%, rgba(138, 36, 115, 0.08) 50%, rgba(20, 19, 23, 0) 100%);
      border-radius: 50%;
      z-index: -1;
      pointer-events: none;
      animation: orbPulse 8s infinite alternate ease-in-out;
    }

    @keyframes orbPulse {
      0% {
        opacity: 0.8;
        transform: translate(-50%, -50%) scale(0.9);
      }
      100% {
        opacity: 1.2;
        transform: translate(-50%, -50%) scale(1.1);
      }
    }

    /* Logo and Mascot Animations */
    .logo-svg {
      width: 100%;
      max-width: 250px;
      height: auto;
      filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.45));
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .logo-mascot-group {
      animation: floatBob 6s infinite ease-in-out;
      transform-box: fill-box;
      transform-origin: center;
    }

    .logo-svg.tickle .logo-mascot-group {
      animation: floatBob 6s infinite ease-in-out, tickleBounce 0.42s ease-out forwards;
    }

    @keyframes tickleBounce {
      0%   { transform: translateY(0) scale(1) rotate(0deg); }
      17%  { transform: translateY(-2.5%) scale(1.18) rotate(-10deg); }
      40%  { transform: translateY(-2.5%) scale(1.015) rotate(10deg); }
      60%  { transform: translateY(-2.5%) scale(1.015) rotate(-6deg); }
      78%  { transform: translateY(-2.5%) scale(1.015) rotate(4deg); }
      100% { transform: translateY(-2.5%) scale(1.015) rotate(0deg); }
    }

    .logo-mascot-eye {
      transform-box: fill-box;
      transform-origin: center;
      animation: eyeBlink 5s infinite ease-in-out;
    }

    /* Asleep: droopy lid, slower bob */
    .logo-svg.asleep .logo-mascot-eye {
      animation: none;
      transform: scaleY(0.18);
      transition: transform 0.32s ease;
    }
    .logo-svg.asleep .logo-mascot-group {
      animation: floatBob 9s infinite ease-in-out; /* slower breathing */
    }

    @keyframes floatBob {
      0%, 100% {
        transform: translateY(0) scale(1);
      }
      50% {
        transform: translateY(-2.5%) scale(1.015);
      }
    }

    @keyframes eyeBlink {
      0%, 90%, 94%, 98%, 100% {
        transform: scaleY(1);
      }
      92%, 96% {
        transform: scaleY(0.05);
      }
    }

    /* Zzz rising z's */
    .zzz-wrap {
      position: absolute;
      top: 18%;
      left: 56%;
      pointer-events: none;
      width: 0;
      height: 0;
      opacity: 0;
      transition: opacity 0.4s ease;
    }
    .zzz-wrap.visible { opacity: 1; }

    .zzz-wrap .z {
      position: absolute;
      color: #fff;
      font-weight: 800;
      font-style: italic;
      opacity: 0;
    }
    .zzz-wrap.visible .z {
      animation: zFloat 1.9s ease-out infinite;
    }
    .zzz-wrap.visible .z:nth-child(1) { font-size: 13px; animation-delay: 0s; }
    .zzz-wrap.visible .z:nth-child(2) { font-size: 17px; animation-delay: 0.64s; }
    .zzz-wrap.visible .z:nth-child(3) { font-size: 22px; animation-delay: 1.28s; }

    @keyframes zFloat {
      0% {
        opacity: 0;
        transform: translate(0, 0) rotate(0deg) scale(0.6);
      }
      15% {
        opacity: 1;
      }
      85% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        transform: translate(22px, -52px) rotate(8deg) scale(1.2);
      }
    }

    .tagline {
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.18em;
      color: #9C998F;
      margin-top: 1.5rem;
    }

    /* CTA Button - Pill Shaped (no semi-rounded corners rule) */
    .cta-button {
      display: inline-block;
      margin-top: 3.5rem;
      padding: 0.95rem 2.2rem;
      font-size: 0.9rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #FCFBF9;
      text-decoration: none;
      background: linear-gradient(135deg, rgb(0,113,233) 0%, rgb(48,86,192) 42%, rgb(138,36,115) 57%, rgb(183,11,76) 61%, rgb(201,0,60) 100%);
      border-radius: 999px;
      transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.2s ease;
      box-shadow: 0 10px 30px rgba(45, 84, 232, 0.2);
    }

    .cta-button:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 15px 35px rgba(45, 84, 232, 0.35);
    }

    .cta-button:active {
      transform: translateY(0) scale(0.98);
    }

    .cta-button.disabled {
      background: linear-gradient(135deg, #555 0%, #444 50%, #555 100%);
      opacity: 0.5;
      cursor: default;
      pointer-events: none;
      box-shadow: none;
    }

    .coming-soon {
      display: block;
      margin-top: 1rem;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: rgba(252, 251, 249, 0.45);
    }

    .site-footer {
      margin-top: 3.5rem;
      font-size: 0.75rem;
      color: rgba(252, 251, 249, 0.25);
      display: flex;
      gap: 0.6rem;
      align-items: center;
      z-index: 10;
    }

    .site-footer a {
      color: rgba(252, 251, 249, 0.45);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s ease;
    }

    .site-footer a:hover {
      color: #FCFBF9;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="hero-container">
    <div class="glow-orb"></div>
    
    <!-- Inline SVG mascot & logo stacked reversed -->
    <svg class="logo-svg" viewBox="0 0 4309 4286" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
        <g class="logo-mascot-group">
            <g class="logo-mascot-body" transform="matrix(0.911426,0,0,0.911426,-540.014502,-337.82769)">
                <path d="M1647.99,745.708C2059.6,918.083 2758.683,1358.959 2758.683,1972.21C2758.683,2392.417 2417.528,2733.572 1997.321,2733.572C1577.114,2733.572 1235.959,2392.417 1235.959,1972.21C1235.959,1358.959 1890.308,1200.235 1647.99,745.708Z" style="fill:rgb(0,113,233);"/>
            </g>
            <g transform="matrix(1.010387,0,0,1.010387,-737.674871,-98.666943)">
                <path class="logo-mascot-eye" d="M2115.067,1326.418C2115.171,1328.449 2115.224,1330.494 2115.224,1332.55C2115.224,1397.622 2062.394,1450.451 1997.323,1450.451C1932.251,1450.451 1879.422,1397.622 1879.422,1332.55C1879.422,1273.172 1923.412,1223.986 1980.553,1215.835C1991.016,1195.985 1994.81,1173.389 1977.287,1134.829C2046.256,1183.552 2115.224,1227.964 2115.224,1321.098C2115.224,1322.884 2115.171,1324.658 2115.067,1326.418Z" style="fill:rgb(235,235,235);"/>
            </g>
            <g class="logo-mascot-mouth" transform="matrix(1.010387,0,0,1.010387,-784.112183,-199.442883)">
                <path d="M1691.577,1661.866L1768.124,1661.866C1768.124,1813.831 1891.317,1937.024 2043.283,1937.024C2195.249,1937.024 2318.441,1813.831 2318.441,1661.866L2394.989,1661.866C2394.989,1856.108 2237.525,2013.572 2043.283,2013.572C1849.041,2013.572 1691.577,1856.108 1691.577,1661.866Z" style="fill:rgb(235,235,235);"/>
            </g>
        </g>
        <g transform="matrix(27.519515,0,0,27.519515,-89252.619706,-27597.784421)">
            <g transform="matrix(50,0,0,50,3252.204221,1113.602066)">
                <path d="M0.07,0.2L0.07,-0.496L0.194,-0.496L0.194,-0.436L0.212,-0.436C0.223,-0.455 0.241,-0.472 0.265,-0.487C0.289,-0.503 0.323,-0.51 0.368,-0.51C0.408,-0.51 0.445,-0.5 0.479,-0.48C0.513,-0.461 0.54,-0.432 0.561,-0.394C0.582,-0.356 0.592,-0.31 0.592,-0.256L0.592,-0.24C0.592,-0.186 0.582,-0.14 0.561,-0.102C0.54,-0.064 0.513,-0.035 0.479,-0.015C0.445,0.004 0.408,0.014 0.368,0.014C0.338,0.014 0.313,0.011 0.292,0.004C0.272,-0.004 0.256,-0.012 0.243,-0.024C0.231,-0.035 0.221,-0.046 0.214,-0.057L0.196,-0.057L0.196,0.2L0.07,0.2ZM0.33,-0.096C0.369,-0.096 0.402,-0.108 0.427,-0.134C0.453,-0.159 0.466,-0.195 0.466,-0.243L0.466,-0.253C0.466,-0.301 0.453,-0.337 0.427,-0.362C0.401,-0.388 0.369,-0.4 0.33,-0.4C0.291,-0.4 0.259,-0.388 0.233,-0.362C0.207,-0.337 0.194,-0.301 0.194,-0.253L0.194,-0.243C0.194,-0.195 0.207,-0.159 0.233,-0.134C0.259,-0.108 0.291,-0.096 0.33,-0.096Z" style="fill:white;fill-rule:nonzero;"/>
            </g>
            <g transform="matrix(50,0,0,50,3284.104221,1113.602066)">
                <path d="M0.224,0.014C0.189,0.014 0.157,0.008 0.129,-0.005C0.101,-0.017 0.079,-0.035 0.062,-0.059C0.046,-0.082 0.038,-0.111 0.038,-0.145C0.038,-0.179 0.046,-0.208 0.062,-0.231C0.079,-0.254 0.101,-0.271 0.131,-0.283C0.16,-0.294 0.193,-0.3 0.23,-0.3L0.366,-0.3L0.366,-0.328C0.366,-0.351 0.359,-0.37 0.344,-0.386C0.329,-0.401 0.306,-0.408 0.274,-0.408C0.243,-0.408 0.219,-0.401 0.204,-0.387C0.189,-0.372 0.179,-0.354 0.174,-0.331L0.058,-0.37C0.066,-0.395 0.079,-0.419 0.097,-0.44C0.114,-0.46 0.138,-0.478 0.168,-0.49C0.197,-0.503 0.233,-0.51 0.276,-0.51C0.341,-0.51 0.393,-0.494 0.431,-0.461C0.469,-0.428 0.488,-0.381 0.488,-0.319L0.488,-0.134C0.488,-0.114 0.497,-0.104 0.516,-0.104L0.556,-0.104L0.556,-0L0.472,-0C0.447,-0 0.427,-0.006 0.411,-0.018C0.395,-0.03 0.387,-0.046 0.387,-0.066L0.387,-0.067L0.368,-0.067C0.365,-0.059 0.359,-0.049 0.35,-0.036C0.341,-0.023 0.326,-0.011 0.306,-0.001C0.286,0.009 0.259,0.014 0.224,0.014ZM0.246,-0.088C0.281,-0.088 0.31,-0.098 0.333,-0.118C0.355,-0.137 0.366,-0.163 0.366,-0.196L0.366,-0.206L0.239,-0.206C0.216,-0.206 0.197,-0.201 0.184,-0.191C0.171,-0.181 0.164,-0.167 0.164,-0.149C0.164,-0.131 0.171,-0.116 0.185,-0.105C0.199,-0.094 0.219,-0.088 0.246,-0.088Z" style="fill:white;fill-rule:nonzero;"/>
            </g>
            <g transform="matrix(50,0,0,50,3312.804221,1113.602066)">
                <path d="M0.276,0.014C0.211,0.014 0.158,0 0.117,-0.028C0.076,-0.056 0.051,-0.096 0.042,-0.148L0.158,-0.178C0.163,-0.155 0.171,-0.136 0.181,-0.123C0.193,-0.11 0.206,-0.1 0.223,-0.095C0.239,-0.089 0.257,-0.086 0.276,-0.086C0.305,-0.086 0.327,-0.091 0.341,-0.102C0.355,-0.112 0.362,-0.125 0.362,-0.14C0.362,-0.155 0.355,-0.167 0.342,-0.176C0.329,-0.184 0.307,-0.191 0.278,-0.196L0.25,-0.201C0.215,-0.208 0.184,-0.217 0.155,-0.229C0.126,-0.24 0.103,-0.256 0.086,-0.277C0.069,-0.298 0.06,-0.324 0.06,-0.357C0.06,-0.406 0.078,-0.444 0.114,-0.471C0.15,-0.497 0.197,-0.51 0.256,-0.51C0.311,-0.51 0.357,-0.498 0.394,-0.473C0.431,-0.448 0.455,-0.416 0.466,-0.376L0.349,-0.34C0.344,-0.365 0.333,-0.383 0.317,-0.394C0.3,-0.405 0.28,-0.41 0.256,-0.41C0.232,-0.41 0.214,-0.406 0.201,-0.398C0.188,-0.389 0.182,-0.378 0.182,-0.363C0.182,-0.347 0.189,-0.335 0.202,-0.328C0.215,-0.32 0.233,-0.314 0.256,-0.31L0.284,-0.305C0.321,-0.298 0.355,-0.29 0.386,-0.279C0.416,-0.268 0.44,-0.252 0.458,-0.232C0.475,-0.211 0.484,-0.184 0.484,-0.149C0.484,-0.097 0.465,-0.057 0.427,-0.029C0.39,-0 0.339,0.014 0.276,0.014Z" style="fill:white;fill-rule:nonzero;"/>
            </g>
            <g transform="matrix(50,0,0,50,3338.504221,1113.602066)">
                <path d="M0.26,-0C0.227,-0 0.201,-0.01 0.18,-0.03C0.16,-0.051 0.15,-0.078 0.15,-0.112L0.15,-0.392L0.026,-0.392L0.026,-0.496L0.15,-0.496L0.15,-0.65L0.276,-0.65L0.276,-0.496L0.412,-0.496L0.412,-0.392L0.276,-0.392L0.276,-0.134C0.276,-0.114 0.285,-0.104 0.304,-0.104L0.4,-0.104L0.4,-0L0.26,-0Z" style="fill:white;fill-rule:nonzero;"/>
            </g>
            <g transform="matrix(50,0,0,50,3360.404221,1113.602066)">
                <path d="M0.296,0.014C0.247,0.014 0.203,0.003 0.166,-0.018C0.128,-0.038 0.098,-0.068 0.077,-0.106C0.056,-0.145 0.046,-0.19 0.046,-0.242L0.046,-0.254C0.046,-0.306 0.056,-0.351 0.077,-0.39C0.098,-0.428 0.127,-0.458 0.164,-0.479C0.201,-0.499 0.245,-0.51 0.294,-0.51C0.343,-0.51 0.385,-0.499 0.421,-0.478C0.457,-0.456 0.485,-0.426 0.505,-0.388C0.525,-0.349 0.535,-0.305 0.535,-0.254L0.535,-0.211L0.174,-0.211C0.175,-0.177 0.188,-0.149 0.212,-0.128C0.236,-0.107 0.265,-0.096 0.3,-0.096C0.335,-0.096 0.361,-0.104 0.378,-0.119C0.395,-0.134 0.407,-0.151 0.416,-0.17L0.519,-0.116C0.51,-0.099 0.496,-0.08 0.479,-0.06C0.461,-0.039 0.437,-0.022 0.408,-0.007C0.379,0.007 0.341,0.014 0.296,0.014ZM0.175,-0.305L0.407,-0.305C0.404,-0.334 0.393,-0.357 0.372,-0.374C0.352,-0.391 0.326,-0.4 0.293,-0.4C0.259,-0.4 0.232,-0.391 0.212,-0.374C0.192,-0.357 0.18,-0.334 0.175,-0.305Z" style="fill:white;fill-rule:nonzero;"/>
            </g>
        </g>
        <!-- Text: drops -->
        <g transform="matrix(18.548479,0,0,18.548479,-66277.165906,-23583.23928)">
            <text x="3602.204px" y="1473.602px" style="font-family:'SpaceGrotesk-Medium', 'Space Grotesk';font-weight:500;font-size:50px;fill:rgb(138,135,126);">dr<tspan x="3652.704px " y="1473.602px ">o</tspan>ps</text>
        </g>
    </svg>

    <div class="zzz-wrap" id="zzz"><span class="z">z</span><span class="z">z</span><span class="z">z</span></div>

    <div class="tagline">the text you meant to send.</div>

    <span id="btn-get-app" class="cta-button disabled">Get the app</span>
    <span class="coming-soon">Coming soon</span>
  </div>

  <div class="site-footer">
    <a href="/privacy">Privacy Policy</a>
    <span>\xB7</span>
    <a href="/deletedata">Delete Data</a>
  </div>

  <script>
    (function () {
      var svg = document.querySelector('.logo-svg');
      var zzz = document.getElementById('zzz');
      var tickleSounds = ['/tickle1.mp3', '/tickle2.mp3', '/tickle3.mp3', '/tickle4.mp3'];
      var snoreAudio = null;
      var playing = false;
      var asleep = false;
      var idleTimer = null;
      var IDLE_MS = 15000;

      function sleep() {
        if (asleep) return;
        asleep = true;
        svg.classList.add('asleep');
        zzz.classList.add('visible');
        try {
          if (!snoreAudio) {
            snoreAudio = new Audio('/snore.mp3');
            snoreAudio.loop = true;
            snoreAudio.volume = 0.35;
          }
          snoreAudio.currentTime = 0;
          snoreAudio.play();
        } catch (e) {}
      }

      function wake() {
        if (!asleep) return;
        asleep = false;
        svg.classList.remove('asleep');
        zzz.classList.remove('visible');
        try { if (snoreAudio) snoreAudio.pause(); } catch (e) {}
      }

      function resetIdle() {
        if (idleTimer) clearTimeout(idleTimer);
        idleTimer = setTimeout(sleep, IDLE_MS);
      }

      // Start the idle countdown on load
      resetIdle();

      svg.addEventListener('click', function () {
        var wasSleeping = asleep;
        wake();
        resetIdle();

        // Play a random tickle bloop
        try {
          var audio = new Audio(tickleSounds[Math.floor(Math.random() * tickleSounds.length)]);
          audio.volume = 0.7;
          audio.play();
        } catch (e) {}

        // Trigger the tickle animation
        if (playing) {
          svg.classList.remove('tickle');
          void svg.offsetWidth; // reflow to restart animation
        }
        svg.classList.add('tickle');
        playing = true;

        setTimeout(function () {
          svg.classList.remove('tickle');
          playing = false;
        }, 420);
      });
    })();
  <\/script>
</body>
</html>`;
var FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="580 340 1400 1820" width="100%" height="100%">
  <g transform="matrix(0.911426,0,0,0.911426,-540.014502,-337.82769)">
    <path d="M1647.99,745.708C2059.6,918.083 2758.683,1358.959 2758.683,1972.21C2758.683,2392.417 2417.528,2733.572 1997.321,2733.572C1577.114,2733.572 1235.959,2392.417 1235.959,1972.21C1235.959,1358.959 1890.308,1200.235 1647.99,745.708Z" fill="rgb(0,113,233)"/>
  </g>
  <g transform="matrix(1.010387,0,0,1.010387,-737.674871,-98.666943)">
    <path d="M2115.067,1326.418C2115.171,1328.449 2115.224,1330.494 2115.224,1332.55C2115.224,1397.622 2062.394,1450.451 1997.323,1450.451C1932.251,1450.451 1879.422,1397.622 1879.422,1332.55C1879.422,1273.172 1923.412,1223.986 1980.553,1215.835C1991.016,1195.985 1994.81,1173.389 1977.287,1134.829C2046.256,1183.552 2115.224,1227.964 2115.224,1321.098C2115.224,1322.884 2115.171,1324.658 2115.067,1326.418Z" fill="rgb(235,235,235)"/>
  </g>
  <g transform="matrix(1.010387,0,0,1.010387,-784.112183,-199.442883)">
    <path d="M1691.577,1661.866L1768.124,1661.866C1768.124,1813.831 1891.317,1937.024 2043.283,1937.024C2195.249,1937.024 2318.441,1813.831 2318.441,1661.866L2394.989,1661.866C2394.989,1856.108 2237.525,2013.572 2043.283,2013.572C1849.041,2013.572 1691.577,1856.108 1691.577,1661.866Z" fill="rgb(235,235,235)"/>
  </g>
</svg>`;
var APP_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Paste Drops" />
  <meta property="og:title" content="Paste Drops" />
  <meta property="og:description" content="Cool the text you meant to send - before you send it." />
  <meta property="og:url" content="https://pastedrops.com/getapp" />
  <meta property="og:image" content="https://pastedrops.com/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Paste Drops" />
  <meta name="twitter:description" content="Cool the text you meant to send - before you send it." />
  <meta name="twitter:image" content="https://pastedrops.com/og-image.png" />
  <title>Paste Drops - Cools down your angry texts</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: #141317;
      color: #FCFBF9;
      font-family: 'Space Grotesk', system-ui, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      text-align: center;
    }

    .redirect-container {
      max-width: 400px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }

    /* Small pulsing drop spinner */
    .spinner-drop {
      width: 40px;
      height: auto;
      animation: pulseRedirect 1.2s infinite ease-in-out;
    }

    @keyframes pulseRedirect {
      0%, 100% {
        transform: scale(1);
        opacity: 0.7;
      }
      50% {
        transform: scale(1.15);
        opacity: 1;
      }
    }

    .status-text {
      font-size: 1.1rem;
      font-weight: 500;
      color: #FCFBF9;
    }

    .fallback-text {
      font-size: 0.85rem;
      color: #8A877E;
      margin-top: 1rem;
    }

    .fallback-link {
      color: #2D54E8;
      text-decoration: none;
      font-weight: 700;
    }

    .fallback-link:hover {
      text-decoration: underline;
    }
  </style>
  <script>
    var PLAY_URL = "https://app.pastedrops.com/"; 
    var APP_STORE_URL = "https://app.pastedrops.com/"; 
    var ua = navigator.userAgent || "";
    var dest = "https://app.pastedrops.com/";
    if (/android/i.test(ua)) dest = PLAY_URL;
    else if (/iphone|ipad|ipod/i.test(ua) || (/Mac/.test(ua) && "ontouchend" in document)) dest = APP_STORE_URL;
    
    setTimeout(function () { location.replace(dest); }, 50);
  <\/script>
</head>
<body>
  <div class="redirect-container">
    <svg class="spinner-drop" viewBox="0 0 1717 2242" xmlns="http://www.w3.org/2000/svg">
      <path d="M1647.99,745.708C2059.6,918.083 2758.683,1358.959 2758.683,1972.21C2758.683,2392.417 2417.528,2733.572 1997.321,2733.572C1577.114,2733.572 1235.959,2392.417 1235.959,1972.21C1235.959,1358.959 1890.308,1200.235 1647.99,745.708Z" fill="rgb(45,84,232)"/>
    </svg>
    <div class="status-text">Redirecting to the app...</div>
    <div class="fallback-text">
      Tap <a href="https://app.pastedrops.com/" id="fallback-lnk" class="fallback-link">here</a> if you're not redirected.
    </div>
  </div>
</body>
</html>`;
var PRIVACY_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Paste Drops Privacy Policy - How we handle your data.">
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Paste Drops" />
  <meta property="og:title" content="Paste Drops - Privacy Policy" />
  <meta property="og:description" content="Read how Paste Drops respects and protects your privacy." />
  <meta property="og:url" content="https://pastedrops.com/privacy" />
  <meta property="og:image" content="https://pastedrops.com/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Paste Drops - Privacy Policy" />
  <meta name="twitter:description" content="Read how Paste Drops respects and protects your privacy." />
  <meta name="twitter:image" content="https://pastedrops.com/og-image.png" />
  <title>Paste Drops - Privacy Policy</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: #141317;
      color: #FCFBF9;
      font-family: 'Space Grotesk', system-ui, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow-x: hidden;
      padding: 3rem 1.5rem;
    }

    .container {
      position: relative;
      width: 100%;
      max-width: 600px;
      z-index: 1;
    }

    .glow-orb {
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(0, 113, 233, 0.15) 0%, rgba(138, 36, 115, 0.05) 50%, rgba(20, 19, 23, 0) 100%);
      border-radius: 50%;
      z-index: -1;
      pointer-events: none;
    }

    .header {
      margin-bottom: 2.5rem;
      text-align: center;
    }

    .logo-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: #FCFBF9;
      font-weight: 700;
      font-size: 1.25rem;
      margin-bottom: 1.5rem;
    }

    .logo-drop {
      width: 24px;
      height: auto;
    }

    h1 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .updated {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: rgba(252, 251, 249, 0.45);
    }

    .section {
      background-color: #1c1a21;
      border: 1px solid rgba(252, 251, 249, 0.05);
      border-radius: 16px;
      padding: 1.5rem;
      margin-bottom: 1.25rem;
    }

    h2 {
      font-size: 1.1rem;
      font-weight: 700;
      color: #FCFBF9;
      margin-bottom: 0.75rem;
    }

    p {
      font-size: 0.925rem;
      color: rgba(252, 251, 249, 0.75);
      line-height: 1.6;
    }

    .footer {
      margin-top: 3rem;
      text-align: center;
      font-size: 0.8rem;
      color: rgba(252, 251, 249, 0.45);
    }

    .footer a {
      color: rgb(0, 113, 233);
      text-decoration: none;
      font-weight: 500;
    }

    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="glow-orb"></div>
    
    <div class="header">
      <a href="/" class="logo-link">
        <svg class="logo-drop" viewBox="580 340 1400 1820" xmlns="http://www.w3.org/2000/svg">
          <g transform="matrix(0.911426,0,0,0.911426,-540.014502,-337.82769)">
            <path d="M1647.99,745.708C2059.6,918.083 2758.683,1358.959 2758.683,1972.21C2758.683,2392.417 2417.528,2733.572 1997.321,2733.572C1577.114,2733.572 1235.959,2392.417 1235.959,1972.21C1235.959,1358.959 1890.308,1200.235 1647.99,745.708Z" fill="rgb(0,113,233)"/>
          </g>
          <g transform="matrix(1.010387,0,0,1.010387,-737.674871,-98.666943)">
            <path d="M2115.067,1326.418C2115.171,1328.449 2115.224,1330.494 2115.224,1332.55C2115.224,1397.622 2062.394,1450.451 1997.323,1450.451C1932.251,1450.451 1879.422,1397.622 1879.422,1332.55C1879.422,1273.172 1923.412,1223.986 1980.553,1215.835C1991.016,1195.985 1994.81,1173.389 1977.287,1134.829C2046.256,1183.552 2115.224,1227.964 2115.224,1321.098C2115.224,1322.884 2115.171,1324.658 2115.067,1326.418Z" fill="rgb(235,235,235)"/>
          </g>
          <g transform="matrix(1.010387,0,0,1.010387,-784.112183,-199.442883)">
            <path d="M1691.577,1661.866L1768.124,1661.866C1768.124,1813.831 1891.317,1937.024 2043.283,1937.024C2195.249,1937.024 2318.441,1813.831 2318.441,1661.866L2394.989,1661.866C2394.989,1856.108 2237.525,2013.572 2043.283,2013.572C1849.041,2013.572 1691.577,1856.108 1691.577,1661.866Z" fill="rgb(235,235,235)"/>
          </g>
        </svg>
        <span>Paste Drops</span>
      </a>
      <h1>Privacy Policy</h1>
      <div class="updated">Last updated: July 2026</div>
    </div>

    <div class="section">
      <h2>What Paste Drops does</h2>
      <p>When you type or speak a message to cool it, the text is processed via Google's Gemini API (on a paid plan, whose terms exclude your content from model training) to rewrite it. To read the result aloud, the cooled text is sent to the Gemini Flash Text-to-Speech (TTS) API, falling back to OpenAI's TTS on paid API plans when needed. The resulting audio is sent back to the phone for playback.</p>
    </div>

    <div class="section">
      <h2>Voice input processing</h2>
      <p>If you use voice input, the recorded audio is sent to the OpenAI Whisper API to be turned into a text string. That text string is then sent to the Gemini API to be cooled. Audio recordings are transient and are not stored permanently by us or our processors.</p>
    </div>

    <div class="section">
      <h2>What we store</h2>
      <p>We do not store your text, messages, or voice recordings. Our server keeps only anonymous running totals shared by all users: how many messages have been cooled, how many exclamation marks, all-caps words and strong words they contained overall, and how many times the mascot has been poked. These are plain numbers, computed in the moment and never linked to you, your device, or any individual message. A localized set of history and stats is saved strictly on your device only and is never sent or saved anywhere else.</p>
    </div>

    <div class="section">
      <h2>Abuse prevention</h2>
      <p>To keep the service working for everyone, our server briefly counts requests per internet address (IP). These counters delete themselves after about ten minutes and are never linked to your messages or used for anything else.</p>
    </div>

    <div class="section">
      <h2>Privacy and API terms</h2>
      <p>Under the paid and API developer terms of our third-party processors (Google and OpenAI), the text and audio data processed are not used to train models. They are used only to generate your cooled text and audio playback.</p>
    </div>

    <div class="section">
      <h2>Analytics</h2>
      <p>The mobile app uses Google Analytics for Firebase to collect anonymous usage statistics \u2014 things like app opens, screens viewed, device model, country, and your device's advertising identifier. We use this to understand how the app is used and to measure ads we may run to promote Paste Drops. Analytics never sees your messages, text, or audio. You can reset or delete your device's advertising ID at any time in your device settings (Settings &rarr; Privacy &rarr; Ads). For details on how Google processes this data, see <a href="https://policies.google.com/privacy">Google's Privacy Policy</a>.</p>
    </div>

    <div class="section">
      <h2>What we don't do</h2>
      <p>No ads inside the app. No selling your data. No persistent logging of your messages on any server.</p>
    </div>

    <div class="section">
      <h2>Age restriction</h2>
      <p>Paste Drops isn't directed at persons under 16.</p>
    </div>

    <div class="section">
      <h2>Contact</h2>
      <p>Questions? Email hello@pastedrops.com.</p>
    </div>

    <div class="footer">
      <p>\xA9 2026 Paste Drops. All rights reserved. <a href="/">Back to home</a></p>
    </div>
  </div>
</body>
</html>
`;
var DELETEDATA_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="How to delete your Paste Drops data.">
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Paste Drops" />
  <meta property="og:title" content="Paste Drops - Delete Your Data" />
  <meta property="og:description" content="How to delete your Paste Drops data." />
  <meta property="og:url" content="https://pastedrops.com/deletedata" />
  <meta property="og:image" content="https://pastedrops.com/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Paste Drops - Delete Your Data" />
  <meta name="twitter:description" content="How to delete your Paste Drops data." />
  <meta name="twitter:image" content="https://pastedrops.com/og-image.png" />
  <title>Paste Drops - Delete Your Data</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: #141317;
      color: #FCFBF9;
      font-family: 'Space Grotesk', system-ui, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow-x: hidden;
      padding: 3rem 1.5rem;
    }

    .container {
      position: relative;
      width: 100%;
      max-width: 600px;
      z-index: 1;
    }

    .glow-orb {
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(0, 113, 233, 0.15) 0%, rgba(138, 36, 115, 0.05) 50%, rgba(20, 19, 23, 0) 100%);
      border-radius: 50%;
      z-index: -1;
      pointer-events: none;
    }

    .header {
      margin-bottom: 2.5rem;
      text-align: center;
    }

    .logo-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: #FCFBF9;
      font-weight: 700;
      font-size: 1.25rem;
      margin-bottom: 1.5rem;
    }

    .logo-drop {
      width: 24px;
      height: auto;
    }

    h1 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .section {
      background-color: #1c1a21;
      border: 1px solid rgba(252, 251, 249, 0.05);
      border-radius: 16px;
      padding: 1.5rem;
      margin-bottom: 1.25rem;
    }

    h2 {
      font-size: 1.1rem;
      font-weight: 700;
      color: #FCFBF9;
      margin-bottom: 0.75rem;
    }

    p {
      font-size: 0.925rem;
      color: rgba(252, 251, 249, 0.75);
      line-height: 1.6;
    }

    p + p {
      margin-top: 0.75rem;
    }

    a {
      color: rgb(0, 113, 233);
      text-decoration: none;
      font-weight: 500;
    }

    a:hover {
      text-decoration: underline;
    }

    .footer {
      margin-top: 3rem;
      text-align: center;
      font-size: 0.8rem;
      color: rgba(252, 251, 249, 0.45);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="glow-orb"></div>

    <div class="header">
      <a href="/" class="logo-link">
        <svg class="logo-drop" viewBox="580 340 1400 1820" xmlns="http://www.w3.org/2000/svg">
          <g transform="matrix(0.911426,0,0,0.911426,-540.014502,-337.82769)">
            <path d="M1647.99,745.708C2059.6,918.083 2758.683,1358.959 2758.683,1972.21C2758.683,2392.417 2417.528,2733.572 1997.321,2733.572C1577.114,2733.572 1235.959,2392.417 1235.959,1972.21C1235.959,1358.959 1890.308,1200.235 1647.99,745.708Z" fill="rgb(0,113,233)"/>
          </g>
          <g transform="matrix(1.010387,0,0,1.010387,-737.674871,-98.666943)">
            <path d="M2115.067,1326.418C2115.171,1328.449 2115.224,1330.494 2115.224,1332.55C2115.224,1397.622 2062.394,1450.451 1997.323,1450.451C1932.251,1450.451 1879.422,1397.622 1879.422,1332.55C1879.422,1273.172 1923.412,1223.986 1980.553,1215.835C1991.016,1195.985 1994.81,1173.389 1977.287,1134.829C2046.256,1183.552 2115.224,1227.964 2115.224,1321.098C2115.224,1322.884 2115.171,1324.658 2115.067,1326.418Z" fill="rgb(235,235,235)"/>
          </g>
          <g transform="matrix(1.010387,0,0,1.010387,-784.112183,-199.442883)">
            <path d="M1691.577,1661.866L1768.124,1661.866C1768.124,1813.831 1891.317,1937.024 2043.283,1937.024C2195.249,1937.024 2318.441,1813.831 2318.441,1661.866L2394.989,1661.866C2394.989,1856.108 2237.525,2013.572 2043.283,2013.572C1849.041,2013.572 1691.577,1856.108 1691.577,1661.866Z" fill="rgb(235,235,235)"/>
          </g>
        </svg>
        <span>Paste Drops</span>
      </a>
      <h1>Delete Your Data</h1>
    </div>

    <div class="section">
      <h2>Your data lives on your device</h2>
      <p>Paste Drops has no accounts and stores nothing about you on our servers. Your messages, voice recordings, history, and stats exist only on your device. Our server keeps only anonymous global totals shared by all users (such as how many messages have been cooled), plus short-lived per-IP request counters for abuse prevention that delete themselves within minutes. None of it contains your content or can be linked to you.</p>
    </div>

    <div class="section">
      <h2>How to delete everything</h2>
      <p>On Android, go to Settings &rarr; Apps &rarr; Paste Drops &rarr; Storage &rarr; Clear data. Or simply uninstall the app.</p>
      <p>Either way, all of your history, stats, and preferences are permanently deleted. There is nothing to delete anywhere else \u2014 no server-side copy of your data exists.</p>
    </div>

    <div class="section">
      <h2>Anonymous analytics</h2>
      <p>The app collects anonymous usage statistics via Google Analytics for Firebase (app opens, screens viewed \u2014 never your messages). These are not linked to your identity and expire automatically. See our <a href="/privacy">Privacy Policy</a> for details.</p>
    </div>

    <div class="section">
      <h2>Contact</h2>
      <p>Questions? Email hello@pastedrops.com.</p>
    </div>

    <div class="footer">
      <p>\xA9 2026 Paste Drops. All rights reserved. <a href="/">Back to home</a></p>
    </div>
  </div>
</body>
</html>
`;
var stripTags = /* @__PURE__ */ __name((s) => s.replace(/<[^>]+>/g, ""), "stripTags");
var decodeEntities = /* @__PURE__ */ __name((s) => s.replace(/&rarr;/g, "\u2192").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim(), "decodeEntities");
function extractSections(html) {
  const out = [];
  const re = /<h2>([\s\S]*?)<\/h2>([\s\S]*?)<\/div>/g;
  let m;
  while (m = re.exec(html)) {
    const paras = [];
    const pre = /<p>([\s\S]*?)<\/p>/g;
    let p;
    while (p = pre.exec(m[2])) paras.push(decodeEntities(stripTags(p[1])));
    if (paras.length) out.push({ h: decodeEntities(stripTags(m[1])), b: paras.join("\n\n") });
  }
  return out;
}
__name(extractSections, "extractSections");
function legalJson() {
  const updated = (/Last updated:\s*([^<]+)</.exec(PRIVACY_HTML) || [])[1] || "";
  return {
    updated: updated.trim(),
    privacy: extractSections(PRIVACY_HTML),
    deletedata: extractSections(DELETEDATA_HTML)
  };
}
__name(legalJson, "legalJson");
var ADS_INTRO_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Paste Drops - Intro Ad Demo</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: #000000;
      color: #FCFBF9;
      font-family: 'Space Grotesk', system-ui, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .ad-frame {
      position: relative;
      width: 360px;
      height: 640px;
      background-color: #000000;
      border: 1px solid #1c1a21;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 20px 50px rgba(0,0,0,0.8);
    }

    .speech-bubble {
      position: absolute;
      top: 25%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      transform-origin: bottom center;
      background: #FCFBF9;
      color: #141317;
      padding: 0.85rem 1.25rem;
      border-radius: 18px;
      font-weight: 500;
      font-size: 0.95rem;
      width: 220px;
      text-align: center;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease;
      z-index: 10;
      pointer-events: none;
    }
    
    .speech-bubble::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      border-width: 8px 8px 0;
      border-style: solid;
      border-color: #FCFBF9 transparent;
      display: block;
      width: 0;
    }

    .speech-bubble.visible {
      transform: translate(-50%, -50%) scale(1);
    }

    .mascot-wrapper {
      position: absolute;
      width: 140px;
      height: 140px;
      left: 50%;
      margin-left: -70px;
      top: 40%;
      cursor: pointer;
      z-index: 5;
      transform: translateY(-150%) scale(1);
      user-select: none;
      -webkit-user-select: none;
    }

    .mascot-wrapper.dropping-in {
      animation: dropIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.15) forwards;
    }

    .mascot-wrapper.splashing {
      animation: splashDown 0.6s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards;
    }

    .mascot-wrapper.tickling {
      animation: tickleBounce 0.42s ease-out forwards;
    }

    @keyframes dropIn {
      0% { transform: translateY(-150%) scaleY(1.2); }
      70% { transform: translateY(5%) scaleY(0.85); }
      85% { transform: translateY(-2%) scaleY(1.05); }
      100% { transform: translateY(0) scaleY(1); }
    }

    @keyframes splashDown {
      0% { transform: translateY(0) scaleY(1); }
      20% { transform: translateY(-15px) scaleY(1.1); }
      100% { transform: translateY(280px) scaleY(0.9); }
    }

    @keyframes tickleBounce {
      0%   { transform: translateY(0) scale(1) rotate(0deg); }
      17%  { transform: translateY(-5px) scale(1.18) rotate(-10deg); }
      40%  { transform: translateY(-5px) scale(0.95) rotate(10deg); }
      60%  { transform: translateY(-5px) scale(1.05) rotate(-6deg); }
      78%  { transform: translateY(-5px) scale(0.98) rotate(4deg); }
      100% { transform: translateY(0) scale(1) rotate(0deg); }
    }

    .mascot-svg {
      width: 100%;
      height: 100%;
    }

    .logo-mascot-group {
      animation: floatBob 6s infinite ease-in-out;
      transform-box: fill-box;
      transform-origin: center;
    }

    .mascot-wrapper.asleep .logo-mascot-group {
      animation: floatBob 9s infinite ease-in-out;
    }

    .logo-mascot-eye {
      transform-box: fill-box;
      transform-origin: center;
      animation: eyeBlink 5s infinite ease-in-out;
    }

    .mascot-wrapper.asleep .logo-mascot-eye {
      animation: none;
      transform: scaleY(0.18);
    }

    @keyframes floatBob {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-3%) scale(1.02); }
    }

    @keyframes eyeBlink {
      0%, 90%, 94%, 98%, 100% { transform: scaleY(1); }
      92%, 96% { transform: scaleY(0.05); }
    }

    /* Zzz rising z's */
    .zzz-wrap {
      position: absolute;
      top: 36%;
      left: 58%;
      pointer-events: none;
      width: 0;
      height: 0;
      opacity: 0;
      z-index: 8;
      transition: opacity 0.4s ease;
    }
    .zzz-wrap.visible { opacity: 1; }

    .zzz-wrap .z {
      position: absolute;
      color: #fff;
      font-weight: 800;
      font-style: italic;
      opacity: 0;
    }
    .zzz-wrap.visible .z {
      animation: zFloat 1.9s ease-out infinite;
    }
    .zzz-wrap.visible .z:nth-child(1) { font-size: 13px; animation-delay: 0s; }
    .zzz-wrap.visible .z:nth-child(2) { font-size: 17px; animation-delay: 0.64s; }
    .zzz-wrap.visible .z:nth-child(3) { font-size: 22px; animation-delay: 1.28s; }

    @keyframes zFloat {
      0% { opacity: 0; transform: translate(0, 0) rotate(0deg) scale(0.6); }
      15% { opacity: 1; }
      85% { opacity: 1; }
      100% { opacity: 0; transform: translate(25px, -55px) rotate(8deg) scale(1.2); }
    }

    /* Water Container & Waves */
    .water-container {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 120px;
      background: #0071e9;
      z-index: 4;
    }

    .wave-svg {
      position: absolute;
      bottom: 100%;
      left: 0;
      width: 200%;
      height: 28px;
      fill: #0071e9;
      display: block;
    }

    .wave-back {
      fill: #0056b3;
      opacity: 0.6;
      animation: waveMoveBack 8s linear infinite;
      bottom: calc(100% - 4px);
    }

    .wave-front {
      animation: waveMoveFront 5s linear infinite;
    }

    @keyframes waveMoveFront {
      0% { transform: translate3d(0, 0, 0); }
      100% { transform: translate3d(-50%, 0, 0); }
    }

    @keyframes waveMoveBack {
      0% { transform: translate3d(-50%, 0, 0); }
      100% { transform: translate3d(0, 0, 0); }
    }

    /* Splash and Ripples */
    .splash-particle {
      position: absolute;
      background: #0071e9;
      border-radius: 50%;
      pointer-events: none;
      z-index: 6;
      animation: flyParticle 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }

    @keyframes flyParticle {
      0% { transform: translate(0, 0) scale(1); opacity: 1; }
      100% { transform: translate(var(--dx), var(--dy)) scale(0.2); opacity: 0; }
    }

    .ripple-ring {
      position: absolute;
      border: 3px solid rgba(252, 251, 249, 0.5);
      border-radius: 50%;
      pointer-events: none;
      z-index: 6;
      transform: translate(-50%, -50%) scale(0);
      opacity: 1;
    }

    .ripple-active {
      animation: expandRipple 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
    }

    @keyframes expandRipple {
      0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
    }

    /* Start Button Overlay for Autoplay Bypass */
    .start-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.6);
      z-index: 100;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .start-btn {
      padding: 0.8rem 1.6rem;
      background: #0071e9;
      color: #fff;
      font-weight: 700;
      text-transform: uppercase;
      border-radius: 999px;
      letter-spacing: 0.1em;
      box-shadow: 0 4px 15px rgba(0,113,233,0.4);
      font-size: 0.85rem;
      border: none;
    }
  </style>
</head>
<body>
  <div class="ad-frame">
    <!-- Tap to Start Overlay -->
    <div class="start-overlay" id="overlay">
      <button class="start-btn">Tap to Start Ad</button>
    </div>

    <!-- Speech Bubble -->
    <div class="speech-bubble" id="speech">Hi, I'm Cyclops. What's your beef?</div>
    
    <!-- Mascot -->
    <div class="mascot-wrapper" id="mascot">
      <svg class="mascot-svg" viewBox="580 340 1400 1820" version="1.1" xmlns="http://www.w3.org/2000/svg" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
        <g class="logo-mascot-group">
          <g transform="matrix(0.911426,0,0,0.911426,-540.014502,-337.82769)">
            <path d="M1647.99,745.708C2059.6,918.083 2758.683,1358.959 2758.683,1972.21C2758.683,2392.417 2417.528,2733.572 1997.321,2733.572C1577.114,2733.572 1235.959,2392.417 1235.959,1972.21C1235.959,1358.959 1890.308,1200.235 1647.99,745.708Z" fill="rgb(0,113,233)"/>
          </g>
          <g transform="matrix(1.010387,0,0,1.010387,-737.674871,-98.666943)">
            <path class="logo-mascot-eye" d="M2115.067,1326.418C2115.171,1328.449 2115.224,1330.494 2115.224,1332.55C2115.224,1397.622 2062.394,1450.451 1997.323,1450.451C1932.251,1450.451 1879.422,1397.622 1879.422,1332.55C1879.422,1273.172 1923.412,1223.986 1980.553,1215.835C1991.016,1195.985 1994.81,1173.389 1977.287,1134.829C2046.256,1183.552 2115.224,1227.964 2115.224,1321.098C2115.224,1322.884 2115.171,1324.658 2115.067,1326.418Z" fill="rgb(235,235,235)"/>
          </g>
          <g transform="matrix(1.010387,0,0,1.010387,-784.112183,-199.442883)">
            <path d="M1691.577,1661.866L1768.124,1661.866C1768.124,1813.831 1891.317,1937.024 2043.283,1937.024C2195.249,1937.024 2318.441,1813.831 2318.441,1661.866L2394.989,1661.866C2394.989,1856.108 2237.525,2013.572 2043.283,2013.572C1849.041,2013.572 1691.577,1856.108 1691.577,1661.866Z" fill="rgb(235,235,235)"/>
          </g>
        </g>
      </svg>
    </div>

    <!-- Zzz -->
    <div class="zzz-wrap" id="zzz"><span class="z">z</span><span class="z">z</span><span class="z">z</span></div>

    <!-- Ripple Ring -->
    <div class="ripple-ring" id="ripple"></div>

    <!-- Water & Waves -->
    <div class="water-container">
      <svg class="wave-svg wave-back" viewBox="0 0 240 28" preserveAspectRatio="none">
        <path d="M0,15 C30,5 90,25 120,15 C150,5 210,25 240,15 L240,35 L0,35 Z" />
      </svg>
      <svg class="wave-svg wave-front" viewBox="0 0 240 28" preserveAspectRatio="none">
        <path d="M0,15 C30,5 90,25 120,15 C150,5 210,25 240,15 L240,35 L0,35 Z" />
      </svg>
    </div>
  </div>

  <script>
    (function () {
      var overlay = document.getElementById('overlay');
      var mascot = document.getElementById('mascot');
      var speech = document.getElementById('speech');
      var zzz = document.getElementById('zzz');
      var ripple = document.getElementById('ripple');
      var frame = document.querySelector('.ad-frame');
      
      var tickleCount = 0;
      var isTransitioning = false;
      var idleTimer = null;
      var asleep = false;
      var audioStarted = false;

      var introAudio = new Audio('/intro_irish.mp3');
      var tickleSounds = ['/tickle1.mp3', '/tickle2.mp3', '/tickle3.mp3', '/tickle4.mp3'];
      var snoreAudio = new Audio('/snore.mp3');
      snoreAudio.loop = true;
      snoreAudio.volume = 0.35;

      function resetIdle() {
        if (idleTimer) clearTimeout(idleTimer);
        if (!isTransitioning) {
          idleTimer = setTimeout(fallAsleep, 8000);
        }
      }

      function wakeUp() {
        if (!asleep) return;
        asleep = false;
        mascot.classList.remove('asleep');
        zzz.classList.remove('visible');
        try { snoreAudio.pause(); } catch(e){}
      }

      function fallAsleep() {
        if (asleep || isTransitioning) return;
        asleep = true;
        mascot.classList.add('asleep');
        zzz.classList.add('visible');
        try { snoreAudio.currentTime = 0; snoreAudio.play(); } catch(e){}
      }

      function startAd() {
        overlay.style.display = 'none';
        audioStarted = true;
        
        // Reset state
        mascot.className = 'mascot-wrapper';
        tickleCount = 0;
        isTransitioning = false;
        
        // Trigger drop-in
        void mascot.offsetWidth;
        mascot.classList.add('dropping-in');

        // Play intro audio & show speech bubble
        setTimeout(function () {
          speech.classList.add('visible');
          try {
            introAudio.currentTime = 0;
            introAudio.play();
          } catch(e) {}
          resetIdle();
        }, 800);
      }

      overlay.addEventListener('click', startAd);

      mascot.addEventListener('click', function (e) {
        e.stopPropagation();
        if (isTransitioning) return;

        wakeUp();
        resetIdle();

        tickleCount++;

        if (tickleCount >= 3) {
          // Splash down!
          isTransitioning = true;
          clearTimeout(idleTimer);
          speech.classList.remove('visible');

          // Play random giggle
          try {
            var gig = new Audio(tickleSounds[Math.floor(Math.random() * tickleSounds.length)]);
            gig.volume = 0.6;
            gig.play();
          } catch(err) {}

          mascot.className = 'mascot-wrapper splashing';

          // Spawn ripple + splash particles
          setTimeout(function () {
            // Ripple ring
            ripple.style.left = '50%';
            ripple.style.top = '520px';
            ripple.classList.remove('ripple-active');
            void ripple.offsetWidth;
            ripple.classList.add('ripple-active');

            // Burst drops
            for (var i = 0; i < 15; i++) {
              createSplashParticle();
            }
          }, 350);

          // Reset loop
          setTimeout(function () {
            // Drop back in
            mascot.className = 'mascot-wrapper';
            tickleCount = 0;
            isTransitioning = false;
            void mascot.offsetWidth;
            mascot.classList.add('dropping-in');

            setTimeout(function () {
              speech.classList.add('visible');
              try {
                introAudio.currentTime = 0;
                introAudio.play();
              } catch(err) {}
              resetIdle();
            }, 800);

          }, 2800);

        } else {
          // Regular tickle giggle
          try {
            var gig = new Audio(tickleSounds[Math.floor(Math.random() * tickleSounds.length)]);
            gig.volume = 0.6;
            gig.play();
          } catch(err) {}

          mascot.className = 'mascot-wrapper';
          void mascot.offsetWidth;
          mascot.classList.add('tickling');
          setTimeout(function () {
            if (!isTransitioning) {
              mascot.className = 'mascot-wrapper';
            }
          }, 420);
        }
      });

      function createSplashParticle() {
        var p = document.createElement('div');
        p.className = 'splash-particle';
        
        // Water line is y=520, center is x=180
        p.style.left = '180px';
        p.style.top = '520px';

        var dx = (Math.random() - 0.5) * 160;
        var dy = -70 - Math.random() * 110;

        p.style.setProperty('--dx', dx + 'px');
        p.style.setProperty('--dy', dy + 'px');

        var sz = 6 + Math.random() * 8;
        p.style.width = sz + 'px';
        p.style.height = sz + 'px';

        frame.appendChild(p);

        setTimeout(function () {
          p.remove();
        }, 700);
      }
    })();
  <\/script>
</body>
</html>`;
var ADS_LOGO_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Paste Drops - Logo Ad Demo</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: #000000;
      color: #FCFBF9;
      font-family: 'Space Grotesk', system-ui, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .ad-frame {
      position: relative;
      width: 360px;
      height: 640px;
      background-color: #000000;
      border: 1px solid #1c1a21;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 20px 50px rgba(0,0,0,0.8);
      z-index: 1;
    }

    .glow-orb {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.3);
      width: 320px;
      height: 320px;
      background: radial-gradient(circle, rgba(0, 113, 233, 0.25) 0%, rgba(138, 36, 115, 0.08) 50%, rgba(0, 0, 0, 0) 100%);
      border-radius: 50%;
      z-index: -1;
      pointer-events: none;
      opacity: 0;
      animation: orbPulse 8s infinite alternate ease-in-out, orbFadeIn 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
    }

    @keyframes orbFadeIn {
      to { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
    }

    @keyframes orbPulse {
      0% { transform: translate(-50%, -50%) scale(1); }
      100% { transform: translate(-50%, -50%) scale(1.15); }
    }

    .logo-svg {
      width: 100%;
      max-width: 250px;
      height: 250px;
      filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.45));
    }

    /* SVG internal parts selectors */
    .logo-mascot-group {
      cursor: pointer;
    }

    .logo-mascot-wrapper-outer {
      animation: mascotDrop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.15) 0.6s both;
    }

    .logo-text-paste-wrapper {
      animation: pasteFadeIn 1.2s ease-out 0.2s both;
    }

    .logo-text-drops-wrapper {
      animation: dropsFadeIn 1.2s ease-out 0.2s both;
    }

    @keyframes mascotDrop {
      0% { transform: translateY(-350px); }
      70% { transform: translateY(10px); }
      85% { transform: translateY(-4px); }
      100% { transform: translateY(0); }
    }

    @keyframes pasteFadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }

    @keyframes dropsFadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }

    /* Active tickle states */
    .mascot-tickling {
      animation: tickleBounce 0.42s ease-out forwards;
    }

    @keyframes tickleBounce {
      0%   { transform: translateY(0) scale(1) rotate(0deg); }
      17%  { transform: translateY(-8px) scale(1.18) rotate(-10deg); }
      40%  { transform: translateY(-8px) scale(0.95) rotate(10deg); }
      60%  { transform: translateY(-8px) scale(1.05) rotate(-6deg); }
      78%  { transform: translateY(-8px) scale(0.98) rotate(4deg); }
      100% { transform: translateY(0) scale(1) rotate(0deg); }
    }

    .logo-mascot-eye {
      transform-box: fill-box;
      transform-origin: center;
      animation: eyeBlink 5s infinite ease-in-out;
    }

    .asleep .logo-mascot-eye {
      animation: none !important;
      transform: scaleY(0.18);
    }
    
    .asleep .logo-mascot-group {
      animation: asleepBob 9s infinite ease-in-out !important;
    }

    @keyframes asleepBob {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-2%) scale(1.01); }
    }

    @keyframes eyeBlink {
      0%, 90%, 94%, 98%, 100% { transform: scaleY(1); }
      92%, 96% { transform: scaleY(0.05); }
    }

    /* Zzz rising z's */
    .zzz-wrap {
      position: absolute;
      top: 26%;
      left: 56%;
      pointer-events: none;
      width: 0;
      height: 0;
      opacity: 0;
      z-index: 8;
      transition: opacity 0.4s ease;
    }
    .zzz-wrap.visible { opacity: 1; }

    .zzz-wrap .z {
      position: absolute;
      color: #fff;
      font-weight: 800;
      font-style: italic;
      opacity: 0;
    }
    .zzz-wrap.visible .z {
      animation: zFloat 1.9s ease-out infinite;
    }
    .zzz-wrap.visible .z:nth-child(1) { font-size: 13px; animation-delay: 0s; }
    .zzz-wrap.visible .z:nth-child(2) { font-size: 17px; animation-delay: 0.64s; }
    .zzz-wrap.visible .z:nth-child(3) { font-size: 22px; animation-delay: 1.28s; }

    @keyframes zFloat {
      0% { opacity: 0; transform: translate(0, 0) rotate(0deg) scale(0.6); }
      15% { opacity: 1; }
      85% { opacity: 1; }
      100% { opacity: 0; transform: translate(22px, -52px) rotate(8deg) scale(1.2); }
    }

    /* Taglines */
    .taglines-container {
      margin-top: 1.8rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .tagline {
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.18em;
      color: #9C998F;
      animation: taglineFadeUp 0.8s cubic-bezier(0.25, 1, 0.5, 1) 1.3s both;
    }

    .sub-tagline {
      font-size: 1.1rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #FCFBF9;
      margin-top: 0.8rem;
      animation: subtaglineFadeUpGlow 1.2s cubic-bezier(0.25, 1, 0.5, 1) 1.8s both;
    }

    @keyframes taglineFadeUp {
      0% { transform: translateY(20px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }

    @keyframes subtaglineFadeUpGlow {
      0% { transform: translateY(20px); opacity: 0; }
      100% {
        transform: translateY(0);
        opacity: 1;
        text-shadow: 0 0 15px rgba(0, 113, 233, 0.8);
      }
    }
  </style>
</head>
<body>
  <div class="ad-frame">
    <div class="glow-orb"></div>
    
    <!-- logo SVG -->
    <svg class="logo-svg" viewBox="0 0 4309 4286" version="1.1" xmlns="http://www.w3.org/2000/svg" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
      <g class="logo-mascot-wrapper-outer">
        <g class="logo-mascot-group" id="logo-mascot">
          <g class="logo-mascot-body" transform="matrix(0.911426,0,0,0.911426,-540.014502,-337.82769)">
            <path d="M1647.99,745.708C2059.6,918.083 2758.683,1358.959 2758.683,1972.21C2758.683,2392.417 2417.528,2733.572 1997.321,2733.572C1577.114,2733.572 1235.959,2392.417 1235.959,1972.21C1235.959,1358.959 1890.308,1200.235 1647.99,745.708Z" fill="rgb(0,113,233)"/>
          </g>
          <g transform="matrix(1.010387,0,0,1.010387,-737.674871,-98.666943)">
            <path class="logo-mascot-eye" d="M2115.067,1326.418C2115.171,1328.449 2115.224,1330.494 2115.224,1332.55C2115.224,1397.622 2062.394,1450.451 1997.323,1450.451C1932.251,1450.451 1879.422,1397.622 1879.422,1332.55C1879.422,1273.172 1923.412,1223.986 1980.553,1215.835C1991.016,1195.985 1994.81,1173.389 1977.287,1134.829C2046.256,1183.552 2115.224,1227.964 2115.224,1321.098C2115.224,1322.884 2115.171,1324.658 2115.067,1326.418Z" fill="rgb(235,235,235)"/>
          </g>
          <g class="logo-mascot-mouth" transform="matrix(1.010387,0,0,1.010387,-784.112183,-199.442883)">
            <path d="M1691.577,1661.866L1768.124,1661.866C1768.124,1813.831 1891.317,1937.024 2043.283,1937.024C2195.249,1937.024 2318.441,1813.831 2318.441,1661.866L2394.989,1661.866C2394.989,1856.108 2237.525,2013.572 2043.283,2013.572C1849.041,2013.572 1691.577,1856.108 1691.577,1661.866Z" fill="rgb(235,235,235)"/>
          </g>
        </g>
      </g>
      <g class="logo-text-paste-wrapper">
        <g class="logo-text-paste" transform="matrix(27.519515,0,0,27.519515,-89252.619706,-27597.784421)">
          <g transform="matrix(50,0,0,50,3252.204221,1113.602066)">
            <path d="M0.07,0.2L0.07,-0.496L0.194,-0.496L0.194,-0.436L0.212,-0.436C0.223,-0.455 0.241,-0.472 0.265,-0.487C0.289,-0.503 0.323,-0.51 0.368,-0.51C0.408,-0.51 0.445,-0.5 0.479,-0.48C0.513,-0.461 0.54,-0.432 0.561,-0.394C0.582,-0.356 0.592,-0.31 0.592,-0.256L0.592,-0.24C0.592,-0.186 0.582,-0.14 0.561,-0.102C0.54,-0.064 0.513,-0.035 0.479,-0.015C0.445,0.004 0.408,0.014 0.368,0.014C0.338,0.014 0.313,0.011 0.292,0.004C0.272,-0.004 0.256,-0.012 0.243,-0.024C0.231,-0.035 0.221,-0.046 0.214,-0.057L0.196,-0.057L0.196,0.2L0.07,0.2ZM0.33,-0.096C0.369,-0.096 0.402,-0.108 0.427,-0.134C0.453,-0.159 0.466,-0.195 0.466,-0.243L0.466,-0.253C0.466,-0.301 0.453,-0.337 0.427,-0.362C0.401,-0.388 0.369,-0.4 0.33,-0.4C0.291,-0.4 0.259,-0.388 0.233,-0.362C0.207,-0.337 0.194,-0.301 0.194,-0.253L0.194,-0.243C0.194,-0.195 0.207,-0.159 0.233,-0.134C0.259,-0.108 0.291,-0.096 0.33,-0.096Z" fill="white" fill-rule="nonzero"/>
          </g>
          <g transform="matrix(50,0,0,50,3284.104221,1113.602066)">
            <path d="M0.224,0.014C0.189,0.014 0.157,0.008 0.129,-0.005C0.101,-0.017 0.079,-0.035 0.062,-0.059C0.046,-0.082 0.038,-0.111 0.038,-0.145C0.038,-0.179 0.046,-0.208 0.062,-0.231C0.079,-0.254 0.101,-0.271 0.131,-0.283C0.16,-0.294 0.193,-0.3 0.23,-0.3L0.366,-0.3L0.366,-0.328C0.366,-0.351 0.359,-0.37 0.344,-0.386C0.329,-0.401 0.306,-0.408 0.274,-0.408C0.243,-0.408 0.219,-0.401 0.204,-0.387C0.189,-0.372 0.179,-0.354 0.174,-0.331L0.058,-0.37C0.066,-0.395 0.079,-0.419 0.097,-0.44C0.114,-0.46 0.138,-0.478 0.168,-0.49C0.197,-0.503 0.233,-0.51 0.276,-0.51C0.341,-0.51 0.393,-0.494 0.431,-0.461C0.469,-0.428 0.488,-0.381 0.488,-0.319L0.488,-0.134C0.488,-0.114 0.497,-0.104 0.516,-0.104L0.556,-0.104L0.556,-0L0.472,-0C0.447,-0 0.427,-0.006 0.411,-0.018C0.395,-0.03 0.387,-0.046 0.387,-0.066L0.387,-0.067L0.368,-0.067C0.365,-0.059 0.359,-0.049 0.35,-0.036C0.341,-0.023 0.326,-0.011 0.306,-0.001C0.286,0.009 0.259,0.014 0.224,0.014ZM0.246,-0.088C0.281,-0.088 0.31,-0.098 0.333,-0.118C0.355,-0.137 0.366,-0.163 0.366,-0.196L0.366,-0.206L0.239,-0.206C0.216,-0.206 0.197,-0.201 0.184,-0.191C0.171,-0.181 0.164,-0.167 0.164,-0.149C0.164,-0.131 0.171,-0.116 0.185,-0.105C0.199,-0.094 0.219,-0.088 0.246,-0.088Z" fill="white" fill-rule="nonzero"/>
          </g>
          <g transform="matrix(50,0,0,50,3312.804221,1113.602066)">
            <path d="M0.276,0.014C0.211,0.014 0.158,0 0.117,-0.028C0.076,-0.056 0.051,-0.096 0.042,-0.148L0.158,-0.178C0.163,-0.155 0.171,-0.136 0.181,-0.123C0.193,-0.11 0.206,-0.1 0.223,-0.095C0.239,-0.089 0.257,-0.086 0.276,-0.086C0.305,-0.086 0.327,-0.091 0.341,-0.102C0.355,-0.112 0.362,-0.125 0.362,-0.14C0.362,-0.155 0.355,-0.167 0.342,-0.176C0.329,-0.184 0.307,-0.191 0.278,-0.196L0.25,-0.201C0.215,-0.208 0.184,-0.217 0.155,-0.229C0.126,-0.24 0.103,-0.256 0.086,-0.277C0.069,-0.298 0.06,-0.324 0.06,-0.357C0.06,-0.406 0.078,-0.444 0.114,-0.471C0.15,-0.497 0.197,-0.51 0.256,-0.51C0.311,-0.51 0.357,-0.498 0.394,-0.473C0.431,-0.448 0.455,-0.416 0.466,-0.376L0.349,-0.34C0.344,-0.365 0.333,-0.383 0.317,-0.394C0.3,-0.405 0.28,-0.41 0.256,-0.41C0.232,-0.41 0.214,-0.406 0.201,-0.398C0.188,-0.389 0.182,-0.378 0.182,-0.363C0.182,-0.347 0.189,-0.335 0.202,-0.328C0.215,-0.32 0.233,-0.314 0.256,-0.31L0.284,-0.305C0.321,-0.298 0.355,-0.29 0.386,-0.279C0.416,-0.268 0.44,-0.252 0.458,-0.232C0.475,-0.211 0.484,-0.184 0.484,-0.149C0.484,-0.097 0.465,-0.057 0.427,-0.029C0.39,-0 0.339,0.014 0.276,0.014Z" fill="white" fill-rule="nonzero"/>
          </g>
          <g transform="matrix(50,0,0,50,3338.504221,1113.602066)">
            <path d="M0.26,-0C0.227,-0 0.201,-0.01 0.18,-0.03C0.16,-0.051 0.15,-0.078 0.15,-0.112L0.15,-0.392L0.026,-0.392L0.026,-0.496L0.15,-0.496L0.15,-0.65L0.276,-0.65L0.276,-0.496L0.412,-0.496L0.412,-0.392L0.276,-0.392L0.276,-0.134C0.276,-0.114 0.285,-0.104 0.304,-0.104L0.4,-0.104L0.4,-0L0.26,-0Z" fill="white" fill-rule="nonzero"/>
          </g>
          <g transform="matrix(50,0,0,50,3360.404221,1113.602066)">
            <path d="M0.296,0.014C0.247,0.014 0.203,0.003 0.166,-0.018C0.128,-0.038 0.098,-0.068 0.077,-0.106C0.056,-0.145 0.046,-0.19 0.046,-0.242L0.046,-0.254C0.046,-0.306 0.056,-0.351 0.077,-0.39C0.098,-0.428 0.127,-0.458 0.164,-0.479C0.201,-0.499 0.245,-0.51 0.294,-0.51C0.343,-0.51 0.385,-0.499 0.421,-0.478C0.457,-0.456 0.485,-0.426 0.505,-0.388C0.525,-0.349 0.535,-0.305 0.535,-0.254L0.535,-0.211L0.174,-0.211C0.175,-0.177 0.188,-0.149 0.212,-0.128C0.236,-0.107 0.265,-0.096 0.3,-0.096C0.335,-0.096 0.361,-0.104 0.378,-0.119C0.395,-0.134 0.407,-0.151 0.416,-0.17L0.519,-0.116C0.51,-0.099 0.496,-0.08 0.479,-0.06C0.461,-0.039 0.437,-0.022 0.408,-0.007C0.379,0.007 0.341,0.014 0.296,0.014ZM0.175,-0.305L0.407,-0.305C0.404,-0.334 0.393,-0.357 0.372,-0.374C0.352,-0.391 0.326,-0.4 0.293,-0.4C0.259,-0.4 0.232,-0.391 0.212,-0.374C0.192,-0.357 0.18,-0.334 0.175,-0.305Z" fill="white" fill-rule="nonzero"/>
          </g>
        </g>
      </g>
      <g class="logo-text-drops-wrapper">
        <g class="logo-text-drops" transform="matrix(18.548479,0,0,18.548479,-66277.165906,-23583.23928)">
          <text x="3602.204px" y="1473.602px" style="font-family:'SpaceGrotesk-Medium', 'Space Grotesk';font-weight:500;font-size:50px;fill:rgb(138,135,126);">dr<tspan x="3652.704px " y="1473.602px ">o</tspan>ps</text>
        </g>
      </g>
    </svg>

    <div class="zzz-wrap" id="zzz"><span class="z">z</span><span class="z">z</span><span class="z">z</span></div>

    <div class="taglines-container">
      <div class="tagline">the text you meant to send.</div>
      <div class="sub-tagline">Any language. Any chaos.</div>
    </div>
  </div>

  <script>
    (function () {
      var mascot = document.getElementById('logo-mascot');
      var zzz = document.getElementById('zzz');
      var tickleSounds = ['/tickle1.mp3', '/tickle2.mp3', '/tickle3.mp3', '/tickle4.mp3'];
      
      var playing = false;
      var asleep = false;
      var idleTimer = null;
      var snoreAudio = null;

      function resetIdle() {
        if (idleTimer) clearTimeout(idleTimer);
        idleTimer = setTimeout(fallAsleep, 12000);
      }

      function wakeUp() {
        if (!asleep) return;
        asleep = false;
        mascot.classList.remove('asleep');
        zzz.classList.remove('visible');
        document.querySelector('.ad-frame').classList.remove('asleep');
        try { if (snoreAudio) snoreAudio.pause(); } catch(e){}
      }

      function fallAsleep() {
        if (asleep) return;
        asleep = true;
        mascot.classList.add('asleep');
        zzz.classList.add('visible');
        document.querySelector('.ad-frame').classList.add('asleep');
        try {
          if (!snoreAudio) {
            snoreAudio = new Audio('/snore.mp3');
            snoreAudio.loop = true;
            snoreAudio.volume = 0.35;
          }
          snoreAudio.currentTime = 0;
          snoreAudio.play();
        } catch(e){}
      }

      resetIdle();

      mascot.addEventListener('click', function (e) {
        e.stopPropagation();
        wakeUp();
        resetIdle();

        // Play random tickle bloop
        try {
          var aud = new Audio(tickleSounds[Math.floor(Math.random() * tickleSounds.length)]);
          aud.volume = 0.7;
          aud.play();
        } catch(err) {}

        // Trigger tickle bounce
        if (playing) {
          mascot.classList.remove('mascot-tickling');
          void mascot.offsetWidth;
        }
        mascot.classList.add('mascot-tickling');
        playing = true;

        setTimeout(function () {
          mascot.classList.remove('mascot-tickling');
          playing = false;
        }, 420);
      });
    })();
  <\/script>
</body>
</html>`;
var src_default = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (path === "/api/legal" && request.method === "GET") {
      return new Response(JSON.stringify(legalJson()), {
        headers: {
          "content-type": "application/json",
          "cache-control": "public, max-age=3600",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
    if (path === "/favicon.svg" || path === "/favicon.ico") {
      return new Response(FAVICON_SVG, {
        headers: {
          "content-type": "image/svg+xml",
          "cache-control": "public, max-age=86400"
        }
      });
    }
    if (path === "/" || path === "/index.html") {
      return new Response(LANDING_HTML, {
        headers: {
          "content-type": "text/html;charset=UTF-8",
          "cache-control": "public, max-age=3600"
        }
      });
    }
    if (path === "/getapp" || path === "/getapp/") {
      return new Response(APP_HTML, {
        headers: {
          "content-type": "text/html;charset=UTF-8",
          "cache-control": "public, max-age=60"
        }
      });
    }
    if (path === "/deletedata" || path === "/deletedata/") {
      return new Response(DELETEDATA_HTML, {
        headers: {
          "content-type": "text/html;charset=UTF-8",
          "cache-control": "public, max-age=3600"
        }
      });
    }
    if (path === "/privacy" || path === "/privacy/") {
      return new Response(PRIVACY_HTML, {
        headers: {
          "content-type": "text/html;charset=UTF-8",
          "cache-control": "public, max-age=3600"
        }
      });
    }
    if (path === "/ads/intro" || path === "/ads/intro/") {
      return new Response(ADS_INTRO_HTML, {
        headers: {
          "content-type": "text/html;charset=UTF-8",
          "cache-control": "no-store"
        }
      });
    }
    if (path === "/ads/logo" || path === "/ads/logo/") {
      return new Response(ADS_LOGO_HTML, {
        headers: {
          "content-type": "text/html;charset=UTF-8",
          "cache-control": "no-store"
        }
      });
    }
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }
    return new Response("Not Found", { status: 404 });
  }
};

// ../../../../../AppData/Roaming/npm/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../../../AppData/Roaming/npm/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-bNsHaO/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// ../../../../../AppData/Roaming/npm/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-bNsHaO/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
