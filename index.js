const express = require('express');
const app = express();
const path = require('path');
const nfcDataRouter = require('./routes/nfcData');
const excelRouter = require('./routes/excel');

// ミドルウェアの設定
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ルートへのリクエストを処理するハンドラ
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// NFCデータのAPIルーター
app.use('/data', nfcDataRouter);

// ExcelエクスポートのAPIルーター
app.use('/export', excelRouter);

// サーバーの起動
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
