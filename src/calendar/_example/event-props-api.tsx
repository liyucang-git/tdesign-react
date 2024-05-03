import React from 'react';
import { Alert, Switch, Calendar, List, type CalendarProps, type CalendarCell } from 'tdesign-react';

const { ListItem } = List;

export default function CalendarExample() {
  const [preventCellContextmenu, setPreventCellContextmenu] = React.useState(false);
  const [histories, setHistories] = React.useState([]);

  const getDateStr = React.useCallback((calendarCell: CalendarCell) => {
    const y = calendarCell.date.getFullYear();
    const m = calendarCell.date.getMonth() + 1;
    const d = calendarCell.date.getDate();
    const output = `${y}-${m}-${d}`;
    return output;
  }, []);

  const appendHistories = React.useCallback(
    (content: string, data: CalendarCell) => {
      histories.unshift(`${content}`);
      setHistories([...histories]);
      console.info(data);
    },
    [histories, setHistories],
  );

  const onCellClick = React.useCallback<CalendarProps['onCellClick']>(
    (cellEmitData) => {
      const output = getDateStr(cellEmitData.cell);
      appendHistories(`鼠标左键单击单元格 ${output}`, cellEmitData.cell);
    },
    [getDateStr, appendHistories],
  );

  const onCellDoubleClick = React.useCallback<CalendarProps['onCellDoubleClick']>(
    (cellEmitData) => {
      const output = getDateStr(cellEmitData.cell);
      appendHistories(`鼠标双击单元格 ${output}`, cellEmitData.cell);
    },
    [getDateStr, appendHistories],
  );

  const onCellRightClick = React.useCallback<CalendarProps['onCellRightClick']>(
    (cellEmitData) => {
      const output = getDateStr(cellEmitData.cell);
      appendHistories(`鼠标右键单击单元格 ${output}`, cellEmitData.cell);
    },
    [getDateStr, appendHistories],
  );

  const onControllerChange = React.useCallback<CalendarProps['onControllerChange']>(
    (data) => {
      appendHistories('控件值变化', data);
    },
    [appendHistories],
  );

  return (
    <div>
      <div style={{ margin: '12px 0' }}>
        <label>禁用单元格右键菜单：</label>
        <Switch value={preventCellContextmenu} onChange={(value) => setPreventCellContextmenu(value)} />
      </div>
      <Calendar
        preventCellContextmenu={preventCellContextmenu}
        onCellClick={onCellClick}
        onCellDoubleClick={onCellDoubleClick}
        onCellRightClick={onCellRightClick}
        onControllerChange={onControllerChange}
      />
      {histories.length === 0 ? (
        <Alert theme="warning" message={['暂无数据，您可以点击一下日历的单元格看看 :)']} />
      ) : (
        <List style={{ maxHeight: '130px' }}>
          {histories.map((item, index) => (
            <ListItem key={String(index)}>{item}，并得到组件传出的参数（您看控制台）...</ListItem>
          ))}
        </List>
      )}
    </div>
  );
}
