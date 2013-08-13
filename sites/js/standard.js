
$('[placeholder]').focus(function() {
  var input = $(this);
  if (input.val() == input.attr('placeholder')) {
    input.val('');
    input.removeClass('placeholder');
  }
}).blur(function() {
  var input = $(this);
  if (input.val() == '' || input.val() == input.attr('placeholder')) {
    input.addClass('placeholder');
    input.val(input.attr('placeholder'));
  }
}).blur().parents('form').submit(function() {
  $(this).find('[placeholder]').each(function() {
    var input = $(this);
    if (input.val() == input.attr('placeholder')) {
      input.val('');
    }
  })
});
  $(".clickable").click(function(){
     window.location=$(this).find("a").attr("href"); 
     return false;
});
var animate = 0;
$(document).ready(function(){

  $("#playerTop").click(function(){
        if(animate==0){
	    $("#player").animate({bottom:'0px'});
	    animate=1;
	}
	else{
	    $("#player").animate({bottom:'-180px'});
	    animate=0;
	}
    });
});
/* BETTER WAY TO DO THIS: PUT var audie OUTSIDE OF THE FUNCTIONS AND ONLY HAVE 1 FUNCTION.  TEST IF audie ALREADY EXISTS< AND IF IT DOES THEN JUST STOP THE MUSIC.  ALSO IN THE FUTURE CHECK IF IT'S THE SAME BUTTON THAT PuSHED IT BEFORE AND IF NOT THEN JUST START THE OTHER SONG*/
/* UPDATE: following the above statement, I could have each onclick startOrStop() pass the mp3, and we have the variable that takes in the mp3 outside the function,
 * so it can check to see if it's the same button that was clicked earlier.  If it does match, then it stops the song and makes the value null.
 * If it is null, then it takes the value passed, and plays the song.  If it doesn't match, but isn't null, then it plays the new song (which will automatically stop the old one)
 * This way we only use 1 function, and one player*/
	
var currentSong = ""; /* instead of using this variable, compare audio to whats in the video tag.*/  
function StartOrStop(songBeingPassed, classNumberPassed)
  {
    var audio = document.getElementById("myAudio");
    audio.src=songBeingPassed;
    if(currentSong=="")
     {
	audio.play();
        currentSong=audio.src;
	$('#Play' + classNumberPassed).attr('src', './bandPics/PauseButton.png');
    }
     else if(audio.src==currentSong)
     {
	currentSong = "";
	audio.pause();
	$('.playButton').attr('src', './bandPics/PlayButton.png');
     }
     else
     {
	$('.playButton').attr('src', './bandPics/PlayButton.png'); 	
	    $('#Play' + classNumberPassed).attr('src', './bandPics/PauseButton.png');
	audio.play();
        currentSong=audio.src;
     }
  }
/*
$(document).ready(function(){
$(".displayNone").hide();
$(".more").click(function(){
  $(".displayNone").slideToggle();
});});*/
/*$(document).ready(function(){
    $(".displayNone").hide();
  $(".more").click(function () {
	if ($(".displayNone").is(":hidden")) {
	    $(".displayNone").slideDown("slow", function(){
		$(".more a").html("less...");
		}
	    );
	} else {
	    $(".displayNone").slideUp("slow", function more(){
		$(".more a").html("more...");	   
	    });
	}
    });
});*/
/*
$(document).ready(function(){
    $("genrePick li").click(function () {
*/
$(document).ready(function(){
    $(function(){
      var S1 = $('#s1');
      var B1= $('#genreSearchExpandButton')
       
      // handling the focus event on input2
      $(B1).click(function(){
	  $(S1).css('display', 'inline-block');

	$(S1).animate({
	  width: '100%'
	}, 400, function(){
	  // callback function
	});
      });
    // handling the blur event on input2
      $(S1).on('blur', function(){
	if(S1.val() == '') {
	  $(S1).animate({
	    width: '0%'
	  }, 400, function(){	  $(S1).css('display', 'none'); });

	}
      });
       
      // handling both form submissions
      $('#searchform1').submit(function(e) {
	e.preventDefault();
      });
    });
});
$(document).ready(function(){
    $(function(){
      var S2 = $('#s2');
      var B2= $('#locationSearchExpandButton')
       
      // handling the focus event on input2
      $(B2).click(function(){
	    $(S2).css('display', 'inline-block');
	    $(S2).animate({
	    width: '80%'
	    }, 400, function(){
	    // callback function
	    });
      });
    // handling the blur event on input2
      $(S2).on('blur', function(){
	if(S2.val() == '') {
	  $(S2).animate({
	    width: '0%'
	  }, 400, function(){	  $(S2).css('display', 'none'); });

	}
      });
       
      // handling both form submissions
      $('#searchform2').submit(function(e) {
	e.preventDefault();
      });
    });
});
    $(document).ready(function(){
	var selectedG = $('.gButton');
	$(function(){
	    $(selectedG).click(function(){
	    $(this).addClass('selectedG');
	    });
	});
    });	
