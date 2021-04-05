function uploadImage(objForm, data, fBefore, fSuccess ){
        var loadingContent='' ;
		if(typeof(data)=='undefined') data ={};
	
		var strImgId = ( data.imgId!="undefined"?data.imgId:'noIdImage');

        var objimg = $('body').find('#'+strImgId);
    	var bolvalid = true;
	
		

        objForm.ajaxForm({
            data:data,
            beforeSend: function(){
				
				if(jQuery.isFunction(fBefore)){
					var v=fBefore();
					if( v==false ) return false;
				}
				
				
				//show Progres Bar 
				loadingContent='<div class="progress" id="loading'+strImgId+'" style="height:3px; width:'+$('#'+strImgId).width()+'px"><div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div></div>';
				objimg.after(loadingContent);

				//set Progres Bar
                $('body').find('#loading'+strImgId+' .progress-bar').css('width','0px');
				
                bolvalid =false;
                $('#btnsave').attr('disabled','disabled');
				
            },
            uploadProgress: function(event, position, total, percentComplete) {
                var percentVal = percentComplete + '%';
                $('body').find('#loading'+strImgId+' .progress-bar').css('width',percentVal);
            },
            success: function(data){
                
                var data = JSON.parse(data);  
				if(jQuery.isFunction(fSuccess)){
							
							var v = fSuccess(data);
							if(v==false) return false;
							
						}
				
                if(data.valid==true){
                    var id = 'img'+Math.floor((Math.random() * 1000) + 1);
                    $('body').find('#loading'+strImgId+' .provgress-bar').css('width','100%');
                    objimg.attr('src',data.path+'?j='+id);    
                    $('#txt'+strImgId).val(data.filename);
					
                }else{
                    alert(data.message);
                }
				/*
				if(jQuery.isFunction(fSuccess)){
							
							var v = fSuccess(data);
							if(v==false) return false;
							
						}*/
                
            },
            complete: function(xhr) {
                $('body').find('#loading'+strImgId).remove(); 
                bolvalid=true;
                $('#btnsave').removeAttr('disabled');
            }
            
        }).submit(); 
    }  
    