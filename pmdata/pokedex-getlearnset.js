/*
type1 - 
*/

var fs = require('fs');
var BasePath = 'pokedex/'
var NewPath = 'pokedex-new/'
var FinalPath = 'pokedex-final/'
var files;

var errorpm = new Array();

const mysql = require('mysql');

const conn = mysql.createConnection({
    host: '47.104.10.148',
    user: 'root',
    password: '123456',
    database: 'pokemon'
});
let count = 0;
let movecount = 0;
conn.connect();

const addMoveSql = "insert into LearnSet values ?";

StartMoves();


function StartMoves() {
    //处理招式节点，生成新json
    fs.readdir(FinalPath,
        function (err, files) {
            //console.log(files);
            for (var file in files) {
                var filepath = FinalPath + files[file];
                var pokedexObj = JSON.parse(fs.readFileSync(filepath));
                handlePokedexObj(pokedexObj);
                //var newfilepath = FinalPath + files[file];
                //fs.writeFileSync(newfilepath, JSON.stringify(pokedexObj));

                //console.log(insertobjs.length);

            }
        }
    );


}



function handlePokedexObj(pokedexobj) {
    console.log("开始处理PM:" + pokedexobj['nat_id'] + '  ' + pokedexobj['name_zh'])
    //处理招式节点
    var insertobjs = new Array();
    if (pokedexobj.hasOwnProperty('moves')) {
        for (var genitem in pokedexobj['moves']) {
            for (var typeitem in pokedexobj['moves'][genitem]) {
                for (var moveitem in pokedexobj['moves'][genitem][typeitem]) {
                    var insertobj = new Array();
                    insertobj.push(String(pokedexobj['nat_id']));
                    insertobj.push(genitem);
                    insertobj.push(typeitem.substring(4));
                    insertobj.push(pokedexobj['moves'][genitem][typeitem][moveitem]['move_id']);

                    if (pokedexobj['moves'][genitem][typeitem][moveitem].hasOwnProperty('from')) {

                        var fromlist = pokedexobj['moves'][genitem][typeitem][moveitem]['from'];
                        var fromstr = fromlist.join('|');
                        insertobj.push(fromstr);
                    }
                    else {
                        insertobj.push('');
                    }
                    if (pokedexobj['moves'][genitem][typeitem][moveitem].hasOwnProperty('learn_level')) {
                        insertobj.push(String(pokedexobj['moves'][genitem][typeitem][moveitem]['learn_level']));
                    }
                    else {
                        insertobj.push('');
                    }

                    insertobjs.push(insertobj);

                }
                //处理招式类型节点
                //var temptypekey = 'type' + typeitem;
                //pokedexobj['moves'][genitem][temptypekey] = pokedexobj['moves'][genitem][typeitem];
                //delete pokedexobj['moves'][genitem][typeitem];
            }
            //处理各世代招式节点
            // var tempgenkey = 'gen'+genitem;
            // pokedexobj['moves'][tempgenkey] = pokedexobj['moves'][genitem];
            // delete pokedexobj['moves'][genitem];
        }
        movecount += insertobjs.length;
        console.log(insertobjs.length, movecount);
        conn.query(addMoveSql, [insertobjs], (err, result) => {
            count++;
            if (err) {
                console.log(err);
                console.log(insertobjs);
                return;
            } else {
                console.log(count);
            }
        });
    }
}
