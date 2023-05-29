const express = require('express');
const app = express();
const xlsx = require('xlsx');

// ルートエンドポイントの定義
app.get('/', (req, res) => {
  // NFCタグのIDを取得
  const nfcId = req.query.id;

  // IDを読み取った数の計算
  const readCount = nfcId ? 1 : 0;

  // 読み取った日付と時刻
  const timestamp = new Date().toLocaleString();

  // ユーザーID（Chromeのメールアドレス）
  const userId = req.query.userId;

  // start_or_stopの値に応じてメッセージを設定
  const startOrStop = req.query.start_or_stop;
  let message = '';
  if (startOrStop === 'start') {
    message = 'おはようございます';
  }

  // サーバーのデータをXLSXファイルに出力
  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet([
    { ID: nfcId, Count: readCount, Timestamp: timestamp, UserID: userId, Message: message }
  ]);
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Data');
  const xlsxBuffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

  // レスポンスとしてXLSXファイルを送信
  res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(xlsxBuffer);
});

// サーバーの起動
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
