function Api() {
	
	//Array de Filmes
		let travelingArray = [];
		travelingArray['filmes'] = ['dia do sim', 'Eli', 'o quarto de jack', 'Como falar com garotas em festas', 'Dude a vida é assim',
			'Recepcionista', 'Spf-18', 'Ava', 'Divergent', 'Golpe Duplo', 'Dançarina imperfeita', '365 dni',
			'Allegiant', 'The hunger games Catching fire', 'Snipe Americano', 'Zack Snyders Justice League', 'Raising the bar', 'A Série Divergente: Insurgente',
			'Socorro virei uma garota', 'Enola Holmes', 'Mentiras Perigosas', 'Geostorm ', 'Hasta el cielo','Código 8', 'O resgate do soldado Ryan', 
			'Amor garantido','Na balada do amor', 'Project Power', 'Meninas Malvadas 2', 'Meninas Malvadas', 'Extraction', 'Jak zostać gwiazdą','Crush a Altura',
			'Se enlouquecer não se apaixone', 'Amor.com', 'A sentinela', 'Doce argumento', 'Spider-Man: No Way Home', 'Spider-Man: Homecoming', 'Apostador',
			'Parker', 'O vendedor de Sonhos', 'The Duff', 'Ricos de amor', 'Um brinde ao natal', 'Amor em Obras', 'A Banca dos Beijos', 'A Banca dos Beijos 2', 
			'The Kissing Booth 3', 'O diabo de cada dia', 'Whindersson Nunes', 'Loucura de Amor', 'Break o poder da dança', 'A babá rainha da morte', '7. Koğuştaki Mucize',
			'Por lugares incriveis', 'lets Dance', 'The Cave', 'The f**k it list', 'Eu me importo', 'Deixe a neve cair', 'Voce nem imagina', 'A semana da minha vida',
			'Procura-se um pai', 'The Princess Switch', 'A Princesa e a Plebeia: Nova Aventura', 'Miss Meadows', 'Para todos os garotos Agora e para sempre', 'Jogos Vorazes: A Esperança – Parte 1',
			'Jogos Vorazes: A Esperança - O Final', 'The Hunger Games: Em Chamas', 'The Hunger Games: Os Jogos da Fome', 'Alergica a Wifi', 'Quase uma Rockstar', 'Truque de mestre 2',
			'Mestres da Ilusão', 'Battleship', 'Todos os meus amigos estão mortos', 'Amar', 'Saving Zoë', 'Reality high', 'Em ritmo de fuga', 'Fractured', '6 Underground',
			'Ta chovendo hamburguer', 'Isi e Ossi', 'Nosso ultimo verão', 'Quase 18', 'Keylor Navas', 'It a coisa', 'Jadotville', 'Bronx', 'As vantagens de ser invisivel', 'Lucy', 'To All the Boys Ive Loved Before',
			'Irreplaceable You', 'O Halloween do Hubie', 'Amizade colorida', 'Amor com data marcada', 'WWZ: Guerra Mundial', 'O date Perfeito', 'O procurado', 'Shooter', 'love.com', 'O ÚLTIMO VIRGEM',
			'Into the Beat', 'Instant Family', 'Juntos ao Luar', 'Endless Love', 'Garota mimada', 'Army of the Dead', 'Moxie', 'Contato Visceral', 'The Informer', 'Black Mirror', 'Upgrade', 'A 5ª Onda',
			'Mortal engines', 'the old guard', 'What lies below', 'The invisible man', 'Whindersson Nunes - É de Mim Mesmo', 'velozes e furiosos'
	];/* Fuja - filme, Selvagens, Vizinhos, A babá, Cam, O Agente da U.N.C.L.E.,Batalhas, Daybreak, heroes*/
	/*-------------------*/ 

	//forEach
	travelingArray['filmes'].forEach((dados, id) => {

	let api_key = '285051f71f00ae350c5545488cb30078';
	let url = 'https://api.themoviedb.org/3/search/movie?api_key='+api_key+'&language=pt-BR&query='+dados;
	/*https://api.themoviedb.org/3/search/movie?api_key=285051f71f00ae350c5545488cb30078&language=pt-BR&query= */

	let xmlHttp = new XMLHttpRequest()
	xmlHttp.open('GET', url)

	xmlHttp.onreadystatechange = () => {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {

			/* Recebendo o link em formato de JSON**/
				let date = JSON.parse(xmlHttp.responseText);
				let id_movie = date['results'][0]['id']
			/**/

			/* Requisitando mais Infomarções */
			let url_id = 'https://api.themoviedb.org/3/movie/'+id_movie+'?api_key=285051f71f00ae350c5545488cb30078'
			
			let xmlHttp_id = new XMLHttpRequest()
			xmlHttp_id.open('GET', url_id)

			
			xmlHttp_id.onreadystatechange = () => {
				if (xmlHttp_id.readyState == 4 && xmlHttp_id.status == 200) {
					let date_id = JSON.parse(xmlHttp_id.responseText)
	
					console.log(id_movie)

					let genres = date_id['genres']
					
					let genres_movie = Array()
					
					let image = document.createElement('img');
					image.src = 'https://image.tmdb.org/t/p/w300/'+date_id['poster_path']
				
					/* ///////////////////// */
					
					let list = document.getElementById('container')

					let movie_div = document.createElement('div')
					movie_div.className = 'movieRow--image'
					movie_div.id = 'content'

					let movie_paragraf = document.createElement('div')
					movie_paragraf.className = 'movie_paragraf'

					let a = document.createElement('a')
					a.innerHTML = date['results'][0]['title']
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

					if (date_text.length >= 130) {
						date_text = date_text.substring(0, 120) + ' ...'
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