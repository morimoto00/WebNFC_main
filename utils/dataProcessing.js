const excel = require('exceljs');

function createWorkbook(data) {
  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet('Data');

  // ヘッダー行の設定
  worksheet.addRow(['Tag ID', 'User ID', 'Timestamp', 'In/Out']);

  // データ行の設定
  data.forEach(item => {
    const { tagId, userId, timestamp, in_or_out } = item;
    worksheet.addRow([tagId, userId, timestamp, in_or_out]);
  });

  return workbook;
}

module.exports = {
  createWorkbook
};
