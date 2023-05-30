const express = require('express');
const router = express.Router();

// NFCタグ情報の処理
router.post('/', (req, res) => {
  const tagId = req.body.tagId;
  const userId = req.cookies.userId;
  const timestamp = new Date();
  // ここでデータを蓄積する処理を行います
  // ...

  const responseData = {
    tagId,
    userId,
    timestamp,
    in_or_out: getInOrOut(tagId) // タグの読み取り回数に応じてin/outを判定する関数
  };

  res.json(responseData);
});

module.exports = router;
