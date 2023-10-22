const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");

mongoose.connect(
  "yourUrlHere",
  { useNewUrlParser: true }
);

//za uzimanje i kreiranje postova
// exports.handler = async (event) => {
//   if (event.requestContext.http.method === "GET") {
//     try {
//       const postsQuery = await Post.find().limit(20).sort("-createdOn");
//       return {
//         statusCode: 200,
//         body: JSON.stringify(postsQuery),
//       };
//     } catch (error) {
//       return {
//         statusCode: 500,
//         body: JSON.stringify({ error: "Server Error, greska je " + error }),
//       };
//     }
//   } else if (event.requestContext.http.method === "POST") {
//     const post = new Post({
//       content: JSON.parse(event.body).content,
//       userId: JSON.parse(event.body).id,
//       createdOn: new Date().toISOString(),
//     });
//     savedPost = await post.save();
//     if (!savedPost)
//       return {
//         statusCode: 400,
//         body: JSON.stringify({ message: "nije kreiran tweet" }),
//       };
//     return {
//       statusCode: 201,
//       body: JSON.stringify({
//         message: "uspjesno kreiran tweet",
//         data: savedPost,
//       }),
//     };
//   }
//   return {
//     statusCode: 400,
//     body: JSON.stringify({ error: "Bad Request" }),
//   };
// };

// za registraciju
// exports.handler = async (event) => {
//   if (event.requestContext.http.method === "POST") {
//     try {
//       const password = await bcrypt.hash(JSON.parse(event.body).password, 8);
//       const newUser = new User({
//         username: JSON.parse(event.body).username,
//         password,
//         description: "Opisssss",
//       });
//       const mozdaPostoji = await User.find({
//         username: newUser.username,
//       });
//       if (mozdaPostoji.length !== 0)
//         return {
//           statusCode: 400,
//           body: JSON.stringify({
//             message: "korisnik sa ovim usernameom vec postoji",
//           }),
//         };
//       const newUserDoc = await newUser.save().catch((err) => {
//         let statusCode = 409;
//         if (err.code == "11000") statusCode = 409;
//         return {
//           statusCode: statusCode,
//           body: JSON.stringify({ message: err.message }),
//         };
//       });
//       if (newUserDoc)
//         return {
//           statusCode: 201,
//           body: JSON.stringify({
//             message: "kreiran novi user",
//             data: newUserDoc.toJSON,
//           }),
//         };
//     } catch (error) {
//       return {
//         statusCode: 500,
//         body: JSON.stringify({ message: "error je " + error }),
//       };
//     }
//   }
// };

//za login
// exports.handler = async (event) => {
//   if (event.requestContext.http.method === "POST") {
//     try {
//       const userData = {
//         username: JSON.parse(event.body).username,
//       };
//       if (!userData.username || !JSON.parse(event.body).password) {
//         return {
//           statusCode: 404,
//           body: JSON.stringify({ message: "username or password missing" }),
//         };
//       }
//       const user = await User.findOne({
//         username: userData.username,
//       }).select("+password");
//       if (!user) {
//         return {
//           statusCode: 404,
//           body: JSON.stringify({ message: "user not found" }),
//         };
//       }
//       const passwordCorrect = await bcrypt.compare(
//         JSON.parse(event.body).password,
//         user.password
//       );
//       userData.id = user._id;
//       if (passwordCorrect) {
//         //temporary jwt secret
//         const token = jwt.sign(userData, "jwtsecretxdddd", {
//           expiresIn: "1h",
//         });
//         // const dateToExpire = new Date(Date.now() + 60 * 60 * 1000);
//         return {
//           statusCode: 200,
//           headers: {
//             "Content-Type": "application/json",
//             "Set-Cookie": `jwt=${token}; Path=/; Max-Age=3600; Secure; HttpOnly`,
//           },
//           body: JSON.stringify({
//             message: "uspjesno ulogovan i stavljen cookie",
//           }),
//         };
//       }
//       return {
//         statusCode: 404,
//         body: JSON.stringify({ error: "neuspjesan login" }),
//       };
//     } catch (error) {
//       return {
//         statusCode: 500,
//         body: JSON.stringify({ error: "Server Error, greska je " + error }),
//       };
//     }
//   }
//   return {
//     statusCode: 400,
//     body: JSON.stringify({ error: "Bad Request" }),
//   };
// };

//Zavrsni za /usersId
// exports.handler = async (event) => {
//   if (event.requestContext.http.method === "GET") {
//     // console.log("jeste get");
//     const userId = event.rawPath.split("/").pop();
//     // console.log(userId);
//     // console.log(event);
//     try {
//       const id = new mongoose.Types.ObjectId(userId);
//       const user = await User.findById(id);
//       if (!user) {
//         return {
//           statusCode: 404,
//           body: JSON.stringify({ error: "User not found" }),
//         };
//       }
//       return {
//         statusCode: 200,
//         body: JSON.stringify(user),
//       };
//     } catch (error) {
//       return {
//         statusCode: 500,
//         body: JSON.stringify({ error: "Server Error, greska je " + error }),
//       };
//     }
//   }
//   return {
//     statusCode: 400,
//     body: JSON.stringify({ error: "Bad Request" }),
//   };
// };

// //Zavrsni za /users stari
// exports.handler = async (event) => {
//   const { httpMethod, body } = event;

//   if (httpMethod === "GET") {
//     console.log("jeste get");
//     try {
//       const users = await User.find();
//       return {
//         statusCode: 200,
//         body: JSON.stringify(users),
//       };
//     } catch (error) {
//       return {
//         statusCode: 500,
//         body: JSON.stringify({ error: "Server Error" }),
//       };
//     }
//   } else if (httpMethod === "POST") {
//     console.log("jeste post");
//     try {
//       const userData = JSON.parse(body);
//       const newUser = new User(userData);
//       await newUser.save();
//       return {
//         statusCode: 201,
//         body: JSON.stringify(newUser),
//       };
//     } catch (error) {
//       return {
//         statusCode: 500,
//         body: JSON.stringify({ error: JSON.stringify(error) }),
//       };
//     }
//   }
//   return {
//     statusCode: 400,
//     body: JSON.stringify({ error: "Bad Request" }),
//   };
// };

// //Zavrsni za /users
// exports.handler = async (event) => {
//   const { httpMethod } = event;
//   if (httpMethod === "GET") {
//     console.log("jeste get");
//     try {
//       const users = await User.find();
//       return {
//         statusCode: 200,
//         body: JSON.stringify(users),
//       };
//     } catch (error) {
//       return {
//         statusCode: 500,
//         body: JSON.stringify({ error: "Server Error" }),
//       };
//     }
//   }
//   return {
//     statusCode: 400,
//     body: JSON.stringify({ error: "Bad Request" }),
//   };
// };

//za login(sa cors)
// exports.handler = async (event) => {
//   try {
//     const userData = {
//       username: JSON.parse(event.body).username,
//     };
//     if (!userData.username || !JSON.parse(event.body).password) {
//       return {
//         statusCode: 404,
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Headers": "*",
//           "Access-Control-Allow-Methods": "*",
//           Accept: "*/*",
//         },
//         body: JSON.stringify({ message: "username or password missing" }),
//       };
//     }
//     const user = await User.findOne({
//       username: userData.username,
//     }).select("+password");
//     if (!user) {
//       return {
//         statusCode: 404,
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Headers": "*",
//           "Access-Control-Allow-Methods": "*",
//           Accept: "*/*",
//         },
//         body: JSON.stringify({ message: "user not found" }),
//       };
//     }
//     const passwordCorrect = await bcrypt.compare(
//       JSON.parse(event.body).password,
//       user.password
//     );
//     userData.id = user._id;
//     if (passwordCorrect) {
//       //temporary jwt secret
//       const token = jwt.sign(userData, "jwtsecretxdddd", {
//         expiresIn: "1h",
//       });
//       // const dateToExpire = new Date(Date.now() + 60 * 60 * 1000);
//       return {
//         statusCode: 200,
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Headers": "*",
//           "Access-Control-Allow-Methods": "*",
//           "Set-Cookie": `jwt=${token}; Path=/; Max-Age=3600; Secure; HttpOnly`,
//           Accept: "*/*",
//         },
//         body: JSON.stringify({
//           message: "uspjesno ulogovan i stavljen cookie",
//         }),
//       };
//     }
//     return {
//       statusCode: 404,
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers": "*",
//         "Access-Control-Allow-Methods": "*",
//         Accept: "*/*",
//       },
//       body: JSON.stringify({ error: "neuspjesan login" }),
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers": "*",
//         "Access-Control-Allow-Methods": "*",
//         Accept: "*/*",
//       },
//       body: JSON.stringify({ error: "Server Error, greska je " + error }),
//     };
//   }
// };

//getbyusername
// exports.handler = async (event) => {
//   if (event.requestContext.http.method === "GET") {
//     const username = event.rawPath.split("/").pop();
//     try {
//       const user = await User.findOne({ username: username });
//       if (!user) {
//         return {
//           statusCode: 404,
//           body: JSON.stringify({ error: "User not found" }),
//         };
//       }
//       return {
//         statusCode: 200,
//         body: JSON.stringify(user),
//       };
//     } catch (error) {
//       return {
//         statusCode: 500,
//         body: JSON.stringify({ error: "Server Error, greska je " + error }),
//       };
//     }
//   }
//   return {
//     statusCode: 400,
//     body: JSON.stringify({ error: "Bad Request" }),
//   };
// };

//novi createPost zbog cors
// exports.handler = async (event) => {
//   const post = new Post({
//     content: JSON.parse(event.body).content,
//     userId: JSON.parse(event.body).id,
//     createdOn: new Date().toISOString(),
//   });
//   savedPost = await post.save();
//   if (!savedPost)
//     return {
//       statusCode: 400,
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers": "*",
//         "Access-Control-Allow-Methods": "*",
//         Accept: "*/*",
//       },
//       body: JSON.stringify({ message: "nije kreiran tweet" }),
//     };
//   return {
//     statusCode: 201,
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Headers": "*",
//       "Access-Control-Allow-Methods": "*",
//       Accept: "*/*",
//     },
//     body: JSON.stringify({
//       message: "uspjesno kreiran tweet",
//       data: savedPost,
//     }),
//   };
// };
