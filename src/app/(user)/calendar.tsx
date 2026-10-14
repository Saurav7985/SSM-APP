import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, StyleSheet,  Platform, StatusBar } from 'react-native';
import { COLORS } from '../../constants/colors';
import { MOCK_CALENDAR_EVENTS } from '../../constants/calendar';

import MonthNavigator from '../../components/calendar/MonthNavigator';
import WeekdayHeader from '../../components/calendar/WeekdayHeader';
import CalendarGrid from '../../components/calendar/CalendarGrid';
import SelectedDayEvents from '../../components/calendar/SelectedDayEvents';
import ScheduleButton from '../../components/calendar/ScheduleButton';

export default function CalendarScreen() {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  
  // Set default selected date to today
  const [selectedDateStr, setSelectedDateStr] = useState<string>(new Date().toISOString().split('T')[0]);

  const handlePrevMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    setCurrentMonth(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    setCurrentMonth(next);
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDateStr(today.toISOString().split('T')[0]);
  };

  const handleSelectDate = (dateStr: string) => {
    setSelectedDateStr(dateStr);
  };

  // Get events for the selected date
  const selectedEvents = MOCK_CALENDAR_EVENTS.filter(e => e.date === selectedDateStr);

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <View style={styles.calendarContainer}>
        <MonthNavigator 
          currentDate={currentMonth}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onToday={handleToday}
        />
        
        <WeekdayHeader />
        
        <CalendarGrid 
          currentMonth={currentMonth}
          selectedDate={selectedDateStr}
          onSelectDate={handleSelectDate}
          events={MOCK_CALENDAR_EVENTS}
        />
      </View>

      <View style={styles.eventsContainer}>
        <SelectedDayEvents 
          dateStr={selectedDateStr}
          events={selectedEvents}
        />
      </View>

      <ScheduleButton />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,},
  calendarContainer: {
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  eventsContainer: {
    flex: 1,
    backgroundColor: COLORS.card,
  },
});
