const express= require('express');
const router = express.Router();
const mysql= require('../mysql').pool;

router.get('/',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if (error){
            return res.status(500).send({error:error});
        }
        conn.query(
            'SELECT * FROM cliente',
            (error,resultado,field)=>{
                if (error){
                  return res.status(500).send({
                        error:error,
                        response: null
                    });
                }
                res.status(200).send({
                    response: resultado,
                });
            }
        )
    });
});

router.post('/',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if (error){
            return res.status(500).send({error:error});
        }
        conn.query(
            'INSERT INTO cliente (nome,tel,email,endereco) VALUES (?,?,?,?)',
            [req.body.nome,req.body.tel,req.body.email,req.body.endereco],
            (error,resultado,field)=>{
                conn.release();
                if (error){
                  return res.status(500).send({
                        error:error,
                        response: null
                    });
                }
                res.status(201).send({
                    mensagem: 'Cliente inserido',
                    id_cliente: resultado.insertId
                });
            }
        )
    });
   
});

router.get('/:id_cliente',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if (error){
            return res.status(500).send({error:error});
        }
        conn.query(
            'SELECT * FROM cliente WHERE id_cliente = ?',
            [req.params.id_cliente],
            (error,resultado,field)=>{
                if (error){
                  return res.status(500).send({
                        error:error,
                        response: null
                    });
                }
                res.status(200).send({
                    response: resultado,
                });
            }
        )
    });
});

router.delete('/',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if (error){
            return res.status(500).send({error:error});
        }
        conn.query(
            'DELETE FROM cliente WHERE id_cliente = ?',
            [req.body.id_cliente],
            (error,resultado,field)=>{
                conn.release();
                if (error){
                  return res.status(500).send({
                        error:error,
                        response: null
                    });
                }
                res.status(202).send({
                    mensagem: 'Cliente removido'
                });
            }
        )
    });
});

router.patch('/',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if (error){
            return res.status(500).send({error:error});
        }
        conn.query(
            'UPDATE cliente SET nome=?,tel=?,email=?,endereco=? WHERE id_cliente = ?',
            [req.body.nome,req.body.tel,req.body.email,req.body.endereco,req.body.id_cliente],
            (error,resultado,field)=>{
                conn.release();
                if (error){
                  return res.status(500).send({
                        error:error,
                        response: null
                    });
                }
                res.status(202).send({
                    mensagem: 'Cliente atualizado'
                });
            }
        )
    });
});

module.exports = router;