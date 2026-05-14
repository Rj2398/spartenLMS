import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPrivacyPolicy } from '../../redux/slices/authSlice';

const PrivacyPolicy = () => {
  const dispatch = useDispatch();
  const { privacyData } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getPrivacyPolicy());
  }, [dispatch]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>{privacyData?.title}</h1>
        <div
          style={styles.content}
          dangerouslySetInnerHTML={{ __html: privacyData?.content || '' }}
        />
      </div>
    </div>
  );
}


const styles = {
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        padding: '40px 20px',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        maxWidth: '800px',
        width: '100%',
        padding: '30px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderLeft: '8px solid #4126A8',
        borderRight: '8px solid #4126A8',
    },
    title: {
        color: '#4126A8',
        fontSize: '2rem',
        marginBottom: '20px',
    },
    content: {
        color: '#333',
        lineHeight: '1.7',
        fontSize: '1rem',
    },
};


export default PrivacyPolicy