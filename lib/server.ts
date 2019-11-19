import app from "./app";
//const PORT = 3000;

app.listen(process.env.PORT, () => {
    console.log('Express server listening on port ' + process.env.PORT);
});