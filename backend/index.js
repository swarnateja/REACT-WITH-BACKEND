const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const app = express();


app.use(express.json());
const dbPath = path.join(__dirname, "tests.db");
let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(7777, () => {
      console.log("Server Running at http://localhost:7777/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();



// Get Books API
app.get("/books/", async (request, response) => {
  const getBooksQuery = `
    SELECT
      *
    FROM
      book
    ORDER BY
      book_id;`;
  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});



// Get Book API
app.get("/books/:bookId/", async (request, response) => {
  const {bookId} = request.params
  const getBookQuery = `
    SELECT
      *
    FROM
      book
    ORDER BY
      book_id = ${bookId};`;
  const book = await db.get(getBookQuery);
  response.send(book);
});




// Add Book API
app.post("/books/", async (request, response) => {
  const bookDetails = request.body
  const {
    title,
    authorId,
    rating,
    ratingCount,
    reviewCount,
    description,
    pages,
    dateOfPublication,
    editionLanguage,
    price,
    onlineStores,
  } = bookDetails;

const addBookQuery = `
    INSERT INTO
      book (title,author_id,rating,rating_count,review_count,description,pages,date_of_publication,edition_language,price,online_stores)
    VALUES
      (
        '${title}',
         ${authorId},
         ${rating},
         ${ratingCount},
         ${reviewCount},
        '${description}',
         ${pages},
        '${dateOfPublication}',
        '${editionLanguage}',
         ${price},
        '${onlineStores}'
      );`;
     const dbResponse = await db.run( addBookQuery)
     const bookId = dbResponse.lastID
     response.send({bookId: bookId})
});



// Update Book API
app.put("/books/:bookId/", async (request, response) => {
  const {bookId} = request.params
  const bookDetails = request.body;
  const {
    title,
    authorId,
    rating,
    ratingCount,
    reviewCount,
    description,
    pages,
    dateOfPublication,
    editionLanguage,
    price,
    onlineStores,
  } = bookDetails;

const updateBookQuery = `
    UPDATE
      book
    SET
      title='${title}',
      author_id=${authorId},
      rating=${rating},
      rating_count=${ratingCount},
      review_count=${reviewCount},
      description='${description}',
      pages=${pages},
      date_of_publication='${dateOfPublication}',
      edition_language='${editionLanguage}',
      price= ${price},
      online_stores='${onlineStores}'
    WHERE
      book_id = ${bookId};`;
  await db.run(updateBookQuery);
  response.send("Book Updated Successfully");
});



app.delete("/books/:bookId/", async (request, response) => {
  const {bookId} = request.params
  const deleteBookQuery = `
    DELETE FROM
        book
    WHERE
        book_id = ${bookId};`;
  await db.run(deleteBookQuery);
  response.send("Book Deleted Successfully");
});




app.get("/authors/:authorId/books/", async (request, response) => {
  const {authorId} = request.params
  const getAuthorBooksQuery = `
    SELECT
      *
    FROM
      book
    ORDER BY
      author_id; = ${authorId}`;
  const booksArray = await db.all(getAuthorBooksQuery);
  response.send(booksArray);
});



// Filtering //


// Get Books API
app.get("/filteredBooks/", async (request, response) => {
  const {offset, limit, order_by, order, search_q} =request.query
  const getFilteredBooksQuery = `
    SELECT
      *
    FROM
     book
    WHERE
     title LIKE '%${search_q}%'
    ORDER BY ${order_by} ${order}
    LIMIT ${limit} OFFSET ${offset};`;
  const booksArray = await db.all(getFilteredBooksQuery);
  response.send(booksArray);
});



// Authentication // 

// Create User API  ** Register **
app.post("/users/", async (request, response) => {
  const {username, name, password, gender, location} = request.body
  const hashedPassword = await bcrypt.hash(password, 10)
  const selectUserQuery = `
  SELECT 
    * 
  FROM 
    user 
  WHERE 
    username = '${username}'`;
    const dbUser = await db.get(selectUserQuery);
    if(dbUser === undefined){
      const createUserQuery = `
  INSERT INTO
    user (username, name, password, gender, location)
  VALUES
    (
      '${username}',
      '${name}',
      '${hashedPassword}',
      '${gender}',
      '${location}'  
    );`;
    await db.run(createUserQuery)
    response.send("User Created Successfully")
    }else{
      response.status(400)
      response.send("User Already Exists")
    }
});



//  Login User API
app.post("/login/", async (request, response) => {
  const {username, password} = request.body
  const selectUserQuery = `
  SELECT 
    * 
  FROM 
    user 
  WHERE 
    username = '${username}'`;
    const dbUser = await db.get(selectUserQuery);
    if(dbUser === undefined){
      response.status(400)
      response.send("Invalid user Details or User doesn't exists")
    }else{
      const isPasswordMatched = await bcrypt.compare(password, dbUser.password )
      if(isPasswordMatched === true){
        response.send("Login Successfully")
      }else{
        response.status(400)
        response.send("Invalid Password")
      }
    }
});



// Authentication Mechanisms   JWT// 
app.post("/loginJwt/", async (request, response) => {
  const {username, password} = request.body
  const selectUserQuery = `
  SELECT 
    * 
  FROM 
    user 
  WHERE 
    username = '${username}'`;
    const dbUser = await db.get(selectUserQuery);
    if(dbUser === undefined){
      response.status(400)
      response.send("Invalid user Details or User doesn't exists")
    }else{
      const isPasswordMatched = await bcrypt.compare(password, dbUser.password )
      if(isPasswordMatched === true){
        const payload = {username: username}
        const jwtToken = jwt.sign(payload, "const")
        response.send({jwtToken:jwtToken})
      }else{
        response.status(400)
        response.send("Invalid Password")
      }
    }
});



// Get Books API 
app.get("/booksJwt/", async (request, response) => {
  let JwtToken
  const authHeader = request.headers["authorization"]
  if(authHeader !== undefined){
    JwtToken = authHeader.split(" ")[1]
  }
  if(JwtToken === undefined){
    response.status(401)
    response.send("Invalid access Token")
  }else{
    jwt.verify(JwtToken, "const", async(error, user) =>{
      if(error){
        response.status(401)
        response.send("Invalid access Token")
      }else{
        const getBooksQuery = `
    SELECT
      *
    FROM
      book
    ORDER BY
      book_id;`;
  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
      }
    })
  }
  
});



// Get Book API
app.get("/booksJwt/:bookId/", async (request, response) => {
  let JwtToken
  const authHeader = request.headers["authorization"]
  if(authHeader !== undefined){
    JwtToken = authHeader.split(" ")[1]
  }
  if(JwtToken === undefined){
    response.status(401)
    response.send("Invalid access Token")
  }else{
    jwt.verify(JwtToken, "const", async(error, user) =>{
      if(error){
        response.status(401)
        response.send("Invalid access Token")
      }else{
        const {bookId} = request.params
  const getBookQuery = `
    SELECT
      *
    FROM
      book
    ORDER BY
      book_id = ${bookId};`;
  const book = await db.get(getBookQuery);
  response.send(book);
}
})
}

});



//Middleware Function
const authenticateToken = (request, response, next) =>{ 
  let JwtToken
  const authHeader = request.headers["authorization"]
  if(authHeader !== undefined){
    JwtToken = authHeader.split(" ")[1]
  }
  if(JwtToken === undefined){
    response.status(401)
    response.send("Invalid access Token")
  }else{
    jwt.verify(JwtToken, "const", async(error, payload) =>{
      if(error){
        response.status(401)
        response.send("Invalid access Token")
      }else{
        request.username = payload.username
        next()
      }
    })
  }

}


app.get("/booksJwt/", authenticateToken, async (request, response) => {
  const getBooksQuery = `
  SELECT
    *
  FROM
    book
  ORDER BY
    book_id;`;
const booksArray = await db.all(getBooksQuery);
response.send(booksArray);
  
});



app.get("/profile/", authenticateToken, async (request, response) => {
  let {username} = request
  const selectUserQuery = `
  SELECT * FROM user WHERE username='${username}'`;
  const userDetails = await db.get(selectUserQuery)
  response.send(userDetails)
});


