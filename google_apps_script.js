/**
 * パキラの水やりカレンダー - Google Apps Script (GAS) バックエンド (古いログ自動削除・自動整理対応版)
 */

function doGet(e) {
  try {
    const params = e ? e.parameter : {};
    
    // 【更新処理】?action=update&date=YYYY-MM-DD&soil=true&mist=false
    if (params.action === 'update' && params.date) {
      const targetDate = formatDateStr(params.date);
      const soil = params.soil === 'true';
      const mist = params.mist === 'true';

      if (!targetDate) {
        return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Invalid date' }))
          .setMimeType(ContentService.MimeType.JSON);
      }

      const sheet = getOrCreateSheet();
      const data = sheet.getDataRange().getValues();
      
      let foundRowIndex = -1;

      // 最新の該当行を検索
      for (let i = data.length - 1; i >= 1; i--) {
        const cellVal = formatDateStr(data[i][0]);
        if (cellVal === targetDate) {
          foundRowIndex = i + 1;
          break;
        }
      }

      const timestamp = new Date();

      if (foundRowIndex > 0) {
        // 既存の行を上書き更新
        sheet.getRange(foundRowIndex, 2).setValue(soil);
        sheet.getRange(foundRowIndex, 3).setValue(mist);
        sheet.getRange(foundRowIndex, 4).setValue(timestamp);
      } else {
        // 存在しない場合は新規追加
        sheet.appendRow(["'" + targetDate, soil, mist, timestamp]);
      }

      // 1. 重複行の自動掃除
      cleanDuplicateRows(sheet, targetDate);

      // 2. 古いログの自動削除 (2年以上＝730日前の古い記録を自動削除して常にクリーンに維持)
      cleanOldLogs(sheet, 730);

      return ContentService.createTextOutput(JSON.stringify({ status: 'success', updated: { date: targetDate, soil, mist } }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 【読み込み処理】全ログを JSON で返却
    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();
    const logs = {};

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const dateStr = formatDateStr(row[0]);
      if (dateStr && dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
        logs[dateStr] = {
          date: dateStr,
          soil: Boolean(row[1]),
          mist: Boolean(row[2])
        };
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ status: 'success', data: logs }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  return doGet(e);
}

/**
 * 同じ日付の重複行を自動で削除
 */
function cleanDuplicateRows(sheet, targetDate) {
  const data = sheet.getDataRange().getValues();
  const matchedRowIndexes = [];

  for (let i = 1; i < data.length; i++) {
    if (formatDateStr(data[i][0]) === targetDate) {
      matchedRowIndexes.push(i + 1);
    }
  }

  if (matchedRowIndexes.length > 1) {
    for (let k = matchedRowIndexes.length - 2; k >= 0; k--) {
      sheet.deleteRow(matchedRowIndexes[k]);
    }
  }
}

/**
 * 2年以上 (指定日数以上) 前の古いログを自動的に削除してメンテナンス不要に
 */
function cleanOldLogs(sheet, maxDaysToKeep) {
  try {
    const data = sheet.getDataRange().getValues();
    const now = new Date();
    const cutoffTime = now.getTime() - (maxDaysToKeep * 24 * 60 * 60 * 1000);

    // 下から上へ古い行を削除
    for (let i = data.length - 1; i >= 1; i--) {
      const dateStr = formatDateStr(data[i][0]);
      if (dateStr && dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const logDate = new Date(dateStr);
        if (logDate.getTime() < cutoffTime) {
          sheet.deleteRow(i + 1);
        }
      }
    }
  } catch (err) {
    console.error('Error cleaning old logs:', err);
  }
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('WateringLogs');
  if (!sheet) {
    sheet = ss.insertSheet('WateringLogs');
    sheet.appendRow(['日付 (YYYY-MM-DD)', '土への水やり', '葉水', '最終更新日時']);
    sheet.getRange('A1:D1').setFontWeight('bold').setBackground('#9ac681').setFontColor('#ffffff');
  }
  return sheet;
}

function formatDateStr(val) {
  if (!val) return '';
  
  if (val instanceof Date) {
    const y = val.getFullYear();
    const m = String(val.getMonth() + 1).padStart(2, '0');
    const d = String(val.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  const str = String(val).replace(/^'/, '').trim();
  const match = str.match(/(\d{4})[/-](\d{1,2})[/-](\d{1,2})/);
  if (match) {
    const y = match[1];
    const m = match[2].padStart(2, '0');
    const d = match[3].padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  return str;
}
