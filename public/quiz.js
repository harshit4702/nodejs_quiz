$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  });

$(document).ready(()=>{
    $("#quiz-form-post").submit( (e)=>{
        e.preventDefault();
        $.ajax({
            url: link,
            method: "POST",
            contentType: "application/x-www-form-urlencoded",
            data : {
                question: $('#question').val(),
                option1: $('#option1').val(),
                option2: $('#option2').val(),
                option3: $('#option3').val(),
                option4: $('#option4').val(),
                answer: $("input[name ='answer']:checked").val(),
            },
            success : function(data){
                alert(JSON.stringify(data.message));
                window.location.replace(data.link);
            },
            error:function(err){
                alert(JSON.stringify(err.responseText));
            }
        }); 
    });
});

$(document).ready(()=>{
    $("#quiz-form-put").submit( (e)=>{
        e.preventDefault();
        console.log(link) ;
        $.ajax({
            url: link,
            method: "PUT",
            contentType: "application/x-www-form-urlencoded",
            data : {
                question: $('#question').val(),
                option1: $('#option1').val(),
                option2: $('#option2').val(),
                option3: $('#option3').val(),
                option4: $('#option4').val(),
                answer: $("input[name ='answer']:checked").val(),
            },
            success : function(data){
                alert(JSON.stringify(data.message));
                window.location.replace(data.link);
            },
            error:function(err){
                alert(JSON.stringify(err.responseText));
            }
        }); 
    });
});


$(document).ready(()=>{
    $("#verifyadmin").submit((e)=>{
        e.preventDefault();
        $.ajax({
            url: '/verify',
            method: "POST",
            data :{
                pass: $('#pass').val(),
            },
            success : function(data){
                window.localStorage.setItem('x-auth-token' , data.token) ;
                alert(JSON.stringify(data.message));
                window.location.replace(data.link);
            },
            error:function(err){
                alert(JSON.stringify(err.responseText));
            }
        }); 
    });
});

$(document).ready(()=>{
    $("#submit-form").submit((e)=>{
        e.preventDefault();
        var count = 0 ;
        console.log(ques); 
        for(var i = 0 ; i< ques.length ; i++){
            if($("#answer"+ i +":checked").val() == ques[i].answer)
                count++;
        }
        console.log(count) ;
        $.ajax({
            url: '/submit',
            data :{
                name: $('#name').val(),
                marks: count
            },
            method: "POST",
            success : function(data){
                alert(JSON.stringify(data.message));
                window.location.replace(data.link);
            },
            error:function(err){
                alert(JSON.stringify(err.responseText));
            }
        }); 
    });
});