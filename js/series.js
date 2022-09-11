function Api() {

	//Array de Filmes
	let travelingArray = [];
	travelingArray['series'] = ['Feel Good', 'love 101', 'Lupin','dark', 'Game of Thrones', 'Shadowhunter', 'Dinastia ',
	'Sabrina', 'the alienist', 'Colony', 'O ultimo guardiao', 'Como defender um assassino', 'Como vender drogas online',
	'Outer banks', 'Julie Phantoms', 'Amor e anarquia', 'Teenage Bounty Hunters', 'Contro z', 'Valeria', 'Emily em paris', 
	'Biohacker', 'Elite','Eu nunca', 'Dilema'
	];
	/*-------------------*/

	//forEach
	travelingArray['series'].forEach((dados, id) => {

		let api_key = '285051f71f00ae350c5545488cb30078';
		let url = 'https://api.themoviedb.org/3/search/tv?api_key=' + api_key + '&language=pt-BR&query=' + dados;

		let xmlHttp = new XMLHttpRequest()
		xmlHttp.open('GET', url)

		xmlHttp.onreadystatechange = () => {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {

				/* Recebendo o link em formato de JSON**/
				let date = JSON.parse(xmlHttp.responseText);
				
				let id_movie = date['results'][0]['id'];
				
				/**/

				/* Requisitando mais Infomarções */
				let url_id = 'https://api.themoviedb.org/3/tv/'+id_movie +'?api_key=285051f71f00ae350c5545488cb30078&language=pt-BR'

				let xmlHttp_id = new XMLHttpRequest()
				xmlHttp_id.open('GET', url_id)


				xmlHttp_id.onreadystatechange = () => {
					if (xmlHttp_id.readyState == 4 && xmlHttp_id.status == 200) {
						let date_id = JSON.parse(xmlHttp_id.responseText)
						
						
						let genres = date_id['genres']

						let genres_movie = Array()

						let image = document.createElement('img');
						image.src = 'https://image.tmdb.org/t/p/w300/' + date_id['poster_path']

						/* ///////////////////// */
						let list = document.getElementById('container')

						let movie_div = document.createElement('div')
						movie_div.className = 'movieRow--image'

						let movie_paragraf = document.createElement('div')
						movie_paragraf.className = 'movie_paragraf'

						let a = document.createElement('a')
						a.innerHTML = date['results'][0]['name']
						a.className = 'paragraf'
						a.href = date_id['homepage']
						a.target = '_blank'
						
						let p = document.createElement('p')
						p.id = 'text_genres'

						
						for (let i in genres) {
							genres_movie.push(genres[i]['name'])
							//Adicionando os Generos
							let p_genres = p.innerHTML = genres_movie.join(', ');
						}

						let date_text = date_id['overview'];

						if (date_text.length >= 140) {
							date_text = date_text.substring(0, 140) + ' ...'
						}
						
						let span = document.createElement('span')
						span.innerHTML = '<br>' + date_text;
						span.className = 'span'

						/*////////////////*/

						list.appendChild(movie_div)
						movie_div.appendChild(p)
						p.append(span)
						movie_div.appendChild(movie_paragraf)
						movie_div.append(image)
						movie_paragraf.append(a)
					}
				}
				xmlHttp_id.send();
			}
		}
		xmlHttp.send();
	})

	window.addEventListener('scroll', () => {
		let scroll = window.scrollY
		if(scroll >= 50){
			let header = document.getElementById('header')
			header.className = 'white'
		}else{
			let header = document.getElementById('header')
			header.className = ' '
		}
	})
}

