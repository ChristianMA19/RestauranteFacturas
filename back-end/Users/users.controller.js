import Users from "./users.model.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const llave = process.env.SECRET_KEY;


export async function createUser(req, res) {
  try {
    const user = req.body;
    const hashedPassword = await argon2.hash(user.password);
    user.password = hashedPassword; // Password encrypted
    user.isDisable = "false";
    //console.log(user);   // How it looks like before saving
    if(user){
      const document = await Users.create(user);
      res.status(201).json(document);
    }else{
      res.status(500).json("Error al crear usuario");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
}

export async function login(req, res) {
  try {
    const { email, pass } = req.query;
    const usuario = await Users.findOne({ email: email, isDisable: false });

    if (usuario && (await argon2.verify(usuario.password, pass))) {
      const token = jwt.sign(
      { IdUsuario: usuario._id, mode: usuario.mode },llave,{ expiresIn: '2h' });
      res.status(200).json({token,redirectTo: 'segundo.html'});     
      
    }else{  
      if(usuario){
        res.status(401).json("Contraseña incorrecta");
      }else{
        res.status(404).json("Usuario no encontrado"); 
      }
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
}


export async function patchUser(req, res) {
  try {
    //const id = req.params.id;
    // const token = req.headers.authorization;
    // console.log(token);
    // let decoded;
    // try {
    //   decoded = jwt.verify(token, llave);
    // } catch (err) {
    //   res.status(401).json("Token invalido");
    // }

    // const user = await Users.findById(decoded.IdUsuario);
    // if (!user) {
    //   return res.status(404).json({ message: "Usuario no encontrado" });
    // }
  } catch (err) {
    res.status(500).json(err.message);
  }
}

export async function deleteUser(req, res) {
  try {
    //const id = req.params.id;
    // const token = req.headers.authorization;
    // console.log(token);
    // let decoded;
    // try {
    //   decoded = jwt.verify(token, llave);
    //   console.log(decoded);
    // } catch (err) {
    //   return res.status(401).json("Token invalido"); 
    // }

  } catch (err) {
    return res.status(500).json(err.message); 
  }
}
