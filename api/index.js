const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

const salt=bcrypt.genSaltSync(10);
const secret ="wgaheshshsehs"

app.use(cors({credentials:true,origin:""}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname +'/uploads' ));

mongoose.connect('mongodb+srv://bowenlu6995:HoayMD7f8e0Wal5v@cluster0.juipgnr.mongodb.net/test?retryWrites=true&w=majority');

app.post('/register', uploadMiddleware.single('profilePicture'), async (req, res) => {
    const { username, password } = req.body;
    let profilePicture = req.file ? req.file.filename : null;

    try {
        // Check if there's a profilePicture file and add the extension
        if (profilePicture) {
            const { originalname, path } = req.file;
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            const newPath = path + '.' + ext;
            fs.renameSync(path, newPath);
            profilePicture += '.' + ext; // Update profilePicture with the new filename
        }

        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
            profilePicture,
        });
        res.json(userDoc);
    } catch (e) {
        res.status(400).json(e);
    }
});

app.post('/login',async(req,res)=>{
    const{username,password}=req.body;
    const userDoc=await User.findOne({username});
    const passOk=bcrypt.compareSync(password,userDoc.password);
    if(passOk){
        //login
        jwt.sign({username,id:userDoc._id},secret,{},(err,token)=>{
           if(err)throw err;
           res.cookie('token',token).json({
            id:userDoc._id,
            username,
            } );
        });

    }else{
        res.status(400).json('wrong credentials');
    }
});

app.get('/profile',(req,res)=>{
    const{token}=req.cookies;
    jwt.verify(token,secret,{},(err,info)=>{
        if(err) throw err;
        res.json(info);
    });
});

app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok');
})

app.post('/post', uploadMiddleware.single('file'), async(req, res) => {
    const{originalname,path}=req.file;
    const parts=originalname.split('.');
    const ext=parts[parts.length-1];
    const newPath= path+'.'+ext;
    fs.renameSync(path,newPath);

    const{token}=req.cookies;
    jwt.verify(token,secret,{},async(err,info)=>{
        if(err) throw err;
        const{title,summary,content,category}=req.body;
    const postDoc=await Post.create({
        title,
        summary,
        content,
        cover:newPath,
        author:info.id,
        category,
    });
        res.json(postDoc);
    });
    

});
app.post('/view-post/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Increment the view count
      post.views++;
      await post.save();
  
      return res.status(200).json({ message: 'View count incremented successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
    let newPath = null;
    if (req.file) {
      const {originalname,path} = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path+'.'+ext;
      fs.renameSync(path, newPath);
    }
    const{token}=req.cookies;
 
    jwt.verify(token,secret,{},async(err,info)=>{
        if(err) throw err;
        const {id,title,summary,content}=req.body;
        const postDoc=await Post.findById(id);
        const isAuthor =JSON.stringify(postDoc.author)===JSON.stringify(info.id);
        if(!isAuthor){
            return res.status(400).json('you are not the author');
        }
        const updatedPost = await Post.findOneAndUpdate(
            { _id: id }, 
            {
                title,
                summary,
                content,
                cover: newPath ? newPath : postDoc.cover,
            },
            { new: true } 
        );
        res.json(postDoc);
    });
    
})
app.get('/post', async (req, res) => {
    const { cat } = req.query;
    let query = {};
  
    if (cat) {
      query.category = cat;
    }
  
    try {
      const posts = await Post.find(query)
        .populate('author', ['username', 'profilePicture'])
        .sort({ createdAt: -1 })
        .limit(20);
  
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

app.get('/post/:id',async(req,res)=>{
    const{id}=req.params;
    const postDoc=await Post.findById(id).populate('author',['username','profilePicture']);
    res.json(postDoc);
})
app.listen(4000);
