var capillary = {
	bookData: null,	
	/**
	 * This function makes calll to the server with given url, type and parameters.
	 * @param {url} url  - The url for the api.
	 * @param {type} type - type of server api call.
	 * @param {params} params - The parameter which will be send with the request.
	 * @param {sCallBack} fucntion - This is success callback it will be called
	 *  once request comes from server.
	 * @param {eCallBack} function - This is error callback it will be called
	 *  when server request fails.
	 */
	serverCall : function(url,type,params,sCallBack,eCallBack){	
		// Hard Coding the api response.
		capillary.bookData = response;
		sCallBack(response);
		return false;
		
		$.ajax({
		   url : url,
		   type : type,
		   data : params,
		   cache: false,
		   success : function(response) {        
			if (sCallBack && typeof(sCallBack) === "function"){				         			
				capillary.bookData = response;
				sCallBack(response);
			}
		   },
		   error : function(response) {
			if (eCallBack && typeof(eCallBack) === "function")
			   eCallBack(response);			
		  }
	   });
	},
	
	/**
	 * This function will be called onload function. This function make 
	 * server api call and get the data
	 */
	loadBooks : function(){
		var data = { type : 'json', query : 'list_books' };	
		capillary.serverCall('https://capillary.0x10.info/api/books','GET',data,function(response){
			capillary.renderItems(response);
		});
	},
	
	/**
	 * This function loads the book in the page.	 
	 * @param {response} object - The server response object.
	 */
	renderItems: function(response){
		$("#book-container").empty();
		for(i = 0; i < response.books.length; i++){				
			var title = response.books[i].name;
			$('#book-container').append('<div class="gd-col" '+
				'title="'+title+'" bookid="'+response.books[i].id+'">'+		       
				'<div class="pu-image">'+
				'<img class="book-img" src="'+response.books[i].image+'"/></div>'+
				'<div><span class="title">'+title+'</span></div>'+
				'<div><span class="author">by '+response.books[i].author+'</span></div>'+
				'<div><b>&#8377; </b>'+response.books[i].price.split(" ")[0]+'</div>'+
				'<div><b>Rating: </b><span class="rating">'+response.books[i].rating+'</span></div>'+
				'</div>');
		}
	},
	
	/**
	 * This function will sort the items based the price/rating.	 
	 * @param {sortVal} string - This will tell the sorting criteria.
	 */
	sortBy: function(sortVal){
		var bookData = capillary.bookData.books;
		var filterList = [];
		var visibleId = [];
		$('.gd-col:visible').filter(function () {
			 visibleId.push($(this).attr('bookid'));
		});		
		
		for(var i in bookData){
			if(visibleId.indexOf(bookData[i].id) != -1)
				filterList.push(bookData[i]);
		}
		bookData = filterList;
		
		if(sortVal == "price"){
			bookData.sort(function(a, b){
				var aPrice = a.price.split(" ")[0].trim();
				var bPrice = b.price.split(" ")[0].trim();
				if(aPrice == bPrice){ 
					return 0; 
				}else if (aPrice < bPrice){
		            return -1;
		        }else{		             
		        	return 1;
		        }
			});
		}else if (sortVal == "rating"){
			bookData.sort(function(a, b){			
				if(a.rating== b.rating){ 
					return 0; 
				}else if (a.rating > b.rating){
		            return -1;
		        }else{		             
		        	return 1;
		        }
			});
		}
		var data = { books : bookData }
		capillary.renderItems(data);
	},
	
	/**
	 * This function will search the item from the list of book.	 
	 */
	searchBy: function(){				
		$('.gd-col').hide().filter(function () {
			var input = $('.search-input').val().toLowerCase();
			var searchBy = $('#searchby').val();			
			if($(this).find('.'+searchBy).text().toLowerCase().indexOf(input) != -1){			
				$(this).show();	
			}
	  });		
	},
	
	/**
	 * This function will show the book details after selecting the book.
	 * server api call and get the data
	 */
	showBookDeatails: function(id){		
		var details = "";
		var description = "Description: ";
		for(var i in capillary.bookData.books){
			if(id == capillary.bookData.books[i].id){
				details = "Binding:" +capillary.bookData.books[i].details.Binding+			
						" ISBN: " +capillary.bookData.books[i].details.ISBN+
		              " Publisher: " +capillary.bookData.books[i].details.Publisher;
				description = capillary.bookData.books[i].description;
				break;
			}
		}
		$("#details").text("").text(details);
		$("#description").text("").text(description);
	}
}

$(function(){
	capillary.loadBooks();
});

$("#sortby").on('change',function () {  	
  	var sortVal = $('#sortby').val();
	capillary.sortBy(sortVal);	
});

$('.search-input').keyup(function(e){
	if($(this).val() == ""){
		capillary.renderItems(capillary.bookData);
	}else{
		capillary.searchBy();
	}
});

$("#book-container").on('click','.gd-col',function(e){		
	capillary.showBookDeatails($(this).attr('bookid'));	
});



var response = {"books":[{"id":"1","name":"Manorama Yearbook 2015 (English) 50th Edition","image":"http:\/\/hackerearth.0x10.info\/api\/img?img=http:\/\/img6a.flixcart.com\/image\/book\/8\/0\/3\/manorama-yearbook-2015-400x400-imaeyy4ugkqfhwhf.jpeg","author":"Mammen Mathew","price":"188 \u20b9","rating":"5","details":{"Publisher":"Malayala Manorama Co. Ltd","ISBN":"9770542577803","Binding":"Paperback"},"description":"Manorama Yearbook is celebrating its 50thyear of publication. The largest-selling General Knowledge Compendium is one of the most comprehensive books used by students, teachers, researchers, media persons, planners, lay-people alike, covers a wide-spectrum of topics from Science, Medicine, Environment, IT, Literature, Entertainment, History, Geography, Polity, Ethics, Social Justice, International Relations, Current Affairs and Sports."},{"id":"2","name":"Quantitative Aptitude For Competitive Examinations 19th Edition","image":"http:\/\/hackerearth.0x10.info\/api\/img?img=http:\/\/img2.smartprix.com\/books\/q2\/2l\/3gwln\/s.jpg","author":"R S Aggarwal","price":"342 \u20b9","rating":"4","details":{"Publisher":"S.Chand Publishing","ISBN":"8121924987","Binding":"Paperback"},"description":"Quantitative Aptitude is a book that's popular among every student who's registered for competitive exams or job interviews. It remains a bestseller till date, mainly because of its comprehensive nature. "},{"id":"3","name":"Steve Jobs: The Exclusive Biography","image":"http:\/\/hackerearth.0x10.info\/api\/img?img=http:\/\/management.ind.in\/img\/b\/SBI-Bank-Quantitative-Aptitude-books-2.jpeg","author":"Walter Isaacson","price":"719 \u20b9","rating":"5","details":{"Publisher":"Little, Brown","ISBN":"9781408703748","Binding":"Hardcover"},"description":"'Steve Jobs: The Exclusive Biography' was one of the most eagerly awaited books of the year 2011. The book is a journey into the life of a legend who revolutionized the way people saw technology. Walter Issacson brings to life, the innovator, the dreamer and the devil within Steve Jobs. An absolutely must read! \r\n"},{"id":"4","name":"Transcendence","image":"http:\/\/hackerearth.0x10.info\/api\/img?img=http:\/\/ecx.images-amazon.com\/images\/I\/5122ukK8z2L._SX311_BO1,204,203,200_.jpg","author":"Dr. A P J Abdul Kalam, Arun Tiwari","price":"435 \u20b9","rating":"5","details":{"Publisher":"HarperCollins","ISBN":"9351774058","Binding":"Paperback"},"description":"Transcendence is published by Harper Publication in 2015. The author of this book is A P J Abdul Kalam and Arun Tiwari. The Author Dr Kalam and Arun Tiwari map a journey of self realization reflected in the eyes of Pramukh Swamiji painting a delightful fusion of spirituality. \n"},{"id":"5","name":"The Immortals of Meluha","image":"http:\/\/hackerearth.0x10.info\/api\/img?img=http:\/\/www.exoticindia.com\/books\/nac216.jpg","author":"Amish","price":"119 \u20b9","rating":"4.2","details":{"Publisher":"Westland","ISBN":"9789380658742","Binding":"Paperback"},"description":"Shiva, one of the chief Hindu deities, is portrayed in an entirely different light in Amish Tripathi's debut novel, The Immortals of Meluha. The first book of The Shiva Trilogy, The Immortals of Meluha charts Shiva's journey from the mountains with his Tibetan tribesmen to the kingdom of Meluha, which is occupied by the Suryavanshis, a race of people who are descendants of Lord Ram and live along the banks of the River Saraswati."},{"id":"6","name":"The Monk Who Sold His Ferrari 1st Editiona","image":"http:\/\/hackerearth.0x10.info\/api\/img?img=http:\/\/ecx.images-amazon.com\/images\/I\/51j3ISgpR6L._SX319_BO1,204,203,200_.jpg","author":"Robin Sharma","price":"99 \u20b9","rating":"4.3","details":{"Publisher":"Jaico Publishing House","ISBN":"9788179921623","Binding":"Paperback"},"description":"The Monk Who Sold His Ferrari is an interesting book, which is penned down by Robin Sharma. The book makes you delve deeper into yourself and think about your life from a different perspective. It educates you about how your daily habits can help you reach your dreams."},{"id":"7","name":"Wings of Fire: An Autobiography 1st Edition","image":"http:\/\/hackerearth.0x10.info\/api\/img?img=http:\/\/imshopping.rediff.com\/imgchkbooks\/400-400\/books\/pixs\/66\/9788173711466.jpg","author":"Apj Abdul Kalam, Arun Tiwari","price":"162 \u20b9","rating":"4.8","details":{"Publisher":"Universities Press","ISBN":"9788173711466","Binding":"Paperback"},"description":"Wings of Fire traces the life and times of India\u2019s former president APJ Abdul Kalam. It gives a glimpse of his childhood as well as his growth as India\u2019s missile man."},{"id":"8","name":"Angel of the Dark","image":"http:\/\/hackerearth.0x10.info\/api\/img?img=http:\/\/covers.booktopia.com.au\/big\/9780007442829\/sidney-sheldon-s-angel-of-the-dark.jpg","author":"Sidney Sheldon, Tilly Bagshawe","price":"210 \u20b9","rating":"3.4","details":{"Publisher":"HarperCollins Publishers","ISBN":"9780007490622","Binding":"Paperback"},"description":"The master storyteller\u2019s legacy continues.\r\nAn elusive and shadowy killer is on the prowl, codenamed the Angel of Death.\r\nWhen an elderly multimillionaire is found brutally murdered in Hollywood, and his young wife raped and beaten, the police assume the motive is robbery. Unable to find the perpetrators, the case is eventually closed."},{"id":"9","name":"The Perks of Being a Wallflower","image":"http:\/\/hackerearth.0x10.info\/api\/img?img=https:\/\/upload.wikimedia.org\/wikipedia\/en\/0\/0b\/The_Perks_of_Being_a_Wallflower_Poster.jpg","author":"Stephen Chbosky","price":"179 \u20b9","rating":"4.4","details":{"Publisher":"MTV Books","ISBN":"9781451696196","Binding":"Paperback"},"description":"A powerful and perceptive coming-of-age story, in the tradition of The Catcher in the Rye, from a talented young filmmaker, screenwriter and novelist. \r\n"},{"id":"10","name":"Rich Dad Poor Dad","image":"http:\/\/hackerearth.0x10.info\/api\/img?img=http:\/\/ecx.images-amazon.com\/images\/I\/61-a%2BUFo9iL._SL1164_.jpg","author":"Robert T Kiyosaki","price":"189 \u20b9","rating":"4.7","details":{"Publisher":"Plata Publishing","ISBN":"9781612680019","Binding":"Paperback"},"description":"In Rich Dad Poor Dad, Robert Kiyosaki goes back to his childhood in Hawaii to explain his philosophy on wealth creation and being successful. The book is written in a very conversational manner and most of the snippets are based on the author\u2019s budding years and his experiences regarding money management."},{"id":"11","name":"Jugaad Innovation: A Frugal and Flexible Approach to Innovation For The 21st Century","image":"http:\/\/hackerearth.0x10.info\/api\/img?img=http:\/\/d.gr-assets.com\/books\/1370774652l\/18040673.jpg","author":"Jaideep Prabhu, Navi Radjou, Simone Ahuja","price":"394 \u20b9","rating":"4.2","details":{"Publisher":"Random House India","ISBN":"9788184002058","Binding":"Hardcover"},"description":"Jugaad is a word often heard in general conversation in India. Whether to find ingenious solutions to problems or turn adversity into opportunity Indians swear by it. In this seminal book, Navi Radjou, Jaideep Prabhu, and Simone Ahuja challenge the very way a traditional organization thinks and acts"},{"id":"12","name":"The Good, The Bad and The Ridiculous","image":"http:\/\/hackerearth.0x10.info\/api\/img?img=http:\/\/ecx.images-amazon.com\/images\/I\/51qF%2B7yfDdL._SX323_BO1,204,203,200_.jpg","author":"Humra Quraishi, Khushwant Singh","price":"299 \u20b9","rating":"5","details":{"Publisher":"Rupa Publications","ISBN":"9788129124432","Binding":"Paperback"},"description":"In the course of almost a century of living, Khushwant Singh has been witness to the making of more public and private histories than most of us have read about. He has encountered, and frequently crossed swords with, many of the men and women who have been central to these historiesand he has written about them with glorious candour. "},{"id":"13","name":"The Good Book","image":"http:\/\/hackerearth.0x10.info\/api\/img?img=http:\/\/ecx.images-amazon.com\/images\/I\/41z2Kmjf%2BdL._SX332_BO1,204,203,200_.jpg","author":"A C Grayling","price":"127 \u20b9","rating":"4.9","details":{"Publisher":"Bloomsbury","ISBN":"9780747599609","Binding":"Hardcover"},"description":"Drawing on the wisdom of 2,500 years of contemplative non-religious writing on all that it means to be human \u2013 from the origins of the universe to small matters of courtesy and kindness in everyday life \u2013 A. C. Grayling, Britain's most popular and widely read philosopher, has created a secular bible."}]}