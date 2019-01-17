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
        // case 'kamidere': // sometimes errored with autoplay.
        //     const enc = 
        //     const dec = CryptoJS.RC4.decrypt(enc, channel)
        //     playerbox.innerHTML = CryptoJS.enc.Utf8.stringify(dec);
        //     let vjsPlayer = videojs('#player');
        //     vjsPlayer.play();
        //     break;
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