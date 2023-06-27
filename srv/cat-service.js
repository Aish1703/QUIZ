const cds = require("@sap/cds");

module.exports = (srv) => {
  srv.on('updateQuiz', async (req) => {
    const { user_id, category, difficulty, score } = req.data;
    console.log(user_id, category, difficulty, score )
    const { Quiz } = srv.entities;
    let bessshhtt=0;


    await srv.tx (async (tx) => {
      let exists = await tx.run(
        SELECT.from(Quiz).where({ category: category, difficulty: difficulty, users_ID:user_id  }).forUpdate()
      )
      if (exists.length >0) {
        if(exists[0].score > score){
          console.log("BetterLuck Next Time!! ");
          bessshhtt=exists[0].score;
        }else{
          let res= await tx.update(Quiz).set("score=" ,score ).where( "category=" ,category, " AND difficulty=" ,difficulty, "AND users_ID=" ,user_id );
          bessshhtt=score;
        }
      } else {
       let res = await tx.run (INSERT.into (Quiz,{ users_ID: user_id, category: category, difficulty: difficulty, score: score }));
       bessshhtt=score;
      }

    });
    return bessshhtt;
  });

  srv.on('addUser', async(req)=>{
    let uid=0;
    const { user_name}= req.data;
    const{ Users} = srv.entities;

    await srv.tx (async (tx) => {
      let exists = await tx.run(
        SELECT .from(Users).where({ name:user_name }).forUpdate()
      )
      let leng= await tx.run(SELECT.from(Users));
      let len=leng.length
        if(exists.length>0){ 
          uid=exists[0].ID 
          console.log(uid)      
        }else{
          let res = await tx.run (INSERT.into (Users,{ID:len,name:user_name }))
          console.log(res);
           uid=res.ID
           console.log(uid)
        }
        
        
    })
    
    return uid;
  });
};