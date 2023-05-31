const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// ミドルウェアの設定
app.use(express.static('public'));
app.use(express.json());

// ルート定義
const nfcRoutes = require('./routes/nfc');
app.use('/api/nfc', nfcRoutes);

// サーバーの起動
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


