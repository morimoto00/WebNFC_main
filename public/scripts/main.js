document.addEventListener('DOMContentLoaded', () => {
    const exportButton = document.getElementById('exportButton');
    exportButton.addEventListener('click', () => {
        // サーバーにデータをエクスポートする処理
        fetch('/api/export', { method: 'GET' })
          .then(response => response.blob())
          .then(blobData => {
            const url = window.URL.createObjectURL(blobData);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'data.xlsx';
            a.click();
          })
          .catch(error => {
            console.error('Export error:', error);
          });
      });
    });
