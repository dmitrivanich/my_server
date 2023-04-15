import express from "express";
import axios from "axios";

const PDF_URL = "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf"

const PORT = 2050;

const app = express();

app.use(express.json());

// Разрешаем доступ с источника http://localhost:5173
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
  

app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));




app.get('/pdf/*', async (req, res) => {
  try {
    console.log("SERVER REQ: ", req.url)
    const url = req.url;
    const modifiedUrl = url.substring(5);
    console.log("URL: ", modifiedUrl)

    
    // Выполняем GET-запрос на URL PDF-файла
    const response = await axios.get(modifiedUrl, {
      responseType: "arraybuffer"
       // Устанавливаем responseType в 'arraybuffer' для получения бинарных данных
    });

    // Устанавливаем заголовки ответа, указывая тип содержимого и длину контента
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', response.data.length);

    // Отправляем бинарные данные PDF-файла в ответ на запрос
    res.send(response.data);

  } catch (error) {
    console.error(error);
    // Отправляем ошибку в ответ на запрос
    res.status(500).send('Failed to download PDF: ' + error);
  }
});



app.post("/", (req, res) => {
  res.status(200).json("Server is working");
});
