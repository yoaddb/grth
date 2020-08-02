import express from 'express';

import bodyParser = require('body-parser');
import { tempData, temppPrivateData } from './temp-data';

const app = express();

const PORT = 3232;

const PAGE_SIZE = 20;

app.use(bodyParser.json());

app.use((_, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
	next();
});

app.get('/api/tickets', (req, res) => {

	const term = req.query.term || "";
	const filteredTickets = tempData.filter((t) => (t.title.toLowerCase() + t.content.toLowerCase()).includes(term.toLowerCase()));
	
	var delay = 0 + Math.random() * 4000;

	setTimeout(()=>{
		res.send(filteredTickets)
	},delay);
});

app.get('/api/privatetickets', (req, res) => {

	const term = req.query.term || "";
	const filteredTickets = temppPrivateData.filter((t) => (t.title.toLowerCase() + t.content.toLowerCase()).includes(term.toLowerCase()));
	
	var delay = 0 + Math.random() * 4000;

	setTimeout(()=>{
		res.send(filteredTickets)
	},delay);
});
app.listen(PORT);
console.log('server running', PORT)

