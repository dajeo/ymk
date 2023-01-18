import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Tooltip,
  Typography
} from "@mui/material";
import { useGroups } from "../../utils/api";
import { Progress, Title, Container, Error } from "../../components";
import { useRouter } from "next/router";
import Link from "next/link";

export default function GroupsPage() {
  const router = useRouter();
  const [department, setDepartment] = useState("");
  const { groups, isError, isLoading } = useGroups(department);

  useEffect(() => {
    if (!router.isReady) return;

    setDepartment(router.query["department"]!.toString());
  }, [router.isReady, router.query]);

  if (isError) return <Error />;
  if (isLoading) return <Progress />;

  return (
    <Container>
      {[...groups!.getElementsByClassName("zag_kurs")].map((course, index) => (
        <div key={index}>
          <Title title={course.innerHTML}/>
          {[...groups!.getElementsByClassName(`kurs_container_${index + 1}`)].map((course) => (
            <Grid
              key={index}
              container
              spacing="4px"
              columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 10 }}
            >
              {[...course.getElementsByClassName("group_box")].map((group) => {
                const numGroup = group.getElementsByClassName("num_group")[0].innerHTML;
                const nameGroup = group.getElementsByClassName("name_group")[0].innerHTML.toString().replace("<br>", " ");

                return (
                  <Grid
                    key={group.getAttribute("value") + nameGroup}
                    item xs={4} sm={3} md={2} lg={2} xl={1}
                  >
                    <Tooltip
                      disableInteractive
                      title={nameGroup}
                    >
                      <Card variant="outlined">
                        <CardActionArea
                          component={Link}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            return false;
                          }}
                          href={`/students/ОТП/${numGroup}`}
                        >
                          <CardContent sx={{ padding: "6px" }}>
                            <Typography noWrap variant="h6">
                              {numGroup}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Tooltip>
                  </Grid>
                );
              })}
            </Grid>
          ))}
        </div>
      ))}
    </Container>
  );
}
