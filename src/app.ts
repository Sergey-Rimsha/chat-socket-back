
const express = require('express')

const app = express();

app.get('/', (req: any, res: { send: (arg0: string) => void; }) => {
	res.send('Hello world!');
})

app.listen(7001, () => {
	console.log('The application is listening on port 7001!');
})

export {}