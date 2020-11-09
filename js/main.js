$(function(){
  
  let randomNumber = Math.floor(Math.random()* 50) +1;
  console.log('はじめの数字は、'+randomNumber);
  let hintSentenceBox = document.querySelector('.hintSentenceBox');
  let kaisuuBox = document.querySelector('#kaisuuBox');
  let createP = document.createElement('p');
  let hintContent;
  let createButton;
  let guessCount = 1;
  
  for(let i = 1; i <= 50; i++){
    createButton = document.createElement('button');
    createButton.setAttribute('value',i);
    Content = document.createTextNode(i);
    createButton.appendChild(Content);
    kaisuuBox.appendChild(createButton);
  };

  function checkOddEven(){
    if(randomNumber % 2 === 0){
      //偶数。ノードの作成
      hintContent = document.createTextNode("この数は偶数です。"); 
      //作成したp要素(createP)に文章を追加する。
      createP.appendChild(hintContent);
      //hintBox に作成したpを追加する。
      hintSentenceBox.appendChild(createP);
    } else {
      //奇数。
      hintContent = document.createTextNode("この数は奇数です。"); 
      createP .appendChild(hintContent);
      hintSentenceBox.appendChild(createP);
    };
  };

  checkOddEven();

   $('#kaisuuBox button').on('click', function(){
    let yourNumber = Number($(this).val());
    console.log(yourNumber);

    if(guessCount === 1){
      $('.hintSentenceGuessBox').append('<p>前回の予想数字：</p>');
    }
    $('.hintSentenceGuessBox').append("<p class='pcss'>"+ yourNumber + "</p>");

    function newGame(){
      if(randomNumber === yourNumber){
        console.log('ok');
        $('.zannen').hide();
        $('#result').append("<h2 class='correct'>正解: "+yourNumber +"</h2>");
        setGameOver();
      } else if (guessCount=== 5){
        $('.zannen').hide();
        console.log('gameOver');
        $('#result').append("<h2 class='false'>げーむおーばー!　正解は、"+ randomNumber +"　です。</h2>");
        
        setGameOver();
      }else if( yourNumber === 0){
        ///初期化用
        $('body').css('background-color','#fffffe');
      }else{
        $('.zannen').show();
        console.log('tesut中'+ yourNumber);
        if(yourNumber > randomNumber){
          $('.hintSentenceCheckBox').append("<p>正解の数字は、"+ yourNumber+ " より小さいです</p>");
          console.log('大きいです'); 
        } else if (yourNumber < randomNumber){
          console.log('小さいです');
          $('.hintSentenceCheckBox').append("<p>正解の数字は、"+ yourNumber+ " より大きいです</p>");
        }
      }
    };

    newGame();

    guessCount++;

     $('.resetBtn').on('click',function(){
       guessCount = 1;
       randomNumber = Math.floor(Math.random() * 50) + 1;
       $("button").attr('disabled', false);
       $('#result').empty();
       $('.hintSentenceGuessBox').empty();
       $('.hintSentenceCheckBox').empty();
       $(hintContent).remove();
       checkOddEven();
       console.log(randomNumber);
       yourNumber = 0;
       console.log('さいごのぎょう'+ yourNumber);
       newGame();
     });
   });

   function setGameOver(){
    $("button").attr('disabled', true);
    $('#result').append('<button class="resetBtn">リセット</button>');
   };
});