import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import fs from 'fs';
import { join } from 'path';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import { Container, Grid } from '@mui/material';
import TodosCard from '../components/Card';

const inter = Inter({ subsets: ['latin'] })

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Props {
  todos: Todo[];
}

export async function getServerProps() {
  const todos_path = join(__dirname, '..', '..', '..', 'data', 'todos.json');
  const todos = await fs.promises.readFile(todos_path, 'utf8');
  return {
    props: {
      todos: JSON.parse(todos),
    },
  };
}

export default function Home({ todos }: Props) {
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
}
