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
                    var c = '<tr><td>' + challenge.timestamp_flag +'</td><td>'+challenge.nome+'</td><td>'+challenge.score+'</td></li>';
                    $(".table_challenge_flag").append(c);
                    score_flag_tot += challenge.score
                    n_solved_chal += 1;
                }
                if (challenge.timestamp_hint){
                    var c = '<tr><td>' + challenge.timestamp_hint +'</td><td>'+challenge.nome+'</td><td>-50</td></li>';
                    $(".table_challenge_hint").append(c);
                    score_hint_tot += 50;
                }
            }
            total_score = score_flag_tot-score_hint_tot;
            
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
            $(".user-info").append("Username:\t"+ res.username+"<br>");
            $(".user-info").append("Email:\t"+ res.email+"<br>");
            $(".user-info").append("Score flag point:\t"+ score_flag_tot+"<br>");
            $(".user-info").append("Use hint point:\t"+ score_hint_tot+"<br>");
            $(".user-info").append("Total score:\t"+ total_score+"<br>");
            $(".user-info").append("Challenge risolte:\t"+ n_solved_chal+ "/" + res.tot_challenges +"<br>");
        }
    }
    xhttp2.open("GET", '/info-profile-utente', false);
    xhttp2.send();
 }