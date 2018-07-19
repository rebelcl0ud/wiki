// search button
document.getElementById('go').addEventListener('click', () => {
	wikiPress();
});
// enter key
document.addEventListener('keydown', (event) => {
	if(event.which == 13 || event.keyCode == 13) {
		wikiPress();
	}
});

function wikiPress() {
	const wikiInput = document.getElementById('input');
	const wikiSearch = wikiInput.value;
	wikiInput.value = '';
	$.ajax({
		url: `https://en.wikipedia.org/w/api.php?action=query&list=search&formatversion=latest&srsearch=${wikiSearch}&srlimit=max&srprop=snippet&format=json`,
		dataType: 'jsonp',
		success: 
		function(data) {
			let search = data.query.search;
			let wikiList = ''; 
			// https://en.wikipedia.org/wiki/[title here]
			search.forEach(function(el) {  
				let {title, snippet} = el;
				wikiList += `
			    <div class='wikiEntry'>
			    <strong>
			      <a href='https://en.wikipedia.org/wiki/${title}'>${title}</a>
			    </strong>
			    <br />
			      ${snippet} [...]
			    <br />
			    </div>
			    <br />`;                 
			}); // end search.forEach
			document.querySelector('.wiki').innerHTML = wikiList;
		} //
	}); // end of AJAX 
} // end of wikiPress()

// next up random button :)
document.getElementById('random').addEventListener('click', () => {
	$.ajax({
		url: 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=random&grnnamespace=0',
		dataType: 'jsonp',
		success: 
		function(data) {
			const randProp = Object.values(data.query.pages);
			const {title: randWikiTitle, extract:randWikiExtract} = randProp[0]; // has title + extract
			const randFull = `
		    <div class='randWikiEntry'>
		    <strong>
		      <a href='https://en.wikipedia.org/wiki/${randWikiTitle}'>${randWikiTitle}</a>
		    </strong>
		    <br /><br />
		      ${randWikiExtract}
		    <br /><br /><br />
		      NOTE: click title link for full wiki page :)
		    <br />
		    </div>
		    <br />`;
			document.querySelector('.wiki').innerHTML = randFull; 
		} // 
	}); // end of rand AJAX
}); // end random button