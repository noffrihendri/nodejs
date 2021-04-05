function readURL(objImage, objFile) {
    if (objFile.files && objFile.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#' + objImage).attr('src', e.target.result);
        }

        reader.readAsDataURL(objFile.files[0]);
    }
}


function readURLhref(objImage, objFile) {
    if (objFile.files && objFile.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#' + objImage).attr('href', e.target.result);
        }

        reader.readAsDataURL(objFile.files[0]);
    }
}