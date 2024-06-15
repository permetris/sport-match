import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { MatchItem } from "../../components/Match/MatchItem";

import { toastError } from "../../hooks/useToastify";
import { useAuth } from "../../context/AuthContext";

export const UserHistory = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState();

  useEffect(() => {
    

    return () => {
      // cleanup
    };
  }, []);

  return (
    <Container className="rounded">
      {history &&
        history.map((item) => {
          return (
            <MatchItem
              className="mt-5 shadow"
              match={item.match}
              key={item._id}
              field={item.field}
            ></MatchItem>
          );
        })}
    </Container>
  );
};
