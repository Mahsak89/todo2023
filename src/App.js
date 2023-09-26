import NavBar from './components/NavBar';
import styles from "./App.module.css";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from './pages/auth/SignInForm';
import CategoryCreateForm from './pages/categories/CategoryCreateForm';
import CreateTaskForm from './pages/tasks/CreateTaskForm';
import TaskPage from './pages/tasks/TaskPage';
import TasksPage from "./pages/tasks/TasksPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import EditTaskForm from './pages/tasks/EditTaskPage';


function App() {

    const currentUser = useCurrentUser();
    const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
     <NavBar/>
     <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home page</h1>} />
          <Route
            exact
            path="/tasks"
            render={() => (
              <TasksPage
                message="No results found."
                filter={`owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/states"
            render={() => (
              <TasksPage
                message="You have not completed any task yet."
                filter={`states__owner__profile=${profile_id}&ordering=-states__created_at&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/categories/create" render={() => <CategoryCreateForm/> } />
          <Route exact path="/tasks/create" render={() => <CreateTaskForm/> } />
          <Route exact path="/tasks/:id" render={() => <TaskPage/>} />
          <Route exact path="/tasks/:id/edit" render={() => <EditTaskForm/>} />



          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;