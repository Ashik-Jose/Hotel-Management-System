import express from 'express';
import db from './../../server.js';

const router = express.Router();

router.post('/instable1',async(req,res) => {
    try{
    const {food,price} = req.body;        
     const rows = await db.query("insert into table1 values ($1,$2)",[food,price]);
     console.log(rows.rows)
    res.status(201).json("Table Successfully inserted");  
    }
    catch(err)
    {
        res.status(400).json({ message:err });
        console.log(err);
    }
    
})

router.get('/gettable1',async(req,res) => {
    try{   
     const rows = await db.query("select * from table1");
     console.log(rows.rows)
    res.status(201).json(rows.rows);  
    }
    catch(err)
    {
        res.status(400).json({ message:err });
        console.log(err);
    }
    
})

// router.get('/api', (req, res) => {
//     res.status(200).send({
//       success: 'true',
//       message: 'Seja bem-vindo(a) a API Node.js + PostgreSQL + Azure!',
//       version: '1.0.0',
//     });
//   });

export default router;