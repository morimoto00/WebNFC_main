document.addEventListener('DOMContentLoaded', () => {
    const tagIdElement = document.getElementById('tag-id');
    const readCountElement = document.getElementById('read-count');
    const lastReadTimeElement = document.getElementById('last-read-time');
    const userIdElement = document.getElementById('user-id');
    const startStopElement = document.getElementById('start-stop');
    const exportButton = document.getElementById('export-btn');
  
    // サーバーへのデータ取得リクエストを送る関数
    const fetchData = async () => {
      try {
        const response = await fetch('/data');
        if (response.ok) {
          const data = await response.json();
          updateUI(data);
        } else {
          console.error('Failed to fetch data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // UIの更新を行う関数
    const updateUI = (data) => {
      tagIdElement.textContent = data.tagId;
      readCountElement.textContent = data.readCount;
      lastReadTimeElement.textContent = data.lastReadTime;
      userIdElement.textContent = data.userId;
      startStopElement.textContent = data.startStop;
    };
  
    // データ取得リクエストを実行
    fetchData();
  
    // データエクスポートボタンがクリックされた時の処理
    exportButton.addEventListener('click', async () => {
      try {
        const response = await fetch('/export');
        if (response.ok) {
          console.log('Data exported successfully');
        } else {
          console.error('Failed to export data:', response.status);
        }
      } catch (error) {
        console.error('Error exporting data:', error);
      }
    });
  });
  