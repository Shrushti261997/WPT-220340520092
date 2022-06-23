
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const mysql =require('mysql2');
const bodyParser = require('body-parser');

let dbparams =
{
	host:'localhost',
	user:'root',
	password:'root',
	database:'item',
	port:3306
};




app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not

const con =mysql.createConnection(dbparams);



var result;

app.post('/poc1', function (req, res) {
	
		console.log("reading input " + req.body.v1 +  "  second " + req.body.v2)
		
    	var xyz ={ v1:37, v2:35};
        res.send(xyz);
    });


// app.get('/poc2', function (req, res) {
    
	
//         console.log("reading input " + req.query.xyz);
		
//     	var xyz ={ v1:37, v2:35};

// 		res.send(xyz);

// 		});

app.get("/displayitems",(req,res) =>{

	con.query('select * from book',[],(error,rows)=>{
		console.log(rows);
		res.send(rows);
	});

});//displayitems


app.get('/insertdata', function (req, res) {
    
	let iteminsert ={itemno: req.query.bookid,itemname: req.query.bookname,itemprice: req.query.bookprice};

	console.log(iteminsert);
	let output=false;
	con.query('insert into book (bookid,bookname,price) values(?,?,?)',[iteminsert.bookid,iteminsert.bookname,iteminsert.itemprice],(error,rows)=>{
		if(error){

		}else if(rows.affectedRows > 0){
			output = true;
		}
		res.send(output);
	});

	});




app.listen(808, function () {
    console.log("server listening at port 808...");
});