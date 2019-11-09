var card ={
};

function onload(){
	init();
	loadCard();
	loadCount();
}

function openInNewTab(url){
	var win = window.open(url,'_self');
	win.focus();
}

$("document").ready(function($){
	var nav = $('.header');
  var nav2 = $('.contentContainer');
  var nav3 = $('.upperMenu');
  var nav4 = $('.badge');
	var nav5 = $('.logo');
	var nav6 =$('.fa');
  var btn = $('#goTopButton');
	$(window).scroll(function () {
		if ($(this).scrollTop() > 15) {
			nav.addClass("headerNew")
      nav2.addClass("contentContainerNew")
      nav3.addClass("upperMenuNew")
      nav4.addClass("badgeNew")
			nav5.addClass("logoNew")
			nav6.addClass("faNew");
		} else {
			nav.removeClass("headerNew")
      nav.removeClass("contentContainerNew")
      nav3.removeClass("upperMenuNew")
      nav4.removeClass("badgeNew")
			nav5.removeClass("logoNew")
			nav6.removeClass("faNew");
		}
    if($(this).scrollTop() > 100){
          $('#goTopButton').fadeIn();
    } else {
        $('#goTopButton').fadeOut();
    }
	});
  btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, 800)
  });

});


function init() {
$.getJSON("goods.json", shopMenu);
}

function shopMenu(data){
  console.log("hi");
  var out='';
  for (var key in data) {
		out+=' <div class="itemShop">';
		out+='<div class="itemName"><p>' + data[key].name + '</p></div>';
		out+='<div class="itemImj">';
		out+='<img src="Accets/Img/' + data[key].img + '" alt="" class="shopImg">';
		out+='</div>';
		out+='<div class="itemDesc">';
		out+='<p>'+ data[key].description +'</p><div class="objom">';
		out+='<p>'+data[key].value +'</p></div>';
		out+='</div>';
		out+='<div class="itemInfo">';
		out+='<div class="itemPrice">'+data[key].cost +' Грн</div>';
		out+=`<button onclick="incrShopCard()" data-id ="${key}" class="add-to-card"type="button" name="button">В корзину</button>`;
		out+='</div>';
		out+='</div>';
  }
  document.getElementsByClassName("shopMenu")[0].innerHTML=out;
	$('.add-to-card').on('click', addToCard);

}

function addToCard(){
	var id =$(this).attr('data-id');
	if(card[id] == undefined){
		card[id] = 1;
	}
	else {
		card[id]++;
	}
	saveCard();
}


function loadCard(){
	if(localStorage.getItem('card')){
		card = JSON.parse(localStorage.getItem('card'));
	}
	else{
		$('.cardList').html('Корзина пуста!')
	}
}

function saveCard(){
	localStorage.setItem('card',JSON.stringify(card));
}

function loadCount(){
	if(localStorage.getItem('counter')){
		count = localStorage.getItem('counter');
		document.getElementById("lblCartCount").textContent = count;
	}
	else {
		document.getElementById("lblCartCount").textContent = 0;
	}
}
var count = 0;
function incrShopCard(){
	count++;
	localStorage.setItem('counter',count);
	document.getElementById("lblCartCount").textContent = count;
}

