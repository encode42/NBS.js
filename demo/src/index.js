import{getElements,getSong,setElements,setSong}from"./util/globals.js";import{prepareSong,resetSong,startSong,stopSong}from"./audio/playback.js";import{loadSong}from"./audio/loadSong.js";import{canParse}from"./util/util.js";let editor,structureText,fileName;function prepareResult(e){getElements().text.overview.innerHTML=null,displayStructureText(e)}function displayStructureText(e){structureText=e||structureText,getElements().toggle.structure.hide.checked||editor.setValue(structureText,-1)}function setReady(e){e?(prepareSong(),resetSong(),getElements().button.file.export.disabled=!1,getElements().button.playback.toggle.disabled=!1,getElements().button.playback.restart.disabled=!1,getElements().toggle.playback.parity.disabled=!1):(stopSong(),getElements().button.file.export.disabled=!0,getElements().button.playback.toggle.disabled=!0,getElements().button.playback.restart.disabled=!0,getElements().toggle.playback.looping.disabled=!0,getElements().toggle.playback.parity.disabled=!0,getElements().text.structure.edit.value="")}window.addEventListener("load",()=>{for(const e of document.getElementsByTagName("*"))""===e.getAttribute("checked")&&(e.checked=!0);setElements({button:{file:{input:document.getElementById("file-input"),export:document.getElementById("file-export")},playback:{toggle:document.getElementById("playback-button"),restart:document.getElementById("restart-button")}},toggle:{playback:{looping:document.getElementById("toggle-looping"),parity:document.getElementById("toggle-parity")},structure:{hide:document.getElementById("structure-hide")}},text:{playback:document.getElementById("playback"),overview:document.getElementById("result-overview"),structure:{parent:document.getElementById("structure"),edit:document.getElementById("structure-editor")}}}),getElements().button.file.input.value=null,prepareResult("No file selected."),setReady(!1),ace.config.set("basePath","https://cdn.jsdelivr.net/gh/ajaxorg/ace-builds@1.4.13/src-min/"),ace.config.setModuleUrl("ace/theme/ayu-mirage","https://cdn.jsdelivr.net/gh/ayu-theme/ayu-ace@2.0.4/mirage.min.js"),editor=ace.edit(getElements().text.structure.edit,{mode:"ace/mode/javascript",theme:"ace/theme/ayu-mirage",maxLines:60,fontSize:"0.8em",printMargin:!1}),getElements().button.file.input.addEventListener("change",async e=>{if(0!==e.target.files.length){fileName=e.target.files[0].name,setReady(!1),prepareResult("Loading...");var t=await loadSong({file:e.target.files[0]}),e=t.song;setSong(e);for(const n of t.overviews){const a=document.createElement("tr"),r=document.createElement("td");r.innerHTML=`<strong>${n[0]}</strong>`;const l=document.createElement("td");l.innerHTML=""===n[1]?"None":n[1],a.append(r),a.append(l),getElements().text.overview.append(a)}displayStructureText(t.structureText),setReady(!0)}}),getElements().button.file.export.addEventListener("click",()=>{var e=editor.getValue();if(canParse(e)){const t=new NBSjs.Song;Object.assign(t,JSON.parse(editor.getValue()));e=t.toArrayBuffer(),e=new Blob([new Uint8Array(e)]);const n=document.createElement("a");n.href=URL.createObjectURL(e),n.download=fileName,document.body.append(n),n.click(),n.remove()}else editor.setValue(structureText,-1)}),getElements().toggle.structure.hide.addEventListener("change",e=>{e.target.checked?getElements().text.structure.parent.classList.remove("visible"):(displayStructureText(),getElements().text.structure.parent.classList.add("visible"))}),getElements().button.playback.toggle.addEventListener("click",()=>{("true"===getElements().button.playback.toggle.dataset.toggled?stopSong:startSong)()}),getElements().button.playback.restart.addEventListener("click",()=>{resetSong()})});