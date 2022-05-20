import dataBase from "../database.js";

export async function getCategories(req, res){
    try{
        const products = await dataBase.collection("categories").find().toArray();
        if(!products){
            res.sendStatus(404);
            return;
        }

        res.send(products);
    }
    catch(e){
        res.sendStatus(500);
    }
}

export async function getQuestion(req, res){
    // Converting ID to be recognized by collection
    const categ = "JS"
   
    try{
        const questions = await dataBase.collection("questions").find({category: categ});
        if(!card){
            res.sendStatus(404);
            return;
        }

        res.send(questions);
    }
    catch(e){
        res.sendStatus(500);
    }
}