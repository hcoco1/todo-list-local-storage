import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { auth, db } from './components/config/firebase-config'; // Adjust according to your actual import

import './App.css';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AuditSummary from './components/summary/AuditSummary'; 
import Footer from './components/Footer';
import TodoForm from './components/form_components/TodoForm';
import TodoList from './components/todos/TodoList';
import ReportGenerator from './components/ReportGenerator';
import PersonalProfile from './components/profile/PersonalProfile'
import NavigationBar from './components/NaviagtionBar';
import LinkCards from './components/LinkCards';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc
} from "firebase/firestore";


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    auditor: '',
    createdAt: '',
    period: '',
    username: '',
    afe: '',
    processPath: '',
    error: '',
    coaching: '',
    durable: ''
  });


  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        // Now fetchTodos is directly inside the useEffect, ensuring it has access to the current scope
        const todosCollectionRef = collection(db, "todos");
        const todosSnapshot = await getDocs(todosCollectionRef);
        const todosList = todosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTodos(todosList);
      } else {
        setCurrentUser(null);
        setTodos([]); // Optionally clear todos if there's no user
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  

// In App.js or your state managing component
const updateUserProfileInApp = (newData) => {
  setCurrentUser((currentUser) => ({ ...currentUser, ...newData }));
};

  
  const addTodo = async (e) => {
    e.preventDefault();
  
    // Assign current user's displayName as the auditor for the newTodo.
    const updatedNewTodo = {
      ...newTodo,
      auditor: currentUser.displayName, // This ensures auditor is always the current user
    };
  
    const currentEasternTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    const newTodoData = { ...updatedNewTodo, createdAt: currentEasternTime, isEditing: false };
  
    try {
      const docRef = await addDoc(collection(db, "todos"), newTodoData);
      console.log("Document written with ID: ", docRef.id);
  
      // Update local state with the new todo, including the Firestore-generated ID
      const addedTodo = { ...newTodoData, id: docRef.id };
      setTodos(prevTodos => [...prevTodos, addedTodo]);
      
      // Reset form state
      setNewTodo({
        auditor: '',
        createdAt: '',
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
  


  const deleteTodo = async (id) => {
 
    // Fetch the todo document to check its auditor field
    const todoRef = doc(db, "todos", id);
    const todoSnap = await getDoc(todoRef);
  
    if (!todoSnap.exists()) {
      console.log("Todo does not exist.");
      return;
    }
  
    const todoData = todoSnap.data();
  
    // Check if the currentUser's displayName matches the todo's auditor field
    if (todoData.auditor !== currentUser.displayName) {
      console.log("Current user does not have permission to delete this todo.");
      window.alert(`${currentUser.displayName} does not have permission to delete this todo.`);
      return;
    }
  
    // If the check passes, proceed to delete the todo
    try {
      await deleteDoc(todoRef);
      setTodos(todos.filter(todo => todo.id !== id));
      console.log("Todo deleted successfully.");
      window.alert("Todo deleted successfully.");
    } catch (error) {
      console.error("Error deleting todo: ", error);
    }
  };
  
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Set loading to false once we get the user state
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }




  return (
    <Router>
      <div className="App">
      {currentUser && <NavigationBar currentUser={currentUser} todos={todos}/>}
        <Routes>
          <Route path="/signin" element={!currentUser ? <SignIn /> : <Navigate replace to="/" />} />
          <Route path="/signup" element={!currentUser ? <SignUp /> : <Navigate replace to="/signin" />} />
           {currentUser && <Route path="/dashboard" element={<AuditSummary todos={todos} currentUser={currentUser}/>} />} 
           {currentUser && <Route path="/profile" element={<PersonalProfile user={currentUser} updateUserProfileInApp={updateUserProfileInApp} />} />} 
           {currentUser && <Route path="/links" element={<LinkCards />} />} 

          <Route path="/" element={currentUser ? (
            <main>
              <div className="orientation-message">For the best experience, please rotate your device to landscape mode.</div>
             
              <TodoForm addTodo={addTodo} newTodo={newTodo} setNewTodo={setNewTodo} />
              <TodoList todos={todos} deleteTodo={deleteTodo} currentUser={currentUser} />
              <ReportGenerator todos={todos} />
            </main>
          ) : <Navigate replace to="/signin" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;



