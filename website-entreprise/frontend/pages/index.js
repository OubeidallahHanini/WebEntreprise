import Head  from "next/head";
import Hero from "../sections/Hero";

export default function Home() {
  return (
    <>
<Head>    

  <title>   PHILOTS WEBSITE ENTREPRISE </title>

</Head>
<Hero/>


    </>
  )
}



// import Head from 'next/head';
// import Hero from '../sections/Hero';
// import { parseCookies } from 'nookies';

// export const getServerSideProps = async (context) => {
//   const cookies = parseCookies(context);
//   const authToken = cookies.Cookie_2 || '';
//   console.log("TOKEN JEY INDEX"+authToken)

//   return {
//     props: {
//       authToken,
//     },
//   };
// };

// export default function Home({ authToken }) {
//   return (
//     <>
//       <Head>
//         <title>PHILOTS WEBSITE ENTREPRISE</title>
//       </Head>
//       <Hero />
//       <p>Server Side Token: {authToken}</p>
//     </>
//   );
// }
