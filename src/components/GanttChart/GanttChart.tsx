import React, { useEffect, useState } from 'react';

export interface Task {
  id: string;
  content: string;
  startDate: number;
  endDate: number;
  icons: Array<{ type: 'user' | 'logo'; content: string }>;
  backgroundColor?: string;
  color?: string;
  isSub?: boolean;
  duration?: number;
}

interface GanttChartProps {
  tasks: Task[];
  height?: string;
  onTaskItemClick: (id: string) => void;
  startDay: number;
  divRef: React.RefObject<HTMLDivElement>;
}

export const GanttChart: React.FC<GanttChartProps> = ({
  tasks,
  height = '70vh',
  onTaskItemClick,
  startDay,
  divRef
}) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const [emptyRows, setEmptyRows] = useState<number>(0);

  const [divHeight, setDivHeight] = useState<number>(0);

  const rowHeight = 300;
  const totalChartHeight =
    parseFloat(height) * (Math.ceil(divHeight / rowHeight) + 1);

  useEffect(() => {
    const totalTasksHeight = tasks.length * rowHeight;
    const remainingSpace = totalChartHeight - totalTasksHeight;
    const emptyRowCount = Math.max(0, Math.floor(remainingSpace / rowHeight));
    setEmptyRows(emptyRowCount);
  }, [tasks, totalChartHeight, rowHeight]);

  useEffect(() => {
    if (divRef.current) {
      setDivHeight(divRef.current.offsetHeight);
    }
  }, []);

  const days = Array.from({ length: 31 }, (_, i) => i + startDay);
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const handleDateClick = (date: number) => {
    setSelectedDate(date === selectedDate ? null : date);
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #ccc',
    overflow: 'hidden',
    height,
    margin: '0 auto'
  };

  const timelineStyle: React.CSSProperties = {
    display: 'flex',
    borderBottom: '1px solid #ccc'
  };

  const timelineCellStyle = (
    isWeekend: boolean,
    isSelected: boolean
  ): React.CSSProperties => ({
    flex: '1 0 5.53%',
    textAlign: 'center',
    padding: '10px 0',
    borderRight: '1px solid #ccc',
    backgroundColor: isSelected ? '#e6e6fa' : 'white',
    position: 'relative',
    backgroundImage: isWeekend
      ? 'linear-gradient(135deg, transparent 49.5%, #ccc 49.5%, #ccc 50.5%, transparent 50.5%)'
      : 'none',
    backgroundSize: '10px 10px'
  });

  const arrowStyle = (isSelected: boolean): React.CSSProperties => ({
    content: '""',
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: 0,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: '5px solid #e6e6fa',
    display: isSelected ? 'block' : 'none'
  });

  const taskRowStyle: React.CSSProperties = {
    display: 'flex',
    position: 'relative',
    height: `${rowHeight}px`
  };

  const taskCellStyle = (
    isWeekend: boolean,
    isSelected: boolean
  ): React.CSSProperties => ({
    flex: '1 0 5.53%',
    borderRight: '1px solid #ccc',
    backgroundColor: isSelected ? '#e6e6fa' : 'white',
    backgroundImage: isWeekend
      ? 'linear-gradient(135deg, transparent 49.5%, #ccc 49.5%, #ccc 50.5%, transparent 50.5%)'
      : 'none',
    backgroundSize: '10px 10px'
  });

  const taskItemStyle = (
    color: string | undefined,
    backgroundColor: string | undefined,
    startIndex: number,
    endIndex: number,
    isSquare: 'start' | 'end' | boolean
  ): React.CSSProperties => ({
    position: 'absolute',
    top: '5px',
    left: `calc(${startIndex * 5.53}% + ${startIndex}px)`,
    width: `calc(${(endIndex - startIndex + 1) * 5.53}% + ${
      endIndex - startIndex - 12
    }px)`,
    height: '65px',
    backgroundColor: backgroundColor || '#4caf50',
    color: color || '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 5px',
    borderTopLeftRadius: !isSquare || isSquare === 'end' ? '50px' : '0px',
    borderBottomLeftRadius: !isSquare || isSquare === 'end' ? '50px' : '0px',
    borderTopRightRadius: !isSquare || isSquare === 'start' ? '50px' : '0px',
    borderBottomRightRadius: !isSquare || isSquare === 'start' ? '50px' : '0px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    border: '1px solid lightgrey',
    cursor: 'pointer'
  });

  const iconContainerStyle: React.CSSProperties = {
    display: 'flex',
    marginRight: '5px'
  };

  const iconStyle = (
    type: 'user' | 'logo',
    index: number
  ): React.CSSProperties => ({
    width: '55px',
    height: '55px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    color: 'white',
    fontSize: '20px',
    marginLeft: index === 0 ? 0 : '-20px',
    border: type === 'user' ? '2px solid white' : '2px solid transparent',
    boxSizing: 'border-box',
    zIndex: index
  });

  const lightTextStyle = (): React.CSSProperties => ({
    color: 'grey'
  });

  const handleItemClick = (id: string) => {
    onTaskItemClick(id);
  };

  const [finalTasks, setFinalTasks] = useState<Task[][]>([tasks]);

  useEffect(() => {
    setFinalTasks(
      tasks.map((eachTask) => {
        let isSub = false;
        let subCount = 0;
        let { startDate, endDate } = eachTask;
        const newarr = [];
        for (let i = startDate; i < endDate; i++) {
          if (weekDays[i % 7] === 'S') {
            isSub = true;
            newarr.push({
              ...eachTask,
              startDate,
              endDate: i,
              isSub,
              content: subCount === 0 ? eachTask.content : '',
              id: eachTask.id + '-' + subCount++
            });
            i = i + 2;
            startDate = i + 1;
            endDate = endDate;
          }
        }
        newarr.push({
          ...eachTask,
          startDate,
          endDate,
          isSub,
          content: subCount === 0 ? eachTask.content : '',
          id: eachTask.id + '-' + subCount++
        });
        return newarr;
      })
    );
  }, [tasks]);

  return (
    <div>
      <div
        style={containerStyle}
        ref={divRef}
        id='gantt-chart-container'
      >
        <div style={timelineStyle}>
          {days.map((day) => (
            <div
              key={day}
              style={timelineCellStyle(
                (day - 1) % 7 === 0 || (day - 1) % 7 === 6,
                day === selectedDate
              )}
              onClick={() => handleDateClick(day)}
            >
              <span style={lightTextStyle()}>{weekDays[(day - 1) % 7]}</span>{' '}
              <span>{`${day.toString().padStart(2, '0')}`}</span>
              <div style={arrowStyle(day === selectedDate)} />
            </div>
          ))}
        </div>
        {finalTasks.map((finalTasksItem) => {
          const [task] = finalTasksItem;
          return (
            <div
              key={task.id}
              style={taskRowStyle}
            >
              {days.map((day) => (
                <div
                  key={`${task.id}-${day}`}
                  style={taskCellStyle(
                    (day - 1) % 7 === 0 || (day - 1) % 7 === 6,
                    day === selectedDate
                  )}
                />
              ))}

              {finalTasksItem.map((eachTaskItem, taskItemIndex) => {
                let isSquare: 'start' | 'end' | boolean = false; // both sides are round
                if (finalTasksItem.length >= 2) {
                  if (taskItemIndex === 0) {
                    isSquare = 'end'; // end side is square
                  } else if (taskItemIndex === finalTasksItem.length - 1) {
                    isSquare = 'start'; // start side is square
                  } else {
                    isSquare = true; // both sides are square
                  }
                }

                return (
                  <div
                    role="button"
                    style={taskItemStyle(
                      eachTaskItem.color,
                      eachTaskItem.backgroundColor,
                      eachTaskItem.startDate - startDay,
                      eachTaskItem.endDate - startDay,
                      isSquare
                    )}
                    onClick={() => handleItemClick(eachTaskItem.id)}
                    key={eachTaskItem.id}
                  >
                    {taskItemIndex === 0 && (
                      <div style={iconContainerStyle}>
                        {eachTaskItem.icons.map((icon, index) => (
                          <div
                            key={index}
                            style={iconStyle(icon.type, index)}
                          >
                            {icon.content.charAt(0).toUpperCase()}
                          </div>
                        ))}
                      </div>
                    )}
                    <span
                      style={{
                        maxWidth: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                      title={eachTaskItem.content}
                    >
                      {eachTaskItem.content}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}
        {/* Add empty rows to fill the remaining space */}
        {Array.from({ length: emptyRows }).map((_, rowIndex) => (
          <div
            key={`empty-${rowIndex}`}
            style={taskRowStyle}
          >
            {days.map((day) => (
              <div
                key={`empty-${rowIndex}-${day}`}
                style={taskCellStyle(
                  (day - 1) % 7 === 0 || (day - 1) % 7 === 6,
                  day === selectedDate
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
