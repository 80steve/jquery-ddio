# jquery-ddio

jQuery Plugin for DragDrop Upload. With this plugin you can easily create an element which is drag-drop-upload enabled.

## Instruction

```javascript
// Normal div element
<div id="uploadDiv"/>

<script language="javascript">
$(document).ready(function()	{
    $("#uploadDiv").ddio({
        maxFileSize: 1,
        paramname: "upload_file", // the file parameter name sent to server
        csrfTokenName: "csrf_token", // the csrf token parameter name sent to server
        csrfToken: "abcdef", // the csrf token value
        url: "upload/create/", // server url
        dragEnter: function(e) {
        // do sth when drag entered the element
        },
        dragOver: function(e) {
        // do sth when drag is over the element
        },
        dragLeave: function(e) {
        // do sth when drag left the element
        },
        dropped: function(e) {
        // do sth when file is drop on the element
        },
        uploadStarted: function(file) {
        // file begins upload event
        },
        uploadUpdated: function(file, percent) {
        // file progress event
        },
        uploadFinished: function(file) {
        // file finished upload
        }
    });
});
</script>

```

## License

Copyright 2012 Steve Chan, http://80steve.com

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
