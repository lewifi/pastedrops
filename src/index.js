const LANDING_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
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
  </script>
</body>
</html>`;

const APP_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
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
  </script>
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

const PRIVACY_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
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
        <svg class="logo-drop" viewBox="0 0 1717 2242" xmlns="http://www.w3.org/2000/svg">
          <path d="M1647.99,745.708C2059.6,918.083 2758.683,1358.959 2758.683,1972.21C2758.683,2392.417 2417.528,2733.572 1997.321,2733.572C1577.114,2733.572 1235.959,2392.417 1235.959,1972.21C1235.959,1358.959 1890.308,1200.235 1647.99,745.708Z" fill="rgb(0,113,233)"/>
        </svg>
        <span>Paste Drops</span>
      </a>
      <h1>Privacy Policy</h1>
      <div class="updated">Last updated: July 2026</div>
    </div>

    <div class="section">
      <h2>What Paste Drops does</h2>
      <p>When you type or speak a message to cool it, the text is processed via Google's Gemini API (using a free tier plan) to rewrite it. To read the result aloud, the cooled text is sent to the Gemini Flash Text-to-Speech (TTS) API, falling back to OpenAI's TTS on paid API plans when needed. The resulting audio is sent back to the phone for playback.</p>
    </div>

    <div class="section">
      <h2>Voice input processing</h2>
      <p>If you use voice input, the recorded audio is sent to the OpenAI Whisper API to be turned into a text string. That text string is then sent to the Gemini API to be cooled. Audio recordings are transient and are not stored permanently by us or our processors.</p>
    </div>

    <div class="section">
      <h2>What we store</h2>
      <p>We do not store your text, messages, or voice recordings. Only a global, anonymous conversion count (the total number of messages cooled) is stored on our server to show global stats. A localized set of history and stats is saved strictly on your device only and is never sent or saved anywhere else.</p>
    </div>

    <div class="section">
      <h2>Privacy and API terms</h2>
      <p>Under the paid and API developer terms of our third-party processors (Google and OpenAI), the text and audio data processed are not used to train models. They are used only to generate your cooled text and audio playback.</p>
    </div>

    <div class="section">
      <h2>Analytics</h2>
      <p>The mobile app uses Google Analytics for Firebase to collect anonymous usage statistics — things like app opens, screens viewed, device model, country, and your device's advertising identifier. We use this to understand how the app is used and to measure ads we may run to promote Paste Drops. Analytics never sees your messages, text, or audio. You can reset or delete your device's advertising ID at any time in your device settings (Settings &rarr; Privacy &rarr; Ads). For details on how Google processes this data, see <a href="https://policies.google.com/privacy">Google's Privacy Policy</a>.</p>
    </div>

    <div class="section">
      <h2>What we don't do</h2>
      <p>No ads inside the app. No selling your data. No persistent logging of your messages on any server.</p>
    </div>

    <div class="section">
      <h2>Children</h2>
      <p>Paste Drops isn't directed at children under 13.</p>
    </div>

    <div class="section">
      <h2>Contact</h2>
      <p>Questions? Email hello@pastedrops.com.</p>
    </div>

    <div class="footer">
      <p>© 2026 Paste Drops. All rights reserved. <a href="/">Back to home</a></p>
    </div>
  </div>
</body>
</html>
`;

const DELETEDATA_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
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
        <svg class="logo-drop" viewBox="0 0 1717 2242" xmlns="http://www.w3.org/2000/svg">
          <path d="M1647.99,745.708C2059.6,918.083 2758.683,1358.959 2758.683,1972.21C2758.683,2392.417 2417.528,2733.572 1997.321,2733.572C1577.114,2733.572 1235.959,2392.417 1235.959,1972.21C1235.959,1358.959 1890.308,1200.235 1647.99,745.708Z" fill="rgb(0,113,233)"/>
        </svg>
        <span>Paste Drops</span>
      </a>
      <h1>Delete Your Data</h1>
    </div>

    <div class="section">
      <h2>Your data lives on your device</h2>
      <p>Paste Drops has no accounts and stores nothing about you on our servers. Your messages, voice recordings, history, and stats exist only on your device. The single thing our server keeps is a global, anonymous counter of how many messages have been cooled in total — it contains nothing about you and cannot be linked to you.</p>
    </div>

    <div class="section">
      <h2>How to delete everything</h2>
      <p>On Android, go to Settings &rarr; Apps &rarr; Paste Drops &rarr; Storage &rarr; Clear data. Or simply uninstall the app.</p>
      <p>Either way, all of your history, stats, and preferences are permanently deleted. There is nothing to delete anywhere else — no server-side copy of your data exists.</p>
    </div>

    <div class="section">
      <h2>Anonymous analytics</h2>
      <p>The app collects anonymous usage statistics via Google Analytics for Firebase (app opens, screens viewed — never your messages). These are not linked to your identity and expire automatically. See our <a href="/privacy">Privacy Policy</a> for details.</p>
    </div>

    <div class="section">
      <h2>Contact</h2>
      <p>Questions? Email hello@pastedrops.com.</p>
    </div>

    <div class="footer">
      <p>© 2026 Paste Drops. All rights reserved. <a href="/">Back to home</a></p>
    </div>
  </div>
</body>
</html>
`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/' || path === '/index.html') {
      return new Response(LANDING_HTML, {
        headers: { 
          'content-type': 'text/html;charset=UTF-8',
          'cache-control': 'public, max-age=3600'
        }
      });
    }

    if (path === '/getapp' || path === '/getapp/') {
      return new Response(APP_HTML, {
        headers: { 
          'content-type': 'text/html;charset=UTF-8',
          'cache-control': 'public, max-age=60'
        }
      });
    }

    if (path === '/deletedata' || path === '/deletedata/') {
      return new Response(DELETEDATA_HTML, {
        headers: {
          'content-type': 'text/html;charset=UTF-8',
          'cache-control': 'public, max-age=3600'
        }
      });
    }

    if (path === '/privacy' || path === '/privacy/') {
      return new Response(PRIVACY_HTML, {
        headers: { 
          'content-type': 'text/html;charset=UTF-8',
          'cache-control': 'public, max-age=3600'
        }
      });
    }

    // Fall back to static assets via the ASSETS binding
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  }
};
