function getStatisctics(){
    var score_flag_tot = 0;
    var score_hint_tot = 0;
    var total_score = 0;
    var n_solved_chal = 0;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var res = JSON.parse(this.responseText);
            for (challenge of res){
                if (challenge.timestamp_flag){
                    var c = '<tr class="text-center"><td>' + challenge.timestamp_flag +'</td><td>'+challenge.nome+'</td><td>'+challenge.score+'</td></li>';
                    $(".table_challenge_flag").append(c);
                    score_flag_tot += challenge.score
                    n_solved_chal += 1;
                }
                if (challenge.timestamp_hint){
                    var c = '<tr class="text-center"><td>' + challenge.timestamp_hint +'</td><td>'+challenge.nome+'</td><td>-50</td></li>';
                    $(".table_challenge_hint").append(c);
                    score_hint_tot += 50;
                }
            }
            total_score = score_flag_tot-score_hint_tot;
            score_hint_tot = score_hint_tot/50;
            console.log(score_flag_tot, score_hint_tot, total_score);
        }
    };
    xhttp.open("GET", '/info-profile-statistics', false);
    xhttp.send();

    var xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var res = JSON.parse(this.responseText)[0];
            console.log(res);
            $(".user-info").append('<tr><td>' + 'Username' +'</td><td>'+res.username+'</td></li>');
            $(".user-info").append('<tr><td>' + 'Email' +'</td><td>'+res.email+'</td></li>');
            $(".user-info").append('<tr><td>' + 'Challenge points' +'</td><td>'+score_flag_tot+'</td></li>');
            $(".user-info").append('<tr><td>' + 'Hint used' +'</td><td>'+score_hint_tot+'</td></li>');
            $(".user-info").append('<tr><td>' + 'Total score' +'</td><td>'+total_score+'</td></li>');
            $(".user-info").append('<tr><td>' + 'Solved challenges' +'</td><td>'+n_solved_chal+ "/" + res.tot_challenges+'</td></li>');
        }
    }
    xhttp2.open("GET", '/info-profile-utente', false);
    xhttp2.send();
 }


function getNameBtn(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        document.getElementById("button_profile").innerHTML += JSON.parse(this.responseText).username;
        centra_nav();
        }
    };
    xhttp.open("GET", '/info-profile', true);
    xhttp.send();
 }  