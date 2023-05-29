const express = require('express');
const router = express.Router();
const nfcData = require('../models/nfcData');

// GETリクエストのハンドラー
router.get('/nfc', (req, res) => {
  // NFCデータを取得
  const { tagId, userId } = req.query;
  
  // データベースに保存
  const data = new nfcData({
    tagId,
    userId,
    timestamp: new Date(),
  });
  data.save()
    .then(() => {
      // データ保存成功時の処理
      res.sendStatus(200);
    })
    .catch(err => {
      // データ保存失敗時の処理
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = router;
