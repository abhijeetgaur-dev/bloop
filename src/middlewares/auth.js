const auth = (res,req, next)=>{
    console.log("Handling Auth");
    const token  = "xyz";
    const isAdminAuthorized = "xyz" === token;
    if(!isAdminAuthorized){
        res.send("Unauthorized Request");
    }
    else{
        next();
    }

}
const userAuth = (res,req, next)=>{
    console.log("Handling User Auth");
    const token  = "xyz";
    const isAdminAuthorized = "xyz" === token;
    if(!isAdminAuthorized){
        res.send("Unauthorized Request");
    }
    else{
        next();
    }

}

module.exports = {
    auth,
    userAuth,
};