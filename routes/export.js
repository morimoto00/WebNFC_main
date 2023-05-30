const express = require('express');
const router = express.Router();
const excel = require('exceljs');

router.get('/', (req, res) => {
  // データの取得と.xlsxファイルの作成処理
  // ...

  // Excelファイルのダウンロード
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
  workbook.xlsx.write(res)
    .then(() => {
      res.end();
    })
    .catch(error => {
      console.error('Export error:', error);
      res.status(500).end();
    });
});

module.exports = router;
