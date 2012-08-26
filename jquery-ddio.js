(function($) {
    jQuery.event.props.push("dataTransfer");

    var Options = {
        paramname: "file",
        url: null,
        maxFileSize: 1, // MB
        maxFileCount: 5,
        csrfTokenName: null,
        csrfToken: null,
        allowedExtensions: ["image/png", "image/jpg", "image/jpeg", "image/gif"],
        uploadStarted: null,
        uploadUpdated: null,
        uploadFinished: null,
        uploadError: null,
        dragEnter: null,
        dragOver: null,
        dragLeave: null,
        dropped: null,
        previewElement: null
    };

    $.fn.ddio = function(options) {
        if (this.length == 0) return this;
        var options = $.extend({}, Options, options);
        this.on("drop", dropAction);
        this.on("dragenter", dragEnterAction).on("dragover", dragOverAction).on("dragleave", dragLeaveAction);

        function dragEnterAction(evt) {
            if (options.dragEnter != null) options.dragEnter(evt);
            evt.stopPropagation();
            evt.preventDefault();
            return false;
        }

        function dragOverAction(evt) {
            if (options.dragOver != null) options.dragOver(evt);
            evt.stopPropagation();
            evt.preventDefault();
            return false;
        }

        function dragLeaveAction(evt) {
            if (options.dragLeave != null) options.dragLeave(evt);
            evt.stopPropagation();
            evt.preventDefault();
            return false;
        }

        function dropAction(evt) {
            var droppedFiles = evt.dataTransfer.files;
            var fileCount = droppedFiles.length;
            if (fileCount > options.maxFileCount || fileCount == 0) return false;
            if (options.dropped != null) options.dropped(evt);
            for (var i=0; i < fileCount; i++) {
                if (!droppedFiles[i].type || $.inArray(droppedFiles[i].type.trim(), options.allowedExtensions) < 0 || droppedFiles[i].size > options.maxFileSize * 1024 * 1024) continue;
                upload(droppedFiles[i]);
            }
            evt.stopPropagation();
            evt.preventDefault();
            return false;
        }

        function upload(file) {
            var formData = new FormData();
            formData.append(options.paramname, file);
            if (options.csrfTokenName != null && options.csrfToken != null) {
                formData.append(options.csrfTokenName, options.csrfToken);
            }
            if (options.uploadStarted != null) options.uploadStarted(file);
            $.ajax({
                type: 'POST',
                url: options.url,
                data: formData,
                processData: false,
                contentType: false,
                xhr: function() {
                    var xhr = $.ajaxSettings.xhr();
                    if (xhr.upload) {
                        xhr.upload.addEventListener("progress", function(evt) {
                            if (evt.lengthComputable) {
                                var percentComplete = Math.round((evt.loaded / evt.total) * 100);
                                if (options.uploadUpdated != null) options.uploadUpdated(file, percentComplete);
                            }
                        }, false);
                    }
                    return xhr;
                },
                success: function(data, status, xhr) {
                    if (options.uploadFinished != null) options.uploadFinished(file, data, status);
                },
                error: function(xhr, status, e) {
                    if (options.uploadError != null) options.uploadError(file, status);
                }
            });
        }

        return this;
    };
})(jQuery);