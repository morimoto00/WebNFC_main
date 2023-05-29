const express = require('express');
const xlsx = require('xlsx');
const googleTTS = require('google-tts-api');

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("listening server")
})

const app = express();
app.use(express.json());

// データを格納する配列
let nfcData = [];

// GETリクエストのハンドラ
app.get('/', (req, res) => {
  const { nfcTagId, userEmail } = req.query;

  // NFCタグのIDが既に存在するかチェック
  const existingData = nfcData.find(data => data.nfcTagId === nfcTagId);

  // 読み取った回数を判定
  const count = existingData ? 1 : 0;

  // 現在の日時を取得
  const timestamp = new Date().toLocaleString();

  // start_or_stopの値を判定
  const startOrStop = count % 2 === 0 ? 'start' : 'stop';

  // データを配列に追加
  nfcData.push({ nfcTagId, count, timestamp, userEmail, startOrStop });

  // XLSXファイルへの出力
  const workbook = xlsx.utils.book_new();


  const worksheet = xlsx.utils.json_to_sheet(nfcData);
  xlsx.utils.book_append_sheet(workbook, worksheet, 'NFC Data');
  xlsx.writeFile(workbook, 'nfc_data.xlsx');

  // Alexaに話させる
  if (startOrStop === 'start') {
    const message = 'おはようございます';
    const url = googleTTS.getAudioUrl(message, {
      lang: 'ja',
      slow: false,
      host: 'https://translate.google.com',
    });
    // AlexaにHTTPリクエストを送信
    // ここでは具体的なAlexaの実装方法は提供できませんので、Alexaの開発者ドキュメントを参照してください。
  }

  res.send('データを受け取りました');
});

// サーバーのポートを指定して起動
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

