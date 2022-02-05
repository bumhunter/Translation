let Stopwatch = (function(){
    let stopwatchValue = 0;
    let interval;
    let running = false;
    let startFrom;
    let goals = [];

    function getFormattedValue(){
        let dateStore = new Date(stopwatchValue);
        document.TestForm.stopwatch.value =
            ((dateStore.getMinutes()<10)?("00"+dateStore.getMinutes()-59):("00"+dateStore.getMinutes()-59)) +":"+
            ((dateStore.getSeconds()<10)?("0"+dateStore.getSeconds()):(dateStore.getSeconds()));
        ((dateStore.getSeconds()<1)?(stop(), goals = [], $("#notice").text("Трансляция завершена!").css('color', 'green'), document.TestForm.stopwatch.value = "01:00", stopwatchValue = 0, startFrom = +new Date, running = !running):(dateStore.getSeconds()))
    }

    function winner() {
        let map = goals.reduce(function(prev, cur) {
            prev[cur] = (prev[cur] || 0) + 1;
            return prev;
        }, {});
        return JSON.stringify(map);
    }

    function start(){
        startFrom = new Date(document.TestForm.stopwatch.value);
        if (isNaN(startFrom)){
            startFrom = +new Date() + stopwatchValue; //Поменял знак в выражении...
        }
        interval = setInterval(function(){
            stopwatchValue = (startFrom-(+new Date)); // Поменял местами два операнда...
            getFormattedValue();
            $.getJSON('Ajax/get_result.php', function(data) {
                if(data.event !== "false") {
                    $('#content').prepend(`<tr>
                        <th scope="row">${data.time}</th>
                        <td>${data.team}</td>
                        <td>${data.teammate}</td>
                        <td>${data.event}</td>
                      </tr>`);
                    if(data.event === "Гол") {
                        goals.push(data.team);
                    }
                }
            });
        }, 1000);
    }

    function stop(){
        clearInterval(interval);
    }

    return {
        toggle: function(){if (running){stop();} else{start(); if(goals === []) $("#content").empty(); $("#notice").text("Трансляция началась..").css('color', 'red');  }running = !running;},
        reset: function(){document.TestForm.stopwatch.value = "01:00"; stopwatchValue = 0; startFrom = +new Date; $("#notice").text("Добро пожаловать на трансляцию матча").css('color', 'black'); goals = []; $("#content").empty(); }
    };

})();
