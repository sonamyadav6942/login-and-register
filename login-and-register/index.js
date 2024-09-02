import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
  "mongodb+srv://sonamyadavdos:login&register@loginandregister.c6mej.mongodb.net/?retryWrites=true&w=majority&appName=loginandregister", 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB connected");
  }
);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successful", user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (user) {
      res.send({ message: "User already registered" });
    } else {
      const newUser = new User({ name, email, password });
      newUser.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send({ message: "Successfully Registered, Please login now." });
        }
      });
    }
  });
});

app.listen(9002, () => {
  console.log("BE started at port 9002");
});
