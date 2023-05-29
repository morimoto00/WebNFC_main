const axios = require('axios');

const nfcTagId = 'NFCタグのID'; // NFCタグのID
const username = 'ユーザー名'; // ユーザー名
const timestamp = new Date().toISOString(); // 時刻をISO 8601形式で取得

const data = {
  nfcTagId: nfcTagId,
  username: username,
  timestamp: timestamp
};

axios.post('http://localhost:3000', data)
  .then(response => {
    console.log('リクエストが成功しました。');
    // 成功時の処理を記述する
  })
  .catch(error => {
    console.error('リクエストが失敗しました。', error);
    // エラー時の処理を記述する
  });

//サーバー側のエンドポイントを作成
app.post('/data', (req, res) => {
    const nfcTagId = req.body.nfcTagId;
    const username = req.body.username;
    const timestamp = req.body.timestamp;
  
    // 受け取ったデータの処理を行う
    // データベースへの保存などの操作を実装する
  
    res.send('データを受け取りました');
  });
  