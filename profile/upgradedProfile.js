
$(document).ready(function() {	


  //Get all the LI from the #tabMenu UL
  $('#tabMenu li').click(function(){
     /*new part*/if ($(this).hasClass('selected')) {    
	    //remove the selected class from all LI    
	    $('#tabMenu li').removeClass('selected');
	    //Hide all the DIV in .songBody
	    $('.songBody div.parent').slideUp('1500');
	 } /*new part end*/    
    //perform the actions when it's not selected
    else if (!$(this).hasClass('selected')) {    
           
	    //remove the selected class from all LI    
	    $('#tabMenu li').removeClass('selected');
	    
	    //Reassign the LI
	    $(this).addClass('selected');
	    
	    //Hide all the DIV in .songBody
	    $('.songBody div.parent').slideUp('1500');
	    
	    //Look for the right DIV in songBody according to the Navigation UL index, therefore, the arrangement is very important.
	    $('.songBody div.parent:eq(' + $('#tabMenu > li').index(this) + ')').slideDown('1500');
	    
	 } 

  });
//                  Second Accordian                     //  
  //Get all the LI from the #tabMenu UL
  $('#tabMenu2 li').click(function(){
     /*new part*/if ($(this).hasClass('selected2')) {    
	    //remove the selected class from all LI    
	    $('#tabMenu2 li').removeClass('selected2');
	    //Hide all the DIV in .songBody
	    $('.boxBody2 div.parent2').slideUp('1500');
	 } /*new part end*/    
    //perform the actions when it's not selected
    else if (!$(this).hasClass('selected2')) {    
           
	    //remove the selected class from all LI    
	    $('#tabMenu2 li').removeClass('selected2');
	    
	    //Reassign the LI
	    $(this).addClass('selected2');
	    
	    //Hide all the DIV in .songBody
	    $('.boxBody2 div.parent2').slideUp('1500');
	    
	    //Look for the right DIV in songBody according to the Navigation UL index, therefore, the arrangement is very important.
	    $('.boxBody2 div.parent2:eq(' + $('#tabMenu2 > li').index(this) + ')').slideDown('1500');
	    
	 } 

  });  

//                  Third Accordian                     //  
  //Get all the LI from the #tabMenu UL
  $('#tabMenu3 li').click(function(){
     /*new part*/if ($(this).hasClass('selected3')) {    
	    //remove the selected class from all LI    
	    $('#tabMenu3 li').removeClass('selected3');
	    //Hide all the DIV in .songBody
	    $('.boxBody3 div.parent3').slideUp('1500');
	 } /*new part end*/    
    //perform the actions when it's not selected
    else if (!$(this).hasClass('selected3')) {    
           
	    //remove the selected class from all LI    
	    $('#tabMenu3 li').removeClass('selected3');
	    
	    //Reassign the LI
	    $(this).addClass('selected3');
	    
	    //Hide all the DIV in .songBody
	    $('.boxBody3 div.parent3').slideUp('1500');
	    
	    //Look for the right DIV in songBody according to the Navigation UL index, therefore, the arrangement is very important.
	    $('.boxBody3 div.parent3:eq(' + $('#tabMenu3 > li').index(this) + ')').slideDown('1500');
	    
	 } 

  });
});
$(document).ready(function(){
   var num = $('#tabMenu li').length;
   var width_li = 100/num;
   $('#tabMenu li').css('width',width_li+'%');
});

$(document).ready(function() {
   $("#bandBioHidden").hide();
   $('#bandBioButton').click(function(){

      $("#bandBioCover").hide(500);
      $("#bandBioHidden").show(500);  

//$("#"+clicked).show('slide', {direction: 'left'}, 1000);
   });
  
   $(document).mouseup(function (e)
   {
      var container = $("#bandBioHidden");
   
      if (!container.is(e.target) // if the target of the click isn't the container...
         && container.has(e.target).length === 0) // ... nor a descendant of the container
      {
         $("#bandBioHidden").hide(function(){
            $("#bandBioCover").show(500);
         });      

      }
   });

  
            
      
   // $("bandBioHidden").on("mouseleave",function(){
   //   $("#bandBioCover").show(1000);     
   //   $("#bandBioHidden").hide(1000);     
   //});   
});   

