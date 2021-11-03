const Empresa = require('../models/models_nosql/empresa');
const db = require('../config/db_sequelize');

module.exports = {
    async getCreate(req, res) {
        res.render('empresa/empresaCreate');
    },
    async postCreate(req, res) {
        const {nome, tipo, qtdFuncionarios, proprietario, endereco} = req.body;
        const empresa = new Empresa({nome, tipo, qtdFuncionarios, proprietario, endereco});
        await empresa.save();
        res.redirect('empresaList');
    },
    async getList(req, res) {
        Empresa.find().then((empresas) => {
            res.render('empresa/empresaList', { empresas: empresas.map(empresa => empresa.toJSON())});
        });
    }
}