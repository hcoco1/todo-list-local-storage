// Importing necessary React hooks and CSS for styling
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  doc, 
  updateDoc, 
  deleteDoc, 
  setDoc, 
  getDoc // Make sure getDoc is included here
} from "firebase/firestore";

import React, { useState, useEffect } from 'react';
import './App.css'; // Styling for the app
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import ReportGenerator from './components/ReportGenerator';
import AuditorNameForm from './components/AuditorNameForm';
import Navbar from './components/Navbar';
import { db, app } from '../src/firebase'; // Only import what's being exported


function App() {
  const [auditorName, setAuditorName] = useState('');
  // Initializes 'todos' state with data from localStorage or as an empty array if none is found.
  // This is used to persist todo items between sessions.
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  // State for handling inputs for a new todo. Default values are empty.
  const [newTodo, setNewTodo] = useState({
    auditor: '',
    period: '',
    username: '',
    afe: '',
    processPath: '',
    error: '',
    coaching: '',
    durable: ''
  });



  useEffect(() => {
    const fetchTodos = async () => {
      const todosCollectionRef = collection(db, "todos");
      const todosSnapshot = await getDocs(todosCollectionRef);
      const todosList = todosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTodos(todosList);
    };
  
    fetchTodos();
  }, []);
  

  // State to control the visibility of the auditor name editing form.
  const [isEditingName, setIsEditingName] = useState(false);

  // Handles submission of a new auditor name, updates state, and hides the form.
  const handleNameSubmit = async (name) => {
    const docRef = doc(db, "settings", "auditorName");
    await setDoc(docRef, { name }, { merge: true });
    setAuditorName(name);
    setIsEditingName(false);
  };
  

  useEffect(() => {
    const fetchAuditorName = async () => {
      const docRef = doc(db, "settings", "auditorName");
      const docSnap = await getDoc(docRef); // Use getDoc here
  
      if (docSnap.exists()) {
        setAuditorName(docSnap.data().name); // Correct use of getDoc
      } else {
        console.log("No auditor name set.");
      }
    };
  
    fetchAuditorName();
  }, []);
  

 

  // Adds a new todo item to the list with current date and unique ID.
  const addTodo = async (e) => {
    e.preventDefault();
    const currentEasternTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    const newTodoData = {
      ...newTodo,
      date: currentEasternTime,
      isEditing: false
    };
  
    try {
      await addDoc(collection(db, "todos"), newTodoData);
      // Optimistically update the todos state with the new todo
      setTodos(prevTodos => [...prevTodos, { ...newTodoData, id: Date.now().toString() }]); // Using Date.now().toString() as a temporary ID. Firestore will provide the real ID.
      
      // Reset newTodo state to default values after successful submission
      setNewTodo({
        auditor: '',
        period: '',
        username: '',
        afe: '',
        processPath: '',
        error: '',
        coaching: '',
        durable: ''
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  
  
  

  // Removes a todo item based on its id.
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    
    // Update the todos state to remove the deleted todo
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  







  // Render method for the App component, which includes UI for auditor name, todo form, todo list, and report generation.
  return (
    <div className="App">
    <Navbar />
      <main>
        <div className="orientation-message">
          For the best experience, please rotate your device to landscape mode.
        </div>

        <h1>Notes-Taking App</h1>
        {auditorName && !isEditingName ? (
          <div className="auditor-display">
            <h2>Auditor's Name: {auditorName}</h2>
            <button onClick={() => setIsEditingName(true)} className="edit-name-button">Edit</button>
          </div>
        ) : (
          <AuditorNameForm onNameSubmit={handleNameSubmit} />

        )}

        <TodoForm addTodo={addTodo} newTodo={newTodo} setNewTodo={setNewTodo} />
        <TodoList todos={todos} deleteTodo={deleteTodo}  />
        <ReportGenerator todos={todos} />
      </main>
      <Footer />
    </div>
  );
}

export default App;



