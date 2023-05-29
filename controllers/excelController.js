const express = require('express');
const router = express.Router();
const nfcData = require('../models/nfcData');
const excel = require('exceljs');

// GETリクエストのハンドラー
router.get('/export', (req, res) => {
  // データベースからNFCデータを取得
  nfcData.find({}, (err, data) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }

    // Excelファイル作成
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('NFC Data');

    // ヘッダー行追加
    worksheet.addRow(['Tag ID', 'User ID', 'Timestamp']);
    
    // データ行追加
    data.forEach(item => {
      worksheet.addRow([item.tagId, item.userId, item.timestamp]);
    });

    // Excelファイル保存
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=nfc_data.xlsx');
    return workbook.xlsx.write(res)
      .then(() => {
        res.status(200).end();
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      });
  });
});

module.exports = router;
