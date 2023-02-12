import React, { Fragment, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography
} from "@mui/material";
import { useTeachers } from "../api";
import { Link } from "react-router-dom";
import { Progress, Title, Container, NetworkError, RenderingError } from "../components";

export function Teachers() {
  const [letter, setLetter] = useState("А");
  const { data, error, isLoading } = useTeachers();

  if (error) return <NetworkError />;
  if (isLoading) return <Progress />;

  if (!data) return <RenderingError />;

  const teachers: Array<string> = [];
  const letters: Array<string> = [];
  const htmlTeachers = data.getElementsByClassName("box_prepod");
  for (const teacher of htmlTeachers) {
    const name = teacher.innerHTML;
    teachers.push(name);

    const tempLetter = name.substring(0, 1);
    if (letters.find((value) => tempLetter === value)) {
      continue;
    }

    letters.push(tempLetter);
  }

  return (
    <Container>
      <Title title="Преподаватели" />
      <Grid container spacing="2px" columns={{ xs: 14, sm: 20, md: 30 }} sx={{ mb: "4px" }}>
        {letters.map((value) => (
          <Grid key={value} item xs={2}>
            <Card variant="outlined">
              <CardActionArea onClick={() => setLetter(value)}>
                <CardContent sx={{ padding: "1px", textAlign: "center" }}>
                  <Typography noWrap variant="h6">
                    {value}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        spacing="4px"
        columns={{ xs: 6, sm: 12, md: 12, lg: 12, xl: 8 }}
      >
        {teachers.filter((value) => value.startsWith(letter)).map((teacher) => (
          <Fragment key={teacher}>
            {(() => {
              const name = teacher;

              return (
                <Grid item xs={3} sm={4} md={3} lg={2} xl={1}>
                  <Card variant="outlined">
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
                        <Typography noWrap variant="h6">
                          {name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })()}
          </Fragment>
        ))}
      </Grid>
    </Container>
  );
}
