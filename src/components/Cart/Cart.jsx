import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

export default function Cart() {
  const [socks, setSocks] = useState([]);

  useEffect(() => {
    const sockData = localStorage.getItem('cart');
    if (sockData) {
      setSocks(JSON.parse(sockData));
    }
  }, []);

  const handleDeleteSock = (color) => {
    const updatedSocks = socks.filter(sock => sock.color !== color);
    setSocks(updatedSocks);
    localStorage.setItem('cart', JSON.stringify(updatedSocks));
  }

  const handleQtyChange = (color, e) => {
    const qty = parseInt(e.target.value);
    const updatedSocks = socks.map(sock => {
      if (sock.color === color) {
        return {
          ...sock,
          qty
        }
      }
      return sock;
    });
    setSocks(updatedSocks);
    localStorage.setItem('cart', JSON.stringify(updatedSocks));
  }

  const handleCreateOrder = () => {
    console.log('Order created!');
  }

  return (
    <>
      <section className="section-cart">
        <header className="section-cart__header">
          <div className="container">
            <h1 className='title-1'>Корзина товаров</h1>
          </div>
        </header>
        <div className="section-cart__body">
          <div className="container">
            <div>
              {socks.map((sock) => (
                <Card key={sock.color}>
                  <Card.Img variant="top" />
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', backgroundColor: `${sock.color}` }} className="color" />
                    <img style={{ position: 'absolute' }} className="pattern" src={`${sock.pattern}`} alt="" />
                    <img style={{ position: 'absolute' }} className="pic" src={`${sock.image}`} alt="" />
                    <img style={{ position: 'absolute' }} className="sock" src="/Img/sock.png" alt="" />
                  </div>
                  <Card.Body>
                    <Card.Title>Носки</Card.Title>
                    <Card.Text>990 рублей</Card.Text>
                    <div className="d-flex">
                      <Form.Control type="number" min={1} max={10} defaultValue={sock.qty||1} onChange={(e) => handleQtyChange(sock.color, e)} />
                      <Button variant="danger" onClick={() => handleDeleteSock(sock.color)}>Удалить</Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
            <Button variant="success" onClick={handleCreateOrder}>Создать заказ</Button>
          </div>
        </div>
      </section>
    </>
  )
}

