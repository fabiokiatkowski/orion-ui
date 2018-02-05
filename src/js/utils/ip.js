/* Get on this site:
  https://ourcodeworld.com/articles/read/257/how-to-get-the-client-ip-address-with-javascript-only  */

export default new Promise((resolve, reject) => {
  const MyPeerConnection = window.RTCPeerConnection
    || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
  const pc = new MyPeerConnection({
    iceServers: []
  });
  const noop = () => {};
  const localIPs = {};
  const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;

  const iterateIP = (ip) => {
    if (!localIPs[ip]) resolve(ip);
    localIPs[ip] = true;
  };

  pc.createDataChannel('');

  pc.createOffer().then((sdp) => {
    sdp.sdp.split('\n').forEach((line) => {
      if (line.indexOf('candidate') < 0) return;
      line.match(ipRegex).forEach(iterateIP);
    });
    pc.setLocalDescription(sdp, noop, noop);
  }).catch((reason) => {
    console.error(reason);
    reject(reason);
  });

  pc.onicecandidate = (ice) => {
    if (!ice || !ice.candidate || !ice.candidate.candidate
      || !ice.candidate.candidate.match(ipRegex)) return;
    ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
  };
});
