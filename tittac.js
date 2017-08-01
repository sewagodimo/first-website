/********************************************/
/* @author : Pauline Ghiazza                */
/* @author site : www.paulineghiazza.fr     */
/********************************************/

///////////////////////////////////////////////////////Scroll to
  $(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 1000, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

/////////////////////////////////////////////////////////////////////////THE TABLE
 var a1= $('#a1');
   var a2=$('#a3');
    var a3=$('#a2');
     var b1=$('#b1');
     var b2=$('#b2');
     var b3=$('#b3');
      var c1=$('#c1');
      var c2=$('#c2');
      var c3=$('#c3');

//////////////////////////////////////////////////////////////////////////////
var turns=0;
var gameOn=true;
$(function() {
  
  var player = 1;
  var table = $('table');
  var messages = $('.messages');
  var turn = $('.turn');

  displayNextPlayer(turn, player);
  
  $('td').click(function() {
    td = $(this);
    var state = getState(td);
    messages.html('');
    if(!state) {
      var pattern = definePatternForCurrentPlayer(player);
      changeState(td, pattern);
      if(checkIfPlayerWon(table, pattern)) {
        if(player===1){
           messages.html('You Win!!!');
           gameOn=false;
        }
        else{
           messages.html('I Win.');
           gameOn=false;
        }
         
        turn.html('Reset to play again');
        gameOn=false;
      } 
      else
       {
        if(turns>=8){
               messages.html('It\'s a draw!');
               turn.html('Reset to play again');
                turns=0;
                gameOn=false;
             } 
             else
              {
                if(gameOn===true){
                turns+=1;
          player = setNextPlayer(player);
        displayNextPlayer(turn, player);
      }
      }
      }
    } else {
      messages.html('This box is already checked.');
    }
  });
  
  $('.reset').click(function() {
    player = 1;
    messages.html('');
    reset(table);
    displayNextPlayer(turn, player);
    gameOn=true;
  });
  
});

function getState(td) {
  if(td.hasClass('cross') || td.hasClass('circle')) {
    return 1;
  } else {
    return 0;
  }
}

function changeState(td, pattern) {
  return td.addClass(pattern);
}

function definePatternForCurrentPlayer(player) {
  if(player == 1) {
    return 'cross';
  } else {
    return 'circle';
  }
}

function setNextPlayer(player) {

  if(player == 1) {
    return player = 2;
  } else {
    return player = 1;
  }
}
function myturn(table,pattern){

}

function displayNextPlayer(turn, player) {
 if(player===1){

  turn.html('Your Turn');
}
else{
  turn.html('My Turn');
}
}

function checkIfPlayerWon(table, pattern) {
  var won = 0;
  if(a1.hasClass(pattern) && a2.hasClass(pattern) && a3.hasClass(pattern)) {
    won = 1;
  } else if (a1.hasClass(pattern) && b1.hasClass(pattern) && c1.hasClass(pattern)) {
    won = 1;
  } else if (a1.hasClass(pattern) && b2.hasClass(pattern) && c3.hasClass(pattern)) {
    won = 1;
  } else if (b1.hasClass(pattern) && b2.hasClass(pattern) && b3.hasClass(pattern)) {
    won = 1;
  } else if (c1.hasClass(pattern) && c2.hasClass(pattern) && c3.hasClass(pattern)) {
    won = 1;
  } else if (a2.hasClass(pattern) && b2.hasClass(pattern) && c2.hasClass(pattern)) {
    won = 1;
  } else if (a3.hasClass(pattern) && b3.hasClass(pattern) && c3.hasClass(pattern)) {
    won = 1;
  } else if (a3.hasClass(pattern) && b2.hasClass(pattern) && c1.hasClass(pattern)) {
    won = 1;
  }
  return won;
}

function reset(table) {
  table.find('td').each(function() {
    $(this).removeClass('circle').removeClass('cross');
  });
}
///////////////////////////////////////////////////////////COMPUTER MOVE GENERATOR
//pLAYER 1==cross YOU
//PLAYER 2==CIRCLE COMPUTER
var compMove = function (table) {
  
  var circle='circle';
  //addClass(pattern)
  var emtpy='';
 
    if ((!getState(a1)) && ((a3.hasClass('cross') && a2.hasClass('cross')) || (c3.hasClass('cross') && b2.hasClass('cross')) || (c1.hasClass('cross') && b1.hasClass('cross')))) {
        a1.addClass(circle);
        
    } else {
      if (a2 == "" && ((a1.hasClass('cross') && a3.hasClass('cross')) || (c2.hasClass('cross') && b2.hasClass('cross')))) {
       a2.addClass(circle);
        
        }
        else{
        if (a3 == "" && ((a1.hasClass('cross') && a2.hasClass('cross')) || (c1.hasClass('cross') && b2.hasClass('cross')) || (c3.hasClass('cross') && b3.hasClass('cross')))) {
           a2.addClass(circle);
            
        }
            else{
            if (c3 == "" && ((c1.hasClass('cross') && c2.hasClass('cross')) || (a1.hasClass('cross') && b2.hasClass('cross')) || (a3.hasClass('cross') && b3.hasClass('cross')))) {
               a3.addClass(circle);
                
        }
                else{
                if (c1 == "" && ((c3.hasClass('cross') && c2.hasClass('cross')) || (a3.hasClass('cross') && b2.hasClass('cross')) || (a1.hasClass('cross') && b1.hasClass('cross')))) {
                     c1.addClass(circle);
                    
        }
                    else{
                    if (c2 == "" && ((c3.hasClass('cross') && c1.hasClass('cross')) || (a2.hasClass('cross') && b2.hasClass('cross')))) {
                         c2.addClass(circle);
                        
        }
                        else{
                        if (b1 == "" && ((b3.hasClass('cross') && b2.hasClass('cross')) || (a1.hasClass('cross') && c1.hasClass('cross')))) {
                            b1.addClass(circle);
                            
        }
                            else{
                            if (b3 == "" && ((a3.hasClass('cross') && c3.hasClass('cross')) || (b2.hasClass('cross') && b1.hasClass('cross')))) {
                                b3.addClass(circle);
                                
        }
                                else{
                                if (b2 == "" && ((a3.hasClass('cross') && c1.hasClass('cross')) || (c3.hasClass('cross') && a1.hasClass('cross')) || (b3.hasClass('cross') && b1.hasClass('cross')) || (c2.hasClass('cross') && a2.hasClass('cross')))) {
                                    b2.addClass(circle);
                                    
        }
                                   else{ // IF NO OPP TO BLOCK A WIN, THEN PLAY IN ONE OF THESE SQUARES
                                    if (!getState(b2)) {
                                        b2.addClass(circle);
                                        
                                       
                                    }
                                        else{
                                        if (!getState(a1)) {
                                           a1.addClass(circle);
                                            
                                            
                                    }
                                            else{
                                            if (!getState(c3)) {
                                            c3.addClass(circle);
                                            
                                          
                                    } 
                                                else {
                                                if (!getState(c2)) {
                                           c2.addClass(circle);
                                            
                                          
                                    }
                                                    else{
                                                    if (!getState(b1)) {
                                            b1.addClass(circle);
                                            
                                          
                                    }
                                                    }
                                                }
                                            }
                                   
                                    
                                        }
                                   }
                                }
                            }
                        }
                    }
                }
            }
        }
    }   
};
