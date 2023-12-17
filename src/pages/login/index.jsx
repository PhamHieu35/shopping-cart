import React from 'react';
import { Button, Form, Input, message } from 'antd';
import './login.scss';
import { useNavigate } from 'react-router-dom';
import { callLogin } from '../../service/api';
import { doLoginAction } from '../../redux/account/accountSlice';
import { useDispatch } from 'react-redux';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = React.useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate('/register');
  };

  const onFinish = async (value) => {
    setIsSubmit(true);

    const { username, password } = value;
    const res = await callLogin(username, password);

    setIsSubmit(false);

    if (res?.data) {
      message.success('đăng nhập thành công!');
      navigate('/');
      localStorage.setItem('access_token', res?.data.access_token);
      dispatch(doLoginAction(res?.data.user));
    } else {
      console.log('check error', res);
      notification.error({
        message: 'có lỗi xảy ra!',
        description: res?.message && Array.isArray(res?.message) && res.message,
        duration: 5,
      });
    }
  };

  return (
    <div className="login-container">
      <h1>Đăng nhập</h1>
      <div className="login-input">
        <Form
          {...formItemLayout}
          name="register"
          onFinish={onFinish}
          initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
          style={{ maxWidth: 600 }}
          scrollToFirstError
        >
          <Form.Item
            label="Email"
            labelCol={{ span: 24 }}
            name="username"
            rules={[
              {
                type: 'email',
                message: 'Email sai định dạng, vui lòng nhập lại!',
              },
              {
                required: true,
                message: 'Không được để email trống!',
              },
            ]}
          >
            <Input style={{ width: 440 }} size="large" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            labelCol={{ span: 24 }}
            name="password"
            rules={[{ required: true, message: 'Không được để mật khẩu trống!' }]}
          >
            <Input.Password style={{ width: 440 }} size="large" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 9, span: 26 }}>
            <Button type="primary" htmlType="submit" className="button-login" loading={isSubmit}>
              Đăng nhập
            </Button>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 26 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="btn-navigation"
              onClick={handleClick}
            >
              Tạo Tài Khoản Mới
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
