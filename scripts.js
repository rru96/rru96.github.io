$(function(){

    var RANGE, MIN_ANSWER, MAX_ANSWER, POSSIBLE_ANSWERS;
    var FPS, COUNTDOWN, MIN_QUESTIONS, MAX_QUESTIONS, MIN_Q_TIME, MAX_Q_TIME, MIN_T_TIME, MAX_T_TIME;
    var testEpoch;
    var questionEpoch;

    var tt, qt;

    var currentQuestion, questionCount;
    var qTime;
    var tTime;

    var testCountdown;
    var timerQuestion, timerTest;
    var testAvailable, testFinished, needQuestion;
    var questions, answeredCorrect, answeredWrong;

    var correctAnswer;
    var isFITB;
    


    function init(){
        POSSIBLE_ANSWERS = 4;
        RANGE = 15; // +- from correct answer
        MIN_ANSWER = 0; MAX_ANSWER = 144;
        FPS = 30;
        COUNTDOWN = 3000;
        MIN_QUESTIONS = 10;
        MAX_QUESTIONS = 100;
        MIN_Q_TIME = 3000;
        MAX_Q_TIME = 60000;
        MIN_T_TIME = 1000; // CHANGE TO 30000
        MAX_T_TIME = 300000;

        currentQuestion = 0;
        questionCount = 0;
        answeredCorrect = 0;
        answeredWrong = 0;

        testAvailable = false;
        testFinished = false;
        needQuestion = null;
        questions = 0;

        questionCount = MIN_QUESTIONS;
        $('.question_total').html(questionCount);
        $('.question_total').addClass('purple');

        qTime = MIN_Q_TIME;
        tTime = MIN_T_TIME;

        $('.question_per').html(MIN_Q_TIME/1000 + " secs.");
        $('.test_per').html(MIN_T_TIME/1000 + " secs.");
    }

    function createActions(){
        $('.pages').on('click', function(evt){
            changeScreen(evt.target.id);
        });
    
        $('.mathy').on('click', function(evt){
            hideScreens();
        });
    
        $('.reset').on('click', function(evt){
            //remove all settings
            
            // zero out any variables 
            hideScreens();
        });
    
        $('.number').on('click', function(evt){
            $(evt.target).toggleClass('orange');
            if(checkForNumbers()){
                $('#numbers').addClass('green');
            }else{
                $('#numbers').removeClass('green');
            }
            checkTabs();        
        });
    
        $('.set1 .all').on('click', function(){
            var c1 = $('.set1 p.number');
            for(var c = 0; c < $(c1).length; c++){
                var tc = c1[c];
                if($(tc).hasClass('orange')){
                }else{
                    $(tc).addClass('orange');
                }
            }
            if(checkForNumbers()){
                $('#numbers').addClass('green');
            }else{
                $('#numbers').removeClass('green');
            }
            checkTabs();        
        });
        $('.set2 .all').on('click', function(){
            var c2 = $('.set2 p.number');
            for(var cc = 0; cc < $(c2).length; cc++){
                var tc2 = c2[cc];
                if($(tc2).hasClass('orange')){
                }else{
                    $(tc2).addClass('orange');
                }
            }
            if(checkForNumbers()){
                $('#numbers').addClass('green');
            }else{
                $('#numbers').removeClass('green');
            }
            checkTabs();
        });
    
        $('.set1 .none').on('click', function(){
            var c1 = $('.set1 p.number');
            for(var c = 0; c < $(c1).length; c++){
                var tc = c1[c];
                if($(tc).hasClass('orange')){
                    $(tc).removeClass('orange');
                }else{                
                }
            }
            if(checkForNumbers()){
                $('#numbers').addClass('green');
            }else{
                $('#numbers').removeClass('green');
            }
            checkTabs();
        });
        $('.set2 .none').on('click', function(){
            var c2 = $('.set2 p.number');
            for(var cc = 0; cc < $(c2).length; cc++){
                var tc2 = c2[cc];
                if($(tc2).hasClass('orange')){
                    $(tc2).removeClass('orange');
                }else{                
                }
            }
            if(checkForNumbers()){
                $('#numbers').addClass('green');
            }else{
                $('#numbers').removeClass('green');
            }
            checkTabs();
        });
    
        $('.sign').on('click', function(evt){
            var tsl = $('.sign');
    
            for(var s = 0; s < $(tsl).length; s++){
                var ls = tsl[s];
                $(ls).removeClass('purple');
            }
    
            $("#"+evt.target.id).addClass('purple');
    
            if(checkForQuestions()){
                $('#questions').addClass('green');
            }else{
                $('#questions').removeClass('green');
            }
            checkTabs();
        });
    
        $('.atypes').on('click', function(evt){
            var tat = $('.atypes');
    
            for(var s2a = 0; s2a < $(tat).length; s2a++){
                var l2sa = tat[s2a];
                $(l2sa).removeClass('purple');
            }
    
            $("#"+evt.target.id).addClass('purple');
    
            if(checkForQuestions()){
                $('#questions').addClass('green');
            }else{
                $('#questions').removeClass('green');
            }
            checkTabs();
        });
    
        $('.qadj').on('click', function(evt){
            var cval = parseInt($(evt.target).attr('value')); 
            adjustQuestionCount(cval);
        });
    
        $('.qt_kill').on('click', function(evt){
            adjustQuestionTime(0);
        });
    
        $('.question_per').on('click', function(evt){
            adjustQuestionTime("N");
        });
    
        $('.qsec').on('click', function(evt){
            var qt1 = parseInt($(evt.target).attr('value')); 
            adjustQuestionTime(qt1);
        });
    
        $('.tt_kill').on('click', function(evt){
            adjustTestTime(0);
        });
    
        $('.test_per').on('click', function(evt){
            adjustTestTime("M");
        });
    
        $('.tadj').on('click', function(evt){
            var tt1 = parseInt($(evt.target).attr('value')); 
            adjustTestTime(tt1);
        });
    
        $('.begin_button').on('click',function(){
            if(testAvailable){
                changeScreen("test");
                getTestData();
            }
        });
        
    }
    


    

    function hideScreens(){
        var screens = document.getElementsByClassName('screen');

        for(var s = 0; s < screens.length; s++){
            var ts = screens[s];
            $(ts).addClass('hide');
        }
    }

    function changeScreen(screenName){
        hideScreens();
        
        var showScreen = "screen_"+screenName;
        $('#'+showScreen+'').removeClass('hide');
    }

    function adjustQuestionCount(adjNum){
        var tempCount = (questionCount + adjNum);

        if(tempCount < MIN_QUESTIONS){
            tempCount = MIN_QUESTIONS;
        }else if(tempCount > MAX_QUESTIONS){
            tempCount = MAX_QUESTIONS;
        }else{
            questionCount = tempCount;
        }

        $('.question_total').html(questionCount);

    }

    function adjustQuestionTime(adjQTNum){
        if(adjQTNum == 0){ //QT KILL pressed
            $('.question_per').removeClass('seagreen');
            $('.qt_kill').addClass('seagreen');
            qt = false;
            qTime = MIN_Q_TIME;
        }else if(adjQTNum == "N"){ 
            $('.question_per').addClass('seagreen');
            $('.qt_kill').removeClass('seagreen');
            qt = true;
        }
        else{
            qt = true;
            qTime = (qTime + adjQTNum);
            
        }

        if(qTime < MIN_Q_TIME){
            qTime = MIN_Q_TIME;
        }
        if(qTime > MAX_Q_TIME){
            qTime = MAX_Q_TIME;
        }

        $('.question_per').html(qTime/1000 + " secs.");

        if(checkForTimers()){
            $('#timers').addClass('green');
        }else{
            $('#timers').removeClass('green');
        }
        checkTabs();
    }

    function adjustTestTime(adjTTNum){
        if(adjTTNum == 0){ //TT KILL pressed
            $('.test_per').removeClass('seagreen');
            $('.tt_kill').addClass('seagreen');
            tt = false;
            tTime = MIN_T_TIME;
        }else if(adjTTNum == "M"){
            $('.test_per').addClass('seagreen');
            $('.tt_kill').removeClass('seagreen');
            tt = true;
        }else{
            tt = true;
            tTime = (tTime + adjTTNum);
        }

        if(tTime < MIN_T_TIME){
            tTime = MIN_T_TIME;
        }else if(tTime > MAX_T_TIME){
            tTime = MAX_T_TIME;
        }

        $('.test_per').html(tTime/1000 + " secs.");

        if(checkForTimers()){
            $('#timers').addClass('green');
        }else{
            $('#timers').removeClass('green');
        }
        checkTabs();
    }

    function checkForNumbers(){
        var s1n = $('.set1 .orange');
        var s2n = $('.set2 .orange');

        if(s1n.length > 0 && s2n.length > 0){
            return true;
        }else{
            return false;
        }
    }

    function checkForQuestions(){
        var qs1 = $('.signs .purple');
        var qs2 = $('.answer_types .purple');

        if(qs1.length > 0 && qs2.length > 0){
            console.log("TRUE");
            return true;
        }else{
            console.log("FALSE");
            return false;
        }
    }

    
    function checkForTimers(){
        var qs1 = $('.question_timer .seagreen');
        var qs2 = $('.test_timer .seagreen');

        if(qs1.length > 0 && qs2.length > 0){
            return true;
        }else{
            return false;
        }

    }

    function checkTabs(){
        if($('#numbers').hasClass('green')){
            if($('#questions').hasClass('green')){
                if($('#timers').hasClass('green')){
                    $('.begin_button').addClass('testReady');
                    testAvailable = true;
                }else{
                    $('.begin_button').removeClass('testReady');
                    testAvailable = false;
                }
            }else{
                $('.begin_button').removeClass('testReady');
            }
        }else{
            $('.begin_button').removeClass('testReady');
        }
    }

    function getTestData(){
        toggleContainer();
        if($('#fitb').hasClass('purple')){
            $('.answer_input').css({
                'display': 'initial',
                'visibility': 'visible'
            });
            $('.test_answer').css({
                'display': 'none',
                'visibility': 'hidden'
            });
            isFITB = true;
        }else if($('#mc').hasClass('purple')){
            $('.test_answer').css({
                'display': 'initial',
                'visibility': 'visible'
            });
            $('.answer_input').css({
                'display': 'none',
                'visibility': 'hidden'
            });
            isFITB = false;
        }

        //0 check
        if($('#divide').hasClass('purple')){
            if($('.set1 p.zero').hasClass('orange')){
                $('.set1 p.zero').removeClass('orange');
            }
            if($('.set2 p.zero').hasClass('orange')){
                $('.set2 p.zero').removeClass('orange');
            }
        }  


        //TestTimed  // 0 means NO , else use TTIME
        var testTimed = $('.test_per')[0];
        tt = false;
        if($(testTimed).hasClass('seagreen')){
            tt = true;
        }

        //QuestionTimed  // 0 means NO , else use QTIME
        var questionTimed = $('.question_per')[0];
        qt = false;
        if($(questionTimed).hasClass('seagreen')){
            qt = true;
        }

        testCountdown = setTimeout(function(){
            beginTest();
        },COUNTDOWN);

        document.getElementById('aFill').focus();

        $('.box1, .box2, .box3').html("&nbsp;");

        $('#aFill').on('keyup',function(evt){
            if(evt.keyCode == 13){
                checkAnswer(document.getElementById('aFill').value);
            }
        });
        $('.answer1').on('click',function(evt){
            checkAnswer($(evt.target).html());
        });
        $('.answer2').on('click',function(evt){
            checkAnswer($(evt.target).html());
        });
        $('.answer3').on('click',function(evt){
            checkAnswer($(evt.target).html());
        });
        $('.answer4').on('click',function(evt){
            checkAnswer($(evt.target).html());
        });
        
    }

    function beginTest(){
        $('.settings_tabs').addClass('hide');
        testEpoch = Date.now();
        questionEpoch = Date.now();
        needQuestion = true;
        testFinished = false;
        timerTest = setInterval(tick, 1000/FPS);
    }


    function checkAnswer(tAns){
        if(tAns == correctAnswer){
            answeredCorrect++;
        }
        needQuestion = true;
    }

    function tick(){
        var ct = Date.now();

        if(currentQuestion > questionCount){ // no questions
            clearInterval(timerTest);
            testOver();
            return;
        }        
        if(tt){
            if(ct - testEpoch >= tTime){ // test timer over
                clearInterval(timerTest);
                testOver();
                return;
            }
        }
        if(qt){
            if(ct - questionEpoch >= qTime){ // question timer over
                questionEpoch = ct;
                needQuestion = true;
            }
        }
        if(needQuestion){
            questionEpoch = ct;
            showQuestion();
        }
    }



    function showQuestion(){
        needQuestion = false;
        currentQuestion++;
        correctAnswer = null;
        
        $('.box1, .box2, .box3').html("");
        document.getElementById('aFill').value = "";
        
        var tsign = $('.signs p.purple').attr('id');

        var temp1 = $('.set1 p.orange');
        var temp2 = $('.set2 p.orange');

        var num1 = parseInt($(temp1[Math.floor(Math.random() * temp1.length)]).attr('value'));
        var num2 = parseInt($(temp2[Math.floor(Math.random() * temp2.length)]).attr('value'));
        var num3 = parseInt(num1 * num2);

        

    

        switch (tsign) {
            case 'plus':
                var prand;
                prand = Math.random();
                if(prand>=0.500){
                    $('.box1').html(num1);
                    $('.box3').html(num2);
                }else{
                    $('.box1').html(num2);
                    $('.box3').html(num1);
                }  
                if(!isFITB){ // Multiple Choice
                    showAnswers(correctAnswer);
                }    correctAnswer = (num1 + num2); 
                if(!isFITB){ // Multiple Choice
                    showAnswers(correctAnswer);
                }

                $('.box2').html('&plus;').addClass('testNums');
                break;
            case 'minus':
                $('.box1').html(Math.max(num1, num2));
                $('.box2').html('&minus;').addClass('testNums');
                $('.box3').html(Math.min(num1, num2));

                correctAnswer = (Math.max(num1, num2) - Math.min(num1, num2));
                if(!isFITB){ // Multiple Choice
                    showAnswers(correctAnswer);
                }
                break;
            case 'times':
                var trand;
                trand = Math.random();
                if(trand >= 0.500){
                    $('.box1').html(num1);
                    $('.box3').html(num2);
                }else{
                    $('.box1').html(num2);
                    $('.box3').html(num1);
                }
                $('.box2').html('&times;').addClass('testNums');

                correctAnswer = (num1 * num2);
                if(!isFITB){ // Multiple Choice
                    showAnswers(correctAnswer);
                }
                break;
            case 'divide':
                $('.box1').html('&#63;');
                var drand = Math.random();
                if(drand >= 0.500){
                    $('.box2').html(num1 + '&#10188;');
                    correctAnswer = num2;
                    if(!isFITB){ // Multiple Choice
                        showAnswers(correctAnswer);
                    }
                }else{
                    $('.box2').html(num2 + '&#10188;');
                    correctAnswer = num1;
                    if(!isFITB){ // Multiple Choice
                        showAnswers(correctAnswer);
                    }
                }
                $('.box3').html(num3);
                break;
        
            default:
                break;
        }
        
    }

    function showAnswers(ca){  
        var answers = [];
        answers.push(ca);

        var n1, n2;
        n1 = ca - RANGE;
        n2 = ca + RANGE;
        if(n1 < MIN_ANSWER){n1 = MIN_ANSWER;}
        if(n2 > MAX_ANSWER){n2 = MAX_ANSWER;}

        while(answers.length < POSSIBLE_ANSWERS){
            var rand1;
            rand1 = (Math.floor(Math.random()*n2)+n1); // number in RANGE
            if(rand1 !== ca){
                if(answers.indexOf(rand1) == -1){
                    answers.push(rand1);
                }
            }
        }

        $('.answer1').html(answers.splice(Math.floor(Math.random()*answers.length),1));
        $('.answer2').html(answers.splice(Math.floor(Math.random()*answers.length),1));
        $('.answer3').html(answers.splice(Math.floor(Math.random()*answers.length),1));
        $('.answer4').html(answers.splice(Math.floor(Math.random()*answers.length),1));

        
    }


    function testOver(){
        changeScreen('results');
        clearInterval(timerTest);

        console.log("Ans Correct = " + answeredCorrect);
        $('.correct').html("Answered: " + answeredCorrect + " correctly out of " + questionCount + " questions");
    }

    function toggleContainer(){
        var cont = $('.page_container');
        var icont = $('.info');
        if($(cont).hasClass('hide')){
            $(cont).removeClass('hide');
            $(icont).removeClass('hide');
        }else{
            $(cont).addClass('hide');
            $(icont).addClass('hide');
        }
    }
    

    init();
    createActions();
    hideScreens();
    $('.app').css({
        'display':'initial',
        'visibility':'visible'
    });
    adjustQuestionCount(0);

});
