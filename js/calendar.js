document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.getElementById('cal-tbody');
  if(!tbody) return;

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const dayOfWeek = now.getDay();

  const weekDays = ['周日','周一','周二','周三','周四','周五','周六'];
  
  // 渲染左侧文字
  document.getElementById('cal-week').innerText = '第' + getWeekNumber(now) + '周 ' + weekDays[dayOfWeek];
  document.getElementById('cal-date').innerText = (today < 10 ? '0' : '') + today;
  document.getElementById('cal-year-month').innerText = year + '年' + (month + 1) + '月 第' + getDayOfYear(now) + '天';

  // 渲染右侧网格
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let html = '<tr>';
  // 填充月初空白
  for(let i = 0; i < firstDay; i++) {
    html += '<td></td>';
  }
  // 填充具体日期
  for(let i = 1; i <= daysInMonth; i++) {
    if((i + firstDay - 1) % 7 === 0 && i !== 1) {
      html += '</tr><tr>';
    }
    if(i === today) {
      html += '<td class="today">' + i + '</td>';
    } else {
      html += '<td>' + i + '</td>';
    }
  }
  html += '</tr>';
  tbody.innerHTML = html;

  // 算法：计算当前是今年的第几周
  function getWeekNumber(d) {
    const date = new Date(d.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    const week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  }
  
  // 算法：计算当前是今年的第几天
  function getDayOfYear(d) {
    const start = new Date(d.getFullYear(), 0, 0);
    const diff = (d - start) + ((start.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }
});