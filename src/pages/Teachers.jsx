import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography
} from "@mui/material";
import { useTeachers } from "../api";
import { Link } from "react-router-dom";
import { Progress, Title, Container, Error } from "../components";

export function Teachers() {
  const { teachers, isError, isLoading } = useTeachers();

  if (isError) return <Error />;
  if (isLoading) return <Progress />;

  return (
    <Container>
      <Title title={"Преподаватели"} />
      <Grid
        container
        spacing={"4px"}
        columns={{ xs: 6, sm: 12, md: 12, lg: 12, xl: 8 }}
      >
        {[...teachers.getElementsByClassName("box_prepod")].map((teacher) => (
          <React.Fragment key={teacher.innerText}>
            {(() => {
              const name = teacher.innerText;

              return (
                <Grid item xs={3} sm={4} md={3} lg={2} xl={1}>
                  <Card variant={"outlined"}>
                    <CardActionArea
                      component={Link}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                      }}
                      to={`/teachers/${name}`}
                    >
                      <CardContent sx={{ padding: "6px" }}>
                        <Typography noWrap variant={"h6"}>
                          {name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })()}
          </React.Fragment>
        ))}
      </Grid>
    </Container>
  );
}
