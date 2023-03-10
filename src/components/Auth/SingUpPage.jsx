import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

export default function SignUp() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [err, setError] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const { email, password, name } = formData;

    if (!(password && name)) {
      return setError({ message: 'Password and username must be non-empty' });
    }
    axios.post('/user/signup', formData)
      .then((res) => {
        if (res.status === 200) window.location = '/';
        if (res.status === 403) handleShow(true);
      })
      .catch((error) => {
        console.log(error);
        setError();
      });
  };
  return (
    <>
      <form className="row" style={{ width: '600px', marginLeft: '600px', marginTop: '120px' }} onSubmit={submitHandler}>
        <div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Имя</label>
            <input name="name" type="text" className="form-control" placeholder="Введите имя" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Электронный адрес</label>
            <input name="email" type="email" className="form-control" placeholder="Введите адрес" id="exampleInputEmail1" aria-describedby="emailHelp" />

          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Пароль</label>
            <input name="password" type="password" className="form-control" placeholder="Введите пароль" id="exampleInputPassword1" />
          </div>

          <div className="form-group mt-3">
            <Button
              variant="primary"
              type="submit"
              className="btn"
            >
              Зарегистрироваться
            </Button>
          </div>
        </div>
      </form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  /* <div className="container h-100">

      <div className="row h-100 justify-content-center align-items-center">

        <div className="col-10 col-md-8 col-lg-6">
          <h4 style={{ marginTop: '100px' }}>РЕГИСТРАЦИЯ</h4>
          <form className="signup-form" action="" method="post" onSubmit={submitHandler}>
            <div className="form-group mt-5">
              <input type="text" name="name" className="form-control" placeholder="name..." required />
            </div>
            <div className="form-group mt-5">
              <input type="email" name="email" className="form-control" placeholder="email..." required />
            </div>
            <div className="form-group mt-5">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="password..."
                required
              />
            </div> */
  /* опции для выбора роли юзера */
  /* <div className="form-group mt-5">
              <select name="role" className="custom-select" required>
                <option value="default" disabled>Выберите вашу роль</option>
                <option value="buyer">Покупатель</option>
                <option value="seller">Администратор</option>
              </select>
            </div> */
  /* конец опций выбора */
  /* <div className="text-center mt-5">
              <button type="submit" className="btn btn-secondary">&nbsp; register &nbsp;</button>
            </div>
          </form>
        </div>
      </div>
    </div> */
  );
}
