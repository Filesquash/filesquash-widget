/*! Built with http://stenciljs.com */
import{h}from"./filesquash.core.js";var FilesquashModal=function(){function e(){this.multiple=!0,this.labelText="Arraste/solte seu arquivo aqui.",this.uploadButtonText="Enviar",this.localFilesTitle="",this.selectedFilesText="Arquivos selecionados",this.selectedPdfPlaceholder="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M471.998 104c0-2.047-.781-4.094-2.342-5.656l-96-96c-1.5-1.499-3.534-2.342-5.654-2.342H368V0H64C50.745 0 40 10.745 40 24v464c0 13.255 10.745 24 24 24h384c13.255 0 24-10.745 24-24V104h-.002zM376 27.312L444.688 96H384c-4.418 0-8-3.582-8-8V27.312zM456 488c0 4.418-3.582 8-8 8H64c-4.418 0-8-3.582-8-8V24c0-4.418 3.582-8 8-8h296v72c0 13.255 10.745 24 24 24h72v376z'/%3E%3Cpath d='M184 40h-24c-4.418 0-8 3.582-8 8v40c0 4.418 3.582 8 8 8h24c.221.005.442.005.663 0 8.653-.183 15.52-7.347 15.337-16V56c.005-.221.005-.442 0-.663-.183-8.653-7.346-15.52-16-15.337zm0 40h-16V56h16v24zM120 40H96c-4.418 0-8 3.582-8 8v48h16V80h16c.221.005.442.005.663 0 8.653-.183 15.52-7.347 15.337-16v-8c.005-.221.005-.442 0-.663-.183-8.653-7.346-15.52-16-15.337zm0 24h-16v-8h16v8zM256 56V40h-32c-4.418 0-8 3.582-8 8v48h16V80h24V64h-24v-8h24zM416 160H96c-4.418 0-8 3.582-8 8v216h.002c0 2.047.781 4.094 2.342 5.656l72 72c1.5 1.5 3.534 2.344 5.656 2.344h248c4.418 0 8-3.582 8-8V168c0-4.418-3.582-8-8-8zM160 436.688L115.312 392H160v44.688zM408 448H176v-64c0-4.418-3.582-8-8-8h-64V176h304v272z'/%3E%3Cpath d='M280 200H136c-4.418 0-8 3.582-8 8v128c0 4.418 3.582 8 8 8h144c4.418 0 8-3.582 8-8V208c0-4.418-3.582-8-8-8zM155.312 328L200 283.312 244.688 328h-89.376zM272 328h-4.688l-31.768-31.768 12.688-12.688L272 307.312V328zm0-43.312l-18.112-18.112c-3.124-3.123-8.188-3.123-11.312 0l-18.344 18.344-18.576-18.576c-3.124-3.123-8.188-3.123-11.312 0L144 316.688V216h128v68.688zM376 200h-64c-4.418 0-8 3.582-8 8v16h16v-8h48v8h16v-16c0-4.418-3.582-8-8-8zM304 248h48v16h-48zM368 248h16v16h-16zM336 408h16v16h-16zM368 408h16v16h-16zM304 288h80v16h-80zM304 328h80v16h-80zM200 368h184v16H200z'/%3E%3C/svg%3E",this.selectedVideoPlaceholder="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M471.998 104c0-2.047-.781-4.094-2.342-5.656l-96-96c-1.5-1.499-3.534-2.342-5.654-2.342H368V0H64C50.745 0 40 10.745 40 24v464c0 13.255 10.745 24 24 24h384c13.255 0 24-10.745 24-24V104h-.002zM376 27.312L444.688 96H384c-4.418 0-8-3.582-8-8V27.312zM456 488c0 4.418-3.582 8-8 8H64c-4.418 0-8-3.582-8-8V24c0-4.418 3.582-8 8-8h296v72c0 13.255 10.745 24 24 24h72v376z'/%3E%3Cpath d='M416 160H96c-4.418 0-8 3.582-8 8v288c0 4.418 3.582 8 8 8h320c4.418 0 8-3.582 8-8V168c0-4.418-3.582-8-8-8zm-8 288H104V176h304v272z'/%3E%3Cpath d='M291.576 272.84l-64-32c-1.112-.555-2.337-.844-3.58-.844-4.418.002-7.998 3.585-7.996 8.004v64c0 4.418 3.582 8 8 8 1.241.001 2.465-.286 3.576-.84l64-32c1.556-.775 2.816-2.036 3.591-3.591 1.971-3.954.363-8.758-3.591-10.729zM232 299.056v-38.112L270.112 280 232 299.056zM376 360H136c-4.418 0-8 3.582-8 8v48c0 4.418 3.582 8 8 8h240c4.418 0 8-3.582 8-8v-48c0-4.418-3.582-8-8-8zm-8 48H144v-32h224v32z'/%3E%3Cpath d='M160 384h16v16h-16zM336 384h16v16h-16zM192 384h16v16h-16zM224 384h96v16h-96zM144 40H96c-4.418 0-8 3.582-8 8v48c0 4.418 3.582 8 8 8h48c4.418 0 8-3.582 8-8V48c0-4.418-3.582-8-8-8zm-8 48h-32V56h32v32zM288 48H176c-4.418 0-8 3.582-8 8v16h16v-8h96v8h16V56c0-4.418-3.582-8-8-8zM168 88h96v16h-96zM280 88h16v16h-16z'/%3E%3C/svg%3E",this.selectedFilePlaceholder="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M471.998 104c0-2.047-.781-4.094-2.342-5.656l-96-96c-1.5-1.499-3.534-2.342-5.654-2.342H368V0H64C50.745 0 40 10.745 40 24v464c0 13.255 10.745 24 24 24h384c13.255 0 24-10.745 24-24V104h-.002zM376 27.312L444.688 96H384c-4.418 0-8-3.582-8-8V27.312zM456 488c0 4.418-3.582 8-8 8H64c-4.418 0-8-3.582-8-8V24c0-4.418 3.582-8 8-8h296v72c0 13.255 10.745 24 24 24h72v376z'/%3E%3Cpath d='M416 160H96c-4.418 0-8 3.582-8 8v288c0 4.418 3.582 8 8 8h320c4.418 0 8-3.582 8-8V168c0-4.418-3.582-8-8-8zm-8 288H104V176h304v272zM144 40H96c-4.418 0-8 3.582-8 8v48c0 4.418 3.582 8 8 8h48c4.418 0 8-3.582 8-8V48c0-4.418-3.582-8-8-8zm-8 48h-32V56h32v32zM288 48H176c-4.418 0-8 3.582-8 8v16h16v-8h96v8h16V56c0-4.418-3.582-8-8-8zM168 88h96v16h-96zM280 88h16v16h-16z'/%3E%3Cpath d='M200 200h16v224h-16zM168 200h-32c-4.418 0-8 3.582-8 8v16h16v-8h16v8h16v-16c0-4.418-3.582-8-8-8zM168 392h-32c-4.418 0-8 3.582-8 8v24h16v-16h16v16h16v-24c0-4.418-3.582-8-8-8zM168 328h-32c-4.418 0-8 3.582-8 8v16h16v-8h16v8h16v-16c0-4.418-3.582-8-8-8zM168 264h-32c-4.418 0-8 3.582-8 8v24h16v-16h16v16h16v-24c0-4.418-3.582-8-8-8zM240 208h96v16h-96zM240 272h144v16H240zM272 336h80v16h-80zM240 400h144v16H240zM240 336h16v16h-16zM352 208h16v16h-16z'/%3E%3C/svg%3E",this.modalVisible=!1,this.selectedFiles=[]}return e.prototype.toggleModal=function(){this.modalVisible=!this.modalVisible},e.prototype.readFile=function(e){var t=this;e&&Array.from(e).forEach(function(e){var l=new FileReader;l.onload=function(l){t.selectedFiles.find(function(e){return e.base64===l.target.result})||(t.selectedFiles=t.selectedFiles.concat([{file:e,base64:l.target.result}]))},l.readAsDataURL(e)})},e.prototype.removeFile=function(e){var t=this.selectedFiles.slice();t.splice(e,1),this.selectedFiles=t},e.prototype.noop=function(e){e.stopPropagation()},e.prototype.sendFile=function(e,t){var l=new FormData;return l.append("asset[file]",e),fetch("https://filesquash.io/v1/assets",{method:"POST",body:l,headers:{Authorization:"Token token="+t}}).then(function(e){return e.json()})},e.prototype.upload=function(e,t){var l=this,i=e.map(function(e){var i=e.file;return l.sendFile(i,t)});Promise.all(i).then(function(e){l.selectedFiles=[],l.uploadCompleted.emit(e),l.toggleModal()})},e.prototype.renderImagePreview=function(e,t,l){var i=this;return h("div",{class:"item-preview"},h("img",{class:"image-preview",src:e,alt:t}),h("button",{type:"button",onClick:function(){return i.removeFile(l)}},"X"))},e.prototype.renderPlaceholder=function(e,t,l){var i=this;return h("div",{class:"item-preview"},h("img",{class:"icon",src:this["selected"+e+"Placeholder"],alt:t}),h("p",null,t),h("button",{type:"button",onClick:function(){return i.removeFile(l)}},"X"))},e.prototype.renderFilePreview=function(e,t){return/image\/*/.test(e.file.type)?this.renderImagePreview(e.base64,e.file.name,t):/video\/*/.test(e.file.type)?this.renderPlaceholder("Video",e.file.name,t):/application\/pdf/.test(e.file.type)?this.renderPlaceholder("Pdf",e.file.name,t):this.renderPlaceholder("File",e.file.name,t)},e.prototype.render=function(){var e=this;return this.modalVisible?h("div",{class:"modal",onClick:this.toggleModal.bind(this)},h("div",{class:"modal-content",onClick:this.noop.bind(this)},h("h2",{class:"title"},this.localFilesTitle," "),h("button",{type:"button",class:"btn-icon",onClick:this.toggleModal.bind(this)},h("svg",{viewBox:"0 0 32 32",id:"icon-close",width:"100%",height:"100%"},h("path",{d:"M10.06 7.94a1.5 1.5 0 0 0-2.12 2.12L13.878 16l-5.94 5.94a1.5 1.5 0 0 0 2.122 2.12L16 18.122l5.94 5.94a1.5 1.5 0 0 0 2.12-2.122L18.122 16l5.94-5.94a1.5 1.5 0 0 0-2.122-2.12L16 13.878l-5.94-5.94z"}))),h("div",{class:"filesquash-form"},h("label",null,this.labelText,h("input",{type:"file",class:"file-upload",onChange:function(t){return e.readFile(t.target.files)},multiple:this.multiple}))),this.selectedFiles.length>0&&[h("div",{class:"filesquash-preview"},h("h2",{class:"title"},this.selectedFilesText),this.selectedFiles.map(function(t,l){return e.renderFilePreview(t,l)})),h("button",{type:"button",class:"btn",onClick:function(){return e.upload(e.selectedFiles,e.token)}},this.uploadButtonText)])):""},Object.defineProperty(e,"is",{get:function(){return"filesquash-modal"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{labelText:{type:String,attr:"label-text"},localFilesTitle:{type:String,attr:"local-files-title"},modalVisible:{state:!0},multiple:{type:Boolean,attr:"multiple"},selectedFilePlaceholder:{type:String,attr:"selected-file-placeholder"},selectedFiles:{state:!0},selectedFilesText:{type:String,attr:"selected-files-text"},selectedPdfPlaceholder:{type:String,attr:"selected-pdf-placeholder"},selectedVideoPlaceholder:{type:String,attr:"selected-video-placeholder"},toggleModal:{method:!0},token:{type:String,attr:"token"},uploadButtonText:{type:String,attr:"upload-button-text"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"uploadCompleted",method:"uploadCompleted",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"filesquash-modal{display:block}filesquash-modal *,filesquash-modal ::after,filesquash-modal ::before{-webkit-font-smoothing:antialiased;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:-apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;margin:0;padding:0;text-rendering:optimizeLegibility}filesquash-modal .widget{position:relative}filesquash-modal .modal{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;position:absolute;top:0;width:100%;min-height:100%;left:0;background:rgba(0,0,0,.6);overflow:hidden;overflow-y:auto;white-space:nowrap;-webkit-overflow-scrolling:touch;z-index:9}filesquash-modal .modal-content{background:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;min-height:60px;padding:16px;position:relative;width:100%;max-width:640px}filesquash-modal .title{font-size:16px}filesquash-modal .btn{background-color:#000;border:0;border-radius:5px;color:#fff;cursor:pointer;display:inline-block;font-size:12px;font-weight:700;padding:17px 25px;text-align:center;text-decoration:none;text-transform:uppercase}filesquash-modal .btn:disabled{background-color:#777;cursor:not-allowed}filesquash-modal .btn-icon{position:absolute;top:0;right:0;z-index:49;border-color:transparent;color:#a4a2a1;border-radius:0;padding:10px;min-width:0;width:48px;height:48px;background:0 0;cursor:pointer}filesquash-modal .filesquash-form{background:#ecf0f1;margin:16px 0 0;min-width:320px;padding:32px;position:relative;white-space:initial}filesquash-modal .filesquash-form form{text-align:center}filesquash-modal .filesquash-form .file-upload{position:absolute;margin:0;padding:0;width:100%;height:100%;outline:0;opacity:0;cursor:pointer;top:0;left:0}filesquash-modal .filesquash-preview{margin:16px 0;white-space:initial}filesquash-modal .filesquash-preview>.title{margin-bottom:16px}filesquash-modal .filesquash-preview .item-preview{float:left;margin:4px;width:calc(50vw - 24px);height:calc(50vw - 24px);font-size:12px;text-align:center;border:1px solid #eee;padding:8px;position:relative;overflow:hidden;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;word-break:break-word}\@media only screen and (min-width:640px){filesquash-modal .filesquash-preview .item-preview{max-width:144px;max-height:144px}}filesquash-modal .filesquash-preview .item-preview>.icon{margin:4px;width:36px}filesquash-modal .filesquash-preview .item-preview>.image-preview{max-height:100%}filesquash-modal .filesquash-preview .item-preview>button{position:absolute;top:0;right:0;padding:3px 6px;background:rgba(0,0,0,.4);color:#fff;border:0;font-weight:700;outline:0;font-size:14px;cursor:pointer}"},enumerable:!0,configurable:!0}),e}(),FilesquashWidget=function(){function e(){this.multiple=!0,this.buttonText="Selecionar arquivos"}return e.prototype.componentDidLoad=function(){var e=this;this.modal=document.querySelector("filesquash-modal"),this.modal.componentOnReady().then(function(){e.modal.addEventListener("uploadCompleted",function(t){return e.uploadCompleted.emit(t.detail)})}),document.body.appendChild(this.modal)},e.prototype.render=function(){var e=this;return h("div",{class:"filesquash-widget"},h("button",{type:"button",class:"btn",onClick:function(){return e.modal.toggleModal()}},this.buttonText),h("filesquash-modal",{token:this.token,multiple:this.multiple,"label-text":this.labelText,"upload-button-text":this.uploadButtonText,"local-files-title":this.localFilesTitle,"selected-files-text":this.uploadButtonText,"selected-pdf-placeholder":this.uploadButtonText,"selected-video-placeholder":this.uploadButtonText,"selected-file-placeholder":this.uploadButtonText}))},Object.defineProperty(e,"is",{get:function(){return"filesquash-widget"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{buttonText:{type:String,attr:"button-text"},labelText:{type:String,attr:"label-text"},localFilesTitle:{type:String,attr:"local-files-title"},modal:{state:!0},multiple:{type:Boolean,attr:"multiple"},selectedFilePlaceholder:{type:String,attr:"selected-file-placeholder"},selectedFilesText:{type:String,attr:"selected-files-text"},selectedPdfPlaceholder:{type:String,attr:"selected-pdf-placeholder"},selectedVideoPlaceholder:{type:String,attr:"selected-video-placeholder"},token:{type:String,attr:"token"},uploadButtonText:{type:String,attr:"upload-button-text"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"uploadCompleted",method:"uploadCompleted",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"filesquash-widget{display:inline}filesquash-widget *,filesquash-widget ::after,filesquash-widget ::before{-webkit-font-smoothing:antialiased;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:-apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;margin:0;padding:0;text-rendering:optimizeLegibility}filesquash-widget .btn{background-color:#000;border:0;border-radius:5px;color:#fff;cursor:pointer;display:inline-block;font-size:12px;font-weight:700;padding:17px 25px;text-align:center;text-decoration:none;text-transform:uppercase}filesquash-widget .btn:disabled{background-color:#777;cursor:not-allowed}"},enumerable:!0,configurable:!0}),e}();export{FilesquashModal,FilesquashWidget};