import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import Task from "./Task";

import appStyles from "../../App.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function TasksPage({ message, filter = "" }) {
  const currentUser = useCurrentUser();
  const [tasks, setTasks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks/?${filter}`);
        setTasks(data);
        setHasLoaded(true);
      } catch (err) {
       // console.log(err);
      }
    };

    setHasLoaded(false);
    fetchTasks();
 }, [filter, pathname, currentUser]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>categories</p>
        {hasLoaded ? (
          <>
            {tasks.results.length ? (
                <InfiniteScroll
                children={ tasks.results.map((task) => (
                    <Task key={task.id} {...task} setTasks={setTasks}  TasksPage />
                ))}
                dataLength={tasks.results.length}
                loader='...'
                hasMore={!!tasks.next}
                next={() => fetchMoreData(tasks, setTasks)}
              />

            ) : (
              <Container className={appStyles.Content}>
               <p>{message}</p>
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <p>loading...</p>
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>categories</p>
      </Col>
    </Row>
  );
}

export default TasksPage;