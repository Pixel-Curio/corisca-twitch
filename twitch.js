/* Description:
 *   Formats Twitch videos for optimal viewing
 *
 * Dependencies:
 *   none
 *
 * Author:
 *    pixel-cur.io
 */

module.exports = function(corsica) {
  
  // use minimal embedding template from Twitch
  var template = `
  <div id='twitch-embed' style='position:absolute;top:0;left:0;width:100%;height:100%;'></div>
  <script src='https://embed.twitch.tv/embed/v1.js'></script>
  <script type='text/javascript'>
    var embed = new Twitch.Embed('twitch-embed', {width:'100%', height:'100%', channel: '{{id}}', theme:'dark', layout:'video'});
    embed.addEventListener(Twitch.Embed.VIDEO_PLAY, function() {
      var player = embed.getPlayer();
      player.setVolume({{volume}});
    });
  </script>`
  
  // Transform twitch entries into embeds using id property
  corsica.on('twitch', function(content) {
    
    // replace {{id}} placeholder in template string
    var page = template.replace('{{id}}', content.id);
    page = page.replace('{{volume}}', content.volume);
    
    // send back page as html content
     corsica.sendMessage('content', {
      type: 'html',
      content: page,
      screen: content.screen
    });
    
    // return content for the sake of other chained plugins
    return content;
  });
  
}