import express from 'express';
import db from './../../server.js';

const router = express.Router();

router.post('/login',async(req,res) => {
    try{
        const {username,password} = req.body;
        const rows = await db.query('select * from AdminDetails where username=$1 and password=$2',[username,password]);
        if( rows.rows.length != 0 )
        {
            res.status(201).json("User Signed In");
            console.log("Signed In");
        }
        else
        {
            res.status(400).json({ message:err });
            console.log(err);
        }      
    }
    catch(err)
    {
        res.status(400).json({ message:err });
        console.log(err);
    }
})

router.get('/getstaff',async(req,res) => {
    try{
        const rows = await db.query('select * from Employee_details');
        res.status(201).json(rows.rows);

    }
    catch(err)
    {
        res.status(400).json({ message:err });
        console.log(err);
    }
})

router.get('/getfood',async(req,res) => {
    try{
        const rows = await db.query('select * from Food');
        res.status(201).json(rows.rows);

    }
    catch(err)
    {
        res.status(400).json({ message:err });
        console.log(err);
    }
})

router.get('/getresources',async(req,res) => {
    try{
        const rows = await db.query('select * from Resources');
        res.status(201).json(rows.rows);

    }
    catch(err)
    {
        res.status(400).json({ message:err });
        console.log(err);
    }
})

router.get('/getkitchen',async(req,res) => {
    try{
        const rows = await db.query('select * from Kitchen');
        res.status(201).json(rows.rows);

    }
    catch(err)
    {
        res.status(400).json({ message:err });
        console.log(err);
    }
})

router.get('/getbilling',async(req,res) => {
    try{
        const rows = await db.query('select * from Billing');
        res.status(201).json(rows.rows);

    }
    catch(err)
    {
        res.status(400).json({ message:err });
        console.log(err);
    }
})

router.post('/insertemployeedetails',async(req,res) => {
    try{
        const{emp_id,name,age,gender,position,salary,datehired}=req.body;
         const rows = await db.query("insert into employee_details values ($1,$2,$3,$4,$5,$6,$7)",[emp_id,name,age,gender,datehired,position,salary]);
         console.log(rows.rows)
        res.status(201).json("Table Successfully inserted");
    }
    catch(err)
    {
        res.status(400).json({ message:err });
        console.log(err);
    }
   
})

router.post('/insertfood',async(req,res) => {
    try{
        const{name,price,availability}=req.body;
         const rows = await db.query("insert into food values ($1,$2,$3)",[name,price,availability]);
        // const rows = await db.query("select * from admindetails");

        console.log(rows.rows)
        res.status(201).json("Table Successfully inserted");
    }
    catch(err)
    {
        res.status(400).json({ message:err });
        console.log(err);
    }
   
})

router.post('/insertresources',async(req,res) => {
    try{
        const{name,quantity,supply_source,defective}=req.body;
         const rows = await db.query("insert into resources values ($1,$2,$3,$4)",[name,quantity,supply_source,defective]);
         console.log(rows.rows)
        res.status(201).json("Table Successfully inserted");
    }
    catch(err)
    {
        res.status(400).json({ message:err });
        console.log(err);
    }
   
})

router.post('/insretkitchen',async(req,res) => {
    try{
        const{name,quantity,packed}=req.body;
         const rows = await db.query("insert into kitchen values ($1,$2,$3)",[name,quantity,packed]);
         console.log(rows.rows)
        res.status(201).json("Table Successfully inserted");
    }
    catch(err)
    {
        res.status(400).json({ message:err });
        console.log(err);
    }
   
})

router.post('/insertbilling',async(req,res) => {
    try{
        const{bill_id,billingdate,amount,type_of_payment}=req.body;
         const rows = await db.query("insert into billing values ($1,$2,$3,$4)",[bill_id,billingdate,amount,type_of_payment]);
         console.log(rows.rows)
        res.status(201).json("Table Successfully inserted");
    }
    catch(err)
    {
        res.status(400).json({ message:err });
        console.log(err);
    }
   
})

router.delete('/deletestaff',async(req,res) => {
    try{
        const {emp_id}=req.body;
        const rows = await db.query("delete from employee_details where emp_id=$1",[emp_id]);
       // console.log(rows.rows)
        res.status(201).json("Deleted Successfully");
    }
    catch(err)
    {
        res.status(400).json({ message:err });
    }
})

router.delete('/deletefood',async(req,res) => {
    try{
        const{name}=req.body;
        const rows = await db.query("delete from food where name=$1",[name]);
        console.log(rows.rows)
        res.status(201).json(name);
    }
    catch(err)
    {
        res.status(400).json({ message:err });
    }
})

router.delete('/deleteresource',async(req,res) => {
    try{
        const {name}=req.body;
        const rows = await db.query("delete from resources where name=$1",[name]);
        console.log(rows.rows)
        //console.log(req.body)
        res.status(201).json(name);
    }
    catch(err)
    {
        res.status(400).json({ message:err });
    }
})

router.delete('/deletekitchen',async(req,res) => {
    try{
        const{name}=req.body;
        const rows = await db.query("delete from kitchen where name=$1",[name]);
        console.log(rows.rows)
        res.status(201).json("Deleted Successfully");
    }
    catch(err)
    {
        res.status(400).json({ message:err });
    }
})

router.delete('/deletebilling',async(req,res) => {
    try{
        const{bill_id}=req.body;
        const rows = await db.query("delete from billing where bill_id=$1",[bill_id]);
        console.log(rows.rows)
        res.status(201).json("Deleted Successfully");
    }
    catch(err)
    {
        res.status(400).json({ message:err });
    }
})

router.put('/updateemployee_details',async(req,res) => {
    try{
        const{employee_id,name,age,gender,position,salary,datehired}=req.body;
         const rows = await db.query("update employee_details set name=$1,age=$2,gender=$3,position=$4,salary=$5,datehired=$6 where emp_id=$7 ",[name,age,gender,position,salary,datehired,employee_id]);
         console.log(rows.rows)
        res.status(201).json("Table Successfully updated");
    }
    catch(err)
    {
        res.status(400).json({ message:err });
        console.log(err);
    }
   
})

router.put('/updatefood',async(req,res) => {
    try{
        const{name,price,availability}=req.body;
         const rows = await db.query("update food set price=$1,availability=$2 where name=$3 ",[price,availability,name]);
         console.log(rows.rows)
        res.status(201).json("Table Successfully updated");
    }
    catch(err)
    {
        res.status(400).json({ message:err });
        console.log(err);
    }
   
})

router.put('/updateresources',async(req,res) => {
    try{
        const{name,quantity,supply_source,defective}=req.body;
         const rows = await db.query("update resources set quantity=$1,supply_source=$2,defective=$3 where name=$4 ",[quantity,supply_source,defective,name]);
         console.log(rows.rows)
        res.status(201).json("Table Successfully updated");
    }
    catch(err)
    {
        res.status(400).json({ message:err });
        console.log(err);
    }
   
})

   
router.put('/updatekitchen',async(req,res) => {
    try{
        const{name,quantity,packed}=req.body;
         const rows = await db.query("update kitchen set quantity=$1,packed=$2 where name=$3 ",[quantity,packed,name]);
         console.log(rows.rows)
        res.status(201).json("Table Successfully updated");
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
