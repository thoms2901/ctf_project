function getNameBtn(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        document.getElementById("button_profile").innerHTML += JSON.parse(this.responseText).username;
        }
    };
    xhttp.open("GET", '/info-profile', true);
    xhttp.send();
 }  

function show_done_challenge() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          const res = JSON.parse(this.responseText);
          for (var id of res){
            id = id.id_challenge.toString();
            var elem = document.getElementById(id);
            if (elem)
                elem.style = "background: rgb(40, 167, 69);";
          }
        }
    }
    xhttp.open("GET", "/challenge_done", true);
    xhttp.send();
}

function show_modal_hint(){
    document.getElementById("hint_btn").setAttribute('data-bs-toggle','modal');
    document.getElementById("hint_btn").setAttribute('data-bs-target','#modalHint');
}

function show_modal(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var result = JSON.parse(this.responseText).rows[0];
          document.getElementById("title").innerHTML = result.nome;
          document.getElementById("text").innerHTML = result.testo;
          var score_text = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trophy" class="svg-inline--fa fa-trophy fa-w-18 fa-fw " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z"></path></svg> ' +result.score.toString();
          document.getElementById("score").innerHTML = score_text;
          document.getElementById('btn_flag').setAttribute('idd', result.id);
          document.getElementById('alert-success').style.display= "none";
          document.getElementById('alert-danger').style.display= "none";
          card_list[i].setAttribute('data-bs-toggle','modal');
          card_list[i].setAttribute('data-bs-target','#myModal');
        }
    }
    xhttp.open("GET", "/getchall?id="+id, true);
    xhttp.send();
}



function show_all_cards(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var results = JSON.parse(this.responseText).rows; 
          for (var result of results){
              console.log(result);
              console.log(result.category);
              var html_code = '<div class="text-center mt-5"><h1>'+result.category+'</h1></div><div class="container mt-3"><div class="owl-carousel-'+result.category+' owl-carousel owl-theme"></div></div>';
            $(".div_nav").append(html_code);
            show_cards(result.category);
          }
        }
           
    }
    xhttp.open("GET", "/get_categories", false);
    xhttp.send();
    
}

function show_cards(category){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          results = JSON.parse(this.responseText).rows; 
          for (var result of results){
            var score_text = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trophy" class="svg-inline--fa fa-trophy fa-w-18 fa-fw " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z"></path></svg> ' +result.score.toString();
            var html_code = '<div class="ms-2 me-2 p-4"><div class="card" onclick=show_modal(' + result.id.toString() + ') id=' + result.id.toString() + '><div class="card-body"><h5 class="card-title">'+ result.nome +'</h5><p class="card-text">' + score_text + '</p></div></div></div>'
            $(".owl-carousel-"+category).append(html_code);
          }
        }  
    }
    xhttp.open("GET", "/getchall?category=" + category, false);
    xhttp.send();
    var card_list = document.getElementsByClassName('card');
    for(i=0;i<card_list.length;i++) {
        card_list[i].setAttribute('data-bs-toggle','modal');
        card_list[i].setAttribute('data-bs-target','#myModal');
    }                       
}
 
function check_flag(id){
    var right_flag;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          right_flag = this.responseText;       }
    }
    xhttp.open("GET", "/getFlag?id="+ id, false);
    xhttp.send();
    var flag = document.getElementById('flag_response').value;
    if (flag == right_flag){
        document.getElementById('alert-success').style.display= "block";
        aggiungereUtenteChallenge(id);
        show_done_challenge();
    }
    else{
        document.getElementById('alert-danger').style.display= "block";
    }
    document.getElementById('flag_response').value = '';
}

function aggiungereUtenteChallenge(id){
    var xhttp = new XMLHttpRequest();
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    date += " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {}};
    xhttp.open("POST", "/addUtenteChall?id="+ id + "&timestamp=" + date, false);
    xhttp.send();
    return;
}