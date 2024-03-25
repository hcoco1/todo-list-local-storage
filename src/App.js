import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './components/firebase-config'; // Adjust according to your actual import
import './App.css';
import Greeting from './components/Greeting';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
/* import Navbar from './components/Navbar'; */
import Footer from './components/Footer';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import ReportGenerator from './components/ReportGenerator';
import AuditorNameForm from './components/AuditorNameForm';
import LogOutButton from './components/LogOutButton'; // Ensure this path is correct
import {
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  getDoc,
  deleteDoc
} from "firebase/firestore";


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [auditorName, setAuditorName] = useState('');
  const [todos, setTodos] = useState([]);
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
  const [isEditingName, setIsEditingName] = useState(false);

  // Authentication state management
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      if (user) {
        fetchTodos();
        fetchAuditorName();
      } else {
        setTodos([]);
        setAuditorName('');
      }
    });
    return unsubscribe; // Cleanup on unmount
  }, []);

  const fetchTodos = async () => {
    const todosCollectionRef = collection(db, "todos");
    const todosSnapshot = await getDocs(todosCollectionRef);
    const todosList = todosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTodos(todosList);
  };

  const handleNameSubmit = async (name) => {
    const docRef = doc(db, "settings", "auditorName");
    await setDoc(docRef, { name }, { merge: true });
    setAuditorName(name);
    setIsEditingName(false);
  };

  const fetchAuditorName = async () => {
    const docRef = doc(db, "settings", "auditorName");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setAuditorName(docSnap.data().name);
    } else {
      console.log("No auditor name set.");
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    const currentEasternTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    const newTodoData = { ...newTodo, date: currentEasternTime, isEditing: false };
  
    try {
      await addDoc(collection(db, "todos"), newTodoData);
      setTodos(prevTodos => [...prevTodos, { ...newTodoData, id: Date.now().toString() }]); // Placeholder ID, replaced upon re-fetch
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

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    setTodos(todos.filter(todo => todo.id !== id));
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
       {/*  <Navbar /> */}
       {currentUser && <LogOutButton />}
        <Routes>
          <Route path="/signin" element={!currentUser ? <SignIn /> : <Navigate replace to="/" />} />
          <Route path="/signup" element={!currentUser ? <SignUp /> : <Navigate replace to="/signin" />} />
          <Route path="/" element={currentUser ? (
            <main>
              <div className="orientation-message">For the best experience, please rotate your device to landscape mode.</div>
              <h1>Notes-Taking App</h1>
              <Greeting />
              {auditorName && !isEditingName ? (
                <div className="auditor-display">
                                    <h2>Auditor's Name: {auditorName}</h2>
                  <button onClick={() => setIsEditingName(true)} className="edit-name-button">Edit</button>
                </div>
              ) : (
                <AuditorNameForm onNameSubmit={handleNameSubmit} />
              )}

              <TodoForm addTodo={addTodo} newTodo={newTodo} setNewTodo={setNewTodo} />
              <TodoList todos={todos} deleteTodo={deleteTodo} />
              <ReportGenerator todos={todos} />
            </main>
          ) : <Navigate replace to="/signin" />} />
          {/* Optionally, you could add more authenticated or public routes here */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

