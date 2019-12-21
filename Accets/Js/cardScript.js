var card ={
};

$("document").ready(function($){
	var nav = $('.header');
  var nav2 = $('.contentContainer');
  var nav3 = $('.upperMenu');
  var nav4 = $('.badge');
	var nav5 = $('.logo');
	var nav6 =$('.fa');
	console.log("hi");
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

  $(".toContacts").on('click',function(e){
	e.preventDefault();
	var top = $('#contactsStart').offset().top;
	$('html, body').animate({scrollTop:top}, 800)
  })

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
	var out = '';
	if(Object.keys(card).length == 0){
		out+='<div class="emptyCard">';
		out+='<p>Корзина пустая</p>';
		out+='</div>';
		$('.cardList').html(out);
	}
	else{
	var sum = 0;
	var goods, goods2, goods3, outgoods;
	$.getJSON('goods2.json',function(data2){
		goods2= data2;	
	});
	$.getJSON('goods3.json',function(data3){
		goods3= data3;	
	});

			$.getJSON('goods.json',function(data1){
				goods = data1;
			for(var id in card){
				if(id<1000){
					outgoods=goods;
				}else if(id>=1000 && id<2000){
					outgoods=goods2;
				}else if(id>=2000 && id<3000){
					outgoods=goods3;
				}
				out+=`<div class ="cardItem">`;
					out+='<div class="itemImgCard">';
					out+=`<img src="Accets/Img/${outgoods[id].img}">`;
					out+='</div>';
					out+='<div class ="ItemAmountInfo">';
					out+='<p>'+outgoods[id].name+'</p>';
					out+='<p>'+card[id]*outgoods[id].cost+' Грн</p>';
					out+='</div>'
					out+='<div class ="ItemButtons">';
					out+=`<button onclick="incrShopCard()" data-id ="${id}" class="add-to-card"><i class="fas fa-plus"></i></button>`;
					out+=`<p>${card[id]}</p>`;
					out+=`<button onclick="decrShopCard()" data-id ="${id}" class ="delete-one-from-card"><i class="fas fa-minus"></i></button>`;
					sum+=card[id]*outgoods[id].cost;
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
		});

	}
}

function confirmOrder(){
	var out = '';
	var order = jQuery('.ConfirmOrder')
	order.detach();
	out+='<div class ="confirmOrderForm">';
	out+='<div class ="formFields">';
	out+='<div class="txtb">';
	out+='<input placeholder="Ваш email" type="email" id="email"></input>'
	out+='<span></span>';
	out+='</div>';
	out+='<div class="txtb">';
	out+='<input placeholder="Фамилия Имя Отчество" id="eFIO"></input>'
	out+='<span></span>';
	out+='</div>';
	out+='<div class="txtb">';
	out+='<input placeholder="Номер телефона" type="phone" id="eNum"></input>'
	out+='<span></span>';
	out+='</div>';
	out+='<div class="txtb">';
	out+='<input placeholder="Ваш город" id="eCity"></input>'
	out+='<span></span>';
	out+='</div>';
	out+='<div  class="txtb">';
	out+='<input placeholder="Ваше отделение Новой Почты" id="ePost"></input>'
	out+='<span></span>';
	out+='</div>';
	out+='<button onclick="sendEmail()" class="ConfirmOrder send-email">Подтвердить заказ</button>';
	out+='</div>';
	out+='</div>';
	$(out).appendTo('.cardList');
}

function sendEmail(){
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