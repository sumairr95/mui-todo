import { promises as fs } from 'fs';
import { join } from 'path';
import Head from 'next/head';
import { Container, Grid } from '@mui/material';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface HomeProps {
  todos: Todo[];
}

export const getServerSideProps = async () => {
  const todos_path = join(process.cwd(), 'data', 'todos.json');
  const todos = await fs.readFile(todos_path, 'utf8');
  return {
    props: {
      todos: JSON.parse(todos),
    },
  };
};

const Home = ({ todos }: HomeProps) => {
  return (
    <div>
      <Head>
        <title>Todos App</title>
        <meta name="description" content="Todos app with Material UI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Container>
        {todos.length > 0 ? (
          todos.map((todo, index) => (
            <Grid key={index} marginBottom={4} marginTop={4}>
              <Card todo={todo} key={index} />
            </Grid>
          ))
        ) : (
          <p>No saved todos yet!!</p>
        )}
      </Container>
    </div>
  );
};

export default Home;
