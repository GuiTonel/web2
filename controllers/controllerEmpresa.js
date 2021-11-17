const Empresa = require('../models/models_nosql/empresa');
const db = require('../config/db_sequelize');

module.exports = {
    async getCreate(req, res) {
        res.render('empresa/empresaCreate');
    },
    async postCreate(req, res) {
        const { nome, tipo, qtdFuncionarios, proprietario, endereco } = req.body;
        const empresa = new Empresa({ nome, tipo, qtdFuncionarios, proprietario, endereco });
        await empresa.save();
        res.redirect('empresaList');
    },
    async getList(req, res) {
        Empresa.find().then((empresas) => {
            res.render('empresa/empresaList', { empresas: empresas.map(empresa => empresa.toJSON()) });
        });
    },
    async getEdit(req, res) {
        await Empresa.findOne({ _id: req.params.id }).then((empresas) => {
            res.render('empresa/empresaEdit', { empresas: empresas.toJSON() });
        });
    },
    async postEdit(req, res) {
        await Empresa.findOneAndUpdate({ _id: req.body.id }, req.body);
        res.redirect('/empresaList');
    },
    async getDelete(req, res) {
        await Empresa.findOneAndRemove({ _id: req.params.id });
        res.redirect('/empresaList');
    }
}