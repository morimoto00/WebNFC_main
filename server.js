const express = require('express');
const { conversation, Simple } = require('@assistant/conversation');
const app = express();
const port = 3000; // 使用するポート番号

// ルートエンドポイントへのGETリクエストを処理します
app.get('/', (req, res) => {
  const textToSpeech = req.query.text || 'Hello, World!'; // リクエストパラメータからテキストを取得
  sendToGoogleHome(textToSpeech); // Google Homeにテキストを送信
  res.send('OK');
});

// サーバーを起動します
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Google Homeにテキストを送信する関数
function sendToGoogleHome(text) {
  const app = conversation({ debug: true });
  app.handle('textToSpeech', conv => {
    conv.add(new Simple({ speech: text, text: text }));
  });
  app({}, {}).then(result => {
    console.log(result.session.sendJson_);
  }).catch(error => {
    console.error(error);
  });
}