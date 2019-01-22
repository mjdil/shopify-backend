module.exports = (req,res,next) =>{
  if (!req.user){
    console.log(req.user+ "undefined");
    return res.status(401).send({error: "you must be logged in to do this task!"})
  }
next();

}
