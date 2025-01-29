import styles from "./page.module.css";
import { Aside, ModelViewer } from '@/components';

function Home() {
  return (
    <main className='home'>
      <ModelViewer />
    </main>
  );
}

export default Home;