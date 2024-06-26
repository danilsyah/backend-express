// import express
const express = require('express');

// import prisma client
const prisma = require('../prisma/client');

// import validationResult from express-validator
const { validationResult } = require('express-validator');

// import bcrypt
const bcrypt = require('bcryptjs');

// function findUsers
const findUsers = async (req, res) => {
    try{
        // get all users from database
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            },
            orderBy: {
                id: 'asc',
            },
        });

        // send response
        res.status(200).send({
            success: true,
            message: "Get all users successfully",
            data: users,
        });
    } catch(error){
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

// function createUser
const createUser = async (req, res) => {
    // periksa hasil validasi
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        // jika ada error, kembalikan error ke pengguna
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array(),
        });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
        // insert data
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password:  hashedPassword,
            },
        });

        res.status(200).json({
            success: true,
            message: "Create user successfully",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

// function findUserById
const findUserById = async (req, res) => {

    // get ID from params
    const { id } = req.params;

    try {
        // get user by ID
        const user = await prisma.user.findUnique({
            select: {
                id: true,
                name: true,
                email: true,
            },
            where: {
                id: Number(id),
            },
        });

        // send response
        res.status(200).send({
            success: true,
            message: `Get user by ID successfully : ${id} `,
            data: user,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        })
    }
};

//function updateUser
const updateUser = async (req, res) => {
    // get ID from params
    const {id} = req.params;

    // periksa hasil validasi
    const errors = validationResult(req);

    if (!errors.isEmpty){
        // jika ada error, kembalikan error ke pengguna
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array(),
        });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
        // update user
        const user = await prisma.user.update({
            data: {
                name: req.body.name,
                email: req.body.email,
                password:  hashedPassword,
            },
            where: {
                id: Number(id),
            },
        });

        // send response
        res.status(200).send({
            success: true,
            message: `Update user by ID successfully : ${id} `,
            data: user,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        })
    }
}; 

// function deleteUser
const deleteUser = async function deleteUser(req, res) {
    // get ID from params
    const {id} = req.params;

    try {
        //delete user
        const user = await prisma.user.delete({
            where: {
                id: Number(id),
            },
        });

        // send response
        res.status(200).send({
            success: true,
            message: `Delete user by ID successfully : ${id} `,
            data: user,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        })
    }
};

module.exports = {findUsers, createUser, findUserById, updateUser, deleteUser};
