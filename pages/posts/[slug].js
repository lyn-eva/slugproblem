import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useEffect } from 'react';

export async function getStaticPaths() {
  const snapshot = await getDocs(collection(db, 'todos'));
  const paths = snapshot.docs.map((doc) => {
    const { slug } = doc.data();
    return {
      params: { slug },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  // the gacha is firebase is NOSQL works with collection and docs
  // with firebase, you locate a document or a post with its unique id
  // here, you selected a document with it title as there may be duplicates
  // you passed the post title to the slug while it should be the document id
  // go to the index page to see what is changed

  const docRef = doc(db, 'todos', slug);
  const docSnap = await getDoc(docRef);

  return {
    props: { todoProps: JSON.stringify(docSnap.data()) || null },
  };
}

export default function PostDetail({ todoProps }) {
  // console.log(todoProps);
  const todo = JSON.parse(todoProps);
  // console.log(todo);

  // I changed some rendering style
  return (
    <div style={{textAlign: 'center', marginTop: 69}}>
      <h2>{todo?.title}</h2>
      <p style={{marginTop: 15, lineHeight: 1.5}}>{todo.detail}</p>
    </div>
  );
}
