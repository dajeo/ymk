import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Tooltip,
  Typography
} from "@mui/material";
import {useGroups} from "../../utils/api";
import { Progress, Title, Container, Error } from "../../components";
import Link from "next/link";
import { GetServerSideProps } from "next";

interface Props {
  department: string
}

export default function GroupsPage({ department }: Props) {
  const { data, error, isLoading } = useGroups(department);

  if (error) return <Error />;
  if (isLoading) return <Progress />;

  if (!data) {
    return "Error while rendering.";
  }

  return (
    <Container>
      {[...data.getElementsByClassName("zag_kurs")].map((course, index) => (
        <div key={index}>
          <Title title={course.innerHTML}/>
          {[...data.getElementsByClassName(`kurs_container_${index + 1}`)].map((course) => (
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

export const getServerSideProps: GetServerSideProps = async(context) => {
  const department = context.params?.department;

  return { props: { department } };
};
