import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography
} from "@mui/material";
import { useTeachers } from "../../utils/api";
import { Progress, Title, Container, Error } from "../../components";
import Link from "next/link";

export default function TeachersPage() {
  const { teachers, isError, isLoading } = useTeachers();

  if (isError) return <Error />;
  if (isLoading) return <Progress />;

  return (
    <Container>
      <Title title="Преподаватели" />
      <Grid
        container
        spacing="4px"
        columns={{ xs: 6, sm: 12, md: 12, lg: 12, xl: 8 }}
      >
        {[...teachers!.getElementsByClassName("box_prepod")].map((teacher) => (
          <React.Fragment key={teacher.innerHTML}>
            {(() => {
              const name = teacher.innerHTML;

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
                      href={`/teachers/${name}`}
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
          </React.Fragment>
        ))}
      </Grid>
    </Container>
  );
}
