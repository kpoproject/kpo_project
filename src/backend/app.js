import express from "express";
import { AppController } from "./search_controller.js";
import { DatabaseController } from "./db/db_controller.js";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.get("/", (req, res) => res.send("blank"));
// app.get('/', controller.getComics);
// app.put('/', controller.updateComics);
// app.delete('/', controller.deleteComic);
// app.post('/viewer/tags', controller.updateComicTags);
// app.post('/viewer/languages', controller.setLanguage);
// app.post('/viewer/artists', controller.updateArtists);
// app.post('/viewer/type', controller.setType);

app.listen(PORT, () => {
  console.log("Succes! " + PORT);
});
