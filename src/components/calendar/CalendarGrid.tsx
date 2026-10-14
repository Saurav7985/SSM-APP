import React from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarDay from './CalendarDay';
import { CalendarEvent } from '../../types/calendar';

interface CalendarGridProps {
  currentMonth: Date;
  selectedDate: string;
  onSelectDate: (dateStr: string) => void;
  events: CalendarEvent[];
}

export default function CalendarGrid({ 
  currentMonth, 
  selectedDate, 
  onSelectDate, 
  events 
}: CalendarGridProps) {
  
  // Logic to build the calendar grid (weeks array)
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateGrid = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth(); // 0-indexed
    
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
    const daysInMonth = getDaysInMonth(year, month);
    
    // Previous month padding
    const prevMonthDays = getDaysInMonth(year, month - 1);
    
    const grid: Date[] = [];
    
    // Add prev month days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      grid.push(new Date(year, month - 1, prevMonthDays - i));
    }
    
    // Add current month days
    for (let i = 1; i <= daysInMonth; i++) {
      grid.push(new Date(year, month, i));
    }
    
    // Add next month padding to complete 6 weeks (42 cells)
    const remainingCells = 42 - grid.length;
    for (let i = 1; i <= remainingCells; i++) {
      grid.push(new Date(year, month + 1, i));
    }
    
    // Split into weeks
    const weeks: Date[][] = [];
    for (let i = 0; i < grid.length; i += 7) {
      weeks.push(grid.slice(i, i + 7));
    }
    
    return weeks;
  };

  const weeks = generateGrid();
  
  // Format for "today" check
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <View style={styles.container}>
      {weeks.map((week, weekIdx) => (
        <View key={weekIdx} style={styles.weekRow}>
          {week.map((dateObj, dayIdx) => {
            const dateStr = dateObj.toISOString().split('T')[0];
            const isCurrentMonth = dateObj.getMonth() === currentMonth.getMonth();
            const isSelected = dateStr === selectedDate;
            const isToday = dateStr === todayStr;
            const dayEvents = events.filter(e => e.date === dateStr);
            
            return (
              <CalendarDay
                key={dayIdx}
                dateObj={dateObj}
                isCurrentMonth={isCurrentMonth}
                isSelected={isSelected}
                isToday={isToday}
                events={dayEvents}
                onSelect={onSelectDate}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
