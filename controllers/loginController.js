import dataBase from "../database.js";
import joi from "joi"
import bcrypt from "bcrypt"
import { v4 as uuid } from 'uuid';

export async function postSignUp(req, res) {
  // validate req.body obj
  const authSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required(),
  })
  const validation = authSchema.validate(req.body, { abortEarly: false })
  if (validation.error) {
    return res.status(422).send(validation.error.details.map((e) => e.message))
  }

  delete req.body.confirmPassword

  try {
    // check if email already exists
    const existEmail = await dataBase.collection("users").findOne({ email: req.body.email })
    if (existEmail) {
      return res.sendStatus(409)
    }

    // create new document in collection
    await dataBase.collection("users").insertOne({
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10),
    })

    res.sendStatus(201)
  } catch (e) {
    res.sendStatus(500)
  }
}

export async function postSignIn (req,res) {
  const authSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  })

  const { body } = req;
  try {
    const user = await dataBase.collection('users').findOne({email: body.email});

    const validation = authSchema.validate(req.body, { abortEarly: false })
    if (validation.error) {
      return res.status(422).send(validation.error.details.map((e) => e.message))
    }

    if(bcrypt.compareSync(body.password, user.password)){
      const token = uuid();
      const session = await dataBase.collection('sessions').findOne({'user_id': user._id});
      if(session){
          res.status(200).send({'user_id': session.user_id, 'token': session.token});
          return;
      }else{
          await db.collection("sessions").insertOne({'user_id': user._id, 'token': token});
          res.status(200).send({'user_id': user._id, 'token': token});
          return;
      }
    }
    res.sendStatus(401);
  } catch (e) {
    console.log(e);     
    res.sendStatus(422);   
  }
}