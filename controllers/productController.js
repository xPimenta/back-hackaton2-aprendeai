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
    const categ = (req.params.categ);
   
    try{
        const questions = await dataBase.collection("questions").find({category: categ}).toArray();
        if(!questions){
            res.sendStatus(404);
            return;
        }

        questions.forEach(question => {
            delete question.correctAnswer;
        });
        
        res.send(questions);
    }
    catch(e){
        res.sendStatus(500);
        console.log(e);
    }
}

export async function postAnswer(req, res){
    const { answer } = req.body;
   
    try{
        const correctAnswer = await dataBase.collection("questions").findOne({question: answer.question}).toArray();
        const isCorrect = correctAnswer.correctAnswer === answer.answer;
        if(!isCorrect){
            res.send({isCorrect: false});
            return;
        }
        
        res.send({isCorrect: true});
    }
    catch(e){
        res.sendStatus(500);
        console.log(e);
    }
}

