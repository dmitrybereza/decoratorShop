var card ={
};

$("document").ready(function($){
	var nav = $('.header');
  var nav2 = $('.contentContainer');
  var nav3 = $('.upperMenu');
  var nav4 = $('.badge');
	var nav5 = $('.logo');
	console.log("hi");
  var btn = $('#goTopButton');
	$(window).scroll(function () {
		if ($(this).scrollTop() > 15) {
			nav.addClass("headerNew")
      nav2.addClass("contentContainerNew")
      nav3.addClass("upperMenuNew")
      nav4.addClass("badgeNew")
			nav5.addClass("logoNew")
		} else {
			nav.removeClass("headerNew")
      nav.removeClass("contentContainerNew")
      nav3.removeClass("upperMenuNew")
      nav4.removeClass("badgeNew")
			nav5.removeClass("logoNew")
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

function onload(){
	loadCard();
	loadCount();
}

function loadCard(){
	if(localStorage.getItem('card')){
		card = JSON.parse(localStorage.getItem('card'));
		showCard();
	}
	else{
		out='';
			out+='<div class="emptyCard">';
			out+='<p>Корзина пустая</p>';
			out+='</div>';
			$('.cardList').html(out);
	}
}


function showCard()
{
	$.getJSON('goods.json',function(data){
		var out = '';
		if(Object.keys(card).length == 0){
			out+='<div class="emptyCard">';
			out+='<p>Корзина пустая</p>';
			out+='</div>';
			$('.cardList').html(out);
		}
		else{
		var goods = data;
		var sum = 0;
		for(var id in card){
			out+=`<div class ="cardItem">`;
			out+='<div class="itemImgCard">';
			out+=`<img src="Accets/Img/${goods[id].img}">`;
			out+='</div>';
			out+='<div class ="ItemNameCard">';
			out+='</div>';
            out+='<div class ="ItemAmountInfo">';
			out+='<p>'+goods[id].name+'</p>';
			out+='<p>'+card[id]*goods[id].cost+' Грн</p>';
            out+='</div>'
            out+='<div class ="ItemButtons">';
			out+=`<button onclick="incrShopCard()" data-id ="${id}" class="add-to-card"><i class="fas fa-plus"></i></button>`;
			out+=`<p>${card[id]}</p>`;
			out+=`<button onclick="decrShopCard()" data-id ="${id}" class ="delete-one-from-card"><i class="fas fa-minus"></i></button>`;
			sum+=card[id]*goods[id].cost;
			out+=`<button data-id ="${id}" class ="delete-from-card"><i class="fas fa-trash"></i></button>`;
			out+='</div>';
			out+='</div>';
		}
		out+='<div class="sum">';
		out+='<p>Итого: '
		out+='<div class ="sumNum">'
		out+='<p>'+ sum +' ГРН</p>';
		out+='</div>';
		out+='</div>';
        out+='<div>';
        out+='<button onclick="confirmOrder()" class="ConfirmOrder">Оформить заказ</button>';
        out+='</div>';
		$('.cardList').html(out);
		$('.add-to-card').on('click', addToCardFromCard);
		$('.delete-one-from-card').on('click', deleteOneFromCard);
		$('.delete-from-card').on('click', deleteFromCard);
	}
	});
}

function confirmOrder(){
	var out = '';
	var order = jQuery('.ConfirmOrder')
	order.detach();
	out+='<div class ="confirmOrderForm">';
	out+='<div class ="formFields">';
	out+='<input class="txtb" type="email" id="email"></input>'
	out+='<span data-placeholder="Ваш email"></span>';
	out+='<input class="txtb" id="eFIO"></input>'
	out+='<span data-placeholder="Фамилия Имя Отчество"></span>';
	out+='<input class="txtb" type="phone" id="eNum"></input>'
	out+='<span data-placeholder="Номер телефона"></span>';
	out+='<input class="txtb" id="eCity"></input>'
	out+='<span data-placeholder="Ваш город"></span>';
	out+='<input class="txtb" id="ePost"></input>'
	out+='<span data-placeholder="Ваше отделение Новой Почты"></span>';
	out+='<button onclick="sendEmail()" class="ConfirmOrder send-email">Подтвердить заказ</button>';
	out+='</div>';
	out+='</div>';
	$(out).appendTo('.cardList');
}

function sendEmail(){
	console.log('11');
	var email = $('#email').val();
	var eFIO = $('#eFIO').val();
	var eNUM = $('#eNum').val();
	var eCity = $('#eCity').val();
	var ePost = $('#ePost').val();

	if(email != '' && eFIO != '' && eNUM != '' && eCity != '' && ePost != ''){
		$.post(
			"core/mail.php",
			{
				"eFIO" : eFIO,
				"email" : email,
				"eNUM" : eNUM,
				"eCity" : eCity,
				"ePost" : ePost,
				"card" : card
			},
			function(data){
				if(data == 1){
					var win = window.open('index.html','_self');
					win.focus();
					localStorage.clear();
					alert('Заказ принят в обработку, ожидайте звонка!')	
				}
				else{
					alert('Повторите заказ!');
				}
			}
		);
	}
	else{
		alert('Заполните все поля!');
	}
}

function addToCardFromCard(){
	var id =$(this).attr('data-id');
	card[id]++;
	saveCard();
	showCard();
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

function decrShopCard(){
	if(count ==0){}
	else{
		count--;
		localStorage.setItem('counter',count);
		document.getElementById("lblCartCount").textContent = count;
	}
}


function deleteOneFromCard(){
	var id =$(this).attr('data-id');
		card[id]--;
		if(card[id]==0)
		{
			delete card[id];
		}
	saveCard();	
	showCard();
}

function deleteFromCard(){
	var id =$(this).attr('data-id');
	do {
		card[id]--;
        count--;
        localStorage.setItem('counter',count);
		document.getElementById("lblCartCount").textContent = count;
    } while (card[id] != 0);
    delete card[id];
	saveCard();
	showCard();
}