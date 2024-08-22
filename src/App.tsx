import React from 'react';
import { Button, message, Space } from 'antd';

const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    messageApi.open({
      type: 'success',
      content: 'Please enter amount more than 1 ',
      duration: 10,
    });
  };

  const error = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    messageApi.open({
      type: 'error',
      content: 'This is an error message',
    });
  };

  const warning = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    messageApi.open({
      type: 'warning',
      content: 'This is a warning message',
    });
  };

  return (
    <>
      {contextHolder}
      <Space style={{height: "100vh"}}>
        <Button onClick={success}>Success</Button>
        <Button onClick={error}>Error</Button>
        <Button onClick={warning}>Warning</Button>
      </Space>
    </>
  );
};

export default App;