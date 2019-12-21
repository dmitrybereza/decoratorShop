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
	$('#goTopButton').on('click', function(e) {
	e.preventDefault()
    $('html, body').animate({scrollTop:0}, 800)
  });

  $(".arrowDown").on('click',function(e){
	e.preventDefault();
	var top = $('#startmenu').offset().top;
	top -= 50;
	$('html, body').animate({scrollTop:top}, 800)
  })

  $(".toContacts").on('click',function(e){
	e.preventDefault();
	var top = $('#contactsStart').offset().top;
	$('html, body').animate({scrollTop:top}, 800)
  })

});

var startIndex;
var endIndex;

function init() {
	var type = localStorage.getItem('type')
	if(type =='decPlaster'){
		startIndex=0;
		endIndex=1000;
		$.getJSON("goods.json", shopMenu);
		
	}
	else if (type == 'varnish') {
		startIndex=1000;
		endIndex=2000;
		$.getJSON("goods2.json", shopMenu);
		
	} 
	else if(type == 'paint'){
		startIndex=2000;
		endIndex=3000;
		$.getJSON("goods3.json", shopMenu);
		
	}
}

function shopMenu(data){
	var temp = data;
  var out='';
  console.log(temp)
  for (let i = startIndex; i < endIndex; i++) {
	  key = i
	  if(i<1000){
		  var key="000"+i;
		}
	if(temp[key] == undefined){
		continue;
	}
	out+=' <div class="itemShop">';
	out+='<div class="itemName"><p>' + temp[key].name + '</p></div>';
	out+='<div class="itemImj">';
	out+='<img src="Accets/Img/' + temp[key].img + '" alt="" class="shopImg">';
	out+='<div class="itemDesc">';
	out+='<p>'+ temp[key].description +'</p><div class="objom">';
	out+='<p>'+temp[key].value +'</p></div>';
	out+='</div>';
	out+='</div>';
	out+='<div class="itemInfo">';
	out+='<div class="itemPrice">'+temp[key].cost +' Грн</div>';
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

var typeSelected;
function decPlasterClick(){
	typeSelected = "decPlaster"
	localStorage.setItem('type',typeSelected);
}


function varnishClick(){
	typeSelected = "varnish"
	localStorage.setItem('type',typeSelected);
}


function  paintClick(){
	typeSelected = "paint"
	localStorage.setItem('type',typeSelected);
}