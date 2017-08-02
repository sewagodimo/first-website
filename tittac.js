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
   var a2=$('#a2');
    var a3=$('#a3');
     var b1=$('#b1');
     var b2=$('#b2');
     var b3=$('#b3');
      var c1=$('#c1');
      var c2=$('#c2');
      var c3=$('#c3');
      var turns=0;
var gameOn=true;
 var player = 1;
 var table = $('table');
  var messages = $('.messages');
  var turn = $('.turn');
//////////////////////////////////////////////////////////////////////////////

/*
  var newGame = function () {
    $('td').one('click', function (event) {
        if (turn == 0) {
            $(this).text(human);
            boardCheck();
            checkWin();
            turn == 1;
            compMove();
            boardCheck();
            checkWin();
        }
    });
};

*/
$(function() {
  

  displayNextPlayer(turn, player);
  
  $('td').click(function() {
  if(player==1){
    td = $(this);
    var state = getState(td);
    messages.html('');
    if(!state) {
      var pattern = 'cross';
      changeState(td, pattern);
      if(checkIfPlayerWon(table, pattern)) {
        if(player==1){
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
      else{ //the player did not win
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
               player =2;
             displayNextPlayer(turn, player);
             myTurn(turn,player); //so its the computer's turn to win
            
        
      }
      }
      }
    } else {
      messages.html('This box is already checked.');
    }

  }
  });
  
  $('.reset').click(function() {
    player = 1;
    messages.html('');
    reset(table);
    turns=0;
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

function myTurn(turn, player){
  messages.html('thinking....');
  table = $('table');
setTimeout(
  function() 
  {
   compMove();
   turn.html('Your Turn');
   messages.html('');
    var pattern = 'circle';
        turns+=1; 
      if(checkIfPlayerWon(table, 'circle')) {
           messages.html('I Win!!!!');
           gameOn=false;
        
        turn.html('Reset to play again');
      } 
      else{ //the player did not win
        if(turns>=9){
               messages.html('It\'s a draw!');
               turn.html('Reset for a rematch');
                turns=0;
                gameOn=false;
             
             }
             }



  }, 3000);
player=1;
}

function displayNextPlayer(turn, player) {
 if(player==1){

  turn.html('Your Turn');
}
else{
  turn.html('My Turn');
}
}

function checkIfPlayerWon(table, pattern) {
  var won = 0;
   if (
   (a1.hasClass(pattern) && a3.hasClass(pattern) && a2.hasClass(pattern) )|| //first row
   (b1.hasClass(pattern) && b2.hasClass(pattern) && b3.hasClass(pattern)) || //second row
    (c1.hasClass(pattern) && c2.hasClass(pattern) && c3.hasClass(pattern)) || //third row
      (a1.hasClass(pattern) && b1.hasClass(pattern) && c1.hasClass(pattern) )||//first column
        (a2.hasClass(pattern) && b2.hasClass(pattern) && c2.hasClass(pattern) )||
          (a3.hasClass(pattern) && b3.hasClass(pattern) && c3.hasClass(pattern)) ||//last column
            (a3.hasClass(pattern) && b2.hasClass(pattern) && c1.hasClass(pattern)) ||
            (a1.hasClass(pattern) && b2.hasClass(pattern) && c3.hasClass(pattern)) ) 
          {
            
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
var compMove = function (){
  
  var circle='circle ';
  var emtpy='';
  if (a2.hasClass(circle)){ if( (a1.hasClass(circle) && (!getState(a3) ))){ a3.addClass(circle); return; }  else if( (a3.hasClass(circle) && (!getState(a1) ))){ a3.addClass(circle); return}};  
         if ( (a3.hasClass(circle)) &&(a1.hasClass(circle) && (!getState(a2) )) ){
          a2.addClass(circle); return; //repeat this for each on if you want to let the computer make mistakes
         }

         // row one
   if (b2.hasClass(circle)){ if( (b1.hasClass(circle) && (!getState(b3) ))){ b3.addClass(circle); return; }  else if( (b3.hasClass(circle) && (!getState(b1) ))){ b3.addClass(circle); return;}  }// row two
   if (c2.hasClass(circle)){ if( (c1.hasClass(circle) && (!getState(c3) ))){ c3.addClass(circle); return; }  else if( (c3.hasClass(circle) && (!getState(c1) ))){ c3.addClass(circle); return;}  }// row three
    if ( (c3.hasClass(circle)) &&(c1.hasClass(circle) && (!getState(c2) )) ){
          c2.addClass(circle); return; //repeat this for each on if you want to let the computer make mistakes
         }
   if (b1.hasClass(circle)){ if( (a1.hasClass(circle) && (!getState(c1) ))){ c1.addClass(circle); return; }  else if( (c1.hasClass(circle) && (!getState(a1) ))){ a1.addClass(circle); return;}  }// column one
     if ( (a1.hasClass(circle)) &&(c1.hasClass(circle) && (!getState(b1) )) ){
          b1.addClass(circle); return; //repeat this for each on if you want to let the computer make mistakes
         }

    if (b2.hasClass(circle)){ if( (a2.hasClass(circle) && (!getState(c2) ))){ c2.addClass(circle); return; }  else if( (c2.hasClass(circle) && (!getState(a2) ))){ a2.addClass(circle); return;}  }// column two

    if (b3.hasClass(circle)){ if( (a3.hasClass(circle) && (!getState(c3) ))){ c3.addClass(circle); return; }  else if( (c3.hasClass(circle) && (!getState(a3) ))){ a3.addClass(circle); return;}  }// column three
       if ( (c3.hasClass(circle)) &&(a3.hasClass(circle) && (!getState(b3) )) ){
          a3.addClass(circle); return; //repeat this for each on if you want to let the computer make mistakes
         }
    if (b2.hasClass(circle)){ if( (a3.hasClass(circle) && (!getState(c1) ))){ c1.addClass(circle); return; }  else if( (c1.hasClass(circle) && (!getState(a3) ))){ a3.addClass(circle); return;}  }// diagonal one
    //the computer ams to fill in the middle center first

    if (b2.hasClass(circle)){ if( (a1.hasClass(circle) && (!getState(c3) ))){ c3.addClass(circle); return; }  else if( (c3.hasClass(circle) && (!getState(a1) ))){ a1.addClass(circle); return;}  }// diagonal one

    if ((!getState(a1)) && ((a3.hasClass('cross') && a2.hasClass('cross')) || (c3.hasClass('cross') && b2.hasClass('cross')) || (c1.hasClass('cross') && b1.hasClass('cross')))) 
    { a1.addClass(circle);
       player=1;
        
    } else {

      if ((!getState(a2)) && ((a1.hasClass('cross') && a3.hasClass('cross')) || (c2.hasClass('cross') && b2.hasClass('cross')))) 
      {
       a2.addClass(circle);
         player=1;
        }
        else{
        if ((!getState(a3)) && ((a1.hasClass('cross') && a2.hasClass('cross')) || (c1.hasClass('cross') && b2.hasClass('cross')) || (c3.hasClass('cross') && b3.hasClass('cross')))) 
        {
           a3.addClass(circle);
             player=1;
        }
            else{
            if ((!getState(c3)) && ((c1.hasClass('cross') && c2.hasClass('cross')) || (a1.hasClass('cross') && b2.hasClass('cross')) || (a3.hasClass('cross') && b3.hasClass('cross')))) 
            {
               c3.addClass(circle);
                 player=1;
              }
                else{
                if ((!getState(c1)) && ((c3.hasClass('cross') && c2.hasClass('cross')) || (a3.hasClass('cross') && b2.hasClass('cross')) || (a1.hasClass('cross') && b1.hasClass('cross')))) 
                {
                     c1.addClass(circle);
                     player=1;
                  }
                    else{
                    if ((!getState(c2)) && ((c3.hasClass('cross') && c1.hasClass('cross')) || (a2.hasClass('cross') && b2.hasClass('cross')))) 
                    {
                         c2.addClass(circle);
                         player=1;
                       }
                        else{
                        if ((!getState(b1))&& ((b3.hasClass('cross') && b2.hasClass('cross')) || (a1.hasClass('cross') && c1.hasClass('cross')))) 
                        {
                            b1.addClass(circle);
                             player=1;
                        }
                            else
                            {
                            if ((!getState(b3)) && ((a3.hasClass('cross') && c3.hasClass('cross')) || (b2.hasClass('cross') && b1.hasClass('cross'))))
                                  {
                                b3.addClass(circle);
                                 player=1;
                                  }
                                else{
                                if ((!getState(b2)) && ((a3.hasClass('cross') && c1.hasClass('cross')) || (c3.hasClass('cross') && a1.hasClass('cross')) || (b3.hasClass('cross') && b1.hasClass('cross')) || (c2.hasClass('cross') && a2.hasClass('cross')))) 
                                { b2.addClass(circle); }
                                   else{ // IF NO OPP TO BLOCK A WIN, THEN PLAY IN ONE OF THESE SQUARES
                                    if (!getState(b2)) {
                                        b2.addClass(circle);
                                        player=1;}
                                        else{
                                        if (!getState(a1)) {
                                           a1.addClass(circle);
                                           player=1;}
                                            else{
                                            if (!getState(c3)) {
                                            c3.addClass(circle); 
                                            player=1;} 
                                                else {
                                                if (!getState(c2)) {
                                           c2.addClass(circle); 
                                           player=1;}
                                                    else{
                                                    if (!getState(b1)) {
                                            b1.addClass(circle);
                                            player=1; }
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
