const app= require('./app');

const port = 5500;


app.listen(port, () => {

    console.log(`Server running at http://localhost:${port} $ port was ${port}`);

});