const bcrypt =  require('bcryptjs');
const db = require('../config/dbconfig');
const jwt = require('jsonwebtoken');
require("dotenv").config();



const securepassword = async(password)=>{
    try
    {
        const hashedpassword = await bcrypt.hash(password,10);
        return hashedpassword;

    }
     catch (error)
      {

       res.staus(400).send(error.message);

      }

}

const registeruser = async(req,res)=>
{
    try
    {
        const spassword = await securepassword(req.body.password);
        const {fullname,username,email} = req.body;
        const password = spassword;
        db.query
        ("select email from users where email = ?",req.body.email,(err,result)=>
        {
            if(result.length)
            {
                res.status(409).send({msg:"email already in use"});
            }
            else {
                db.query(
                    "insert into users(fullname,username,email, password) values (?,?,?,?)",
                    [fullname, username, email, password], 
                    function(err , result){
                       if(err){
                        console.log(err);
                       }else{
                        console.log(result);
                        res.status(201).send("registered successfully");
                       }
                       res.end();
                   })
            }

        })
    }
    catch(error){
        res.status(400).send(error.message);
        console.log(error.message);

    }
}; 




const loginuser = async(request,response)=>
{
    try{
    const {email,password} = request.body;

        if (!email && !password) {
            response.send("Please enter email and password!");
          
        }
        await  db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err,result)=>{
                if (err)throw err;
                if(result.length > 0){
                  console.log("user password is :"+result[0].password)
                    // const  hashedPassword = await bcrypt.hashSync(password,10);
                    // console.log(hashedPassword);
                    const passwordmatch = await bcrypt.compare(request.body.password,result[0].password);
            
                    if(passwordmatch===true)
                    {
                        const token = jwt.sign({email},process.env.JWT_TOKEN,{ expiresIn: process.env.JWT_EXPIRES });
                        response.status(200).send({"msg":"logged in sucessfully","token":token}); 
                        // return res.cookie({"token":token}).json({success:true,message:'LoggedIn Successfully'})
                    }
                    else{
                      response.status(403).send(` Incorrect password `);
                      response.end()
                    }
              
        }
        else{
            response.status(403).send(` Incorrect email`);
            response.end()
        }
            
         }
        );
    


    }catch(error)
    {
        response.status(400).send(error.message);
    }

};

// const loginuser = async (request, response) => {
//     try {
//       const { email, password } = request.body;
  
//       if (!email && !password) {
//         response.send("Please enter email and password!");
//       }
//       db.query(
//         "SELECT email,password FROM users WHERE email = ?",
//         [email],
//         async (err, result) => {
//           if (err) throw err;
//           const passwordmatch = await bcrypt.compare(
//             password,
//             result[0].password
//           );
//           console.log(passwordmatch);
//           if (passwordmatch == true) {
//             const token = jwt.sign({ email }, process.env.JWT_TOKEN, {
//               expiresIn: process.env.JWT_EXPIRES,
//             });
//             response
//               .status(200)
//               .send({ msg: "logged in sucessfully", token: token });
//             // return res.cookie({"token":token}).json({success:true,message:'LoggedIn Successfully'})
//           } else {
//             response.status(403).send( "incorrect credentials ")
      
//     } catch (error) {
//       response.status(400).send(error.message);
//     }
//   };
module.exports = {
    registeruser,
    loginuser
}