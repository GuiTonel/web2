const Empresa = require('../models/models_nosql/empresa');
const db = require('../config/db_sequelize');

module.exports = {
    async getCreate(req, res) {
        res.render('empresa/empresaCreate');
    },
    async postCreate(req, res) {
        const {nome, tipo, qtdFuncionarios, idProprietario, endereco} = req.body;
        proprietario = db.Usuario.findAll(
            { where: {id: idProprietario}}, 
            ( user, err ) => {
                if (err) throw err;

                return user.login;
            })
        
        const empresa = new Empresa({nome, tipo, qtdFuncionarios, proprietario, endereco});
        await empresa.save();
        res.redirect('/home');
    },
    async getList(req, res) {
        Empresa.find().then((empresas) => {
            res.render('empresa/empresaList', { empresas: empresas.map(empresa => empresa.toJSON())});
        });
    }
}