const express = require("express");
const studentRoute= express.Router();
const studentSchema  = require("../model/studentSchema");
const pollSchema = require("../model/pollSchema")
const resultSchema = require("../model/resultSchema");
const adminSchema = require("../model/adminSchema");
const contactSchema = require("../model/contactSchema")

studentRoute.post("/create-student",(req,res)=>{
    studentSchema.create(req.body,(err,data)=>{
        if(err){
            return err;

        }else{
            res.json(data);
        }


    })

})
studentRoute.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new contactSchema({ name, email, message });
    await newContact.save();
    res.json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error during form submission:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
studentRoute.post("/Admin",(req,res)=>{
  adminSchema.create(req.body,(err,data)=>{
      if(err){
          return err;

      }else{
          res.json(data);
      }


  })

})


// routes/studentRoute.js

// ... (other route definitions)

studentRoute.post('/login', async (req, res) => {
  const { identifier, password } = req.body;

  try {
    // Check if the user exists with the provided email or username
    const user = await studentSchema.findOne({ $or: [{ email: identifier }, { name: identifier }] });

    if (user && user.password === password) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// ... (other route definitions)



studentRoute.post('/login-admin', async (req, res) => {
  const { id, password } = req.body;

  try {
    const user = await adminSchema.findOne({ id, password });

    if (user) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

studentRoute.patch('/approve', async (req, res) => {
  try {
    const student = await studentSchema.findByIdAndUpdate(req.params.id, { isApproved: true });
    res.json(student);
  } catch (error) {
    console.error('Error approving student:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
studentRoute.get('/checkVoteStatus', (req, res) => {
  // Implement logic to check if the user has voted
  const hasVoted = /* Your logic to check if the user has voted */
  res.json({ hasVoted });
})

studentRoute.get("/con", (req, res, next) => {
  contactSchema.find((err, data) => {
    if (err) {
      return next(err);
    } else {
      return res.json(data);
    }
  });
});



studentRoute.get("/", (req, res, next) => {
  studentSchema.find((err, data) => {
    if (err) {
      return next(err);
    } else {
      return res.json(data);
    }
  });
});
studentRoute.get("/Admin", (req, res, next) => {
  adminSchema.find((err, data) => {
    if (err) {
      return next(err);
    } else {
      return res.json(data);
    }
  });
});

studentRoute.get("/re", (req, res, next) => {
  resultSchema.find((err, data) => {
    if (err) {
      return next(err);
    } else {
      return res.json(data);
    }
  });
});
studentRoute
  .route("/update/:id")
  .get((req, res, next) => {
  adminSchema.findById(req.params.id, (err, data) => {
      if (err) {
        return next(err);
      } else {
        return res.json(data);
      }
    });
  })
  .put((req, res, next) => {
    adminSchema.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      (err, data) => {
        if (err) {
          return next(err);
        } else {
          return res.json(data);
        }
      }
    );
  });
  studentRoute
  .route("/update-student/:id")
  .get((req, res, next) => {
  adminSchema.findById(mongoose.Types.ObjectId(req.params.id), (err, data) => {
      if (err) {
        return next(err);
      } else {
        return res.json(data);
      }
    })
  })
  .put((req, res, next) => {
    adminSchema.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      (err, data) => {
        if (err) {
          return next(err);
        } else {
          return res.json(data);
        }
      }
    );
  });

  studentRoute.delete("/delete-Admin/:id", (req, res, next) => {
    // console.log(req.params);
    adminSchema.findByIdAndRemove(req.params.id, (err, data) => {
      if (err) {
        return next(err);
      } else {
        return res.json(data);
      }
    });
  });
  

studentRoute.delete("/delete-student/:id", (req, res, next) => {
    // console.log(req.params);
    studentSchema.findByIdAndRemove(req.params.id, (err, data) => {
      if (err) {
        return next(err);
      } else {
        return res.json(data);
      }
    });
  });


  
  studentRoute.post('/vote', async (req, res) => {
    const { option } = req.body;
  
    try {
      // Find the document in the result collection and increment the votes
      const updatedOption = await resultSchema.findOneAndUpdate(
        { option },
        { $inc: { votes: 1 } },
        { new: true, upsert: true }
      );
  
      res.json({ success: true, result: updatedOption });
    } catch (error) {
      console.error('Error submitting vote:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });
  

  
  




  
module.exports = studentRoute;