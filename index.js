/**
 * @author RunAge
 * @license MIT
 */
const rootElement = document.getElementById('root');
const playerbox = document.getElementById('player-box');
if(rootElement) {
    locationHandler(document.location.search)
}
/**
 * Loading discord chat from widgetbot.io
 */
const embed = document.getElementById('chat')

/**
 * Handling search location 
 * @param {String} location Search location.
 */
function locationHandler(location) {
    if(!location && location.length <= 0) return loader('twitch');
    location.startsWith('?') ?  location = location.substr(1).split('&') : location = location.split('&');
    const mapLocation = new Map();
    for(arg of location) {
        arg = arg.split('=');
        mapLocation.set(arg[0], arg[1] || arg[0])
    };
    if(mapLocation.get('page')){
        if(mapLocation.get('channel'))
            return loader(mapLocation.get('page'), mapLocation.get('channel'));
        return loader(mapLocation.get('page'));
    }
    return console.error(new Error('PAGE IS UNDEFINED'))
}


/**
 * Loading player from specify source.
 * @param {String} player Player name to load.
 */
function loader(player, channel) {
    switch(player) {
        case 'kamidere': // sometimes errored with autoplay.
            const enc = JSON.parse("{\"$super\":{\"$super\":{}},\"ciphertext\":{\"words\":[-450642489,1166248010,-284782118,-239575183,1010879585,233077464,474979466,1681383821,783974658,-471521362,-1897965097,96977638,-2002120163,1501300576,-496280455,-2035857436,-77818978,1962317087,1054412315,342247556,1557674095,644634195,-1207335738,974943964,-527219191,2013263215,111924539,1901138963,-2122340550,854472108,-884056715,267703955,-666090107,-1212935066,-625518086,1442609357,268787962,9471570,673665320,-871291532,-447062331,-1995761953,361023559,495995975,-1522017280,-2025414748,-1553715938,1304079228,1205130414,678253701,-44650913,-217313383,-1462248726,254431171,1322221478,2044184235,596740268,1015702948,-1827283336,-695035355,503275136,-680400553,-1891250552,1889818950,1610699168,871333860,-2117932687,1749057266,1982187837,-1538415461,991764654,-1217835383,1813529917,-762617200,-1876431579,542102955,-800001049,-150938029,-2075046720,540667813,-1026234767,-1115486198,-1444289241,-80626491,1579549429,-1721384931,-1399084291,-508622540,-967381935,-1859904041,167859147,241072645,1413633616,-760616311,-1497908552],\"sigBytes\":380},\"key\":{\"$super\":{\"$super\":{}},\"words\":[-946754986,-198213963,-1125581972,951684756,-1904246917,-555336318,1285822281,1659429899],\"sigBytes\":32},\"iv\":{\"$super\":{\"$super\":{}},\"words\":[],\"sigBytes\":0},\"algorithm\":{\"keySize\":8,\"ivSize\":0,\"$super\":{\"blockSize\":1,\"$super\":{\"cfg\":{\"$super\":{}},\"keySize\":4,\"ivSize\":4,\"_ENC_XFORM_MODE\":1,\"_DEC_XFORM_MODE\":2,\"$super\":{\"_minBufferSize\":0,\"$super\":{}}}}},\"blockSize\":1,\"formatter\":{},\"salt\":{\"words\":[-2130739970,-1758213954],\"sigBytes\":8}}")
            const dec = CryptoJS.RC4.decrypt(enc, channel)
            playerbox.innerHTML = CryptoJS.enc.Utf8.stringify(dec);
            let vjsPlayer = videojs('#player');
            vjsPlayer.play();
            break;
        case 'twitch':
            playerbox.innerHTML = `
            <iframe id="player"
                src="https://player.twitch.tv/?channel=${channel || "runage_"}"
                frameborder="0"
                scrolling="no"
                allowfullscreen="true">
            </iframe>
            `
            break;
        case 'mixer':
            playerbox.innerHTML =  `
            <iframe
                id="player"
                frameborder="0"
                scrolling="no"
                src="https://mixer.com/embed/player/${channel || "RunAge"}">
            </iframe>`
            break;
        case 'yt':
            playerbox.innerHTML = `
            <iframe 
                id="player"
                src="https://www.youtube.com/embed/live_stream?channel=${channel || "UClD7jndTvozS5_a9cQSBAfw"}"
                frameborder="0"
                scrolling="no"
                allowfullscreen>
            </iframe>
            `
            break;
    }
}