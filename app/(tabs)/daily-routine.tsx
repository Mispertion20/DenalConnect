import React, { useState } from 'react';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Button, Modal, TextInput, Linking } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Calendar } from "react-native-calendars";

//types
interface Appointments {
    [key: string]: { selected: boolean; marked: boolean; selectedColor: string };
}

interface Day {
    dateString: string;
    year: number;
    month: number;
    day: number;
}
type task = {
    title:string,
    isDone:boolean,
    active?:true,
};

export default function DailyRoutine() {
    //constants
    const [activeTab, setActiveTab] = useState('tasks');
    const [tasks, setTasks] = useState(Array(0));
    const [newTaskTitle, setNewTaskTitle] = useState(""); // Stores user input
    const [isAdding, setIsAdding] = useState(false); // Controls modal visibility
    const [seconds, setSeconds] = useState(120);
    const [timerIsRunning, setTimerIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<string>("2025-03");
    const [selectedDate, setSelectedDate] = useState<string>("2025-03-15");
    const appointments: string[] = ["2025-03-15", "2025-03-25", "2025-04-13"];
    
    //events
    const startTimer = () => {
        if(timerIsRunning) return;
        setTimerIsRunning(true);
        const id = setInterval(() =>{
            setSeconds(prevSeconds => {
                if(prevSeconds <= 1){
                    clearInterval(id);
                    setTimerIsRunning(false);
                    return 0;
                }
                return prevSeconds - 1;
            });
        }, 1000);
        setIntervalId(id);
    };

    const resetTimer = () => {
        if(intervalId){
            clearInterval(intervalId);
        }
        setSeconds(120);
        setTimerIsRunning(false);
    };

    const toggleTask = (index:number) => {
        if(tasks[index].isDone === false){
            alert(`You have done the '${tasks[index].title}' task!`)
        }
        setTasks(tasks.map((item, i) => {
            if(i === index){
                item.isDone = (item.isDone ? false : true);
            }
            return item;
        }));
    };

    const addTask = () => {
        if (newTaskTitle.trim() === "") return; // Prevent empty tasks
        if(newTaskTitle.length > 20){
            alert('Your title is too long');
            return;
        }
        const newTask: task = { title: newTaskTitle, isDone: false };
        setTasks((prevTasks) => [...prevTasks, newTask]); // Add new task
        setNewTaskTitle(""); // Clear input
        setIsAdding(false); // Hide modal
    };

    const deleteTask = (index:number) => {
        const newTasks = [];
        for(let i = 0; i < tasks.length; i++){
            if(i == index)
                continue;
            newTasks.push(tasks[i]);
        }
        setTasks(newTasks);
    };

    const handleMonthChange = (month: { year: number; month: number }) => {
        setSelectedMonth(`${month.year}-${month.month.toString().padStart(2, "0")}`);
    };

    const openMap = () => {
        const address = encodeURIComponent("Karagaily st, 1, Semey");
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${address}`);
    };
    
    //body
    return (
        <GestureHandlerRootView>
            <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            {/* Custom Tab Selector */}
            <View style={styles.tabContainer}>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'tasks' && styles.activeTab]} 
                    onPress={() => setActiveTab('tasks')}
                >
                    <Text style={[styles.tabText, activeTab === 'tasks' && styles.activeTabText]}>
                        My tasks
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'appointments' && styles.activeTab]} 
                    onPress={() => setActiveTab('appointments')}
                >
                    <Text style={[styles.tabText, activeTab === 'appointments' && styles.activeTabText]}>
                        My appointment
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Tab Content */}
                {activeTab === 'tasks' ? (
                    <ScrollView style={styles.contentContainer}>
                        <View style={styles.tasksHeaderContainer}>
                            <Text style={styles.tasksHeader}>
                                Tasks for the day
                            </Text>
                            <Text style={styles.tasksSubtext}>
                                Select a task and a time, and we will send you a notification to remind!
                            </Text>
                        </View>
                        <View style={styles.tasksMainContainer}>
                            {tasks.map((item, index) => (
                                <View style={styles.tasksSingletaskContainer} key={index}>
                                    <TouchableOpacity style={styles.tasksStatecircle} onPress={()=>toggleTask(index)}>
                                        <Image style={styles.tasksStatecircleImage} source={ item.isDone ? require('@/assets/images/Done.png') : require('@/assets/images/Nondone.png')} />
                                    </TouchableOpacity>
                                    <Text style={styles.tasksSingleTaskText}>
                                        {item.title}
                                    </Text>
                                    <TouchableOpacity style={styles.taskDeleteButton} onPress={()=>deleteTask(index)}>
                                        <MaterialCommunityIcons name="delete-forever" size={24} color={Colors.error.l1} />
                                    </TouchableOpacity> 
                                </View>
                                ))
                            }
                            <TouchableOpacity style={styles.tasksAddButton} onPress={()=>setIsAdding(true)}>
                                <Text style={styles.tasksAddButtonText}>Add task</Text>
                            </TouchableOpacity>
                            <Modal transparent={true} visible={isAdding} animationType="fade">
                                <View style={styles.modalBackground}>
                                    <View style={styles.modalContainer}>
                                        <Text style={styles.modalTitle}>New Task</Text>
                                        <TextInput
                                        style={styles.input}
                                        placeholder="Enter task title..."
                                        value={newTaskTitle}
                                        onChangeText={setNewTaskTitle}
                                        />
                                        <View style={styles.modalButtons}>
                                            <TouchableOpacity onPress={() => setIsAdding(false)} style={styles.taskModalButton}>
                                                <Text style={[styles.taskModalButtonText, {fontFamily: Fonts.i400}]}>Cancel</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={addTask} style={[styles.taskModalButton, {backgroundColor:Colors.highlight.l2}]}>
                                                <Text style={[styles.taskModalButtonText, {color: Colors.neutral.light.l5}]}>Add</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                            <View style={styles.timerContainer}>
                                <View style={styles.timerInterface}>
                                    <View style={styles.timerHeadingContainer}>
                                        <Text style={styles.timerHeader}>
                                            Set the timer
                                        </Text>
                                        <Text style={styles.timerSubheader}>
                                            It is benefitial for your teeth to brush them for 2 minutes
                                        </Text>
                                    </View>
                                    <View style={styles.timerButtonsContainer}>
                                        <TouchableOpacity style={styles.timerStartButton} onPress={startTimer}>
                                            <Text style={styles.timerButtonText} >Start</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.timerResetButton} onPress={resetTimer}>
                                            <Text style={styles.timerButtonText} >Reset</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.timer}>
                                    <Text style={styles.countdownText}>
                                        {Math.floor(seconds / 60)}:{(seconds % 60 < 10) ? `0${seconds%60}` : seconds%60}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.progressBarContainer}>
                            <Text style={styles.progressBarHeader}>
                                Your progress
                            </Text>
                            <View style={styles.progressBar}>
                                {tasks.length > 0 ? tasks.map((item, index) => (
                                    <View key={index} style={[styles.progressBarSlot, (item.isDone ? styles.progressBarActive : styles.progressBarInactive)]}><Text style={{opacity:0}}>.</Text></View>
                                )) : (<Text style={{fontFamily: Fonts.i400, fontSize:14, marginLeft: 10}}>No tasks to do!</Text>)}
                            </View>
                        </View>
                    </ScrollView>
                ) : (
                    <View style={styles.appointmentsContainer}>
                        <View style={styles.calendarContainer}>
                            <Calendar
                                current={selectedMonth}
                                onDayPress={(day:Day) => setSelectedDate(day.dateString)}
                                onMonthChange={handleMonthChange}
                                markedDates={{
                                ...appointments.reduce((acc: Appointments, date) => {
                                    acc[date] = {   
                                    selected: true,
                                    marked: true,
                                    selectedColor: date === selectedDate ? Colors.highlight.l1 : Colors.highlight.l4,
                                    };
                                    return acc;
                                }, {}),
                                }}
                                theme={{
                                    selectedDayBackgroundColor: Colors.highlight.l1,
                                    todayTextColor: Colors.highlight.l1,
                                    arrowColor: Colors.highlight.l1,
                                    textDayFontFamily: Fonts.i600,
                                    textDayFontSize: 14,
                                    textDayColor: Colors.neutral.dark.l3,
                                    textMonthFontFamily: Fonts.i700,
                                    textMonthFontSize: 16,
                                    textMonthColor: Colors.neutral.dark.l1,
                                    textDayHeaderFontFamily: Fonts.i500,
                                    textDayHeaderFontSize: 12,
                                    textDayHeaderColor: Colors.neutral.dark.l5,
                                }}
                            />
                            <View style={styles.legend}>
                                <View style={styles.legendDot} />
                                <Text style={styles.legendText}>- your appointment day</Text>
                            </View>
                        </View>

                        <View style={styles.infoBox}>
                            <Text style={styles.title}>Adress</Text>
                            <Text style={{ color:Colors.neutral.dark.l4, fontFamily: Fonts.i400}}>Semey</Text>
                            <Text style={{ marginTop: 20, color:Colors.neutral.dark.l3, fontFamily: Fonts.i400}}>Karagaily st, 1</Text>

                            <TouchableOpacity style={styles.mapButton} onPress={openMap}>
                            <Text style={styles.mapButtonText}>Open the map</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
          </SafeAreaView>
        </SafeAreaProvider>
        </GestureHandlerRootView>
        
    );
}

//styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.neutral.light.l5,
        alignItems: 'center',
        padding: 16,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.neutral.light.l4,
        borderRadius: 16,
        padding: 4,
        width: '75%',
        position: 'absolute', // Fix the tab bar at the top
        top: 0, // Position it at the very top
    },
    tab: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignItems: 'center',
        borderRadius: 12,
    },
    activeTab: {
        backgroundColor: Colors.neutral.light.l5,
    },
    tabText: {
        fontSize: 12,
        color: Colors.neutral.dark.l4,
        fontFamily: Fonts.i700,
    },
    activeTabText: {
        color: Colors.neutral.dark.l1,
    },
    contentContainer: {
        marginTop: 50,
        flexDirection: 'column',
        alignSelf: 'stretch',
        marginLeft: 0,
    },
    tasksHeaderContainer: {
        paddingHorizontal: 16,
    },
    tasksHeader: {
        fontFamily: Fonts.i800,
        fontSize: 18,
        marginBottom: 20,
    },
    tasksSubtext: {
        fontFamily: Fonts.i400,
        fontSize: 14,
        width: 240,
        color: Colors.neutral.dark.l4,
    },
    tasksMainContainer: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 10
    },
    tasksSingletaskContainer: {
        flex:1,
        flexDirection:'row',
        marginBottom:25,
        alignItems:'center',
    },
    tasksStatecircle: {
    },
    tasksStatecircleImage: {
    },
    tasksSingleTaskText: {
        color: Colors.neutral.dark.l1,
        fontFamily: Fonts.i600,
        fontSize: 14,
        marginLeft:12,
    },
    tasksAddButton: {
        backgroundColor: Colors.highlight.l1,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: 90,
    },
    tasksAddButtonText: {
        color: Colors.neutral.light.l5,
        fontFamily: Fonts.i600,
        fontSize: 14,
    },
    taskDeleteButton: {
        marginLeft: 20
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "80%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: Fonts.i600,
        marginBottom: 20,
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        fontFamily: Fonts.i400,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        fontFamily: Fonts.i300,
    },
    taskModalButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
    },
    taskModalButtonText: {
        fontFamily:Fonts.i600,
        fontSize: 16,
    },
    timerContainer: {
        borderRadius: 16,
        backgroundColor: Colors.highlight.l5,
        width: '100%',
        flexDirection: 'row',
        marginHorizontal: 'auto',
        marginTop: 30,
    },
    timerHeadingContainer: {
        marginBottom: 17,
    },
    timerHeader: {
        color: Colors.neutral.dark.l1,
        fontSize: 14,
        fontFamily: Fonts.i700,
        marginBottom: 4,
    },
    timerSubheader: {
        fontFamily: Fonts.i400,
        fontSize: 12,
        color: Colors.neutral.dark.l3,
    },
    timerInterface: {
        width: '70%',
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'column',
    },
    timer: {
        justifyContent: 'center',
        marginLeft: 5,
    },
    timerButtonsContainer: {
        flexDirection:'row',
    },
    timerStartButton: {
        backgroundColor: Colors.highlight.l1,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginRight: 30,
    },
    timerResetButton: {
        backgroundColor: Colors.error.l1,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginRight: 25,
    },
    timerButtonText: {
        fontFamily: Fonts.i600,
        fontSize: 12,
        color: Colors.neutral.light.l5,
    },
    countdownText: {
        fontFamily: Fonts.i800,
        fontSize: 20,
        color: Colors.neutral.dark.l1,
    },
    progressBarContainer: {
        marginTop: 40,
        width: '100%',
    },
    progressBarHeader: {
        color: Colors.neutral.dark.l1,
        fontFamily: Fonts.i800,
        fontSize: 18,
    },
    progressBar: {
        width: '100%',
        flex: 1,
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    progressBarSlot: {
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 8,
    },
    progressBarActive: {
        backgroundColor: Colors.highlight.l1,
    },
    progressBarInactive: {
        backgroundColor: Colors.neutral.light.l3,
    },
    appointmentsContainer: {
        marginTop: 50,
        flex: 1,
        width: '95%',
    },
    legendText: {
        fontFamily: Fonts.i600,
        fontSize: 12,
        color: Colors.neutral.dark.l4,
    },
    legend: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    legendDot: {
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: Colors.highlight.l4,
        marginRight: 5,
    },
    infoBox: {
        backgroundColor: Colors.neutral.light.l4,
        padding: 16,
        borderRadius: 16,
        marginTop: 20,
    },
    title: {
        fontFamily: Fonts.i700,
        fontSize: 14,
        marginBottom: 5,
    },
    mapButton: {
        marginTop: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: Colors.highlight.l1,
        borderRadius: 12,
        alignItems: "center",
    },
    mapButtonText: {
        color: Colors.highlight.l1,
        fontFamily: Fonts.i700,
        fontSize: 12,
    },
    calendarContainer: {
        width: '80%',
        alignSelf: 'center',
    },
});
