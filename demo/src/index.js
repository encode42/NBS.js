import{getElements,setElements,setSong}from"./util/globals.js";import{prepareSong,resetSong,startSong,stopSong}from"./audio/playback.js";import{loadSong,generateOverviews}from"./audio/loadSong.js";import{canParse}from"./util/util.js";let editor,structureText,fileName;function prepareResult(e){getElements().text.overview.innerHTML=null,displayStructureText(e)}function setReady(e){e?(prepareSong(),resetSong(),getElements().button.file.export.disabled=!1,getElements().button.structure.apply.disabled=!1,getElements().button.playback.toggle.disabled=!1,getElements().button.playback.restart.disabled=!1,getElements().toggle.playback.parity.disabled=!1):(stopSong(),getElements().button.file.export.disabled=!0,getElements().button.structure.apply.disabled=!0,getElements().button.playback.toggle.disabled=!0,getElements().button.playback.restart.disabled=!0,getElements().toggle.playback.looping.disabled=!0,getElements().toggle.playback.parity.disabled=!0,getElements().text.structure.edit.value="")}function updateOverviews(e){getElements().text.overview.innerHTML="";for(const t of generateOverviews(e)){const n=document.createElement("tr"),r=document.createElement("td");r.innerHTML=`<strong>${t[0]}</strong>`;const a=document.createElement("td");a.innerHTML=""===t[1]?"None":t[1],n.append(r),n.append(a),getElements().text.overview.append(n)}}function updateSong(e){setSong(e),updateOverviews(e)}function displayStructureText(e){structureText=e||structureText,getElements().toggle.structure.hide.checked||editor.getValue()===structureText||editor.setValue(structureText,-1)}function checkEditor(){var e=editor.getValue();return e!==structureText&&canParse(e)?{changed:!0,value:structureText=e}:(displayStructureText(structureText),{changed:!1,value:structureText})}function generateSong(e){"object"!=typeof e&&canParse(e)&&(e=JSON.parse(e));var t=new NBSjs.Song;return Object.assign(t,e),t}function exportSong(){const e=generateSong(checkEditor().value);var t=e.toArrayBuffer(),t=new Blob([new Uint8Array(t)]);const n=document.createElement("a");n.href=URL.createObjectURL(t),n.download=fileName,document.body.append(n),n.click(),n.remove()}window.addEventListener("load",()=>{for(const e of document.getElementsByTagName("*"))""===e.getAttribute("checked")&&(e.checked=!0),"file"===e.getAttribute("type")&&(e.value=null);setElements({button:{file:{input:document.getElementById("file-input"),export:document.getElementById("file-export")},playback:{toggle:document.getElementById("playback-button"),restart:document.getElementById("restart-button")},structure:{apply:document.getElementById("structure-apply")}},toggle:{playback:{looping:document.getElementById("toggle-looping"),parity:document.getElementById("toggle-parity")},structure:{hide:document.getElementById("structure-hide")}},text:{playback:document.getElementById("playback"),overview:document.getElementById("result-overview"),structure:{parent:document.getElementById("structure"),edit:document.getElementById("structure-editor")}}}),ace.config.set("basePath","https://cdn.jsdelivr.net/gh/ajaxorg/ace-builds@1.4.13/src-min/"),ace.config.setModuleUrl("ace/theme/ayu-mirage","https://cdn.jsdelivr.net/gh/ayu-theme/ayu-ace@2.0.4/mirage.min.js"),editor=ace.edit(getElements().text.structure.edit,{mode:"ace/mode/javascript",theme:"ace/theme/ayu-mirage",maxLines:25,fontSize:"0.8em",printMargin:!1}),editor.commands.addCommand({name:"Save",bindKey:{win:"Ctrl-S",mac:"Command-S"},exec:exportSong}),prepareResult("No file selected."),setReady(!1),getElements().button.file.input.addEventListener("change",async e=>{0!==e.target.files.length&&(fileName=e.target.files[0].name,setReady(!1),prepareResult("Loading..."),updateSong((e=await loadSong({file:e.target.files[0]})).song),displayStructureText(e.structureText),setReady(!0))}),getElements().button.playback.toggle.addEventListener("click",()=>{("true"===getElements().button.playback.toggle.dataset.toggled?stopSong:startSong)()}),getElements().button.playback.restart.addEventListener("click",()=>{resetSong()}),getElements().button.file.export.addEventListener("click",exportSong),getElements().button.structure.apply.addEventListener("click",()=>{var e=checkEditor();e.changed&&updateSong(generateSong(e.value))}),getElements().toggle.structure.hide.addEventListener("change",e=>{e.target.checked?getElements().text.structure.parent.classList.remove("visible"):(displayStructureText(),getElements().text.structure.parent.classList.add("visible"))})});