import React from 'react';
import { Button, Form, Input, message, notification } from 'antd';
import '../../styles/register.scss';
import { callRegister } from '../../service/api';
import { useNavigate } from 'react-router-dom';

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

const Register = () => {
  const [isSubmit, setIsSubmit] = React.useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { fullname, email, password, phone } = values;

    setIsSubmit(true);

    const res = await callRegister(fullname, email, password, phone);

    setIsSubmit(false);

    if (res?.data?._id) {
      message.success('đăng ký tài khoản thành công!');
      navigate('/login');
    } else {
      notification.error({
        message: 'có lỗi xảy ra!',
        description: res?.message && res?.message.length > 0 ? res.message[0] : res.message,
        duration: 5,
      });
    }
  };
  return (
    <div className="register-container">
      <h1>Đăng ký</h1>
      <div className="register-input">
        <Form
          {...formItemLayout}
          name="register"
          onFinish={onFinish}
          initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
          style={{ maxWidth: 600 }}
          scrollToFirstError
        >
          <Form.Item
            label="Họ tên"
            labelCol={{ span: 24 }}
            name="fullname"
            rules={[{ required: true, message: 'Không được để họ tên trống!' }]}
          >
            <Input style={{ width: 440 }} size="large" />
          </Form.Item>

          <Form.Item
            label="Email"
            labelCol={{ span: 24 }}
            name="email"
            // rules={[
            //   {
            //     type: 'email',
            //     message: 'Email sai định dạng, vui lòng nhập lại!',
            //   },
            //   {
            //     required: true,
            //     message: 'Không được để email trống!',
            //   },
            // ]}
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

          <Form.Item
            label="Điện thoại"
            labelCol={{ span: 24 }}
            name="phone"
            rules={[{ required: true, message: 'Không được để điện thoại trống!' }]}
          >
            <Input style={{ width: 440 }} size="large" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 10, span: 26 }}>
            <Button type="primary" htmlType="submit" className="button-register" loading={isSubmit}>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
