import dataBase from "../database.js";

export async function getCategories(req, res){
    try{
        const categories = await dataBase.collection("categories").find().toArray();
        if(!categories){
            res.sendStatus(404);
            return;
        }

        res.send(categories);
    }
    catch(e){
        res.sendStatus(500);
    }
}

export async function getQuestion(req, res){
    const categ = "JS";
   
    try{
        const questions = await dataBase.collection("questions").find({category: categ});
        if(!questions){
            res.sendStatus(404);
            return;
        }

        res.send(questions);
    }
    catch(e){
        res.sendStatus(500);
        console.log(e);
    }
}