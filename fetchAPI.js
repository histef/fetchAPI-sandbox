// From Traversy media's fetch API intro video

document.getElementById('getUsers').addEventListener('click', getUser);

function getUser(){
	fetch('https://jsonplaceholder.typicode.com/users'/*, {credentials: 'same-origin'}*/)
	.then(checkStatus)
	.then(response => response.json() ) //converts response to JS object & returns another promise, cuz it has to wait for body to load, so..
	.then(data => {  //here, we finally show our data
		//innerHTML needs a string (primitive type) not a js object (data structure, so have to stringify it
		console.log(data);
		let dataString0 = JSON.stringify(data[0]);
		let dataString1 = JSON.stringify(data[1].name);
		let mapData = data.map( user => `<li class='list-group-item' style='padding-left: 0'>`+ JSON.stringify(user.name) + `</li>`)

		document.getElementById('output').innerHTML =
			`<h2>All data from first user</h2>
				<p>${dataString0}</p>
			<h2>Just the name from second user</h2>
		 		<p>name: ${dataString1}</p>
		 	<h2>All names from data</h2>
		 		<ul class='list group list-group-flush' style='padding: 0'>
		 			${mapData.join('')}
		 		</ul>`
		}) //.join gets rid of trailing commas
	.catch(error=>console.log("there's an error", error)) // w/o checkStatus fn, will ONLY fire if it's a network error(ie. address couldn't be resolved, server is unreachable, CORS not permitted). allows server error responses (ie. 404-treats as success)
}

//if you want to catch 404 errors you have to first resolve the response promise (which it does automatically) and then reject the fetch promise (which you're doing below). See: https://stackoverflow.com/questions/32721850/why-is-the-response-object-from-javascript-fetch-api-a-promise
function checkStatus(response){
	if(response.ok){ //response object prop that will be true if we get response
		return response;
	}
	let error = new Error(response.statusText);
	error.response = response;
	return Promise.reject(error);
}


document.getElementById('getPost').addEventListener('click', getPost);

function getPost(){
	fetch('https://jsonplaceholder.typicode.com/posts')
	.then(checkStatus)
	.then(response => response.json() ) //converts response to JS object & returns another promise, cuz it has to wait for body to load, so..
	.then(data => { //here, we finally show our data
		let heading = `<h2>Posts</h2>`;
		data.forEach( post => {
			heading +=
				`<div class="card card-body mb-3">
					<h3>${post.title}</h3>
					<p>${post.body}</p>
				</div>`
		})
		document.getElementById('output').innerHTML = heading;
	})
	.catch(error=>console.log("there's an error", error))
}



//standard post request using fetch
document.getElementById('addPost').addEventListener('submit', addPost)

function addPost(e){ //since it's a form, add event parameter
	e.preventDefault() //stops event from adding to a file--cuz this is a demo??

	let title = document.getElementById('title').value;
	let body = document.getElementById('body').value;

	fetch('https://jsonplaceholder.typicode.com/posts',
		{method: 'POST',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-type': 'application/json'
		},
		body: JSON.stringify({title, body})
	})
	.then( res => res.json() )
	.then( data => {
		dataToString = JSON.stringify(data)  //have to convert first than send it to innerHTML
		document.getElementById('output').innerHTML =
		`<h2>Post information submitted</h2>
			<p>${dataToString}</p>`;
	})
		.catch(error=>console.log("there's an error", error))
}