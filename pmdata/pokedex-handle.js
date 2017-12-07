var fs=require('fs');
var BasePath = 'pokedex/'
var NewPath = 'pokedex-new/'
var FinalPath = 'pokedex-final/'
var files;
StartMoves();

function Start(){
    //处理多形态节点，生成新的json文件
    fs.readdir(BasePath, 
        function(err, files){
            //console.log(files);
            for(var file in files){
                var filepath = BasePath + files[file];
                var pokedexObj=JSON.parse(fs.readFileSync(filepath));
                handlePokedexFormeData(pokedexObj);
                var newfilepath = NewPath + files[file];
                fs.writeFileSync(newfilepath, JSON.stringify(pokedexObj));
            }
        }
    );

    console.log('completed');
}


function StartMoves(){
    //处理招式节点，生成新json
    fs.readdir(NewPath, 
        function(err, files){
            //console.log(files);
            for(var file in files){
                var filepath = NewPath + files[file];
                var pokedexObj=JSON.parse(fs.readFileSync(filepath));
                handlePokedexObj(pokedexObj);
                var newfilepath = FinalPath + files[file];
                fs.writeFileSync(newfilepath, JSON.stringify(pokedexObj));
            }
        }
    );

    console.log('completed');
}

function handlePokedexObj (pokedexobj) {
    //删除进化链节点
    // if (pokedexobj.hasOwnProperty('evolve_chain')){
    //    delete pokedexobj['evolve_chain']
    // }
    //删除无用邻居节点
    if (pokedexobj.hasOwnProperty('neighbours')){
       delete pokedexobj['neighbours']
    }
    //处理招式节点
    if(pokedexobj.hasOwnProperty('moves')){
        for(var genitem in pokedexobj['moves']){
            for(var typeitem in pokedexobj['moves'][genitem]){
                for(var moveitem in pokedexobj['moves'][genitem][typeitem]){
                    if(pokedexobj['moves'][genitem][typeitem][moveitem].hasOwnProperty('from')){
                        var fromlist = new Array();
                        for(var fromitem in pokedexobj['moves'][genitem][typeitem][moveitem]['from']){                       
                            fromlist.push(+fromitem);
                        }
                        pokedexobj['moves'][genitem][typeitem][moveitem]['from'] = fromlist;
                    }
                }
                //处理招式类型节点
                var temptypekey = 'type' + typeitem;
                pokedexobj['moves'][genitem][temptypekey] = pokedexobj['moves'][genitem][typeitem];
                delete pokedexobj['moves'][genitem][typeitem];
            }
            //处理各世代招式节点
            var tempgenkey = 'gen'+genitem;
            pokedexobj['moves'][tempgenkey] = pokedexobj['moves'][genitem];
            delete pokedexobj['moves'][genitem];
        }

    }
}

function handlePokedexFormeData(pokedexobj){

    if(pokedexobj.hasOwnProperty('forme')){
        if(pokedexobj['forme'].length > 0){
            for(var index = 0; index < pokedexobj['forme'].length; index++){
                var newfilepath = NewPath +  'pokemon-'+ pokedexobj['forme'][index]['nat_id'] +'.json';
                fs.writeFileSync(newfilepath, JSON.stringify(pokedexobj['forme'][index]));
            }
        }
        delete pokedexobj['forme'];
    }

}