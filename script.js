(function(){
    var script = {
 "mouseWheelEnabled": true,
 "start": "this.init()",
 "scrollBarWidth": 10,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "vrPolyfillScale": 0.5,
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "backgroundPreloadEnabled": true,
 "children": [
  "this.MainViewer",
  {
   "propagateClick": false,
   "children": [
    "this.Container_52344940_5F01_EFC4_41D4_ABA40101D8BF"
   ],
   "horizontalAlign": "center",
   "left": "0%",
   "paddingLeft": 0,
   "scrollBarColor": "#000000",
   "paddingRight": 0,
   "borderSize": 0,
   "scrollBarVisible": "rollOver",
   "layout": "horizontal",
   "minHeight": 1,
   "verticalAlign": "middle",
   "scrollBarOpacity": 0.5,
   "bottom": "0%",
   "contentOpaque": false,
   "minWidth": 1,
   "scrollBarMargin": 2,
   "height": 142,
   "width": "100%",
   "gap": 10,
   "paddingTop": 0,
   "shadow": false,
   "paddingBottom": 0,
   "backgroundOpacity": 0,
   "class": "Container",
   "borderRadius": 0,
   "data": {
    "name": "Container44746"
   },
   "overflow": "scroll",
   "scrollBarWidth": 10
  }
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "desktopMipmappingEnabled": false,
 "layout": "absolute",
 "minHeight": 20,
 "scripts": {
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "registerKey": function(key, value){  window[key] = value; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "unregisterKey": function(key){  delete window[key]; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "existsKey": function(key){  return key in window; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getKey": function(key){  return window[key]; }
 },
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "defaultVRPointer": "laser",
 "horizontalAlign": "left",
 "downloadEnabled": false,
 "gap": 10,
 "height": "100%",
 "paddingTop": 0,
 "buttonToggleMute": "this.IconButton_52344940_5F01_EFC4_41CC_9E18548B3CCC",
 "shadow": false,
 "paddingBottom": 0,
 "class": "Player",
 "borderRadius": 0,
 "data": {
  "name": "Player43899"
 },
 "overflow": "visible",
 "definitions": [{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 101.74,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_17AD0AD9_18B7_645F_41B5_AC7A22E48AEC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 163.46,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_14449889_18B7_64BE_4199_558706491165"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -150.86,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_164DBAB6_18B7_64D2_41AE_4FB51629DCD7"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 159.44,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_16BAA69F_18B7_6CD2_41B0_2296EFACFDFC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 174.76,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1715FB51_18B7_65AE_41B7_C2246A768D23"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 179.12,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_17D01B22_18B7_65F2_41B8_0DF87881D8EA"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -4.02,
   "yaw": 159.53,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684"
  },
  {
   "backwardYaw": -98.1,
   "yaw": 62.84,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83"
  },
  {
   "backwardYaw": 154,
   "yaw": -16.33,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1E35133E_1216_E365_418A_E512CC92AE96"
  },
  {
   "panorama": "this.panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E",
   "class": "AdjacentPanorama"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1E351DCE_1216_A725_41AA_C2237F5681B0",
 "thumbnailUrl": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_t.jpg",
 "label": "A4",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1CA17E28_121E_E56D_41A3_00627B2529A9",
  "this.overlay_1CED806A_121E_BDED_41AF_11F28D8B92D4",
  "this.overlay_1D1721B5_121E_9F64_4190_F911F01D45DC",
  "this.overlay_0AF4E044_12EE_74E8_4174_5B590490AB56"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 116.98,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15BE68B9_18B7_64DE_418B_920E5CC216F7"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 29.52,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15289969_18B7_647F_41B1_5DD6B428D70B"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1E2C3554_1217_A725_41A3_8E48640695C2_camera"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -117.82,
   "yaw": 53.51,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_027D9014_12BA_7468_41AE_B7601C694ED1"
  },
  {
   "backwardYaw": 80.01,
   "yaw": -46.35,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_5829C03C_1376_7498_41AC_130D2B81793F"
  },
  {
   "backwardYaw": -55.73,
   "yaw": 138.21,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E"
  },
  {
   "backwardYaw": 30.15,
   "yaw": -131.51,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137",
 "thumbnailUrl": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_t.jpg",
 "label": "B1 PERTIGAAN ASPUT",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1C0438D1_12B6_F5E8_41B1_5A31F3EACBB4",
  "this.overlay_1F62F511_12B6_9C68_41B0_F2A561B49BE3",
  "this.overlay_1DD0CF36_12AA_ACA8_41AF_2D4849CDE734",
  "this.overlay_55E3A4B5_1375_9DAB_41AA_D941D0ADF02C"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 25.04,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_157AA4EE_18B7_6C72_4198_65BFF4E90C55"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 65.44,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_16572772_18B7_6C6D_41A0_808EAB58FD99"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_027D9014_12BA_7468_41AE_B7601C694ED1_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 17.25,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15B325B6_18B7_6CD5_4185_D5F5750B8291"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 72.6,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15350952_18B7_65AD_41B2_B587FE94A7E7"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -33.25,
   "yaw": 126.11,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_027D9014_12BA_7468_41AE_B7601C694ED1"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C461727_12B7_9CA8_41A0_02E993644282",
 "thumbnailUrl": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_t.jpg",
 "label": "AB FUTSAL",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1C9C8B75_12B6_94A8_4196_7E8296AD2638"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -13.15,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_179FAAEC_18B7_6475_41AC_48D727EC5EBD"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -41.95,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_151CD975_18B7_6457_41B4_E99ED11A9607"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 146.71,
   "yaw": -54.77,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_49AF6E44_135A_6CE9_414A_9C058452CF94"
  },
  {
   "backwardYaw": -78.26,
   "yaw": 114.05,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_49AEC247_135B_B4E8_41A5_746131D61342",
 "thumbnailUrl": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_t.jpg",
 "label": "C7",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_78305CD8_13B6_6D98_4181_5A0AB08E5EEE",
  "this.overlay_787331BD_13B5_9798_419B_07EA5F7278D9"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 48.49,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15EA492E_18B7_65F5_41B2_8FC7AB985DB8"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -102.12,
   "yaw": 93.96,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C74D9CF_122E_AF24_41AA_174DA8673956"
  },
  {
   "panorama": "this.panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42",
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": -61.3,
   "yaw": -113.93,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4",
 "thumbnailUrl": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_t.jpg",
 "label": "AKB LB",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1F350DD5_12BA_AFE8_41AD_2F8F558DD812",
  "this.overlay_1CBBCE29_12BA_ACB8_4191_4F052CB442DB",
  "this.overlay_1CF41B54_12BA_94E9_41B0_C7665E8E28F5"
 ]
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -167.56,
   "yaw": 19.72,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E"
  },
  {
   "backwardYaw": 28.64,
   "yaw": -148.47,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F",
 "thumbnailUrl": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_t.jpg",
 "label": "A16",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1D08E00C_1215_9D24_41A0_C1419062D233",
  "this.overlay_1D4706D5_1212_6524_419E_B5AA939CE98E"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1E35133E_1216_E365_418A_E512CC92AE96_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -82.02,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_17E18B16_18B7_65D2_41B7_A12AB4DEB9FE"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -53.89,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_144B38A1_18B7_64EE_419A_CD0EDFB79BE6"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 53.51,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1446859E_18B7_6CD5_41A2_5EE9B9AC0105"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 155.88,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_17339B3A_18B7_65D2_41AD_86720310ADA6"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 71.97,
  "class": "PanoramaCameraPosition",
  "pitch": -1.23
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_camera"
},
{
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04",
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": 19.72,
   "yaw": -167.56,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F"
  },
  {
   "backwardYaw": 146.84,
   "yaw": -28.39,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E",
 "thumbnailUrl": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_t.jpg",
 "label": "A15",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1C92FEB6_1216_A564_41AD_D4A92A12217E",
  "this.overlay_1CF39957_1216_6F24_41A3_3E0232015378",
  "this.overlay_1D05663F_1215_E563_4176_AB6D6CFF379E"
 ]
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -11.81,
   "yaw": -150.48,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC"
  },
  {
   "panorama": "this.panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7",
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": -148.47,
   "yaw": 28.64,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5",
 "thumbnailUrl": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_t.jpg",
 "label": "A17",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1CBF9E1B_1212_A52C_4196_F0907F21E5BE",
  "this.overlay_1CEEFD15_1212_E727_419E_6096CD899B43",
  "this.overlay_1D83D92E_1212_AF65_41AA_B23B917E6C75"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -164.8,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_178837CC_18B7_6CB6_41AC_AE8EF45E8FF7"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 19.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_150B14E0_18B7_6C6E_41A9_E4FB8291F7CC"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 44.09,
   "yaw": -126.87,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F"
  },
  {
   "backwardYaw": -109.03,
   "yaw": 43.71,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1E2C3554_1217_A725_41A3_8E48640695C2"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1E31C113_1217_9F23_41AF_9721C1EE070D",
 "thumbnailUrl": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_t.jpg",
 "label": "A9",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1C9577A2_1212_A31C_41AF_9BB2E924C67E",
  "this.overlay_1D8FB606_1212_A524_41B0_C121C8F56D54"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 55.77,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1502D65A_18B7_6C52_419E_9BCF340C281C"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 75.12,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_169F86B6_18B7_6CD5_41A2_47AA60D7A7BE"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_camera"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -159.4,
   "yaw": 18.46,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B"
  },
  {
   "backwardYaw": 11.68,
   "yaw": -164.93,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B",
 "thumbnailUrl": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_t.jpg",
 "label": "B3",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1C5E13D1_12AE_9BE8_419A_6E8734B55629",
  "this.overlay_1DA2EEF4_12AE_6DA8_41A2_21EA0F6C9B45"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 153.37,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_16C336FA_18B7_6C5D_41B4_9E073C5A3F36"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -168.32,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15C62622_18B7_6FED_4176_DA70630A495A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -88.81,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1649F793_18B7_6CD3_419A_8F4EA2D3FB91"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 164.68,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15593688_18B7_6CBE_41A6_776445928610"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -20.56,
   "yaw": 86.96,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840",
 "thumbnailUrl": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_t.jpg",
 "label": "AKB 3",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1CA93C76_12AA_ACA8_419F_6BB51832ED4E"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -12.81,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15A8F8E9_18B7_647F_41A4_F24BB7435DAD"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 129.63,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1567D671_18B7_6C6E_4170_33DAEE6FA89A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -64.56,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1565F998_18B7_64DD_41B6_C7A9C5100FDD"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 79.89,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1478E56D_18B7_6C77_41B4_234693EB0B2C"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 145.21,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1458587D_18B7_6456_4175_BA3736666BBF"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_5829C03C_1376_7498_41AC_130D2B81793F_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -7.25,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_176EE843_18B7_63B3_4175_DEA26959C2DF"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 53.05,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_17CD87FC_18B7_6C56_41A0_CAD3AD4647D6"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 53.13,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_17223B46_18B7_65B2_41B8_8A0EBEF58790"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -84.16,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15D0B463_18B7_6C72_41A1_85FCDE278194"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 125.23,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_173DF808_18B7_63BE_41B0_DE93BE61E026"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -101.96,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1526C4A3_18B7_6CF3_41B8_273C774751E2"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 68.96,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_154E8513_18B7_6DD2_41A0_661E1F35EC7A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 172.13,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15F33918_18B7_65DD_4192_6FAF712059AE"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -126.49,
   "yaw": 55.14,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C7411C6_122E_7F24_4183_991262FE3F99"
  },
  {
   "backwardYaw": -4.44,
   "yaw": -124.23,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C74D9CF_122E_AF24_41AA_174DA8673956"
  },
  {
   "backwardYaw": -162.75,
   "yaw": -13.53,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C749FB8_122E_E36C_4193_79DF9A264D45"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B",
 "thumbnailUrl": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_t.jpg",
 "label": "AK2",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1D577A19_1216_6D2C_418F_8E733FBA060C",
  "this.overlay_1DEDAB27_1217_A364_41B0_0B8E13CAB3FE",
  "this.overlay_1D0BEBC2_12AD_ABE8_41B1_ED3A34FDD43B"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -33.29,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_17BD2AC7_18B7_64B2_4186_01A04BF655BD"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -162.88,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_158655E7_18B7_6C73_418E_643707EA9E2D"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_49AEEB3E_135B_F498_41A5_157725750FD2_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 55.9,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_17FE3B0B_18B7_65B3_41B8_65490CEAD60F"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_camera"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 42.71,
   "yaw": -157.14,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC"
  },
  {
   "backwardYaw": -160.66,
   "yaw": 8.92,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087",
 "thumbnailUrl": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_t.jpg",
 "label": "AB VOLI",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1C572589_122D_A72C_41AE_E3A751615EB4",
  "this.overlay_1D311414_122D_E524_41AA_98671529126D"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 8.54,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1774AB69_18B7_647E_4178_FE93B44D6CA6"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 102.5,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_16D31A0D_18B7_67B7_4190_B6A844175195"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1C740D40_122E_671C_41A5_F8F6717860CD_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_camera"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -123.6,
   "yaw": 29.14,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1E35133E_1216_E365_418A_E512CC92AE96"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E",
 "thumbnailUrl": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_t.jpg",
 "label": "A6",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1C8FB9E2_121D_AF1C_41AE_17FCFAB76257"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 62.18,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1557A9A4_18B7_64F5_41B6_E41F97C23B2D"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -24.12,
   "yaw": 154.63,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C"
  },
  {
   "backwardYaw": -126.87,
   "yaw": 44.09,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1E31C113_1217_9F23_41AF_9721C1EE070D"
  },
  {
   "backwardYaw": -5.24,
   "yaw": -16.54,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_618DAC0E_13DE_AC79_41B1_10B967991445"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F",
 "thumbnailUrl": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_t.jpg",
 "label": "A8",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1C9398FF_1213_EEE4_41AE_C90DA4AFD09C",
  "this.overlay_1D174B14_1213_A325_4178_72C6E65BFE96",
  "this.overlay_32C448CC_12AA_95F8_41A7_5DF11984F990"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_camera"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 78.04,
   "yaw": -126.95,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83"
  },
  {
   "backwardYaw": 40.61,
   "yaw": -13.53,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C",
 "thumbnailUrl": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_t.jpg",
 "label": "AKB GURU1",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1D98A1F2_1213_9EFC_41AE_90E981188E90",
  "this.overlay_2265BE3F_136E_EC97_41A0_BBA79CB45A42"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 170.74,
  "class": "PanoramaCameraPosition",
  "pitch": 6.06
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -123.35,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_146AA586_18B7_6CB5_41B4_2245FCF70713"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -161.54,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15C0E946_18B7_65B5_41B5_2EA7027A29B7"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 66.2,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15B7C8AE_18B7_64F2_41A7_E428C0AD6B9A"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -124.1,
   "yaw": 25.88,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA",
 "thumbnailUrl": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_t.jpg",
 "label": "A14",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1CBCD90E_1216_EF25_417B_8C373F237210"
 ]
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 17.12,
   "yaw": 166.85,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_7178E80E_13B6_9478_4187_6F7683DD2190"
  },
  {
   "backwardYaw": -85.79,
   "yaw": 97.98,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2",
 "thumbnailUrl": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_t.jpg",
 "label": "C KOLAM 2",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_769D3F39_13BB_AC98_41AE_E98F29510728",
  "this.overlay_7986757E_13BE_BC99_41A9_653D16268D42"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -135.24,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15A578D1_18B7_64AE_41B6_F77BF4A4930B"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -114.56,
   "yaw": 70.88,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA"
  },
  {
   "backwardYaw": -28.39,
   "yaw": 146.84,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E"
  },
  {
   "backwardYaw": 91.19,
   "yaw": -76.87,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87"
  },
  {
   "backwardYaw": 25.88,
   "yaw": -124.1,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842",
 "thumbnailUrl": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_t.jpg",
 "label": "A13",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1D5AB790_1217_A33D_418E_1AAEC50485DA",
  "this.overlay_1C53DCAA_1217_E56C_41A2_B50AA6DE8753",
  "this.overlay_1D1CBE6C_1217_A5E4_4190_E48981A49832",
  "this.overlay_1CABF008_1216_9D2D_41A4_05E11BD0513B"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -63.39,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15DEF93A_18B7_65DD_41A1_0CD7860DA369"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_632FB807_13AA_9468_4199_F2D987E571CA_camera"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -97.73,
   "yaw": 51.5,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714",
 "thumbnailUrl": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_t.jpg",
 "label": "B8BASKET",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_t.jpg",
   "right": {
    "levels": [
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1C883BBC_12D6_AB99_4181_0D0E0BB44FA0"
 ]
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -13.53,
   "yaw": 40.61,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA",
 "thumbnailUrl": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_t.jpg",
 "label": "AKB GURU3",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1D38D165_1213_FFE4_41A6_FDB32088127B"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 131.14,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_178F9AFD_18B7_6457_4183_9FB407295790"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 133.65,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_177C7837_18B7_63D3_41B3_1891E2DCB6E4"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 15.07,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_153C4637_18B7_6FD2_40DA_C4927E14A680"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 102.12,
   "yaw": -77.5,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD"
  },
  {
   "backwardYaw": -164.93,
   "yaw": 11.68,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B"
  },
  {
   "backwardYaw": 46.73,
   "yaw": -171.46,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1F76471E_12AA_BC99_417D_DD5A2084733C"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8",
 "thumbnailUrl": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_t.jpg",
 "label": "B4",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1CFE408D_12AF_B47B_41B0_89091D51B03A",
  "this.overlay_1CC33FE1_12AF_ABA8_41B1_D77C0579FD6F",
  "this.overlay_1C77300A_12AF_F479_41B0_5F6EB8A5A65F"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -154.12,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_17B997A8_18B7_6CFE_41A3_C523F7A1026A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_camera"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -111.04,
   "yaw": 55.14,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C"
  },
  {
   "backwardYaw": 55.14,
   "yaw": -126.49,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B"
  },
  {
   "backwardYaw": 126.11,
   "yaw": -34.79,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C63E5B5_122F_A764_412F_D3ADED669290"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C7411C6_122E_7F24_4183_991262FE3F99",
 "thumbnailUrl": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_t.jpg",
 "label": "AK1",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_t.jpg",
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1D506121_1212_9F1C_41B1_A6C070D16CF8",
  "this.overlay_1D8DD225_1215_FD64_41A5_0E7D6E8CA3C7",
  "this.overlay_024F2EF7_1213_A2E4_41A2_93C12CE9552D"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -171.08,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_155C1507_18B7_6DB2_41A9_2D5CF022BB43"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -136.29,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_158F890C_18B7_65B5_41B6_3BF1ADCEE3BA"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1F2B9277_12D6_B497_418D_A66B17178836_camera"
},
{
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_1C63E5B5_122F_A764_412F_D3ADED669290",
   "class": "AdjacentPanorama"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C740D40_122E_671C_41A5_F8F6717860CD",
 "thumbnailUrl": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_t.jpg",
 "label": "AKB LAB KOM 2",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_021B5170_1212_9FFD_41AA_5CE005AFDE17"
 ]
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 166.85,
   "yaw": 17.12,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2"
  },
  {
   "backwardYaw": -48.86,
   "yaw": 113.3,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_7178E80E_13B6_9478_4187_6F7683DD2190",
 "thumbnailUrl": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_t.jpg",
 "label": "C KOLAM 3",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_74D65B57_13BE_9497_419C_9D0189F1C352",
  "this.overlay_799FF1DA_13B6_B798_41A4_50BC7DBAEA54"
 ]
},
{
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_1F769998_12AA_9798_41A9_9421299474C3",
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": 51.5,
   "yaw": -97.73,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714"
  },
  {
   "backwardYaw": 141.31,
   "yaw": -15.32,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0",
 "thumbnailUrl": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_t.jpg",
 "label": "B7",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1C3FED55_12AA_6CE8_41AE_E741D35B25FC",
  "this.overlay_1F35866D_12D5_9CBB_41A6_4D0C53613475",
  "this.overlay_1C4AD35E_12D5_B498_41A7_891AB5E22572"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 77.88,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_16C56A19_18B7_67DF_41A5_5FF8C7ACA03A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -83.91,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_159CE41F_18B7_63D2_41A9_D2DF4DCB8D64"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -103.63,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_14734554_18B7_6C55_41A9_887DF4331ACC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 9.55,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_146CF3D8_18B7_645D_41B3_782DAC2F537B"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -126.49,
   "yaw": 88.3,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_5829C03C_1376_7498_41AC_130D2B81793F"
  },
  {
   "backwardYaw": 96.09,
   "yaw": -104.88,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6",
 "thumbnailUrl": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_t.jpg",
 "label": "C2",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_72FB603B_1357_B498_41A8_7682D801DB0F",
  "this.overlay_710A5280_1357_9468_41A5_8B0C26B954B0"
 ]
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 172.75,
   "yaw": -26.72,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB"
  },
  {
   "backwardYaw": -34.79,
   "yaw": 126.11,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C7411C6_122E_7F24_4183_991262FE3F99"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C63E5B5_122F_A764_412F_D3ADED669290",
 "thumbnailUrl": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_t.jpg",
 "label": "AKB LAB KOM",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_03ECDFE1_1216_A31C_4170_1FB725E4CD28",
  "this.overlay_1CD024C6_12B7_BDE8_41AC_5672AB4222BC"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 153.28,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_171D081F_18B7_63D3_41AC_E33D69CC90FF"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -109.66,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1627EA3A_18B7_67DD_41AB_65437FF1DA44"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 53.51,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15AB0413_18B7_63D2_4187_2F2A56460D70"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 146.75,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1513B64F_18B7_6FB2_41A5_0CF6759236B6"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -54.77,
   "yaw": 146.71,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_49AEC247_135B_B4E8_41A5_746131D61342"
  },
  {
   "backwardYaw": -164.17,
   "yaw": 5.15,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_49AF6E44_135A_6CE9_414A_9C058452CF94",
 "thumbnailUrl": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_t.jpg",
 "label": "C6",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_718BB5E3_13AE_9FA8_4182_522CA66C1E11",
  "this.overlay_79C14A31_13B6_74A8_41B2_DDBEB87B1F17"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -86.04,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15745666_18B7_6C72_41B5_FE02EBBDA5F8"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 126.28,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1569B67C_18B7_6C56_41B7_E126ECD6F01E"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -16.54,
   "yaw": -5.24,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_618DAC0E_13DE_AC79_41B1_10B967991445",
 "thumbnailUrl": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_t.jpg",
 "label": "A STUDIO",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_62C33E56_13DE_ACE9_4197_4222F9D5BF58"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -43.05,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_17EBA7E4_18B7_6C76_41B5_74E64AA65C41"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 15.2,
   "yaw": -163.04,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_49AEEB3E_135B_F498_41A5_157725750FD2",
 "thumbnailUrl": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_t.jpg",
 "label": "CB AS",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_76D5058D_13BA_BC78_41A5_583AEB626F68"
 ]
},
{
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_1E2C3554_1217_A725_41A3_8E48640695C2",
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": 4.94,
   "yaw": 148.76,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08"
  },
  {
   "backwardYaw": -76.87,
   "yaw": 91.19,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87",
 "thumbnailUrl": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_t.jpg",
 "label": "A12",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1CFD2DB3_1216_A77C_416E_66DEBF97806A",
  "this.overlay_1D4D7210_1216_9D3C_4171_0ADE2F42A7D4",
  "this.overlay_0255BC19_1216_652F_41A6_C066A016D75E"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 124.27,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1549F9BA_18B7_64DD_4184_030B7583D882"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -174.85,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1453E3E4_18B7_6475_4172_D12D1DC3F8FC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -82.86,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_168F06C2_18B7_6CAD_4185_1E1DA70EC357"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 70.97,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15351490_18B7_6CAD_41B6_F45BB7EF1A27"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 103.13,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15F1D438_18B7_63DE_4180_10E04864AA12"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -66.72,
  "class": "PanoramaCameraPosition",
  "pitch": -0.14
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 175.56,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_144FC5AA_18B7_6CFD_4195_6D3EEBD27FFC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 56.4,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_156C74FA_18B7_6C52_4184_98690F3B1DC1"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -53.72,
   "yaw": 116.86,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1F2B9277_12D6_B497_418D_A66B17178836"
  },
  {
   "backwardYaw": -15.32,
   "yaw": 141.31,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0"
  },
  {
   "backwardYaw": -146.09,
   "yaw": 43.05,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1F76471E_12AA_BC99_417D_DD5A2084733C"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8",
 "thumbnailUrl": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_t.jpg",
 "label": "B9",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1C75EDA8_12D5_AFB8_41B0_704BFBAC3AF9",
  "this.overlay_009DB5B8_12DA_FF98_41B2_57F94BA7CBB1",
  "this.overlay_1C278140_12DB_B4E9_41AE_17FA3E516F16"
 ]
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 163.04,
   "yaw": 18.43,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1F76471E_12AA_BC99_417D_DD5A2084733C"
  },
  {
   "panorama": "this.panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8",
   "class": "AdjacentPanorama"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1F769998_12AA_9798_41A9_9421299474C3",
 "thumbnailUrl": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_t.jpg",
 "label": "B6",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1DA96FB6_12AB_ABA8_417A_2178CB02BCAD",
  "this.overlay_0053C474_12AA_FCA8_419F_A52EB4B894BD"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -65.95,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_16E00A01_18B7_67AF_4192_2E23A1C3D5A2"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 28.47,
  "class": "PanoramaCameraPosition",
  "pitch": -8.07
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_camera"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 113.3,
   "yaw": -48.86,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_7178E80E_13B6_9478_4187_6F7683DD2190"
  },
  {
   "backwardYaw": -170.45,
   "yaw": -0.88,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E"
  },
  {
   "backwardYaw": 5.15,
   "yaw": -164.17,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_49AF6E44_135A_6CE9_414A_9C058452CF94"
  },
  {
   "backwardYaw": -101.62,
   "yaw": 95.84,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_49AF6A22_135A_94A9_41AA_E036F21F6533"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99",
 "thumbnailUrl": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_t.jpg",
 "label": "C5PERTIGAAN KOLAM",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_71AB0DA6_13B6_6FA8_419D_8E6CF03C5B23",
  "this.overlay_71C42C77_13B6_6C97_41B2_9730DE4C9557",
  "this.overlay_7023A8E1_13B6_95A8_41B0_D54576255D4E",
  "this.overlay_60206EAA_13EA_6DB8_416E_9E1FF412C636"
 ]
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 70.34,
   "yaw": -117.32,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_0154F527_0C22_07FC_4193_06409B7D0536"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_02181B5D_0879_47EF_4194_05F745303325",
 "thumbnailUrl": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_t.jpg",
 "label": "A1",
 "pitch": 0,
 "hfovMax": 120,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1FC0C62C_1215_E565_41A3_3D15BD3ADE2A"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_camera"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 154.63,
   "yaw": -24.12,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F"
  },
  {
   "backwardYaw": 55.14,
   "yaw": -111.04,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C7411C6_122E_7F24_4183_991262FE3F99"
  },
  {
   "backwardYaw": -26.63,
   "yaw": 144.83,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1E35133E_1216_E365_418A_E512CC92AE96"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C",
 "thumbnailUrl": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_t.jpg",
 "label": "A7",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1C946A25_1212_AD64_4188_6D587C73AD36",
  "this.overlay_1CC21177_1212_9FE4_4183_54AC54E3A313",
  "this.overlay_1D2CAD93_1212_E73C_41A0_B46C20AF051A"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 163.67,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_165B3AA0_18B7_64EE_41B0_28061B569B4E"
},
{
 "items": [
  {
   "media": "this.panorama_02181B5D_0879_47EF_4194_05F745303325",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_02181B5D_0879_47EF_4194_05F745303325_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_0154F527_0C22_07FC_4193_06409B7D0536",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0154F527_0C22_07FC_4193_06409B7D0536_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1E351DCE_1216_A725_41AA_C2237F5681B0",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1E35133E_1216_E365_418A_E512CC92AE96",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1E35133E_1216_E365_418A_E512CC92AE96_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1E31C113_1217_9F23_41AF_9721C1EE070D",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1E2C3554_1217_A725_41A3_8E48640695C2",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1E2C3554_1217_A725_41A3_8E48640695C2_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1C79B467_1212_65E4_41A9_397DB7948749",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1C79B467_1212_65E4_41A9_397DB7948749_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1C4AA941_122D_AF1C_4194_652BF1171E50",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1C7411C6_122E_7F24_4183_991262FE3F99",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1C7411C6_122E_7F24_4183_991262FE3F99_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 33, 34)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1C74D9CF_122E_AF24_41AA_174DA8673956",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 34, 35)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1C749FB8_122E_E36C_4193_79DF9A264D45",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 35, 36)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 36, 37)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 37, 38)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1C745916_122E_6F24_41B0_E0BDC7980538",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 38, 39)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1C745916_122E_6F24_41B0_E0BDC7980538_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1C740D40_122E_671C_41A5_F8F6717860CD",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 39, 40)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1C740D40_122E_671C_41A5_F8F6717860CD_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1C63E5B5_122F_A764_412F_D3ADED669290",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 40, 41)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1C63E5B5_122F_A764_412F_D3ADED669290_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 41, 42)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 42, 43)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_027D9014_12BA_7468_41AE_B7601C694ED1",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 43, 44)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_027D9014_12BA_7468_41AE_B7601C694ED1_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 44, 45)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1C461727_12B7_9CA8_41A0_02E993644282",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 45, 46)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1C461727_12B7_9CA8_41A0_02E993644282_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 46, 47)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 47, 48)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 48, 49)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 49, 50)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1F76471E_12AA_BC99_417D_DD5A2084733C",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 50, 51)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1F769998_12AA_9798_41A9_9421299474C3",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 51, 52)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1F769998_12AA_9798_41A9_9421299474C3_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 52, 53)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 53, 54)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 54, 55)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1F2B9277_12D6_B497_418D_A66B17178836",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 55, 56)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1F2B9277_12D6_B497_418D_A66B17178836_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5829C03C_1376_7498_41AC_130D2B81793F",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 56, 57)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_5829C03C_1376_7498_41AC_130D2B81793F_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_59E47185_136B_F468_41AE_60E9A934E07E",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 57, 58)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_59E47185_136B_F468_41AE_60E9A934E07E_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 58, 59)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 59, 60)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 60, 61)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 61, 62)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_49AF6A22_135A_94A9_41AA_E036F21F6533",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 62, 63)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_49AF6E44_135A_6CE9_414A_9C058452CF94",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 63, 64)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_49AEC247_135B_B4E8_41A5_746131D61342",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 64, 65)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_49AEC247_135B_B4E8_41A5_746131D61342_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_49AE96EF_135B_9DB8_419C_15F53F06D743",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 65, 66)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_49AEEB3E_135B_F498_41A5_157725750FD2",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 66, 67)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_49AEEB3E_135B_F498_41A5_157725750FD2_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 67, 68)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7178E80E_13B6_9478_4187_6F7683DD2190",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 68, 69)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_7178E80E_13B6_9478_4187_6F7683DD2190_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 69, 70)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 70, 71)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_632FB807_13AA_9468_4199_F2D987E571CA",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 71, 72)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_632FB807_13AA_9468_4199_F2D987E571CA_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_618DAC0E_13DE_AC79_41B1_10B967991445",
   "camera": "this.panorama_618DAC0E_13DE_AC79_41B1_10B967991445_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 72, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -38.69,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_169C09DE_18B7_6455_4177_353A5CF38422"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -63.14,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_16096A6D_18B7_6477_41A2_BA23AA934751"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -158.42,
  "class": "PanoramaCameraPosition",
  "pitch": -3.83
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_7178E80E_13B6_9478_4187_6F7683DD2190_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 82.27,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_14505592_18B7_6CAD_419C_8C8A52A4A4EF"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 166.47,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_17C00B2E_18B7_65F2_4171_B3284B50ACDD"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1C7411C6_122E_7F24_4183_991262FE3F99_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 151.61,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_16471782_18B7_6CAD_41AF_85351AFB98C8"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 138.21,
   "yaw": -55.73,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E",
 "thumbnailUrl": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_t.jpg",
 "label": "BB BULTANG",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1D9F8BD7_12AA_6BE8_41A2_7CE5244C8754"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 20.6,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15D46617_18B7_6FD3_41B7_74A2BEE3F47E"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -13.53,
   "yaw": -162.75,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C749FB8_122E_E36C_4193_79DF9A264D45",
 "thumbnailUrl": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_t.jpg",
 "label": "AKB 1",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1C7BC23C_12AA_B498_41AF_F729EB318E24"
 ]
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -107.4,
   "yaw": 107.02,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_0154F527_0C22_07FC_4193_06409B7D0536"
  },
  {
   "panorama": "this.panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684",
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": -157.14,
   "yaw": 42.71,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087"
  },
  {
   "backwardYaw": -150.48,
   "yaw": -11.81,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5"
  },
  {
   "backwardYaw": 138.05,
   "yaw": -63.02,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC",
 "thumbnailUrl": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_t.jpg",
 "label": "A3.1",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1FC698B9_1212_AD6F_4187_3AD510ACD884",
  "this.overlay_1C101505_1212_E724_4178_FBFCF3CF198E",
  "this.overlay_1C8B63C0_1212_E31C_4170_41546F365260",
  "this.overlay_1D775DA8_1212_A76D_41AD_4917755B7ED5",
  "this.overlay_1D7C03B7_121D_E364_41B0_97CDAEEE1DFA"
 ]
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -113.93,
   "yaw": -61.3,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1",
 "thumbnailUrl": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_t.jpg",
 "label": "AKB LT2",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1F7A14C8_12BD_BDF8_41A3_3BC9F5EA40CF"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -53.89,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_14770548_18B7_6DBD_41A4_08C067B02FF5"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -139.39,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_151634B9_18B7_6CDE_41B1_77FB21C64BAC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1C461727_12B7_9CA8_41A0_02E993644282_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 33.91,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1548B693_18B7_6CD2_41B3_53FE20D4B69D"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 62.84,
   "yaw": -98.1,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1E351DCE_1216_A725_41AA_C2237F5681B0"
  },
  {
   "backwardYaw": -126.95,
   "yaw": 78.04,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83",
 "thumbnailUrl": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_t.jpg",
 "label": "AKB GURU",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1C4AC2F0_1237_E2FC_4191_10C8DE6815B5",
  "this.overlay_1D4E0722_1237_A31C_41AE_9C69F5AEEF16"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -124.86,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_16D076E5_18B7_6C77_4191_C10CBC32BC1A"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 56.65,
   "yaw": 74.86,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB",
 "thumbnailUrl": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_t.jpg",
 "label": "AB asrama 2",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_t.jpg",
   "right": {
    "levels": [
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1C9312D5_122E_9D24_41A3_8D20E52FEFA5"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -135.91,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15C2447A_18B7_6C5D_41AF_30E956414212"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_49AEC247_135B_B4E8_41A5_746131D61342_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 168.19,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15B7F3FB_18B7_6452_4182_BAECB13C8C94"
},
{
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842",
   "class": "AdjacentPanorama"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04",
 "thumbnailUrl": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_t.jpg",
 "label": "AB KANTIN",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_031A365A_122E_652D_417E_B90DA7D15DD2"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -10.98,
  "class": "PanoramaCameraPosition",
  "pitch": -1.31
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -109.12,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_17A997B6_18B7_6CD2_41B1_978103A823C7"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 89.69,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15E16452_18B7_6C52_418E_AFC0BF5E2D51"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -25.37,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_16E0E6DA_18B7_6C5D_418E_E772A7B07A3D"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -175.06,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_158C742B_18B7_63F2_41B8_43725B58DAC8"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1C745916_122E_6F24_41B0_E0BDC7980538_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -151.36,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1598C900_18B7_65AD_41B0_2357E57302FE"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 148.76,
   "yaw": 4.94,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08",
 "thumbnailUrl": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_t.jpg",
 "label": "AB SEKRE",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1CB4F5AA_122E_676C_41A2_8A0B8BF69063"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 81.9,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_16749750_18B7_6DAD_41A2_3CB4DB0D2BEA"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 94.21,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_158A25F4_18B7_6C55_41AB_8CB19147B5E7"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -105.14,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_179807C1_18B7_6CAE_41A1_B4274D7AE088"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_59E47185_136B_F468_41AE_60E9A934E07E_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 174.04,
  "class": "PanoramaCameraPosition",
  "pitch": 0.34
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 32.41,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1573398C_18B7_64B5_41B6_D7F176D336FA"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -133.27,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_152E6643_18B7_6FB2_4199_9ECBB114EDC9"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -26,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1664C761_18B7_6C6F_417B_DE3BFE07976E"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -63.02,
   "yaw": 138.05,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC"
  },
  {
   "backwardYaw": -138.38,
   "yaw": -14.53,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C4AA941_122D_AF1C_4194_652BF1171E50"
  },
  {
   "backwardYaw": 44.76,
   "yaw": -100.11,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684"
  },
  {
   "backwardYaw": -134.99,
   "yaw": 21.14,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43",
 "thumbnailUrl": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_t.jpg",
 "label": "AB1",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "183%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1C4125D1_1232_673C_41A5_59703CE4972A",
  "this.overlay_1D2A0444_1232_6525_419F_57DC2653977B",
  "this.overlay_1CE01260_1212_9D1C_41AC_02CF8147CA6F",
  "this.overlay_1DB268A7_1212_ED64_41A3_38B566A01C08"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -20.47,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_147C7560_18B7_6C6D_41A7_CFD5521894C6"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -168.91,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_16F099F5_18B7_6457_416B_C535430AB774"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_camera"
},
{
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137",
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": 167.19,
   "yaw": -50.37,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C74D9CF_122E_AF24_41AA_174DA8673956"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C745916_122E_6F24_41B0_E0BDC7980538",
 "thumbnailUrl": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_t.jpg",
 "label": "AKB KANTIN 2",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1C8217D9_12AA_BB98_41AF_A2F3EC91AC0E",
  "this.overlay_1CD5ECAE_12AA_6DB9_41A5_8E830ECB7E1B"
 ]
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -90.31,
   "yaw": 115.44,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566"
  },
  {
   "backwardYaw": 95.84,
   "yaw": -101.62,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_49AF6A22_135A_94A9_41AA_E036F21F6533",
 "thumbnailUrl": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_t.jpg",
 "label": "C5",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_72C4FBA8_13AD_ABB9_41A3_7F34B62A42F4",
  "this.overlay_71119DBF_13AE_6F98_41A7_787AB9BFAA44"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -91.7,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_170FE82B_18B7_63F3_417F_34277E0B15DB"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 66.07,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15E0360B_18B7_6FB3_4199_C912456E1F40"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -137.29,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_151BC4CF_18B7_6CB2_41A1_AA556385B4B2"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -16.96,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1633370B_18B7_6DB3_4183_743E5BAD1D49"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -14.53,
   "yaw": -138.38,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C4AA941_122D_AF1C_4194_652BF1171E50",
 "thumbnailUrl": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_t.jpg",
 "label": "AB3",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1CB25454_1232_E524_41AA_10012A75BCE9"
 ]
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 70.88,
   "yaw": -114.56,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842"
  },
  {
   "backwardYaw": 74.86,
   "yaw": 56.65,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA",
 "thumbnailUrl": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_t.jpg",
 "label": "AB asrama",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1CAC8D5D_122E_A727_4177_B3860FDBAABB",
  "this.overlay_1CD824EB_122E_66E3_41B1_10BA8B2E6D14"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1C63E5B5_122F_A764_412F_D3ADED669290_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -136.9,
  "class": "PanoramaCameraPosition",
  "pitch": 0.05
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -117.16,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_17DD97F0_18B7_6C6E_419F_075A95C8B3B6"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -131.51,
   "yaw": 30.15,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137"
  },
  {
   "backwardYaw": 116.61,
   "yaw": -66.66,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_59E47185_136B_F468_41AE_60E9A934E07E"
  },
  {
   "backwardYaw": 18.46,
   "yaw": -159.4,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B",
 "thumbnailUrl": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_t.jpg",
 "label": "B2 PERPUS PUT",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1C894F57_12AE_ACE8_4183_A6922B4123E1",
  "this.overlay_1CC36158_12AE_F498_41AE_8E9E1E6418EC",
  "this.overlay_1C520593_12AE_9C68_4173_816FAB320426"
 ]
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 63.81,
   "yaw": -147.59,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566"
  },
  {
   "backwardYaw": -104.88,
   "yaw": 96.09,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6"
  },
  {
   "backwardYaw": 97.14,
   "yaw": -65.78,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_49AE96EF_135B_9DB8_419C_15F53F06D743"
  },
  {
   "backwardYaw": -163.04,
   "yaw": 15.2,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_49AEEB3E_135B_F498_41A5_157725750FD2"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8",
 "thumbnailUrl": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_t.jpg",
 "label": "C3",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_4EB441CC_1355_97F8_41A1_CE3B7B0403E0",
  "this.overlay_4EC542AD_1355_B5B8_4195_49DDEE30B0C5",
  "this.overlay_4E9C0D1D_13AA_AC9B_41AB_C947C61E59ED",
  "this.overlay_4C8AA6F6_13AA_7DA9_41AE_58863417B51A"
 ]
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 116.86,
   "yaw": -53.72,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1F2B9277_12D6_B497_418D_A66B17178836",
 "thumbnailUrl": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_t.jpg",
 "label": "B10 TAMAN",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1C7ED5AC_12DB_FFB8_41A1_14BAF639DE23"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -93.04,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_14633579_18B7_6C5F_419D_10824F2818B0"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -97.82,
  "class": "PanoramaCameraPosition",
  "pitch": -9.7
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_0154F527_0C22_07FC_4193_06409B7D0536_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 62.43,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15F93923_18B7_65F3_41B6_C98BA8285F83"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 107.02,
   "yaw": -107.4,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC"
  },
  {
   "backwardYaw": -117.32,
   "yaw": 70.34,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_02181B5D_0879_47EF_4194_05F745303325"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_0154F527_0C22_07FC_4193_06409B7D0536",
 "thumbnailUrl": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_t.jpg",
 "label": "A2",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1F7507C3_1212_A31C_4183_83418A8BA979",
  "this.overlay_1FCAF628_1212_E56C_4194_FF80F7393174"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -100.12,
  "class": "PanoramaCameraPosition",
  "pitch": -2.37
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_camera"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 11.09,
   "yaw": -154.96,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_632FB807_13AA_9468_4199_F2D987E571CA"
  },
  {
   "backwardYaw": 114.05,
   "yaw": -78.26,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_49AEC247_135B_B4E8_41A5_746131D61342"
  },
  {
   "backwardYaw": -77.5,
   "yaw": 102.12,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD",
 "thumbnailUrl": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_t.jpg",
 "label": "C8",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_4B393D3D_135A_6C98_41AA_419ADA546251",
  "this.overlay_4B747C31_135A_6CA8_4190_75C9DFFE5290",
  "this.overlay_7EBB33CA_13AA_9BF8_419A_8798508D1C4A"
 ]
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 76.37,
   "yaw": -113.8,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_027D9014_12BA_7468_41AE_B7601C694ED1"
  },
  {
   "backwardYaw": 159.53,
   "yaw": -4.02,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1E351DCE_1216_A725_41AA_C2237F5681B0"
  },
  {
   "backwardYaw": -100.11,
   "yaw": 44.76,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684",
 "thumbnailUrl": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_t.jpg",
 "label": "A3",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1CA6244A_121D_A52C_41A9_F6D1528CF2A2",
  "this.overlay_1D119548_121D_A72D_41AA_4E2453D72711",
  "this.overlay_1D48DAA0_121E_6D1C_41AC_DFD8A9F98E0B",
  "this.overlay_1CE3126A_121E_BDEC_4197_7CA1B7E86B73"
 ]
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -65.78,
   "yaw": 97.14,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_49AE96EF_135B_9DB8_419C_15F53F06D743",
 "thumbnailUrl": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_t.jpg",
 "label": "CB 1",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_74AA5A0C_13BA_7478_41B0_90F2D30D4E01"
 ]
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -154.96,
   "yaw": 11.09,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_632FB807_13AA_9468_4199_F2D987E571CA",
 "thumbnailUrl": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_t.jpg",
 "label": "C8 MASJID",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_7D138A24_13AE_94A8_41AA_5EEECFBB35E0"
 ]
},
{
 "touchControlMode": "drag_rotation",
 "buttonRestart": "this.IconButton_52344940_5F01_EFC4_41BB_2A5E51966695",
 "buttonMoveRight": "this.IconButton_52344940_5F01_EFC4_4184_BD88B8F3E7CC",
 "displayPlaybackBar": true,
 "buttonZoomOut": "this.IconButton_52344940_5F01_EFC4_41D7_BE81DEFE8744",
 "class": "PanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonPlayRight": "this.IconButton_52344940_5F01_EFC4_41C7_7571D1A24A33",
 "viewerArea": "this.MainViewer",
 "id": "MainViewerPanoramaPlayer",
 "buttonPlayLeft": "this.IconButton_52344940_5F01_EFC4_41D4_A1CCD7021F0A",
 "buttonZoomIn": "this.IconButton_52344940_5F01_EFC4_41BB_7EDA152A8375",
 "buttonMoveUp": "this.IconButton_52344940_5F01_EFC4_41B6_26FA0557CEC9",
 "buttonMoveDown": "this.IconButton_52344940_5F01_EFC4_41B5_303051AFBE15",
 "buttonPause": "this.IconButton_52344940_5F01_EFC4_41CC_4A5BFB01C469",
 "buttonMoveLeft": "this.IconButton_52344940_5F01_EFC4_41D0_C6DE67446A2C",
 "mouseControlMode": "drag_acceleration"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 134.33,
  "class": "PanoramaCameraPosition",
  "pitch": 14.31
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_camera"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -124.23,
   "yaw": -4.44,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B"
  },
  {
   "backwardYaw": 93.96,
   "yaw": -102.12,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4"
  },
  {
   "backwardYaw": -50.37,
   "yaw": 167.19,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C745916_122E_6F24_41B0_E0BDC7980538"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C74D9CF_122E_AF24_41AA_174DA8673956",
 "thumbnailUrl": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_t.jpg",
 "label": "AK3",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1CACDF8D_12AA_6C78_41A4_08CA5974F831",
  "this.overlay_1C086FEC_12AA_ABB8_41A0_393080691617",
  "this.overlay_1D88450E_12AA_9C78_41A1_6D2BAFAB6718"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -161.57,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_17044B5E_18B7_6452_4185_A58E4B4C824E"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 113.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1612272E_18B7_6DF5_41A9_83BEEA79D7D5"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -26.72,
   "yaw": 172.75,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C63E5B5_122F_A764_412F_D3ADED669290"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB",
 "thumbnailUrl": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_t.jpg",
 "label": "AK LAB COM 3",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_02AED202_1213_9D1D_41AA_D62677C584E0"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 15.83,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_172CC814_18B7_63D6_41B6_D0E632B164C1"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -41.79,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1625E71D_18B7_6DD7_41AD_4CEE4BBDF9C1"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 175.98,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1602773F_18B7_6DD3_41A5_FE989170FC0B"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 97.98,
   "yaw": -85.79,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2"
  },
  {
   "backwardYaw": -0.88,
   "yaw": -170.45,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E",
 "thumbnailUrl": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_t.jpg",
 "label": "C KOLAM",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_76356DC0_13BA_6FE8_41A7_472FCD8F2F43",
  "this.overlay_7676AAD0_13BA_B5E8_41AA_11CB8CE16872"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -66.7,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_146643CB_18B7_64B3_41AC_CB6E5811B718"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 41.62,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15BB68C5_18B7_64B6_4159_B6E207F2006D"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 136.95,
   "yaw": -7.87,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1E2C3554_1217_A725_41A3_8E48640695C2"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C79B467_1212_65E4_41A9_397DB7948749",
 "thumbnailUrl": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_t.jpg",
 "label": "AB PERPUS",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1D17C1AC_122E_BF65_4183_8161E3331EA2"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 166.47,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1592E5DB_18B7_6C53_41B0_9689595A33EB"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 45.01,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15AFD8DD_18B7_6456_41B1_566979C42845"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -126.49,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1440F895_18B7_64D6_419F_A7EBB24ED7D4"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -99.99,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_154659AF_18B7_64F3_41B5_A83921F5DA69"
},
{
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87",
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": 46.22,
   "yaw": -117.57,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1E2C3554_1217_A725_41A3_8E48640695C2"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8",
 "thumbnailUrl": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_t.jpg",
 "label": "A11",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1CEF95D3_1216_673C_4184_523CC02AC223",
  "this.overlay_1D7AC640_1216_A51C_41A0_D41E981546DE"
 ]
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -147.59,
   "yaw": 63.81,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8"
  },
  {
   "backwardYaw": 115.44,
   "yaw": -90.31,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_49AF6A22_135A_94A9_41AA_E036F21F6533"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566",
 "thumbnailUrl": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_t.jpg",
 "label": "C4",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_7253670E_13AA_9C78_417F_14115AC43921",
  "this.overlay_729EDB84_13AA_F468_41A1_53A8EAA06C7A"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -133.78,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1679AA7E_18B7_6455_419D_588EA8634331"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 12.44,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_159078F5_18B7_6457_41A5_E74F2D1824A4"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -160.28,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15B8F5C2_18B7_6CAD_41A6_9917802C6064"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1C79B467_1212_65E4_41A9_397DB7948749_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 78.38,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_144583F0_18B7_646D_41B1_EFF192B53683"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 88.3,
   "yaw": -126.49,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6"
  },
  {
   "backwardYaw": -46.35,
   "yaw": 80.01,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_5829C03C_1376_7498_41AC_130D2B81793F",
 "thumbnailUrl": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_t.jpg",
 "label": "C1",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_45F47B1C_1355_B498_41AA_7A0F0BB39A3B",
  "this.overlay_44AAC325_135A_94A8_4193_14C3B5256996"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -149.85,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_16BB79C6_18B7_64B5_41AB_05ECDDC4E6C5"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -128.5,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_16AAB9D2_18B7_64AD_4185_25AAF9E52B78"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -165.24,
  "class": "PanoramaCameraPosition",
  "pitch": -5.38
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_camera"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 53.51,
   "yaw": -117.82,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137"
  },
  {
   "backwardYaw": 126.11,
   "yaw": -33.25,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C461727_12B7_9CA8_41A0_02E993644282"
  },
  {
   "backwardYaw": -113.8,
   "yaw": 76.37,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_027D9014_12BA_7468_41AE_B7601C694ED1",
 "thumbnailUrl": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_t.jpg",
 "label": "A3 DEPAN FUTSAL",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1F443117_12B6_9497_4186_D87B6D7706DD",
  "this.overlay_1C268E5D_12B6_EC9B_419B_151EBD8A23B4",
  "this.overlay_1DC8A46A_12B6_9CB8_4188_7643BB50C325"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -158.86,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_150EE981_18B7_64AF_41A8_0951933EF141"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -77.88,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15CA562D_18B7_6FF7_41A6_FA03141B73D6"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 22.86,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1526995D_18B7_6457_41B1_B5B6C543513B"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -66.66,
   "yaw": 116.61,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_59E47185_136B_F468_41AE_60E9A934E07E",
 "thumbnailUrl": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_t.jpg",
 "label": "BB PERPUS PUTRI",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_45B6A166_135A_94A9_41A2_C50B72B2839B"
 ]
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 21.14,
   "yaw": -134.99,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25",
 "thumbnailUrl": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_t.jpg",
 "label": "AB2",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1C83A7D0_1232_A33C_41AB_91E4712EE930"
 ]
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 43.71,
   "yaw": -109.03,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1E31C113_1217_9F23_41AF_9721C1EE070D"
  },
  {
   "backwardYaw": -7.87,
   "yaw": 136.95,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C79B467_1212_65E4_41A9_397DB7948749"
  },
  {
   "backwardYaw": -117.57,
   "yaw": 46.22,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1E2C3554_1217_A725_41A3_8E48640695C2",
 "thumbnailUrl": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_t.jpg",
 "label": "A10",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1C904779_1212_63EC_41B1_E4B0F83824DC",
  "this.overlay_1CFAEBEF_1215_A2E3_4184_543FCBB4B1D7",
  "this.overlay_1DB396D8_1215_A52C_4199_745955ADFD84"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 114.22,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_17FB27D8_18B7_6C5E_419B_6AB90F155EE6"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -136.95,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_1766EB75_18B7_6456_41A7_3C24722E9EC7"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 118.7,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_16353A25_18B7_67F7_418E_B1D46215F89D"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1F769998_12AA_9798_41A9_9421299474C3_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -72.98,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_16171A4B_18B7_67B3_419D_8703BE0172A9"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -31.24,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_168F19E9_18B7_647F_41AE_F987D6CC3204"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 165.47,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15FE2600_18B7_6FAD_41A3_1EA5EE4BCC28"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 86.96,
   "yaw": -20.56,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840"
  },
  {
   "panorama": "this.panorama_1C74D9CF_122E_AF24_41AA_174DA8673956",
   "class": "AdjacentPanorama"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42",
 "thumbnailUrl": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_t.jpg",
 "label": "AKB 2",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1CA887C2_12AA_9BE8_4160_E2185E3BE306",
  "this.overlay_1C848582_12AB_BC69_41A9_08EBDF913410"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_camera"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 18.43,
   "yaw": 163.04,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1F769998_12AA_9798_41A9_9421299474C3"
  },
  {
   "backwardYaw": -171.46,
   "yaw": 46.73,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8"
  },
  {
   "backwardYaw": 43.05,
   "yaw": -146.09,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1F76471E_12AA_BC99_417D_DD5A2084733C",
 "thumbnailUrl": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_t.jpg",
 "label": "B5",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1C82984B_12AF_94FF_41AA_488F6A66AC8B",
  "this.overlay_1CEBF8B1_12AE_95A8_41A6_5A0960F1CF59",
  "this.overlay_1C6239DD_12AE_9798_41A6_99ED44AA020C"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -35.17,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_166BAA8F_18B7_64B2_41B6_0A95CB6E1107"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 31.53,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15B80407_18B7_63B2_418E_E126627F3CD3"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -33.16,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_15AC55CE_18B7_6CB5_41B8_812A59F75EC3"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 16.96,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_16F116CE_18B7_6CB5_41AC_4E1B29B56B5D"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -124.86,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_16BE851F_18B7_6DD2_416C_BCEDAF5B4035"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 0,
 "initialPosition": {
  "yaw": 62.68,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_16195A5C_18B7_6455_41A5_1B20BCD59D5F"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_camera"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 8.92,
   "yaw": -160.66,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7",
 "thumbnailUrl": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_t.jpg",
 "label": "AB MASJID",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1C75CA75_122E_EDE4_4181_599F8E2C58F1"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -116.19,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_16ADF6AB_18B7_6CF3_419D_E0CBA1CBE754"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 144.83,
   "yaw": -26.63,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C"
  },
  {
   "backwardYaw": -16.33,
   "yaw": 154,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1E351DCE_1216_A725_41AA_C2237F5681B0"
  },
  {
   "backwardYaw": 29.14,
   "yaw": -123.6,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_1E35133E_1216_E365_418A_E512CC92AE96",
 "thumbnailUrl": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_t.jpg",
 "label": "A5",
 "pitch": 0,
 "hfovMax": 130,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1CC5F1FB_121F_9EE3_415D_376335E24752",
  "this.overlay_1D27D0EB_121F_BEE3_419A_8904A71B3700",
  "this.overlay_1CEEC4D8_121D_A52D_41B0_D908E1BCA50E"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 0,
 "initialPosition": {
  "yaw": -126.32,
  "class": "PanoramaCameraPosition",
  "pitch": -8.08
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_02181B5D_0879_47EF_4194_05F745303325_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_618DAC0E_13DE_AC79_41B1_10B967991445_camera"
},
{
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "left": 0,
 "playbackBarBottom": 10,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#AAAAAA",
 "progressBarBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#222222",
  "#444444"
 ],
 "progressBackgroundColor": [
  "#EEEEEE",
  "#CCCCCC"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#EEEEEE",
  "#CCCCCC"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 20,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 4,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarBorderRadius": 4,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "class": "ViewerArea",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 10,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 2,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "playbackBarHeadShadowHorizontalLength": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 10,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 1,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 20,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": 0,
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#222222",
  "#444444"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#AAAAAA",
 "progressBorderSize": 2,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 4,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadHeight": 30,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "propagateClick": false,
 "children": [
  "this.IconButton_52344940_5F01_EFC4_41D7_BE81DEFE8744",
  "this.IconButton_52344940_5F01_EFC4_41BB_2A5E51966695",
  "this.IconButton_52344940_5F01_EFC4_41D4_A1CCD7021F0A",
  "this.IconButton_52344940_5F01_EFC4_41D0_C6DE67446A2C",
  "this.Container_52344940_5F01_EFC4_41D6_7E3303CC9C74",
  "this.IconButton_52344940_5F01_EFC4_4184_BD88B8F3E7CC",
  "this.IconButton_52344940_5F01_EFC4_41C7_7571D1A24A33",
  "this.IconButton_52344940_5F01_EFC4_41CC_9E18548B3CCC",
  "this.IconButton_52344940_5F01_EFC4_41BB_7EDA152A8375"
 ],
 "id": "Container_52344940_5F01_EFC4_41D4_ABA40101D8BF",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "horizontal",
 "width": 421,
 "minHeight": 20,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 421,
 "height": "100%",
 "gap": 4,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "Container",
 "borderRadius": 0,
 "overflow": "hidden",
 "scrollBarWidth": 10,
 "data": {
  "name": "Container53059"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_52344940_5F01_EFC4_41CC_9E18548B3CCC",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_52344940_5F01_EFC4_41CC_9E18548B3CCC.png",
 "minWidth": 0,
 "mode": "toggle",
 "height": 40,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_52344940_5F01_EFC4_41CC_9E18548B3CCC_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button53070"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.48,
   "image": "this.AnimatedImageResource_94140877_13D6_94A8_41AE_489110C0D356",
   "pitch": -18.9,
   "yaw": -16.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CA17E28_121E_E56D_41A3_00627B2529A9",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E35133E_1216_E365_418A_E512CC92AE96, this.camera_1664C761_18B7_6C6F_417B_DE3BFE07976E); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.48,
   "yaw": -16.33,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.9
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.66,
   "image": "this.AnimatedImageResource_94145877_13D6_94A8_41AA_9A297FFA7DCB",
   "pitch": -7.35,
   "yaw": 159.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CED806A_121E_BDED_41AF_11F28D8B92D4",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684, this.camera_1602773F_18B7_6DD3_41A5_FE989170FC0B); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.66,
   "yaw": 159.53,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.82,
   "image": "this.AnimatedImageResource_94179877_13D6_94A8_4179_DF443715FACC",
   "pitch": -15.39,
   "yaw": -58.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D1721B5_121E_9F64_4190_F911F01D45DC",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 20.82,
   "yaw": -58.41,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_1_HS_2_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.39
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.36,
   "image": "this.AnimatedImageResource_94173877_13D6_94A8_4181_DA87AF04A031",
   "pitch": -3.87,
   "yaw": 62.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_0AF4E044_12EE_74E8_4174_5B590490AB56",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83, this.camera_16749750_18B7_6DAD_41A2_3CB4DB0D2BEA); this.mainPlayList.set('selectedIndex', 28)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 13.36,
   "yaw": 62.84,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.87
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 36.85,
   "image": "this.AnimatedImageResource_9430E893_13D6_9468_4172_2120FDD36A96",
   "pitch": -10.11,
   "yaw": 53.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C0438D1_12B6_F5E8_41B1_5A31F3EACBB4",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_027D9014_12BA_7468_41AE_B7601C694ED1, this.camera_1557A9A4_18B7_64F5_41B6_E41F97C23B2D); this.mainPlayList.set('selectedIndex', 43)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 36.85,
   "yaw": 53.51,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.11
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 23.59,
   "image": "this.AnimatedImageResource_94306894_13D6_9468_41AF_EC6310DBE930",
   "pitch": -16.64,
   "yaw": -131.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1F62F511_12B6_9C68_41B0_F2A561B49BE3",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B, this.camera_16BB79C6_18B7_64B5_41AB_05ECDDC4E6C5); this.mainPlayList.set('selectedIndex', 47)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 23.59,
   "yaw": -131.51,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.64
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13,
   "image": "this.AnimatedImageResource_9433E894_13D6_9468_4197_330ADA36CA17",
   "pitch": 13.97,
   "yaw": 138.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1DD0CF36_12AA_ACA8_41AF_2D4849CDE734",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E, this.camera_1549F9BA_18B7_64DD_4184_030B7583D882); this.mainPlayList.set('selectedIndex', 46)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 13,
   "yaw": 138.21,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 13.97
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.9,
   "image": "this.AnimatedImageResource_94337894_13D6_9468_4170_D19E0EEEB7AE",
   "pitch": -22.8,
   "yaw": -46.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_55E3A4B5_1375_9DAB_41AA_D941D0ADF02C",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5829C03C_1376_7498_41AC_130D2B81793F, this.camera_154659AF_18B7_64F3_41B5_A83921F5DA69); this.mainPlayList.set('selectedIndex', 56)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 13.9,
   "yaw": -46.35,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_1_HS_3_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -22.8
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 35.41,
   "image": "this.AnimatedImageResource_9432D895_13D6_9468_4193_14B0F3D08239",
   "pitch": -18.9,
   "yaw": 126.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C9C8B75_12B6_94A8_4196_7E8296AD2638",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_027D9014_12BA_7468_41AE_B7601C694ED1, this.camera_1513B64F_18B7_6FB2_41A5_0CF6759236B6); this.mainPlayList.set('selectedIndex', 43)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 35.41,
   "yaw": 126.11,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.9
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 40.25,
   "image": "this.AnimatedImageResource_94C648AC_13D6_95B8_41B1_1C9C7F870993",
   "pitch": -10.61,
   "yaw": 114.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_78305CD8_13B6_6D98_4181_5A0AB08E5EEE",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD, this.camera_17AD0AD9_18B7_645F_41B5_AC7A22E48AEC); this.mainPlayList.set('selectedIndex', 58)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 40.25,
   "yaw": 114.05,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.61
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 46.22,
   "image": "this.AnimatedImageResource_94C928AD_13D6_95B8_41AF_EA0EC1566E15",
   "pitch": -13.25,
   "yaw": -54.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_787331BD_13B5_9798_419B_07EA5F7278D9",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AF6E44_135A_6CE9_414A_9C058452CF94, this.camera_17BD2AC7_18B7_64B2_4186_01A04BF655BD); this.mainPlayList.set('selectedIndex', 63)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 46.22,
   "yaw": -54.77,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.25
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 37.37,
   "image": "this.AnimatedImageResource_942E2891_13D6_9468_419F_ACF6A96B4616",
   "pitch": -20.66,
   "yaw": 93.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1F350DD5_12BA_AFE8_41AD_2F8F558DD812",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C74D9CF_122E_AF24_41AA_174DA8673956, this.camera_16C56A19_18B7_67DF_41A5_5FF8C7ACA03A); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 37.37,
   "yaw": 93.96,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 28.11,
   "image": "this.AnimatedImageResource_942E4892_13D6_9468_41B1_60C07C4887AB",
   "pitch": -45.28,
   "yaw": -167.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CBBCE29_12BA_ACB8_4191_4F052CB442DB",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 36)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 28.11,
   "yaw": -167.06,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -45.28
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 38.68,
   "image": "this.AnimatedImageResource_9431D892_13D6_9468_41B3_14C7569BD6C5",
   "pitch": -13,
   "yaw": -113.93,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CF41B54_12BA_94E9_41B0_C7665E8E28F5",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1, this.camera_16353A25_18B7_67F7_418E_B1D46215F89D); this.mainPlayList.set('selectedIndex', 42)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 38.68,
   "yaw": -113.93,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.43,
   "image": "this.AnimatedImageResource_941E0882_13D6_9468_4195_1794F95411F4",
   "pitch": -11.49,
   "yaw": -148.47,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D08E00C_1215_9D24_41A0_C1419062D233",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5, this.camera_1598C900_18B7_65AD_41B0_2357E57302FE); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 20.43,
   "yaw": -148.47,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.26,
   "image": "this.AnimatedImageResource_941FC882_13D6_9468_41B2_EB177517901D",
   "pitch": -21.79,
   "yaw": 19.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D4706D5_1212_6524_419E_B5AA939CE98E",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E, this.camera_159078F5_18B7_6457_41A5_E74F2D1824A4); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.26,
   "yaw": 19.72,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.79
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.71,
   "image": "this.AnimatedImageResource_941F2882_13D6_9468_419F_5C20035EA5DF",
   "pitch": -6.72,
   "yaw": -167.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C92FEB6_1216_A564_41AD_D4A92A12217E",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F, this.camera_15B8F5C2_18B7_6CAD_41A6_9917802C6064); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 20.71,
   "yaw": -167.56,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.72
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.57,
   "image": "this.AnimatedImageResource_941F7882_13D6_9468_41A4_B8C404B351B5",
   "pitch": -9.48,
   "yaw": -28.39,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CF39957_1216_6F24_41A3_3E0232015378",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842, this.camera_15AC55CE_18B7_6CB5_41B8_812A59F75EC3); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 20.57,
   "yaw": -28.39,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.39,
   "image": "this.AnimatedImageResource_941EE882_13D6_9468_413B_B2C32AE6FF6C",
   "pitch": 1.41,
   "yaw": -104.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D05663F_1215_E563_4176_AB6D6CFF379E",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 20)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 13.39,
   "yaw": -104.72,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.16,
   "image": "this.AnimatedImageResource_941F7883_13D6_9468_41B2_56776A311B12",
   "pitch": -14.76,
   "yaw": -150.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CBF9E1B_1212_A52C_4196_F0907F21E5BE",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC, this.camera_15B7F3FB_18B7_6452_4182_BAECB13C8C94); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 20.16,
   "yaw": -150.48,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.76
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 23.02,
   "image": "this.AnimatedImageResource_941E8883_13D6_9468_41AF_CE3048B16EFD",
   "pitch": -31.09,
   "yaw": 28.64,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CEEFD15_1212_E727_419E_6096CD899B43",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F, this.camera_15B80407_18B7_63B2_418E_E126627F3CD3); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 23.02,
   "yaw": 28.64,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -31.09
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 28.74,
   "image": "this.AnimatedImageResource_941E3883_13D6_9468_418C_E9DE58D80AA2",
   "pitch": -21.54,
   "yaw": 107.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D83D92E_1212_AF65_41AA_B23B917E6C75",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 28.74,
   "yaw": 107.02,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.54
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 27.98,
   "image": "this.AnimatedImageResource_94194879_13D6_9498_419A_9F0852F872D9",
   "pitch": -28.7,
   "yaw": -126.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C9577A2_1212_A31C_41AF_9BB2E924C67E",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F, this.camera_15C2447A_18B7_6C5D_41AF_30E956414212); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 27.98,
   "yaw": -126.87,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -28.7
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.35,
   "image": "this.AnimatedImageResource_94189879_13D6_9498_4191_2C5D6F238653",
   "pitch": -19.78,
   "yaw": 43.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D8FB606_1212_A524_41B0_C121C8F56D54",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E2C3554_1217_A725_41A3_8E48640695C2, this.camera_15351490_18B7_6CAD_41B6_F45BB7EF1A27); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.35,
   "yaw": 43.71,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 38.51,
   "image": "this.AnimatedImageResource_94379896_13D6_9468_418C_FD33FC1362CE",
   "pitch": -14.01,
   "yaw": -164.93,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C5E13D1_12AE_9BE8_419A_6E8734B55629",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8, this.camera_15C62622_18B7_6FED_4176_DA70630A495A); this.mainPlayList.set('selectedIndex', 49)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 38.51,
   "yaw": -164.93,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.01
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 36.86,
   "image": "this.AnimatedImageResource_94376896_13D6_9468_4194_FDFD15BFB4BC",
   "pitch": -21.79,
   "yaw": 18.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1DA2EEF4_12AE_6DA8_41A2_21EA0F6C9B45",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B, this.camera_15D46617_18B7_6FD3_41B7_74A2BEE3F47E); this.mainPlayList.set('selectedIndex', 47)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 36.86,
   "yaw": 18.46,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.79
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 29.16,
   "image": "this.AnimatedImageResource_942DD890_13D6_9468_419C_15F2D2EFF8EA",
   "pitch": -8.39,
   "yaw": 86.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CA93C76_12AA_ACA8_419F_6BB51832ED4E",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42, this.camera_16BAA69F_18B7_6CD2_41B0_2296EFACFDFC); this.mainPlayList.set('selectedIndex', 36)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 29.16,
   "yaw": 86.96,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.39
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.97,
   "image": "this.AnimatedImageResource_94298888_13D6_9478_41A6_F780DA5C92DB",
   "pitch": -23.05,
   "yaw": -124.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D577A19_1216_6D2C_418F_8E733FBA060C",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C74D9CF_122E_AF24_41AA_174DA8673956, this.camera_144FC5AA_18B7_6CFD_4195_6D3EEBD27FFC); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.97,
   "yaw": -124.23,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.05
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.53,
   "image": "this.AnimatedImageResource_94290889_13D6_9478_41B0_EAB9B4B93956",
   "pitch": -19.78,
   "yaw": 55.14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1DEDAB27_1217_A364_41B0_0B8E13CAB3FE",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C7411C6_122E_7F24_4183_991262FE3F99, this.camera_1446859E_18B7_6CD5_41A2_5EE9B9AC0105); this.mainPlayList.set('selectedIndex', 32)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.53,
   "yaw": 55.14,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.4,
   "image": "this.AnimatedImageResource_9428B889_13D6_9478_41A5_8439477C33BD",
   "pitch": 2.41,
   "yaw": -13.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D0BEBC2_12AD_ABE8_41B1_ED3A34FDD43B",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C749FB8_122E_E36C_4193_79DF9A264D45, this.camera_15B325B6_18B7_6CD5_4185_D5F5750B8291); this.mainPlayList.set('selectedIndex', 35)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 18.4,
   "yaw": -13.53,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 26.73,
   "image": "this.AnimatedImageResource_94233885_13D6_9468_41B0_3616204D0D37",
   "pitch": -9.86,
   "yaw": 8.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C572589_122D_A72C_41AE_E3A751615EB4",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7, this.camera_150B14E0_18B7_6C6E_41A9_E4FB8291F7CC); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 26.73,
   "yaw": 8.92,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.86
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 32.85,
   "image": "this.AnimatedImageResource_94234885_13D6_9468_4191_6144A3359023",
   "pitch": -12.62,
   "yaw": -157.14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D311414_122D_E524_41AA_98671529126D",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC, this.camera_151BC4CF_18B7_6CB2_41A1_AA556385B4B2); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 32.85,
   "yaw": -157.14,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.62
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.01,
   "image": "this.AnimatedImageResource_9417C878_13D6_9498_4198_9A9F94E3D7B2",
   "pitch": -14.88,
   "yaw": 29.14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C8FB9E2_121D_AF1C_41AE_17FCFAB76257",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E35133E_1216_E365_418A_E512CC92AE96, this.camera_156C74FA_18B7_6C52_4184_98690F3B1DC1); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.01,
   "yaw": 29.14,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.88
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.76,
   "image": "this.AnimatedImageResource_94165879_13D6_9498_4170_B079642F46E5",
   "pitch": -10.11,
   "yaw": 44.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C9398FF_1213_EEE4_41AE_C90DA4AFD09C",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E31C113_1217_9F23_41AF_9721C1EE070D, this.camera_17223B46_18B7_65B2_41B8_8A0EBEF58790); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.76,
   "yaw": 44.09,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.11
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 29,
   "image": "this.AnimatedImageResource_94199879_13D6_9498_41A0_F276DDE6077D",
   "pitch": -33.22,
   "yaw": 154.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D174B14_1213_A325_4178_72C6E65BFE96",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C, this.camera_17339B3A_18B7_65D2_41AD_86720310ADA6); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 29,
   "yaw": 154.63,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -33.22
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.04,
   "image": "this.AnimatedImageResource_94193879_13D6_9498_41A6_211A2EA94192",
   "pitch": 13.21,
   "yaw": -16.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_32C448CC_12AA_95F8_41A7_5DF11984F990",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_618DAC0E_13DE_AC79_41B1_10B967991445, this.camera_1715FB51_18B7_65AE_41B7_C2246A768D23); this.mainPlayList.set('selectedIndex', 72)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 13.04,
   "yaw": -16.54,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 13.21
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.35,
   "image": "this.AnimatedImageResource_94273887_13D6_9468_419B_021B89499B3B",
   "pitch": -10.03,
   "yaw": -126.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D98A1F2_1213_9EFC_41AE_90E981188E90",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83, this.camera_1526C4A3_18B7_6CF3_41B8_273C774751E2); this.mainPlayList.set('selectedIndex', 28)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.35,
   "yaw": -126.95,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.03
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.13,
   "image": "this.AnimatedImageResource_94275887_13D6_9468_4187_54913EB3B381",
   "pitch": -11.41,
   "yaw": -13.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2265BE3F_136E_EC97_41A0_BBA79CB45A42",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA, this.camera_151634B9_18B7_6CDE_41B1_77FB21C64BAC); this.mainPlayList.set('selectedIndex', 30)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 13.13,
   "yaw": -13.53,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.16,
   "image": "this.AnimatedImageResource_941FB881_13D6_9468_41A4_7C58BD20E19A",
   "pitch": -14.76,
   "yaw": 25.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CBCD90E_1216_EF25_417B_8C373F237210",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842, this.camera_17FE3B0B_18B7_65B3_41B8_65490CEAD60F); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 20.16,
   "yaw": 25.88,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.76
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 37.86,
   "image": "this.AnimatedImageResource_94CB08AE_13D6_95B8_419E_7839F98F3E7F",
   "pitch": -37.12,
   "yaw": 97.98,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_769D3F39_13BB_AC98_41AE_E98F29510728",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E, this.camera_158A25F4_18B7_6C55_41AB_8CB19147B5E7); this.mainPlayList.set('selectedIndex', 69)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 37.86,
   "yaw": 97.98,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -37.12
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Arrow 03"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.38,
   "image": "this.AnimatedImageResource_94CA98AE_13D6_95B8_41B1_4D46715C9BCC",
   "pitch": -2.87,
   "yaw": 166.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7986757E_13BE_BC99_41A9_653D16268D42",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7178E80E_13B6_9478_4187_6F7683DD2190, this.camera_158655E7_18B7_6C73_418E_643707EA9E2D); this.mainPlayList.set('selectedIndex', 68)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 13.38,
   "yaw": 166.85,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.87
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.16,
   "image": "this.AnimatedImageResource_941D087B_13D6_9498_41B1_8E4168D1F5F6",
   "pitch": -7.85,
   "yaw": -76.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D5AB790_1217_A33D_418E_1AAEC50485DA",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87, this.camera_1649F793_18B7_6CD3_419A_8F4EA2D3FB91); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 19.16,
   "yaw": -76.87,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.85
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.62,
   "image": "this.AnimatedImageResource_941D587B_13D6_949F_41AC_FABF73EF6070",
   "pitch": -8.48,
   "yaw": -124.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C53DCAA_1217_E56C_41A2_B50AA6DE8753",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA, this.camera_17B997A8_18B7_6CFE_41A3_C523F7A1026A); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 20.62,
   "yaw": -124.1,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.88,
   "image": "this.AnimatedImageResource_941CF881_13D6_9468_41AD_778797A730B3",
   "pitch": -18.78,
   "yaw": 146.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D1CBE6C_1217_A5E4_4190_E48981A49832",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E, this.camera_16471782_18B7_6CAD_41AF_85351AFB98C8); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.88,
   "yaw": 146.84,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.39,
   "image": "this.AnimatedImageResource_941C3881_13D6_9468_419D_341125FEDC7A",
   "pitch": -1.36,
   "yaw": 70.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CABF008_1216_9D2D_41A4_05E11BD0513B",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA, this.camera_16572772_18B7_6C6D_41A0_808EAB58FD99); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 13.39,
   "yaw": 70.88,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.36
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 34.44,
   "image": "this.AnimatedImageResource_943A58A0_13D6_95A8_4195_C491C6DA64B2",
   "pitch": -9.48,
   "yaw": 51.5,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C883BBC_12D6_AB99_4181_0D0E0BB44FA0",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0, this.camera_14505592_18B7_6CAD_419C_8C8A52A4A4EF); this.mainPlayList.set('selectedIndex', 52)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 34.44,
   "yaw": 51.5,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.38,
   "image": "this.AnimatedImageResource_94247887_13D6_9468_41AE_53ECE01B9DBC",
   "pitch": -9.52,
   "yaw": 40.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D38D165_1213_FFE4_41A6_FDB32088127B",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C, this.camera_1592E5DB_18B7_6C53_41B0_9689595A33EB); this.mainPlayList.set('selectedIndex', 29)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.38,
   "yaw": 40.61,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.52
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 37.29,
   "image": "this.AnimatedImageResource_9436C89C_13D6_9598_41A4_06AB8F542AF5",
   "pitch": -20.03,
   "yaw": -171.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CFE408D_12AF_B47B_41B0_89091D51B03A",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F76471E_12AA_BC99_417D_DD5A2084733C, this.camera_152E6643_18B7_6FB2_4199_9ECBB114EDC9); this.mainPlayList.set('selectedIndex', 50)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 37.29,
   "yaw": -171.46,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.03
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 38.51,
   "image": "this.AnimatedImageResource_9436589C_13D6_9598_41A8_5F4CA04DA186",
   "pitch": -14.01,
   "yaw": -77.5,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CC33FE1_12AF_ABA8_41B1_D77C0579FD6F",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD, this.camera_15CA562D_18B7_6FF7_41A6_FA03141B73D6); this.mainPlayList.set('selectedIndex', 58)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 38.51,
   "yaw": -77.5,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.01
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 39,
   "image": "this.AnimatedImageResource_9439289D_13D6_9598_41B0_9EB96459EDFD",
   "pitch": -10.74,
   "yaw": 11.68,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C77300A_12AF_F479_41B0_5F6EB8A5A65F",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B, this.camera_153C4637_18B7_6FD2_40DA_C4927E14A680); this.mainPlayList.set('selectedIndex', 48)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 39,
   "yaw": 11.68,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.74
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.53,
   "image": "this.AnimatedImageResource_94276888_13D6_9478_4194_501BE21F23F8",
   "pitch": -19.78,
   "yaw": 55.14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D506121_1212_9F1C_41B1_A6C070D16CF8",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C, this.camera_154E8513_18B7_6DD2_41A0_661E1F35EC7A); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.53,
   "yaw": 55.14,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 26.11,
   "image": "this.AnimatedImageResource_94269888_13D6_9478_41A7_0293FCC36109",
   "pitch": -15.76,
   "yaw": -126.49,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D8DD225_1215_FD64_41A5_0E7D6E8CA3C7",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B, this.camera_16BE851F_18B7_6DD2_416C_BCEDAF5B4035); this.mainPlayList.set('selectedIndex', 33)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 26.11,
   "yaw": -126.49,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.76
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 26.59,
   "image": "this.AnimatedImageResource_94260888_13D6_9478_418F_BC5FDFA35CA6",
   "pitch": -11.49,
   "yaw": -34.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_024F2EF7_1213_A2E4_41A2_93C12CE9552D",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C63E5B5_122F_A764_412F_D3ADED669290, this.camera_14770548_18B7_6DBD_41A4_08C067B02FF5); this.mainPlayList.set('selectedIndex', 40)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 26.59,
   "yaw": -34.79,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.27,
   "image": "this.AnimatedImageResource_942C5891_13D6_9468_41AD_B7DD3FE18D98",
   "pitch": -6.88,
   "yaw": 160.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_021B5170_1212_9FFD_41AA_5CE005AFDE17",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 40)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.27,
   "yaw": 160.57,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.88
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Arrow 03"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.39,
   "image": "this.AnimatedImageResource_94CA78AF_13D6_95B8_41B1_03C1E5698E4F",
   "pitch": 1.66,
   "yaw": 17.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_74D65B57_13BE_9497_419C_9D0189F1C352",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2, this.camera_179FAAEC_18B7_6475_41AC_48D727EC5EBD); this.mainPlayList.set('selectedIndex', 67)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 13.39,
   "yaw": 17.12,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 46.02,
   "image": "this.AnimatedImageResource_94CD28AF_13D6_95B8_41A5_0CE359333778",
   "pitch": -14.26,
   "yaw": 113.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_799FF1DA_13B6_B798_41A4_50BC7DBAEA54",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99, this.camera_178F9AFD_18B7_6457_4183_9FB407295790); this.mainPlayList.set('selectedIndex', 70)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 46.02,
   "yaw": 113.3,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.26
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 31.56,
   "image": "this.AnimatedImageResource_943A789E_13D6_9598_41AC_1C8B47AAFFB0",
   "pitch": -8.48,
   "yaw": -15.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C3FED55_12AA_6CE8_41AE_E741D35B25FC",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8, this.camera_169C09DE_18B7_6455_4177_353A5CF38422); this.mainPlayList.set('selectedIndex', 54)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 31.56,
   "yaw": -15.32,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 34.56,
   "image": "this.AnimatedImageResource_943DC89F_13D6_9598_41B3_2587901AC924",
   "pitch": -8.23,
   "yaw": 44.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1F35866D_12D5_9CBB_41A6_4D0C53613475",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 51)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 34.56,
   "yaw": 44.72,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 34.36,
   "image": "this.AnimatedImageResource_943AC89F_13D6_9598_41B0_105CBDC0DDD8",
   "pitch": -10.24,
   "yaw": -97.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C4AD35E_12D5_B498_41A7_891AB5E22572",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714, this.camera_16AAB9D2_18B7_64AD_4185_25AAF9E52B78); this.mainPlayList.set('selectedIndex', 53)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 34.36,
   "yaw": -97.73,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.24
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 26.08,
   "image": "this.AnimatedImageResource_94C048A3_13D6_95A8_41AA_26AD225DB6F3",
   "pitch": -3.58,
   "yaw": 88.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_72FB603B_1357_B498_41A8_7682D801DB0F",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5829C03C_1376_7498_41AC_130D2B81793F, this.camera_15AB0413_18B7_63D2_4187_2F2A56460D70); this.mainPlayList.set('selectedIndex', 56)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 26.08,
   "yaw": 88.3,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.58
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.1,
   "image": "this.AnimatedImageResource_94C3D8A3_13D6_95A8_4196_20407A0566A1",
   "pitch": -16.14,
   "yaw": -104.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_710A5280_1357_9468_41A5_8B0C26B954B0",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8, this.camera_159CE41F_18B7_63D2_41A9_D2DF4DCB8D64); this.mainPlayList.set('selectedIndex', 60)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.1,
   "yaw": -104.88,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.14
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 39.56,
   "image": "this.AnimatedImageResource_942FD891_13D6_9468_4176_6B79F8394C20",
   "pitch": -10.78,
   "yaw": -26.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_03ECDFE1_1216_A31C_4170_1FB725E4CD28",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB, this.camera_176EE843_18B7_63B3_4175_DEA26959C2DF); this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 39.56,
   "yaw": -26.72,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 31.15,
   "image": "this.AnimatedImageResource_942F5891_13D6_9468_41A5_DCC2DE5833BF",
   "pitch": -38.75,
   "yaw": 126.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CD024C6_12B7_BDE8_41AC_5672AB4222BC",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C7411C6_122E_7F24_4183_991262FE3F99, this.camera_1458587D_18B7_6456_4175_BA3736666BBF); this.mainPlayList.set('selectedIndex', 32)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 31.15,
   "yaw": 126.11,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -38.75
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.64,
   "image": "this.AnimatedImageResource_94C998AC_13D6_95B8_4142_C63842FDD74C",
   "pitch": -19.41,
   "yaw": 5.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_718BB5E3_13AE_9FA8_4182_522CA66C1E11",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99, this.camera_172CC814_18B7_63D6_41B6_D0E632B164C1); this.mainPlayList.set('selectedIndex', 70)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.64,
   "yaw": 5.15,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 44.75,
   "image": "this.AnimatedImageResource_94C948AC_13D6_95B8_41B0_AF0157E5C992",
   "pitch": -19.53,
   "yaw": 146.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_79C14A31_13B6_74A8_41B2_DDBEB87B1F17",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AEC247_135B_B4E8_41A5_746131D61342, this.camera_173DF808_18B7_63BE_41B0_DE93BE61E026); this.mainPlayList.set('selectedIndex', 64)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 44.75,
   "yaw": 146.71,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.18,
   "image": "this.AnimatedImageResource_66228586_13DE_7C69_41B2_4F28E8B26C50",
   "pitch": -8.77,
   "yaw": -5.24,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_62C33E56_13DE_ACE9_4197_4222F9D5BF58",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F, this.camera_14449889_18B7_64BE_4199_558706491165); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.18,
   "yaw": -5.24,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.77
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 33.31,
   "image": "this.AnimatedImageResource_94C848AD_13D6_95B8_41A2_5BCA3E900FB3",
   "pitch": -25.56,
   "yaw": -163.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_76D5058D_13BA_BC78_41A5_583AEB626F68",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8, this.camera_178837CC_18B7_6CB6_41AC_AE8EF45E8FF7); this.mainPlayList.set('selectedIndex', 60)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 33.31,
   "yaw": -163.04,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -25.56
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 31.28,
   "image": "this.AnimatedImageResource_941AD87B_13D6_9498_41B0_C02841D9A245",
   "pitch": -11.37,
   "yaw": -111.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CFD2DB3_1216_A77C_416E_66DEBF97806A",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 31.28,
   "yaw": -111.79,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.37
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 30.69,
   "image": "this.AnimatedImageResource_941A687B_13D6_9498_41B1_247F7A8051A7",
   "pitch": -15.89,
   "yaw": 91.19,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D4D7210_1216_9D3C_4171_0ADE2F42A7D4",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842, this.camera_15F1D438_18B7_63DE_4180_10E04864AA12); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 30.69,
   "yaw": 91.19,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.89
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.23,
   "image": "this.AnimatedImageResource_941D987B_13D6_9498_41A9_EF2517EE8769",
   "pitch": -8.89,
   "yaw": 148.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_0255BC19_1216_652F_41A6_C066A016D75E",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08, this.camera_158C742B_18B7_63F2_41B8_43725B58DAC8); this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 13.23,
   "yaw": 148.76,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.89
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 50.64,
   "image": "this.AnimatedImageResource_943D38A0_13D6_95A8_41A5_BB3BDDFE7332",
   "pitch": -44.78,
   "yaw": 141.31,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_1C75EDA8_12D5_AFB8_41B0_704BFBAC3AF9",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0, this.camera_15593688_18B7_6CBE_41A6_776445928610); this.mainPlayList.set('selectedIndex', 52)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 50.64,
   "yaw": 141.31,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_1_HS_0_0_0_map.gif",
      "width": 51,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -44.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 23.99,
   "image": "this.AnimatedImageResource_943CE8A0_13D6_95A8_418F_3E0BAC7F42F8",
   "pitch": -3.96,
   "yaw": 43.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_009DB5B8_12DA_FF98_41B2_57F94BA7CBB1",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F76471E_12AA_BC99_417D_DD5A2084733C, this.camera_1548B693_18B7_6CD2_41B3_53FE20D4B69D); this.mainPlayList.set('selectedIndex', 50)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 23.99,
   "yaw": 43.05,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.96
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Arrow 03"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.38,
   "image": "this.AnimatedImageResource_943C78A0_13D6_95A8_41A5_AB93E7D2CF7A",
   "pitch": -2.61,
   "yaw": 116.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C278140_12DB_B4E9_41AE_17FA3E516F16",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F2B9277_12D6_B497_418D_A66B17178836, this.camera_1569B67C_18B7_6C56_41B7_E126ECD6F01E); this.mainPlayList.set('selectedIndex', 55)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 13.38,
   "yaw": 116.86,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.61
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 36.2,
   "image": "this.AnimatedImageResource_943B189E_13D6_9598_41A2_5054294203D8",
   "pitch": -20.66,
   "yaw": 142.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_1DA96FB6_12AB_ABA8_417A_2178CB02BCAD",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 54)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 36.2,
   "yaw": 142.07,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_1_HS_0_0_0_map.gif",
      "width": 51,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 32.05,
   "image": "this.AnimatedImageResource_943AF89E_13D6_9598_4170_C5205039A85E",
   "pitch": -2.58,
   "yaw": 18.43,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_0053C474_12AA_FCA8_419F_A52EB4B894BD",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F76471E_12AA_BC99_417D_DD5A2084733C, this.camera_1633370B_18B7_6DB3_4183_743E5BAD1D49); this.mainPlayList.set('selectedIndex', 50)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 32.05,
   "yaw": 18.43,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.58
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 26.01,
   "image": "this.AnimatedImageResource_94CFF8B0_13D6_95A8_41AF_481EBCE5DFEB",
   "pitch": -5.34,
   "yaw": 95.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_71AB0DA6_13B6_6FA8_419D_8E6CF03C5B23",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AF6A22_135A_94A9_41AA_E036F21F6533, this.camera_144583F0_18B7_646D_41B1_EFF192B53683); this.mainPlayList.set('selectedIndex', 62)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 26.01,
   "yaw": 95.84,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.34
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.78,
   "image": "this.AnimatedImageResource_94CEB8B0_13D6_95A8_418E_7A84F2A65EA3",
   "pitch": -9.36,
   "yaw": -0.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_71C42C77_13B6_6C97_41B2_9730DE4C9557",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E, this.camera_146CF3D8_18B7_645D_41B3_782DAC2F537B); this.mainPlayList.set('selectedIndex', 69)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.78,
   "yaw": -0.88,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.36
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.57,
   "image": "this.AnimatedImageResource_94CE68B1_13D6_95A8_4185_387AD5823AB9",
   "pitch": -11.87,
   "yaw": -164.17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7023A8E1_13B6_95A8_41B0_D54576255D4E",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AF6E44_135A_6CE9_414A_9C058452CF94, this.camera_1453E3E4_18B7_6475_4172_D12D1DC3F8FC); this.mainPlayList.set('selectedIndex', 63)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.57,
   "yaw": -164.17,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.87
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.39,
   "image": "this.AnimatedImageResource_97321E1B_13EB_AC9F_41A0_B59489FEFB72",
   "pitch": -13.63,
   "yaw": -48.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_60206EAA_13EA_6DB8_416E_9E1FF412C636",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7178E80E_13B6_9478_4187_6F7683DD2190, this.camera_146643CB_18B7_64B3_41AC_CB6E5811B718); this.mainPlayList.set('selectedIndex', 68)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.39,
   "yaw": -48.86,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0_HS_3_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.63
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.52,
   "image": "this.AnimatedImageResource_94109873_13D6_94A8_4190_1EFD2BC5542E",
   "pitch": -18.65,
   "yaw": -117.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1FC0C62C_1215_E565_41A3_3D15BD3ADE2A",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0154F527_0C22_07FC_4193_06409B7D0536, this.camera_1627EA3A_18B7_67DD_41AB_65437FF1DA44); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.52,
   "yaw": -117.32,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.65
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 30.85,
   "image": "this.AnimatedImageResource_94177878_13D6_9498_41A6_EACB7D8E6E06",
   "pitch": -10.74,
   "yaw": -24.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C946A25_1212_AD64_4188_6D587C73AD36",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F, this.camera_16E0E6DA_18B7_6C5D_418E_E772A7B07A3D); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 30.85,
   "yaw": -24.12,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.74
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 33.5,
   "image": "this.AnimatedImageResource_9416B878_13D6_9498_41AA_33E29BCEF63C",
   "pitch": -21.17,
   "yaw": -111.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CC21177_1212_9FE4_4183_54AC54E3A313",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C7411C6_122E_7F24_4183_991262FE3F99, this.camera_16D076E5_18B7_6C77_4191_C10CBC32BC1A); this.mainPlayList.set('selectedIndex', 32)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 33.5,
   "yaw": -111.04,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.17
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 31.15,
   "image": "this.AnimatedImageResource_94163879_13D6_9498_415E_9371142A636C",
   "pitch": -22.3,
   "yaw": 144.83,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D2CAD93_1212_E73C_41A0_B46C20AF051A",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E35133E_1216_E365_418A_E512CC92AE96, this.camera_16C336FA_18B7_6C5D_41B4_9E073C5A3F36); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 31.15,
   "yaw": 144.83,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -22.3
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.3,
   "image": "this.AnimatedImageResource_94325895_13D6_9468_419B_C33FAE1426BA",
   "pitch": -6.38,
   "yaw": -55.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D9F8BD7_12AA_6BE8_41A2_7CE5244C8754",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137, this.camera_1625E71D_18B7_6DD7_41AD_4CEE4BBDF9C1); this.mainPlayList.set('selectedIndex', 44)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.3,
   "yaw": -55.73,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.38
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 29.17,
   "image": "this.AnimatedImageResource_942B588F_13D6_9478_41B2_7A523D2A5848",
   "pitch": -8.14,
   "yaw": -162.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C7BC23C_12AA_B498_41AF_F729EB318E24",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B, this.camera_17C00B2E_18B7_65F2_4171_B3284B50ACDD); this.mainPlayList.set('selectedIndex', 33)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 29.17,
   "yaw": -162.75,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.14
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.06,
   "image": "this.AnimatedImageResource_9413C875_13D6_94A8_41AF_0F17EFF2E170",
   "pitch": -14.38,
   "yaw": -115.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1FC698B9_1212_AD6F_4187_3AD510ACD884",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.06,
   "yaw": -115.06,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.38
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.65,
   "image": "this.AnimatedImageResource_94133875_13D6_94A8_41B1_B2BE209C0013",
   "pitch": -7.6,
   "yaw": 42.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C101505_1212_E724_4178_FBFCF3CF198E",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087, this.camera_1526995D_18B7_6457_41B1_B5B6C543513B); this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.65,
   "yaw": 42.71,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.6
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.52,
   "image": "this.AnimatedImageResource_9412B875_13D6_94A8_41B0_4DE8491AE809",
   "pitch": -18.65,
   "yaw": -11.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C8B63C0_1212_E31C_4170_41546F365260",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5, this.camera_15289969_18B7_647F_41B1_5DD6B428D70B); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.52,
   "yaw": -11.81,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.65
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.66,
   "image": "this.AnimatedImageResource_9412D876_13D6_94A8_41B2_725079A747E5",
   "pitch": -7.35,
   "yaw": 107.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D775DA8_1212_A76D_41AD_4917755B7ED5",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0154F527_0C22_07FC_4193_06409B7D0536, this.camera_15350952_18B7_65AD_41B2_B587FE94A7E7); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.66,
   "yaw": 107.02,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_1_HS_3_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.91,
   "image": "this.AnimatedImageResource_9770FDDD_13EB_AF9B_41AB_EB7B8822CA23",
   "pitch": -2.49,
   "yaw": -63.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D7C03B7_121D_E364_41B0_97CDAEEE1DFA",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43, this.camera_151CD975_18B7_6457_41B4_E99ED11A9607); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 20.91,
   "yaw": -63.02,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 30.56,
   "image": "this.AnimatedImageResource_942EF892_13D6_9468_4193_81D5B3666F2F",
   "pitch": -49.93,
   "yaw": -61.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1F7A14C8_12BD_BDF8_41A3_3BC9F5EA40CF",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4, this.camera_15E0360B_18B7_6FB3_4199_C912456E1F40); this.mainPlayList.set('selectedIndex', 41)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 30.56,
   "yaw": -61.3,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -49.93
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.12,
   "image": "this.AnimatedImageResource_94246886_13D6_9468_41B1_DFA8B06CDE8B",
   "pitch": -13.04,
   "yaw": 78.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C4AC2F0_1237_E2FC_4191_10C8DE6815B5",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C, this.camera_17CD87FC_18B7_6C56_41A0_CAD3AD4647D6); this.mainPlayList.set('selectedIndex', 29)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.12,
   "yaw": 78.04,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.04
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.83,
   "image": "this.AnimatedImageResource_9427E886_13D6_9468_4183_2A287A2FC4A8",
   "pitch": -35.23,
   "yaw": -98.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D4E0722_1237_A31C_41AE_9C69F5AEEF16",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E351DCE_1216_A725_41AA_C2237F5681B0, this.camera_17DD97F0_18B7_6C6E_419F_075A95C8B3B6); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 16.83,
   "yaw": -98.1,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -35.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19,
   "image": "this.AnimatedImageResource_941E7883_13D6_9468_41A7_219493B29B42",
   "pitch": -24.31,
   "yaw": 74.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C9312D5_122E_9D24_41A3_8D20E52FEFA5",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA, this.camera_146AA586_18B7_6CB5_41B4_2245FCF70713); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 19,
   "yaw": 74.86,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.31
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.67,
   "image": "this.AnimatedImageResource_9420A884_13D6_9468_41AC_566B3EA28843",
   "pitch": 17.61,
   "yaw": -37.27,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_031A365A_122E_652D_417E_B90DA7D15DD2",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 20.67,
   "yaw": -37.27,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 17.61
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.35,
   "image": "this.AnimatedImageResource_94238884_13D6_9468_41AC_248B24B66125",
   "pitch": -10.03,
   "yaw": 4.94,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CB4F5AA_122E_676C_41A2_8A0B8BF69063",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87, this.camera_168F19E9_18B7_647F_41AE_F987D6CC3204); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.35,
   "yaw": 4.94,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.03
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.34,
   "image": "this.AnimatedImageResource_9422E885_13D6_9468_41A0_A465318CA99E",
   "pitch": -5.25,
   "yaw": -14.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C4125D1_1232_673C_41A5_59703CE4972A",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C4AA941_122D_AF1C_4194_652BF1171E50, this.camera_15BB68C5_18B7_64B6_4159_B6E207F2006D); this.mainPlayList.set('selectedIndex', 27)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 18.34,
   "yaw": -14.53,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.25
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.35,
   "image": "this.AnimatedImageResource_94226885_13D6_9468_41AC_30C540234E1E",
   "pitch": -5,
   "yaw": 21.14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D2A0444_1232_6525_419F_57DC2653977B",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25, this.camera_15AFD8DD_18B7_6456_41B1_566979C42845); this.mainPlayList.set('selectedIndex', 26)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 17.35,
   "yaw": 21.14,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.45,
   "image": "this.AnimatedImageResource_94258885_13D6_9468_4163_0F3454C798E6",
   "pitch": -25.69,
   "yaw": 138.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CE01260_1212_9D1C_41AC_02CF8147CA6F",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC, this.camera_15BE68B9_18B7_64DE_418B_920E5CC216F7); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.45,
   "yaw": 138.05,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -25.69
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.93,
   "image": "this.AnimatedImageResource_94252885_13D6_9468_419F_33255F630FC1",
   "pitch": -17.15,
   "yaw": -100.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1DB268A7_1212_ED64_41A3_38B566A01C08",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684, this.camera_15A578D1_18B7_64AE_41B6_F77BF4A4930B); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.93,
   "yaw": -100.11,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_1_HS_3_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.45,
   "image": "this.AnimatedImageResource_942CA890_13D6_9468_41AB_9701985D62AC",
   "pitch": -14.26,
   "yaw": -50.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C8217D9_12AA_BB98_41AF_A2F3EC91AC0E",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C74D9CF_122E_AF24_41AA_174DA8673956, this.camera_15A8F8E9_18B7_647F_41A4_F24BB7435DAD); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 20.45,
   "yaw": -50.37,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.26
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.92,
   "image": "this.AnimatedImageResource_942CD890_13D6_9468_419C_390B32B96E98",
   "pitch": -19.28,
   "yaw": 130.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CD5ECAE_12AA_6DB9_41A5_8E830ECB7E1B",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 44)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 19.92,
   "yaw": 130.51,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.28
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.97,
   "image": "this.AnimatedImageResource_94C748AB_13D6_95B8_4186_44DA98675CF0",
   "pitch": -17.15,
   "yaw": 115.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_72C4FBA8_13AD_ABB9_41A3_7F34B62A42F4",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566, this.camera_15E16452_18B7_6C52_418E_AFC0BF5E2D51); this.mainPlayList.set('selectedIndex', 61)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.97,
   "yaw": 115.44,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.82,
   "image": "this.AnimatedImageResource_94C608AB_13D6_95B8_418A_064521FD3FFE",
   "pitch": -8.86,
   "yaw": -101.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_71119DBF_13AE_6F98_41A7_787AB9BFAA44",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99, this.camera_15D0B463_18B7_6C72_41A1_85FCDE278194); this.mainPlayList.set('selectedIndex', 70)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.82,
   "yaw": -101.62,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.86
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.26,
   "image": "this.AnimatedImageResource_9424E886_13D6_9468_4196_CDEC8909310D",
   "pitch": -7.51,
   "yaw": -138.38,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CB25454_1232_E524_41AA_10012A75BCE9",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43, this.camera_15FE2600_18B7_6FAD_41A3_1EA5EE4BCC28); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 17.26,
   "yaw": -138.38,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.51
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 28.11,
   "image": "this.AnimatedImageResource_9421F883_13D6_9468_4197_5A3CE3332517",
   "pitch": -24.56,
   "yaw": -114.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CAC8D5D_122E_A727_4177_B3860FDBAABB",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842, this.camera_17A997B6_18B7_6CD2_41B1_978103A823C7); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 28.11,
   "yaw": -114.56,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.56
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.11,
   "image": "this.AnimatedImageResource_94211884_13D6_9468_41A9_EC3E00E2C897",
   "pitch": -0.69,
   "yaw": 56.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CD824EB_122E_66E3_41B1_10BA8B2E6D14",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB, this.camera_179807C1_18B7_6CAE_41A1_B4274D7AE088); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 22.11,
   "yaw": 56.65,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.69
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 29.75,
   "image": "this.AnimatedImageResource_9435D895_13D6_9468_41B2_953E2AAFE675",
   "pitch": -21.17,
   "yaw": 30.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C894F57_12AE_ACE8_4183_A6922B4123E1",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137, this.camera_15EA492E_18B7_65F5_41B2_8FC7AB985DB8); this.mainPlayList.set('selectedIndex', 44)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 29.75,
   "yaw": 30.15,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.17
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 38.34,
   "image": "this.AnimatedImageResource_9434A895_13D6_9468_418B_02DF4B72E6EE",
   "pitch": -15.01,
   "yaw": -159.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CC36158_12AE_F498_41AE_8E9E1E6418EC",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B, this.camera_15C0E946_18B7_65B5_41B5_2EA7027A29B7); this.mainPlayList.set('selectedIndex', 48)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 38.34,
   "yaw": -159.4,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.01
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.99,
   "image": "this.AnimatedImageResource_94340896_13D6_9468_4188_74585E107C11",
   "pitch": -8.27,
   "yaw": -66.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C520593_12AE_9C68_4173_816FAB320426",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_59E47185_136B_F468_41AE_60E9A934E07E, this.camera_15DEF93A_18B7_65DD_41A1_0CD7860DA369); this.mainPlayList.set('selectedIndex', 57)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 15.99,
   "yaw": -66.66,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.27
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.7,
   "image": "this.AnimatedImageResource_94C2B8A3_13D6_95A8_4191_3C2E4628A6F9",
   "pitch": -10.36,
   "yaw": 96.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4EB441CC_1355_97F8_41A1_CE3B7B0403E0",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6, this.camera_169F86B6_18B7_6CD5_41A2_47AA60D7A7BE); this.mainPlayList.set('selectedIndex', 59)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.7,
   "yaw": 96.09,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.36
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.19,
   "image": "this.AnimatedImageResource_94C248A4_13D6_95A8_41B2_B7497B467EA2",
   "pitch": -15.39,
   "yaw": 15.2,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4EC542AD_1355_B5B8_4195_49DDEE30B0C5",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AEEB3E_135B_F498_41A5_157725750FD2, this.camera_16F116CE_18B7_6CB5_41AC_4E1B29B56B5D); this.mainPlayList.set('selectedIndex', 66)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.19,
   "yaw": 15.2,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.39
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.32,
   "image": "this.AnimatedImageResource_94C5D8A4_13D6_95A8_4196_637E566A987E",
   "pitch": -6.13,
   "yaw": -65.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4E9C0D1D_13AA_AC9B_41AB_C947C61E59ED",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AE96EF_135B_9DB8_419C_15F53F06D743, this.camera_168F06C2_18B7_6CAD_4185_1E1DA70EC357); this.mainPlayList.set('selectedIndex', 65)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 13.32,
   "yaw": -65.78,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.13
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.85,
   "image": "this.AnimatedImageResource_94C4A8A5_13D6_95A8_41A7_B28E25D22B71",
   "pitch": -8.35,
   "yaw": -147.59,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4C8AA6F6_13AA_7DA9_41AE_58863417B51A",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566, this.camera_16ADF6AB_18B7_6CF3_419D_E0CBA1CBE754); this.mainPlayList.set('selectedIndex', 61)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.85,
   "yaw": -147.59,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_1_HS_3_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Arrow 03"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 28.01,
   "image": "this.AnimatedImageResource_943FC8A1_13D6_95A8_4170_2575470DC3C1",
   "pitch": -10.28,
   "yaw": -53.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C7ED5AC_12DB_FFB8_41A1_14BAF639DE23",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8, this.camera_16096A6D_18B7_6477_41A2_BA23AA934751); this.mainPlayList.set('selectedIndex', 54)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 28.01,
   "yaw": -53.72,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.28
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.92,
   "image": "this.AnimatedImageResource_6668D565_13DE_7CA8_41A3_AA7E5514284C",
   "pitch": -14.51,
   "yaw": -107.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1F7507C3_1212_A31C_4183_83418A8BA979",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC, this.camera_16171A4B_18B7_67B3_419D_8703BE0172A9); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 20.92,
   "yaw": -107.4,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.51
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.39,
   "image": "this.AnimatedImageResource_9413B875_13D6_94A8_41AA_7EE7346BBEA4",
   "pitch": -11.12,
   "yaw": 70.34,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1FCAF628_1212_E56C_4194_FF80F7393174",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_02181B5D_0879_47EF_4194_05F745303325, this.camera_16195A5C_18B7_6455_41A5_1B20BCD59D5F); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.39,
   "yaw": 70.34,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.12
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.64,
   "image": "this.AnimatedImageResource_94C1F8A2_13D6_95A8_41A9_6B60510E69E7",
   "pitch": -11.12,
   "yaw": 102.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4B393D3D_135A_6C98_41AA_419ADA546251",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8, this.camera_16D31A0D_18B7_67B7_4190_B6A844175195); this.mainPlayList.set('selectedIndex', 49)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.64,
   "yaw": 102.12,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.12
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.41,
   "image": "this.AnimatedImageResource_94C118A2_13D6_95A8_41AC_1FB316BBB6F8",
   "pitch": -20.91,
   "yaw": -78.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4B747C31_135A_6CA8_4190_75C9DFFE5290",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AEC247_135B_B4E8_41A5_746131D61342, this.camera_16E00A01_18B7_67AF_4192_2E23A1C3D5A2); this.mainPlayList.set('selectedIndex', 64)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.41,
   "yaw": -78.26,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.91
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.3,
   "image": "this.AnimatedImageResource_661CF57D_13DE_7C9B_4191_850C29BDE7EB",
   "pitch": 6.3,
   "yaw": -154.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7EBB33CA_13AA_9BF8_419A_8798508D1C4A",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_632FB807_13AA_9468_4199_F2D987E571CA, this.camera_16F099F5_18B7_6457_416B_C535430AB774); this.mainPlayList.set('selectedIndex', 71)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.3,
   "yaw": -154.96,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 6.3
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.29,
   "image": "this.AnimatedImageResource_94158876_13D6_94A8_41B1_4B3A1F39C4F4",
   "pitch": -20.16,
   "yaw": -113.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CA6244A_121D_A52C_41A9_F6D1528CF2A2",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_027D9014_12BA_7468_41AE_B7601C694ED1, this.camera_14734554_18B7_6C55_41A9_887DF4331ACC); this.mainPlayList.set('selectedIndex', 43)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.29,
   "yaw": -113.8,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.16
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.37,
   "image": "this.AnimatedImageResource_94150876_13D6_94A8_41B1_836CDFDD4C27",
   "pitch": -19.66,
   "yaw": -4.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D119548_121D_A72D_41AA_4E2453D72711",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E351DCE_1216_A725_41AA_C2237F5681B0, this.camera_147C7560_18B7_6C6D_41A7_CFD5521894C6); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.37,
   "yaw": -4.02,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "items": [
  {
   "hfov": 25.72,
   "image": "this.AnimatedImageResource_94155876_13D6_94A8_41B1_2BBA759B777F",
   "pitch": -6.34,
   "yaw": 103.5,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1D48DAA0_121E_6D1C_41AC_DFD8A9F98E0B",
 "maps": [
  {
   "hfov": 25.72,
   "yaw": 103.5,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.34
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.55,
   "image": "this.AnimatedImageResource_94149877_13D6_94A8_419B_CD498E0E5D8E",
   "pitch": 10.32,
   "yaw": 44.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CE3126A_121E_BDEC_4197_7CA1B7E86B73",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43, this.camera_1478E56D_18B7_6C77_41B4_234693EB0B2C); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.55,
   "yaw": 44.76,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 10.32
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.15,
   "image": "this.AnimatedImageResource_94C898AD_13D6_95B8_41B0_1BA5CF142AC1",
   "pitch": -3.24,
   "yaw": 97.14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_74AA5A0C_13BA_7478_41B0_90F2D30D4E01",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8, this.camera_17FB27D8_18B7_6C5E_419B_6AB90F155EE6); this.mainPlayList.set('selectedIndex', 60)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 22.15,
   "yaw": 97.14,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.24
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.43,
   "image": "this.AnimatedImageResource_94D1F8B1_13D6_95A8_41B3_1E45FFB9DDEE",
   "pitch": -0.98,
   "yaw": 11.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7D138A24_13AE_94A8_41AA_5EEECFBB35E0",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD, this.camera_157AA4EE_18B7_6C72_4198_65BFF4E90C55); this.mainPlayList.set('selectedIndex', 58)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.43,
   "yaw": 11.09,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.98
  }
 ]
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_52344940_5F01_EFC4_41BB_2A5E51966695",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_52344940_5F01_EFC4_41BB_2A5E51966695.png",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "rollOverIconURL": "skin/IconButton_52344940_5F01_EFC4_41BB_2A5E51966695_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_52344940_5F01_EFC4_41BB_2A5E51966695_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button53061"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_52344940_5F01_EFC4_4184_BD88B8F3E7CC",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_52344940_5F01_EFC4_4184_BD88B8F3E7CC.png",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "rollOverIconURL": "skin/IconButton_52344940_5F01_EFC4_4184_BD88B8F3E7CC_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_52344940_5F01_EFC4_4184_BD88B8F3E7CC_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button53068"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_52344940_5F01_EFC4_41D7_BE81DEFE8744",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_52344940_5F01_EFC4_41D7_BE81DEFE8744.png",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "rollOverIconURL": "skin/IconButton_52344940_5F01_EFC4_41D7_BE81DEFE8744_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_52344940_5F01_EFC4_41D7_BE81DEFE8744_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button53060"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_52344940_5F01_EFC4_41C7_7571D1A24A33",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_52344940_5F01_EFC4_41C7_7571D1A24A33.png",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "rollOverIconURL": "skin/IconButton_52344940_5F01_EFC4_41C7_7571D1A24A33_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_52344940_5F01_EFC4_41C7_7571D1A24A33_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button53069"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_52344940_5F01_EFC4_41D4_A1CCD7021F0A",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_52344940_5F01_EFC4_41D4_A1CCD7021F0A.png",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "rollOverIconURL": "skin/IconButton_52344940_5F01_EFC4_41D4_A1CCD7021F0A_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_52344940_5F01_EFC4_41D4_A1CCD7021F0A_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button53062"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_52344940_5F01_EFC4_41BB_7EDA152A8375",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_52344940_5F01_EFC4_41BB_7EDA152A8375.png",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "rollOverIconURL": "skin/IconButton_52344940_5F01_EFC4_41BB_7EDA152A8375_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_52344940_5F01_EFC4_41BB_7EDA152A8375_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button53071"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_52344940_5F01_EFC4_41B6_26FA0557CEC9",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_52344940_5F01_EFC4_41B6_26FA0557CEC9.png",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "rollOverIconURL": "skin/IconButton_52344940_5F01_EFC4_41B6_26FA0557CEC9_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_52344940_5F01_EFC4_41B6_26FA0557CEC9_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button53065"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_52344940_5F01_EFC4_41B5_303051AFBE15",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_52344940_5F01_EFC4_41B5_303051AFBE15.png",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "rollOverIconURL": "skin/IconButton_52344940_5F01_EFC4_41B5_303051AFBE15_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_52344940_5F01_EFC4_41B5_303051AFBE15_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button53067"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_52344940_5F01_EFC4_41CC_4A5BFB01C469",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_52344940_5F01_EFC4_41CC_4A5BFB01C469.png",
 "minWidth": 0,
 "mode": "toggle",
 "height": 40,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_52344940_5F01_EFC4_41CC_4A5BFB01C469_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button53066"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_52344940_5F01_EFC4_41D0_C6DE67446A2C",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_52344940_5F01_EFC4_41D0_C6DE67446A2C.png",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "rollOverIconURL": "skin/IconButton_52344940_5F01_EFC4_41D0_C6DE67446A2C_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_52344940_5F01_EFC4_41D0_C6DE67446A2C_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button53063"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.73,
   "image": "this.AnimatedImageResource_9428388E_13D6_9478_41B0_29E153A67088",
   "pitch": -3.05,
   "yaw": -4.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CACDF8D_12AA_6C78_41A4_08CA5974F831",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B, this.camera_1502D65A_18B7_6C52_419E_9BCF340C281C); this.mainPlayList.set('selectedIndex', 33)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 17.73,
   "yaw": -4.44,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.05
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 26.08,
   "image": "this.AnimatedImageResource_9428588F_13D6_9478_4196_0609BA3EB297",
   "pitch": -16.02,
   "yaw": 167.19,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C086FEC_12AA_ABB8_41A0_393080691617",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C745916_122E_6F24_41B0_E0BDC7980538, this.camera_1567D671_18B7_6C6E_4170_33DAEE6FA89A); this.mainPlayList.set('selectedIndex', 38)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 26.08,
   "yaw": 167.19,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.02
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 26.3,
   "image": "this.AnimatedImageResource_942B288F_13D6_9478_41AC_A58DB80A4C70",
   "pitch": -14.26,
   "yaw": -102.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D88450E_12AA_9C78_41A1_6D2BAFAB6718",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4, this.camera_15745666_18B7_6C72_41B5_FE02EBBDA5F8); this.mainPlayList.set('selectedIndex', 41)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 26.3,
   "yaw": -102.12,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.26
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 39.46,
   "image": "this.AnimatedImageResource_9427F887_13D6_9468_419B_D29F636525C2",
   "pitch": -11.53,
   "yaw": 172.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_02AED202_1213_9D1D_41AA_D62677C584E0",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C63E5B5_122F_A764_412F_D3ADED669290, this.camera_171D081F_18B7_63D3_41AC_E33D69CC90FF); this.mainPlayList.set('selectedIndex', 40)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 39.46,
   "yaw": 172.75,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.83,
   "image": "this.AnimatedImageResource_94CC88AF_13D6_95B8_419F_8BED6D05B79E",
   "pitch": -18.15,
   "yaw": -85.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_76356DC0_13BA_6FE8_41A7_472FCD8F2F43",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2, this.camera_17E18B16_18B7_65D2_41B7_A12AB4DEB9FE); this.mainPlayList.set('selectedIndex', 67)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.83,
   "yaw": -85.79,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 37.98,
   "image": "this.AnimatedImageResource_94CC68B0_13D6_95A8_41AB_3D516CAFEBBA",
   "pitch": -10.99,
   "yaw": -170.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7676AAD0_13BA_B5E8_41AA_11CB8CE16872",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99, this.camera_17D01B22_18B7_65F2_41B8_0DF87881D8EA); this.mainPlayList.set('selectedIndex', 70)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 37.98,
   "yaw": -170.45,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.99
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.35,
   "image": "this.AnimatedImageResource_94204884_13D6_9468_41A2_38B8E71149BE",
   "pitch": -10.03,
   "yaw": -7.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D17C1AC_122E_BF65_4183_8161E3331EA2",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E2C3554_1217_A725_41A3_8E48640695C2, this.camera_17EBA7E4_18B7_6C76_41B5_74E64AA65C41); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.35,
   "yaw": -7.87,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.03
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.49,
   "image": "this.AnimatedImageResource_941B687A_13D6_9498_41AF_905CEC80CB03",
   "pitch": -16.02,
   "yaw": -117.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CEF95D3_1216_673C_4184_523CC02AC223",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E2C3554_1217_A725_41A3_8E48640695C2, this.camera_1679AA7E_18B7_6455_419D_588EA8634331); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.49,
   "yaw": -117.57,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.02
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.41,
   "image": "this.AnimatedImageResource_941AA87A_13D6_9498_41A6_F46A50295466",
   "pitch": -7.35,
   "yaw": 63.68,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D7AC640_1216_A51C_41A0_D41E981546DE",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.41,
   "yaw": 63.68,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 32.19,
   "image": "this.AnimatedImageResource_94C408AA_13D6_95B8_4195_D4436F34E17E",
   "pitch": -22.8,
   "yaw": 63.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7253670E_13AA_9C78_417F_14115AC43921",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8, this.camera_1573398C_18B7_64B5_41B6_D7F176D336FA); this.mainPlayList.set('selectedIndex', 60)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 32.19,
   "yaw": 63.81,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -22.8
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.83,
   "image": "this.AnimatedImageResource_94C7F8AA_13D6_95B8_4191_BE628A8A114C",
   "pitch": -8.6,
   "yaw": -90.31,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_729EDB84_13AA_F468_41A1_53A8EAA06C7A",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AF6A22_135A_94A9_41AA_E036F21F6533, this.camera_1565F998_18B7_64DD_41B6_C7A9C5100FDD); this.mainPlayList.set('selectedIndex', 62)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.83,
   "yaw": -90.31,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.6
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.94,
   "image": "this.AnimatedImageResource_943F58A1_13D6_95A8_41A0_A1403910D87D",
   "pitch": -6.85,
   "yaw": 80.01,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_45F47B1C_1355_B498_41AA_7A0F0BB39A3B",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137, this.camera_177C7837_18B7_63D3_41B3_1891E2DCB6E4); this.mainPlayList.set('selectedIndex', 44)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.94,
   "yaw": 80.01,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.85
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.24,
   "image": "this.AnimatedImageResource_943EE8A1_13D6_95A8_41A6_59172D820C55",
   "pitch": -21.92,
   "yaw": -126.49,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_44AAC325_135A_94A8_4193_14C3B5256996",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6, this.camera_170FE82B_18B7_63F3_417F_34277E0B15DB); this.mainPlayList.set('selectedIndex', 59)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.24,
   "yaw": -126.49,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.92
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 37.06,
   "image": "this.AnimatedImageResource_942E5893_13D6_9468_4191_3E9180D07769",
   "pitch": -8.1,
   "yaw": 76.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1F443117_12B6_9497_4186_D87B6D7706DD",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684, this.camera_15B7C8AE_18B7_64F2_41A7_E428C0AD6B9A); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 37.06,
   "yaw": 76.37,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.1
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 36.34,
   "image": "this.AnimatedImageResource_94319893_13D6_9468_41AD_3E32D27113AE",
   "pitch": -13.88,
   "yaw": -117.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C268E5D_12B6_EC9B_419B_151EBD8A23B4",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137, this.camera_1440F895_18B7_64D6_419F_A7EBB24ED7D4); this.mainPlayList.set('selectedIndex', 44)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 36.34,
   "yaw": -117.82,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.88
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.85,
   "image": "this.AnimatedImageResource_94310893_13D6_9468_41A9_9DEAC094BB17",
   "pitch": -11.16,
   "yaw": -33.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1DC8A46A_12B6_9CB8_4188_7643BB50C325",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C461727_12B7_9CA8_41A0_02E993644282, this.camera_144B38A1_18B7_64EE_419A_CD0EDFB79BE6); this.mainPlayList.set('selectedIndex', 45)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 15.85,
   "yaw": -33.25,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.16
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Arrow 03"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.78,
   "image": "this.AnimatedImageResource_943E48A2_13D6_95A8_41AF_4E7BB53BD14D",
   "pitch": -6.88,
   "yaw": 116.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_45B6A166_135A_94A9_41A2_C50B72B2839B",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B, this.camera_1612272E_18B7_6DF5_41A9_83BEEA79D7D5); this.mainPlayList.set('selectedIndex', 47)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.78,
   "yaw": 116.61,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.88
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.66,
   "image": "this.AnimatedImageResource_94257886_13D6_9468_41AC_242EE28E7E81",
   "pitch": -2.49,
   "yaw": -134.99,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C83A7D0_1232_A33C_41AB_91E4712EE930",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43, this.camera_150EE981_18B7_64AF_41A8_0951933EF141); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.66,
   "yaw": -134.99,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.64,
   "image": "this.AnimatedImageResource_9418387A_13D6_9498_41B0_83993DF03199",
   "pitch": -13.63,
   "yaw": -109.03,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C904779_1212_63EC_41B1_E4B0F83824DC",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E31C113_1217_9F23_41AF_9721C1EE070D, this.camera_158F890C_18B7_65B5_41B6_3BF1ADCEE3BA); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.64,
   "yaw": -109.03,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.63
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.37,
   "image": "this.AnimatedImageResource_9418587A_13D6_9498_41B0_25DBA5DC336B",
   "pitch": -17.15,
   "yaw": 46.22,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CFAEBEF_1215_A2E3_4184_543FCBB4B1D7",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8, this.camera_15F93923_18B7_65F3_41B6_C98BA8285F83); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.37,
   "yaw": 46.22,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.79,
   "image": "this.AnimatedImageResource_941BE87A_13D6_9498_41B1_7C5BB52FC330",
   "pitch": -6.63,
   "yaw": 136.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1DB396D8_1215_A52C_4199_745955ADFD84",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C79B467_1212_65E4_41A9_397DB7948749, this.camera_15F33918_18B7_65DD_4192_6FAF712059AE); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 19.79,
   "yaw": 136.95,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.63
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.87,
   "image": "this.AnimatedImageResource_942AC88F_13D6_9478_4163_FBE5142F854A",
   "pitch": -23.55,
   "yaw": 58.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CA887C2_12AA_9BE8_4160_E2185E3BE306",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.87,
   "yaw": 58.91,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.55
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 29.35,
   "image": "this.AnimatedImageResource_942A5890_13D6_9468_41A3_2D15E1165A5A",
   "pitch": -5.13,
   "yaw": -20.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C848582_12AB_BC69_41A9_08EBDF913410",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840, this.camera_14633579_18B7_6C5F_419D_10824F2818B0); this.mainPlayList.set('selectedIndex', 37)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 29.35,
   "yaw": -20.56,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.13
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 34.34,
   "image": "this.AnimatedImageResource_9438B89D_13D6_9598_41A3_4B291434DE23",
   "pitch": -10.49,
   "yaw": 46.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C82984B_12AF_94FF_41AA_488F6A66AC8B",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8, this.camera_1774AB69_18B7_647E_4178_FE93B44D6CA6); this.mainPlayList.set('selectedIndex', 49)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 34.34,
   "yaw": 46.73,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 32.84,
   "image": "this.AnimatedImageResource_9438389D_13D6_9598_41A0_E2FA548866BA",
   "pitch": -10.61,
   "yaw": 163.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CEBF8B1_12AE_95A8_41A6_5A0960F1CF59",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F769998_12AA_9798_41A9_9421299474C3, this.camera_17044B5E_18B7_6452_4185_A58E4B4C824E); this.mainPlayList.set('selectedIndex', 51)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 32.84,
   "yaw": 163.04,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.61
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 29.85,
   "image": "this.AnimatedImageResource_943BB89D_13D6_9598_4143_792438EB6B72",
   "pitch": -13.13,
   "yaw": -146.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C6239DD_12AE_9798_41A6_99ED44AA020C",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8, this.camera_1766EB75_18B7_6456_41A7_3C24722E9EC7); this.mainPlayList.set('selectedIndex', 54)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 29.85,
   "yaw": -146.09,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.13
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 28.48,
   "image": "this.AnimatedImageResource_9420D884_13D6_9468_41AD_E1F98BE78F22",
   "pitch": -32.22,
   "yaw": -160.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C75CA75_122E_EDE4_4181_599F8E2C58F1",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087, this.camera_155C1507_18B7_6DB2_41A9_2D5CF022BB43); this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 28.48,
   "yaw": -160.66,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -32.22
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.79,
   "image": "this.AnimatedImageResource_94142878_13D6_9498_4183_9C394924CA1E",
   "pitch": -16.64,
   "yaw": -26.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CC5F1FB_121F_9EE3_415D_376335E24752",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C, this.camera_166BAA8F_18B7_64B2_41B6_0A95CB6E1107); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.79,
   "yaw": -26.63,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.64
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.6,
   "image": "this.AnimatedImageResource_94146878_13D6_9498_41A5_B34C987920A8",
   "pitch": -8.35,
   "yaw": 154,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D27D0EB_121F_BEE3_419A_8904A71B3700",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E351DCE_1216_A725_41AA_C2237F5681B0, this.camera_165B3AA0_18B7_64EE_41B0_28061B569B4E); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.6,
   "yaw": 154,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.05,
   "image": "this.AnimatedImageResource_9417B878_13D6_9498_41AA_25BE7973AD21",
   "pitch": -10.24,
   "yaw": -123.6,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CEEC4D8_121D_A52D_41B0_D908E1BCA50E",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E, this.camera_164DBAB6_18B7_64D2_41AE_4FB51629DCD7); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 17.05,
   "yaw": -123.6,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_1_HS_2_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.24
  }
 ]
},
{
 "propagateClick": false,
 "children": [
  "this.IconButton_52344940_5F01_EFC4_41B6_26FA0557CEC9",
  "this.IconButton_52344940_5F01_EFC4_41CC_4A5BFB01C469",
  "this.IconButton_52344940_5F01_EFC4_41B5_303051AFBE15"
 ],
 "id": "Container_52344940_5F01_EFC4_41D6_7E3303CC9C74",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "width": 40,
 "minHeight": 20,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "height": "100%",
 "gap": 4,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "Container",
 "borderRadius": 0,
 "overflow": "hidden",
 "scrollBarWidth": 10,
 "data": {
  "name": "Container53064"
 }
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94140877_13D6_94A8_41AE_489110C0D356",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94145877_13D6_94A8_41AA_9A297FFA7DCB",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 5,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94179877_13D6_94A8_4179_DF443715FACC",
 "frameCount": 20,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_1_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94173877_13D6_94A8_4181_DA87AF04A031",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9430E893_13D6_9468_4172_2120FDD36A96",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94306894_13D6_9468_41AF_EC6310DBE930",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9433E894_13D6_9468_4197_330ADA36CA17",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_1_HS_3_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94337894_13D6_9468_4170_D19E0EEEB7AE",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9432D895_13D6_9468_4193_14B0F3D08239",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94C648AC_13D6_95B8_41B1_1C9C7F870993",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94C928AD_13D6_95B8_41AF_EA0EC1566E15",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_942E2891_13D6_9468_419F_ACF6A96B4616",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_942E4892_13D6_9468_41B1_60C07C4887AB",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9431D892_13D6_9468_41B3_14C7569BD6C5",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_941E0882_13D6_9468_4195_1794F95411F4",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_941FC882_13D6_9468_41B2_EB177517901D",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_941F2882_13D6_9468_419F_5C20035EA5DF",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_941F7882_13D6_9468_41A4_B8C404B351B5",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_941EE882_13D6_9468_413B_B2C32AE6FF6C",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_941F7883_13D6_9468_41B2_56776A311B12",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_941E8883_13D6_9468_41AF_CE3048B16EFD",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_941E3883_13D6_9468_418C_E9DE58D80AA2",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94194879_13D6_9498_419A_9F0852F872D9",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94189879_13D6_9498_4191_2C5D6F238653",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94379896_13D6_9468_418C_FD33FC1362CE",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94376896_13D6_9468_4194_FDFD15BFB4BC",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_942DD890_13D6_9468_419C_15F2D2EFF8EA",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94298888_13D6_9478_41A6_F780DA5C92DB",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94290889_13D6_9478_41B0_EAB9B4B93956",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9428B889_13D6_9478_41A5_8439477C33BD",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94233885_13D6_9468_41B0_3616204D0D37",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94234885_13D6_9468_4191_6144A3359023",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9417C878_13D6_9498_4198_9A9F94E3D7B2",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94165879_13D6_9498_4170_B079642F46E5",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94199879_13D6_9498_41A0_F276DDE6077D",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94193879_13D6_9498_41A6_211A2EA94192",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94273887_13D6_9468_419B_021B89499B3B",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94275887_13D6_9468_4187_54913EB3B381",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_941FB881_13D6_9468_41A4_7C58BD20E19A",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94CB08AE_13D6_95B8_419E_7839F98F3E7F",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94CA98AE_13D6_95B8_41B1_4D46715C9BCC",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_941D087B_13D6_9498_41B1_8E4168D1F5F6",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_941D587B_13D6_949F_41AC_FABF73EF6070",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_941CF881_13D6_9468_41AD_778797A730B3",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_1_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_941C3881_13D6_9468_419D_341125FEDC7A",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_943A58A0_13D6_95A8_4195_C491C6DA64B2",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94247887_13D6_9468_41AE_53ECE01B9DBC",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9436C89C_13D6_9598_41A4_06AB8F542AF5",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9436589C_13D6_9598_41A8_5F4CA04DA186",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9439289D_13D6_9598_41B0_9EB96459EDFD",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94276888_13D6_9478_4194_501BE21F23F8",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94269888_13D6_9478_41A7_0293FCC36109",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94260888_13D6_9478_418F_BC5FDFA35CA6",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_942C5891_13D6_9468_41AD_B7DD3FE18D98",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94CA78AF_13D6_95B8_41B1_03C1E5698E4F",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94CD28AF_13D6_95B8_41A5_0CE359333778",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_943A789E_13D6_9598_41AC_1C8B47AAFFB0",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_943DC89F_13D6_9598_41B3_2587901AC924",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_943AC89F_13D6_9598_41B0_105CBDC0DDD8",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94C048A3_13D6_95A8_41AA_26AD225DB6F3",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94C3D8A3_13D6_95A8_4196_20407A0566A1",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_942FD891_13D6_9468_4176_6B79F8394C20",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_942F5891_13D6_9468_41A5_DCC2DE5833BF",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94C998AC_13D6_95B8_4142_C63842FDD74C",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94C948AC_13D6_95B8_41B0_AF0157E5C992",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_66228586_13DE_7C69_41B2_4F28E8B26C50",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94C848AD_13D6_95B8_41A2_5BCA3E900FB3",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_941AD87B_13D6_9498_41B0_C02841D9A245",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_941A687B_13D6_9498_41B1_247F7A8051A7",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_941D987B_13D6_9498_41A9_EF2517EE8769",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_1_HS_0_0.png",
   "width": 640,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_943D38A0_13D6_95A8_41A5_BB3BDDFE7332",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_1_HS_1_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_943CE8A0_13D6_95A8_418F_3E0BAC7F42F8",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_943C78A0_13D6_95A8_41A5_AB93E7D2CF7A",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_1_HS_0_0.png",
   "width": 640,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_943B189E_13D6_9598_41A2_5054294203D8",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_1_HS_1_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_943AF89E_13D6_9598_4170_C5205039A85E",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94CFF8B0_13D6_95A8_41AF_481EBCE5DFEB",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94CEB8B0_13D6_95A8_418E_7A84F2A65EA3",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94CE68B1_13D6_95A8_4185_387AD5823AB9",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0_HS_3_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_97321E1B_13EB_AC9F_41A0_B59489FEFB72",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94109873_13D6_94A8_4190_1EFD2BC5542E",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94177878_13D6_9498_41A6_EACB7D8E6E06",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9416B878_13D6_9498_41AA_33E29BCEF63C",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94163879_13D6_9498_415E_9371142A636C",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94325895_13D6_9468_419B_C33FAE1426BA",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_942B588F_13D6_9478_41B2_7A523D2A5848",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9413C875_13D6_94A8_41AF_0F17EFF2E170",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94133875_13D6_94A8_41B1_B2BE209C0013",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9412B875_13D6_94A8_41B0_4DE8491AE809",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_1_HS_3_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9412D876_13D6_94A8_41B2_725079A747E5",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0_HS_4_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9770FDDD_13EB_AF9B_41AB_EB7B8822CA23",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_942EF892_13D6_9468_4193_81D5B3666F2F",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94246886_13D6_9468_41B1_DFA8B06CDE8B",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9427E886_13D6_9468_4183_2A287A2FC4A8",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_941E7883_13D6_9468_41A7_219493B29B42",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9420A884_13D6_9468_41AC_566B3EA28843",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94238884_13D6_9468_41AC_248B24B66125",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9422E885_13D6_9468_41A0_A465318CA99E",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94226885_13D6_9468_41AC_30C540234E1E",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94258885_13D6_9468_4163_0F3454C798E6",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_1_HS_3_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94252885_13D6_9468_419F_33255F630FC1",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_942CA890_13D6_9468_41AB_9701985D62AC",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_942CD890_13D6_9468_419C_390B32B96E98",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94C748AB_13D6_95B8_4186_44DA98675CF0",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94C608AB_13D6_95B8_418A_064521FD3FFE",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9424E886_13D6_9468_4196_CDEC8909310D",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9421F883_13D6_9468_4197_5A3CE3332517",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94211884_13D6_9468_41A9_EC3E00E2C897",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9435D895_13D6_9468_41B2_953E2AAFE675",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9434A895_13D6_9468_418B_02DF4B72E6EE",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94340896_13D6_9468_4188_74585E107C11",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94C2B8A3_13D6_95A8_4191_3C2E4628A6F9",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94C248A4_13D6_95A8_41B2_B7497B467EA2",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94C5D8A4_13D6_95A8_4196_637E566A987E",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_1_HS_3_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94C4A8A5_13D6_95A8_41A7_B28E25D22B71",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_943FC8A1_13D6_95A8_4170_2575470DC3C1",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_6668D565_13DE_7CA8_41A3_AA7E5514284C",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9413B875_13D6_94A8_41AA_7EE7346BBEA4",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94C1F8A2_13D6_95A8_41A9_6B60510E69E7",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94C118A2_13D6_95A8_41AC_1FB316BBB6F8",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_661CF57D_13DE_7C9B_4191_850C29BDE7EB",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94158876_13D6_94A8_41B1_4B3A1F39C4F4",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94150876_13D6_94A8_41B1_836CDFDD4C27",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94155876_13D6_94A8_41B1_2BBA759B777F",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_1_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94149877_13D6_94A8_419B_CD498E0E5D8E",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94C898AD_13D6_95B8_41B0_1BA5CF142AC1",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94D1F8B1_13D6_95A8_41B3_1E45FFB9DDEE",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9428388E_13D6_9478_41B0_29E153A67088",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9428588F_13D6_9478_4196_0609BA3EB297",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_942B288F_13D6_9478_41AC_A58DB80A4C70",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9427F887_13D6_9468_419B_D29F636525C2",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94CC88AF_13D6_95B8_419F_8BED6D05B79E",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94CC68B0_13D6_95A8_41AB_3D516CAFEBBA",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94204884_13D6_9468_41A2_38B8E71149BE",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_941B687A_13D6_9498_41AF_905CEC80CB03",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_941AA87A_13D6_9498_41A6_F46A50295466",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94C408AA_13D6_95B8_4195_D4436F34E17E",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94C7F8AA_13D6_95B8_4191_BE628A8A114C",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_943F58A1_13D6_95A8_41A0_A1403910D87D",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_943EE8A1_13D6_95A8_41A6_59172D820C55",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_942E5893_13D6_9468_4191_3E9180D07769",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94319893_13D6_9468_41AD_3E32D27113AE",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94310893_13D6_9468_41A9_9DEAC094BB17",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_943E48A2_13D6_95A8_41AF_4E7BB53BD14D",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94257886_13D6_9468_41AC_242EE28E7E81",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9418387A_13D6_9498_41B0_83993DF03199",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9418587A_13D6_9498_41B0_25DBA5DC336B",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_941BE87A_13D6_9498_41B1_7C5BB52FC330",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_942AC88F_13D6_9478_4163_FBE5142F854A",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_942A5890_13D6_9468_41A3_2D15E1165A5A",
 "frameCount": 24,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9438B89D_13D6_9598_41A3_4B291434DE23",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9438389D_13D6_9598_41A0_E2FA548866BA",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_943BB89D_13D6_9598_4143_792438EB6B72",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9420D884_13D6_9468_41AD_E1F98BE78F22",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94142878_13D6_9498_4183_9C394924CA1E",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_94146878_13D6_9498_41A5_B34C987920A8",
 "frameCount": 21,
 "frameDuration": 41
},
{
 "rowCount": 5,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_9417B878_13D6_9498_41AA_25BE7973AD21",
 "frameCount": 20,
 "frameDuration": 41
}],
 "width": "100%"
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
